import Footer from "../Footer/footer";
import { Outlet } from "react-router";

export default function FooterLayout() {
  return (
    <>
      <Outlet />
      <Footer/>
    </>
  );
}
