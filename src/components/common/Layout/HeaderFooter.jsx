// Layout.jsx
import Header from "../Header/header";
import Footer from "../Footer/footer";
import { Outlet } from "react-router";

export default function HeaderFooterLayout() {
  return (
    <>
      <Header/>
      <Outlet />
      <Footer/>
    </>
  );
}
