import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input, message } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useCreateUser } from "../../hooks/useUsers";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const createUserMutation = useCreateUser();
  
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      username: "",
      email: "",
      phone: "",
      website: "",
    },
    mode: "onChange",
  });

  const onSubmit = async (data) => {
    try {
      await createUserMutation.mutateAsync(data);
      message.success("新增成功");
      navigate("/users");
    } catch (error) {
      message.error("新增失敗");
      console.error("Create error:", error);
    }
  };

  return (
    <Card title="新增使用者" style={{ maxWidth: 480, margin: "32px auto" }}>
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
            loading={createUserMutation.isPending}
          >
            新增
          </Button>
          <Button onClick={() => navigate("/users")}>取消</Button>
        </Form.Item>
      </Form>
      <DevTool control={control} />
    </Card>
  );
}
 