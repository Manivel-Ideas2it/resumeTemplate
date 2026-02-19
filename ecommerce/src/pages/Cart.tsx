import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const  Cart = () => {
  const { items, removeItem, updateQuantity, totalPrice, itemCount } = useCart();

  const handleQuantityChange = useCallback(
    (productId: number, delta: number) => {
      const item = items.find((i) => i.product.id === productId);
      if (!item) return;
      const next = Math.max(0, item.quantity + delta);
      updateQuantity(productId, next);
    },
    [items, updateQuantity]
  );

  if (itemCount === 0) {
    return (
      <div className="cart-empty">
        <h1>Your cart is empty</h1>
        <p>Add some products from the store.</p>
        <Link to="/products" className="cart-empty-link">
          Browse products
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Cart ({itemCount} items)</h1>
      <div className="cart-list">
        {items.map(({ product, quantity }) => (
          <div key={product.id} className="cart-item">
            <div className="cart-item-image">
              <img src={product.image} alt={product.title} />
            </div>
            <div className="cart-item-details">
              <Link to={`/products/${product.id}`} className="cart-item-title">
                {product.title}
              </Link>
              <p className="cart-item-price">${product.price.toFixed(2)} each</p>
              <div className="cart-item-qty">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(product.id, -1)}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(product.id, 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>
            <div className="cart-item-subtotal">
              ${(product.price * quantity).toFixed(2)}
            </div>
            <button
              type="button"
              className="cart-item-remove"
              onClick={() => removeItem(product.id)}
              aria-label="Remove from cart"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <p className="cart-total">
          Total: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <Link to="/checkout" className="cart-checkout-btn">
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}

export default Cart;
