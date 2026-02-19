import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="hero-section">
        <h1>Welcome to ShopLocal</h1>
        <p>
          Browse products to click the Browse Button, Add to cart and checkout
          locally.
        </p>
        <Link to="/products" className="browse-button">
          Browse
        </Link>
      </div>
      <div className="features">
        <div className="feature">
          <h3>Products</h3>
          <p>View all products.</p>
          <Link to="/products">Go to products</Link>
        </div>
        <div className="feature">
          <h3>Cart</h3>
          <p>Manage your cart.</p>
          <Link to="/cart">View cart</Link>
        </div>
        <div className="feature">
          <h3>Checkout</h3>
          <p>Checkout the Product.</p>
          <Link to="/checkout">Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
