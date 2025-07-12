import { Outlet } from "react-router-dom";
import "antd/dist/reset.css"; // Import AntD's reset styles
import "../index.css";

export default function PageLayout() {
  return <Outlet />;
} 