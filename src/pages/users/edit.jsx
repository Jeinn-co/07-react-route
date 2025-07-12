import { useLoaderData, useNavigate, useRevalidator } from "react-router-dom";
import { Button, Card, Form, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

export default function UserEditPage() {
  const user = useLoaderData();
  const navigate = useNavigate();
  const revalidator = useRevalidator();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: user,
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    revalidator.revalidate();
    navigate(-1);
  };

  if (!user) return <div>User not found</div>;

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
          <Button htmlType="submit" type="primary" style={{ marginRight: 8 }}>
            儲存
          </Button>
          <Button onClick={() => navigate(-1)}>取消</Button>
        </Form.Item>
      </Form>
      <DevTool control={control} />
    </Card>
  );
}
 