import { useParams, useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useUpdateUser, useUser } from "../../hooks/useUsers";
import { useEffect } from "react";

export default function UserEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: user, isLoading, error } = useUser(id);
  const updateUserMutation = useUpdateUser();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  // 當 user 資料載入完成時，設定表單預設值
  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user, reset]);

  const onSubmit = async (data) => {
    try {
      await updateUserMutation.mutateAsync({ id: user.id, ...data });
      message.success("更新成功");
      navigate(-1);
    } catch (error) {
      message.error("更新失敗");
      console.error("Update error:", error);
    }
  };

  if (isLoading) {
    return <div>載入中...</div>;
  }

  if (error) {
    return <div>載入失敗: {error.message}</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <Card
      title={`編輯 ${user.name}`}
      style={{ maxWidth: 480, margin: "32px auto" }}
    >
      <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
        <Form.Item
          label="Name"
          required
          validateStatus={errors.name ? "error" : ""}
          help={errors.name?.message}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "必填" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Username"
          required
          validateStatus={errors.username ? "error" : ""}
          help={errors.username?.message}
        >
          <Controller
            name="username"
            control={control}
            rules={{ required: "必填" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          required
          validateStatus={errors.email ? "error" : ""}
          help={errors.email?.message}
        >
          <Controller
            name="email"
            control={control}
            rules={{ required: "必填" }}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label="Phone">
          <Controller
            name="phone"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item label="Website">
          <Controller
            name="website"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
        </Form.Item>
        <Form.Item>
          <Button 
            htmlType="submit" 
            type="primary" 
            style={{ marginRight: 8 }}
            loading={updateUserMutation.isPending}
          >
            儲存
          </Button>
          <Button onClick={() => navigate(-1)}>取消</Button>
        </Form.Item>
      </Form>
      <DevTool control={control} />
    </Card>
  );
}
 