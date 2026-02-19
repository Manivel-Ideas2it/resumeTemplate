import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="app-container">
      <header className="header">
        <Link to="/">ShopLocal</Link>
        <nav className="navigation-bar">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <div className="footer-content">
          <p>&copy; 2024 ShopLocal. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
