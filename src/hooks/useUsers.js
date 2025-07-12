import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { userApi } from '../services/api';

// Query Keys
export const userKeys = {
  all: ['users'],
  lists: () => [...userKeys.all, 'list'],
  list: (filters) => [...userKeys.lists(), { ...filters }],
  details: () => [...userKeys.all, 'detail'],
  detail: (id) => [...userKeys.details(), id],
};

// 取得所有使用者
export const useUsers = () => {
  return useQuery({
    queryKey: userKeys.lists(),
    queryFn: userApi.getUsers,
  });
};

// 取得單一使用者
export const useUser = (id) => {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => userApi.getUser(id),
    enabled: !!id,
  });
};

// 建立使用者 mutation
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.createUser,
    onSuccess: () => {
      console.log('[React Query] Create user success, invalidating queries');
      // 重新取得使用者列表
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
    },
  });
};

// 更新使用者 mutation
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.updateUser,
    onSuccess: (updatedUser) => {
      console.log('[React Query] Update user success, invalidating queries');
      // 重新取得使用者列表
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      // 更新單一使用者快取
      queryClient.setQueryData(userKeys.detail(updatedUser.id), updatedUser);
    },
  });
};

// 刪除使用者 mutation
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: userApi.deleteUser,
    onSuccess: (data, variables) => {
      console.log('[React Query] Delete user success, invalidating queries', { data, variables });
      
      // 重新取得使用者列表
      queryClient.invalidateQueries({ queryKey: userKeys.lists() });
      
      // 移除已刪除使用者的快取
      queryClient.removeQueries({ queryKey: userKeys.detail(variables) });
    },
  });
}; 