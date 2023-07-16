import { Outlet } from "react-router-dom";
import classes from "./layout.module.css";

import Footer from "../Footer";

const Layout: React.FC = () => (
  <div className={classes.layout}>
    {<Outlet />}
    <Footer />
  </div>
);

export default Layout;
