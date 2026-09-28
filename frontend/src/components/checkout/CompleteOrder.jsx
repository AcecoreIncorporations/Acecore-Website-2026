import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import { checkoutCopy, checkoutPaymentMethod } from '../../data/checkout';
import { createConfirmedOrder } from '../../data/confirmation';
import { getQuoteSession, setQuoteSession } from '../../lib/quoteSession';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function CompleteOrder({ view }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(view.email);
  const [orderNote, setOrderNote] = useState(() => getQuoteSession()?.orderNote || '');
  const [errors, setErrors] = useState({});

  const paymentMethodId = checkoutPaymentMethod.id;

  const updateEmail = (value) => {
    setEmail(value);
    setErrors((current) => {
      if (!current.email) return current;
      const next = { ...current };
      delete next.email;
      return next;
    });
    setQuoteSession({ form: { email: value, confirmEmail: value } });
  };

  const validate = () => {
    const next = {};

    if (!view.packageId) next.configuration = 'Select a Powercell configuration.';
    if (!view.address.trim()) next.delivery = 'Add a delivery address.';
    if (!email.trim()) next.email = 'Enter an email for your receipt.';
    else if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (!paymentMethodId) next.payment = 'Select a payment method.';

    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const session = getQuoteSession();
    const order = createConfirmedOrder({
      view,
      email,
      orderNote: orderNote.trim(),
      session,
    });
    setQuoteSession({ orderNote: orderNote.trim(), order });
    navigate('/order-confirmation');
  };

  return (
    <section className="checkout-panel checkout-panel--complete" aria-labelledby="checkout-complete-title">
      <header className="checkout-panel__header">
        <h2 id="checkout-complete-title" className="checkout-heading">
          {checkoutCopy.completeTitle}
        </h2>
        <p className="checkout-support">{checkoutCopy.completeSupport}</p>
      </header>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="checkout-method">
          <legend className="checkout-field-label">{checkoutCopy.paymentMethodLabel}</legend>
          <label className="checkout-method__card">
            <input
              className="visually-hidden"
              type="radio"
              name="paymentMethod"
              value={checkoutPaymentMethod.id}
              checked
              onChange={() => {}}
            />
            <span className="checkout-method__copy">
              <span className="checkout-method__title">{checkoutPaymentMethod.title}</span>
              <span className="checkout-method__support">{checkoutPaymentMethod.subtitle}</span>
            </span>
            <span className="checkout-method__indicator" aria-hidden="true" />
          </label>
          {errors.payment ? (
            <p className="checkout-form__error" role="alert">
              {errors.payment}
            </p>
          ) : null}
        </fieldset>

        <div className="checkout-field">
          <label className="checkout-field-label" htmlFor="checkout-email">
            {checkoutCopy.emailLabel}
          </label>
          <input
            id="checkout-email"
            name="receiptEmail"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(event) => updateEmail(event.target.value)}
          />
          {errors.email ? (
            <p className="checkout-form__error" role="alert">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="checkout-field">
          <label className="checkout-field-label" htmlFor="checkout-note">
            {checkoutCopy.orderNoteLabel}
          </label>
          <textarea
            id="checkout-note"
            name="orderNote"
            rows={3}
            placeholder={checkoutCopy.orderNotePlaceholder}
            value={orderNote}
            onChange={(event) => setOrderNote(event.target.value)}
          />
        </div>

        {errors.configuration || errors.delivery ? (
          <p className="checkout-form__error" role="alert">
            {errors.configuration || errors.delivery}
          </p>
        ) : null}

        <Button type="submit" variant="brand" className="checkout-form__submit">
          {checkoutCopy.placeOrder}
        </Button>

        <p className="checkout-form__policy">
          {checkoutCopy.policyBefore}
          <Link to={checkoutCopy.policyHref}>{checkoutCopy.policyLink}</Link>
          {checkoutCopy.policyAfter}
        </p>

        <Link className="checkout-back" to={view.quoteHref}>
          <span aria-hidden="true">← </span>
          {checkoutCopy.backToQuote}
        </Link>
      </form>
    </section>
  );
}
