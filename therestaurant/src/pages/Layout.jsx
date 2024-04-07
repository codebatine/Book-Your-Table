import { Outlet } from "react-router";
import "../App.scss";
import { Navbar } from "../components/header/Navbar";
import { DarkModeProvider } from "../context/DarkModeContext";

export const Layout = () => {
  return (
    <DarkModeProvider>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
        <footer></footer>
      </div>
    </DarkModeProvider>
  );
};
