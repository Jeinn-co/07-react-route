import { Outlet } from "react-router-dom";
import SuspenseWrapper from "../components/SuspenseWrapper.jsx";
import "antd/dist/reset.css"; // Import AntD's reset styles
import "../index.css";

export default function PageLayout() {
  return (
    <SuspenseWrapper>
      <Outlet />
    </SuspenseWrapper>
  );
} 