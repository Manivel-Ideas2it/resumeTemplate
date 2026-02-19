import { useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../api/storeApi";
import type { Product } from "../types/product";
import { useCart } from "../context/CartContext";
// import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const getProduct = async () => {
      try {
        setLoading(true);
        const product = await fetchProductById(id);
        setProduct(product);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (product) {
      addItem(product, 1);
      navigate("/cart");
    }
  }, [product, navigate]);

  if (loading) return <p className="product-detail-loading">Loading…</p>;
  if (!product)
    return <p className="product-detail-error">Product not found.</p>;

  return (
    <div className="product-detail">
      <button
        type="button"
        className="product-detail-back"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>
      <div className="product-detail-content">
        <div className="product-img-container">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="product-detail-info">
          <span className="product-detail-category">{product.category}</span>
          <h1>{product.title}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-rating">
            ★ {product.rating.rate} ({product.rating.count} reviews)
          </p>
          <p className="product-detail-description">{product.description}</p>
          <button
            type="button"
            className="product-detail-add"
            onClick={handleAddToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
