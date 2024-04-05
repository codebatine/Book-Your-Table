import { Outlet } from "react-router";
import "../App.scss";
import { Navbar } from "../components/header/Navbar";

export const Layout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};
