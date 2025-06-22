import { useLoaderData, useNavigate } from "react-router-dom";
import { Table, Button, Input } from "antd";
import { useForm, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useState } from "react";

export default function UserList() {
  const users = useLoaderData();
  // 先讀 localStorage
  let localUsers = [];
  if (typeof window !== 'undefined') {
    try {
      localUsers = JSON.parse(localStorage.getItem('localUsers') || '[]');
    } catch {}
  }
  const mergedUsers = localUsers.length > 0
    ? [...localUsers, ...users.filter(u => !localUsers.some(lu => lu.id === u.id))]
    : users;
  const safeUsers = Array.isArray(mergedUsers) ? mergedUsers : [];
  const [editingKey, setEditingKey] = useState(null);
  const navigate = useNavigate();

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
        <Button type="link" onClick={() => window.location.href = `/users/${record.id}/edit`}>
          編輯頁面
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h2 style={{ margin: 0 }}>Users</h2>
        <Button type="primary" onClick={() => navigate('/users/new')}>新增使用者</Button>
      </div>
      <form>
        <Table
          dataSource={safeUsers}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </form>
      <DevTool control={control} />
    </>
  );
}
