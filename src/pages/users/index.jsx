import { useNavigate } from "react-router-dom";
import { Table, Button, Input, Popconfirm, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState, useEffect } from "react";
import { useUsers, useDeleteUser } from "../../hooks/useUsers";

export default function UserList() {
  const { data: users = [], isLoading, error } = useUsers();
  const deleteUserMutation = useDeleteUser();
  const safeUsers = Array.isArray(users) ? users : [];
  const [editingKey, setEditingKey] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log('[UserList] Data from query has changed:', users);
  }, [users]);

  // 將 users 轉成物件陣列
  const defaultValues = safeUsers.reduce((acc, user) => {
    acc[user.id] = user;
    return acc;
  }, {});

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues,
    mode: "onChange",
  });

  const isEditing = (record) => editingKey === record.id;

  const edit = (record) => {
    setEditingKey(record.id);
  };

  const save = (id) => {
    setEditingKey(null);
    // 這裡可以加上 API 請求
    // const data = getValues(id);
    // console.log('Save:', data);
  };

  const cancel = () => {
    setEditingKey(null);
  };

  const handleDelete = async (id) => {
    try {
      console.log('[UserList] Deleting user with ID:', id);
      await deleteUserMutation.mutateAsync(id);
      message.success("刪除成功");
    } catch (error) {
      message.error("刪除失敗");
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>載入失敗: {error.message}</div>;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) =>
        isEditing(record) ? (
          <Controller
            name={`${record.id}.name`}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        ) : (
          text
        ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text, record) =>
        isEditing(record) ? (
          <Controller
            name={`${record.id}.email`}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        ) : (
          text
        ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            type="link"
            onClick={() => navigate(`/users/${record.id}/edit`)}
          >
            編輯
          </Button>
          <Popconfirm
            title="確定要刪除這個使用者嗎？"
            onConfirm={() => handleDelete(record.id)}
            okText="確定"
            cancelText="取消"
          >
            <Button 
              type="link" 
              danger
              loading={deleteUserMutation.isPending}
            >
              刪除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>Users ({safeUsers.length})</h2>
        <Button type="primary" onClick={() => navigate("/users/new")}>
          新增使用者
        </Button>
      </div>
      <form>
        <Table
          dataSource={safeUsers}
          columns={columns}
          rowKey="id"
          pagination={false}
          loading={isLoading}
        />
      </form>
      <DevTool control={control} />
    </>
  );
}
