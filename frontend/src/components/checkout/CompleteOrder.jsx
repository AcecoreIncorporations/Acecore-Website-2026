import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../ui/Button';
import {
  checkoutCopy,
  checkoutPaymentMethod,
  checkoutPaymentMethods,
} from '../../data/checkout';
import { createConfirmedOrder } from '../../data/confirmation';
import { formatNaira } from '../../lib/formatNaira';
import { getQuoteSession, setQuoteSession } from '../../lib/quoteSession';

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function CompleteOrder({ view }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(view.email);
  const [orderNote, setOrderNote] = useState(() => getQuoteSession()?.orderNote || '');
  const [selectedPlan, setSelectedPlan] = useState('full');
  const [selectedMethod, setSelectedMethod] = useState(checkoutPaymentMethod.id);
  const [errors, setErrors] = useState({});

  const fullOrderTotal = useMemo(() => Number(view.amount) || 0, [view.amount]);
  const amountPayableNow = useMemo(() => {
    if (selectedPlan === 'deposit') {
      return Math.round(fullOrderTotal * 0.7);
    }

    return fullOrderTotal;
  }, [fullOrderTotal, selectedPlan]);
  const remainingBalance = Math.max(fullOrderTotal - amountPayableNow, 0);
  const selectedPaymentMethod =
    checkoutPaymentMethods.find((method) => method.id === selectedMethod) || checkoutPaymentMethods[0];

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
    if (!String(view.address || '').trim()) next.delivery = 'Add a delivery address.';
    if (!email.trim()) next.email = 'Enter an email for your receipt.';
    else if (!isValidEmail(email)) next.email = 'Enter a valid email address.';
    if (!selectedMethod) next.payment = 'Select a payment method.';

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
    setQuoteSession({ orderNote: orderNote.trim(), order, paymentPlan: selectedPlan, paymentMethod: selectedMethod });
    navigate('/order-confirmation');
  };

  const primaryButtonLabel =
    selectedMethod === 'card'
      ? `Pay ${formatNaira(amountPayableNow)} by card`
      : `Pay ${formatNaira(amountPayableNow)} via Paystack transfer`;

  return (
    <section className="checkout-panel checkout-panel--complete" aria-labelledby="checkout-complete-title">
      <header className="checkout-panel__header">
        <h2 id="checkout-complete-title" className="checkout-heading">
          {checkoutCopy.completeTitle}
        </h2>
        <p className="checkout-support">{checkoutCopy.completeSupport}</p>
      </header>

      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <fieldset className="checkout-plan">
          <legend className="checkout-field-label">{checkoutCopy.paymentPlanLabel}</legend>
          <div className="checkout-plan__list">
            <label className={`checkout-plan__option ${selectedPlan === 'full' ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name="paymentPlan"
                value="full"
                checked={selectedPlan === 'full'}
                onChange={() => setSelectedPlan('full')}
              />
              <span className="checkout-plan__copy">
                <span className="checkout-plan__title">{checkoutCopy.fullPaymentTitle}</span>
                <span className="checkout-plan__support">{checkoutCopy.fullPaymentSupport}</span>
              </span>
              <span className="checkout-plan__indicator" aria-hidden="true" />
            </label>

            <label className={`checkout-plan__option ${selectedPlan === 'deposit' ? 'is-selected' : ''}`}>
              <input
                type="radio"
                name="paymentPlan"
                value="deposit"
                checked={selectedPlan === 'deposit'}
                onChange={() => setSelectedPlan('deposit')}
              />
              <span className="checkout-plan__copy">
                <span className="checkout-plan__title">{checkoutCopy.depositTitle}</span>
                <span className="checkout-plan__support">{checkoutCopy.depositSupport}</span>
              </span>
              <span className="checkout-plan__indicator" aria-hidden="true" />
            </label>
          </div>
        </fieldset>

        <div className="checkout-payment-summary" aria-live="polite">
          <p className="checkout-payment-summary__notice">{checkoutCopy.paymentPlanNotice}</p>
          <div className="checkout-payment-summary__rows">
            <div className="checkout-payment-summary__row">
              <span>{checkoutCopy.fullOrderTotal}</span>
              <strong>{formatNaira(fullOrderTotal)}</strong>
            </div>
            <div className="checkout-payment-summary__row">
              <span>{checkoutCopy.amountPayableNow}</span>
              <strong>{formatNaira(amountPayableNow)}</strong>
            </div>
            <div className="checkout-payment-summary__row">
              <span>{checkoutCopy.remainingBalance}</span>
              <strong>{formatNaira(remainingBalance)}</strong>
            </div>
          </div>
        </div>

        <fieldset className="checkout-method">
          <legend className="checkout-field-label">{checkoutCopy.paymentMethodLabel}</legend>
          <div className="checkout-method__list">
            {checkoutPaymentMethods.map((method) => (
              <label
                key={method.id}
                className={`checkout-method__card ${selectedMethod === method.id ? 'is-selected' : ''}`}
              >
                <input
                  className="visually-hidden"
                  type="radio"
                  name="paymentMethod"
                  value={method.id}
                  checked={selectedMethod === method.id}
                  onChange={() => setSelectedMethod(method.id)}
                />
                <span className="checkout-method__copy">
                  <span className="checkout-method__title">{method.title}</span>
                  <span className="checkout-method__support">{method.subtitle}</span>
                </span>
                <span className="checkout-method__indicator" aria-hidden="true" />
              </label>
            ))}
          </div>
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
          {primaryButtonLabel}
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
