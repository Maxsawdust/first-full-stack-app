import { Outlet } from "react-router-dom";
import { MenuButton, Menu } from "../../components";

export default function Layout() {
  return (
    <>
      <MenuButton />
      <Menu />
      <Outlet />
    </>
  );
}
