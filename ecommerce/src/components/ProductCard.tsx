import { Link } from "react-router-dom";
import type {Product} from "../types/product";
import "./ProductCard.css";

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <div className="product-card">
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <Link to={`/products/${product.id}`} className="product-card-link">View Product</Link>
    </div>
  );
};

export default ProductCard;