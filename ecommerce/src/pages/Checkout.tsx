import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Checkout.css';

interface CheckoutFormValues {
  email: string;
  name: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

const initialValues: CheckoutFormValues = {
  email: '',
  name: '',
  address: '',
  city: '',
  zip: '',
  cardNumber: '',
  cardName: '',
  expiry: '',
  cvv: '',
};

const validate = (values: CheckoutFormValues) => {
  const errors: Partial<Record<keyof CheckoutFormValues, string>> = {};
  if (!values.email?.trim()) errors.email = 'Required';
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email.trim())) {
    errors.email = 'Invalid email';
  }
  if (!values.name?.trim()) errors.name = 'Required';
  if (!values.address?.trim()) errors.address = 'Required';
  if (!values.city?.trim()) errors.city = 'Required';

  const zipTrimmed = values.zip?.trim() ?? '';
  if (!zipTrimmed) errors.zip = 'Required';
  else if (!/^\d{6}(-\d{4})?$/.test(zipTrimmed)) {
    errors.zip = 'Enter a valid ZIP (e.g. 10001 or 10001-1234)';
  }


  const cardDigits = (values.cardNumber?.replace(/\s/g, '') ?? '');
  if (!cardDigits) errors.cardNumber = 'Required';
  else if (!/^\d{13,19}$/.test(cardDigits)) {
    errors.cardNumber = 'Enter 13–19 digits';
  }

  if (!values.cardName?.trim()) errors.cardName = 'Required';


  const expiryTrimmed = values.expiry?.trim() ?? '';
  if (!expiryTrimmed) errors.expiry = 'Required';
  else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(expiryTrimmed)) {
    errors.expiry = 'Use MM/YY (e.g. 12/28)';
  }

  const cvvTrimmed = values.cvv?.trim() ?? '';
  if (!cvvTrimmed) errors.cvv = 'Required';
  else if (!/^\d{3,4}$/.test(cvvTrimmed)) {
    errors.cvv = 'Enter 3 or 4 digits';
  }

  return errors;
}
const Checkout = () => {
  const navigate = useNavigate();
  const { items, totalPrice, itemCount, clearCart } = useCart();

  if (itemCount === 0) {
    return (
      <div className="checkout-empty">
        <h1>Nothing to checkout</h1>
        <p>Add items to your cart first.</p>
        <Link to="/products">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>
      <div className="checkout-layout">
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={(values) => {
            console.log('Checkout submitted', values);
            alert(`Order placed! Total: $${totalPrice.toFixed(2)}. This is a demo — no real charge.`);
            clearCart();
            navigate('/');
          }}
        >
          <Form className="checkout-form">
            <section className="form-section">
              <h2>Contact</h2>
              <label>
                Email
                <Field name="email" type="email" placeholder="you@example.com" />
                <ErrorMessage name="email" component="span" className="field-error" />
              </label>
            </section>
            <section className="form-section">
              <h2>Shipping</h2>
              <label>
                Full name
                <Field name="name" type="text" placeholder="John Doe" />
                <ErrorMessage name="name" component="span" className="field-error" />
              </label>
              <label>
                Address
                <Field name="address" type="text" placeholder="123 Main St" />
                <ErrorMessage name="address" component="span" className="field-error" />
              </label>
              <div className="form-row">
                <label>
                  City
                  <Field name="city" type="text" placeholder="New York" />
                  <ErrorMessage name="city" component="span" className="field-error" />
                </label>
                <label>
                  ZIP
                  <Field name="zip" type="text" inputMode="numeric" placeholder="10001" />
                  <ErrorMessage name="zip" component="span" className="field-error" />
                </label>
              </div>
            </section>
            <section className="form-section">
              <h2>Payment</h2>
              <label>
                Card number
                <Field name="cardNumber" type="text" inputMode="numeric" placeholder="4242 4242 4242 4242" />
                <ErrorMessage name="cardNumber" component="span" className="field-error" />
              </label>
              <label>
                Name on card
                <Field name="cardName" type="text" placeholder="John Doe" />
                <ErrorMessage name="cardName" component="span" className="field-error" />
              </label>
              <div className="form-row">
                <label>
                  Expiry
                  <Field name="expiry" type="text" inputMode="numeric" placeholder="MM/YY" />
                  <ErrorMessage name="expiry" component="span" className="field-error" />
                </label>
                <label>
                  CVV
                  <Field name="cvv" type="text" placeholder="123" />
                  <ErrorMessage name="cvv" component="span" className="field-error" />
                </label>
              </div>
            </section>
            <button type="submit" className="checkout-submit">
              Place order — ${totalPrice.toFixed(2)}
            </button>
          </Form>
        </Formik>
        <aside className="checkout-order">
          <h2>Order summary</h2>
          <p>{itemCount} item(s)</p>
          <ul>
            {items.map(({ product, quantity }) => (
              <li key={product.id}>
                {product.title} × {quantity} — $
                {(product.price * quantity).toFixed(2)}
              </li>
            ))}
          </ul>
          <p className="checkout-total">
            Total: <strong>${totalPrice.toFixed(2)}</strong>
          </p>
        </aside>
      </div>
    </div>
  );
}
export default Checkout;
