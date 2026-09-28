import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link, useSearchParams } from 'react-router-dom';
import Reveal from '../ui/Reveal';
import Button from '../ui/Button';
import QuoteLifestyleMedia from './QuoteLifestyleMedia';
import QuoteReceipt from './QuoteReceipt';
import {
  quotePackages,
  requestQuoteCopy,
  resolveQuotePackageId,
} from '../../data/requestQuote';
import { getQuoteSession, setQuoteSession } from '../../lib/quoteSession';

const emptyForm = {
  installationAddress: '',
  firstName: '',
  lastName: '',
  email: '',
  confirmEmail: '',
  phone: '',
  hasSolar: '',
  receiveUpdates: false,
};

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

function createQuotationNumber() {
  return String(Math.floor(1000 + Math.random() * 9000));
}

function readStoredForm() {
  const session = getQuoteSession();
  return session?.form ? { ...emptyForm, ...session.form } : emptyForm;
}

function readStoredReceipt() {
  const session = getQuoteSession();
  if (!session?.committed || !session.quotationNumber || !session.packageId) return null;
  const packageItem = quotePackages.find((item) => item.id === session.packageId);
  if (!packageItem || !session.form) return null;
  return {
    form: session.form,
    packageItem,
    quotationNumber: session.quotationNumber,
  };
}

function QuoteReceiptModal({ receipt, open, onClose }) {
  const titleId = useId();
  const closeRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [open, onClose]);

  if (!open || !receipt || typeof document === 'undefined') return null;

  return createPortal(
    <div className="quote-receipt-modal" role="presentation">
      <button
        type="button"
        className="quote-receipt-modal__backdrop"
        aria-label="Close quotation"
        onClick={onClose}
      />
      <div
        className="quote-receipt-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="quote-receipt-modal__header">
          <h2 id={titleId} className="quote-receipt-modal__title">
            Your quotation
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="quote-receipt-modal__close"
            aria-label="Close quotation"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="quote-receipt-modal__body">
          <QuoteReceipt
            form={receipt.form}
            packageItem={receipt.packageItem}
            quotationNumber={receipt.quotationNumber}
          />
        </div>

        <div className="quote-receipt-modal__actions">
          <Button
            as={Link}
            to="/checkout"
            variant="brand"
            className="quote-receipt-modal__continue"
          >
            {requestQuoteCopy.continueLabel}
          </Button>
          <button
            type="button"
            className="quote-receipt-modal__dismiss"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default function RequestQuoteSection() {
  const [searchParams] = useSearchParams();
  const modelParam = searchParams.get('model');
  const initialPackageId = useMemo(() => {
    if (modelParam) {
      return resolveQuotePackageId(modelParam, searchParams.get('config'));
    }
    const session = getQuoteSession();
    if (session?.packageId) return session.packageId;
    return resolveQuotePackageId(null, null);
  }, [modelParam, searchParams]);

  const [selectedPackageId, setSelectedPackageId] = useState(initialPackageId);
  const [form, setForm] = useState(readStoredForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('');
  const [receipt, setReceipt] = useState(readStoredReceipt);
  const [receiptOpen, setReceiptOpen] = useState(false);

  useEffect(() => {
    if (!modelParam) return;
    setSelectedPackageId(resolveQuotePackageId(modelParam, searchParams.get('config')));
  }, [modelParam, searchParams]);

  useEffect(() => {
    setQuoteSession({
      packageId: selectedPackageId,
      form,
    });
  }, [selectedPackageId, form]);

  const selectedPackage =
    quotePackages.find((item) => item.id === selectedPackageId) || quotePackages[0];

  const updateField = (name, value) => {
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
    setStatus('');
  };

  const validate = () => {
    const next = {};

    if (!selectedPackageId) next.package = 'Select a Powercell package.';
    if (!form.installationAddress.trim()) {
      next.installationAddress = 'Enter an installation address.';
    }
    if (!form.firstName.trim()) next.firstName = 'Enter your first name.';
    if (!form.lastName.trim()) next.lastName = 'Enter your last name.';
    if (!form.email.trim()) next.email = 'Enter your email address.';
    else if (!isValidEmail(form.email)) next.email = 'Enter a valid email address.';
    if (!form.confirmEmail.trim()) next.confirmEmail = 'Confirm your email address.';
    else if (form.confirmEmail.trim() !== form.email.trim()) {
      next.confirmEmail = 'Email addresses must match.';
    }
    if (!form.phone.trim()) next.phone = 'Enter your phone number.';
    if (!form.hasSolar) next.hasSolar = 'Select whether you currently have solar.';

    return next;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('');
      setReceipt(null);
      setReceiptOpen(false);
      return;
    }

    const quotationNumber =
      getQuoteSession()?.quotationNumber || createQuotationNumber();
    setQuoteSession({
      packageId: selectedPackageId,
      form: { ...form },
      committed: true,
      quotationNumber,
    });
    setStatus(requestQuoteCopy.successMessage);
    setReceipt({
      form: { ...form },
      packageItem: selectedPackage,
      quotationNumber,
    });
    setReceiptOpen(true);
  };

  const previewBlock = (
    <>
      <QuoteLifestyleMedia />
      <p className="request-quote__caption">
        After you submit, an{' '}
        <Link to={requestQuoteCopy.previewLinkHref}>
          {requestQuoteCopy.previewLinkLabel}
        </Link>{' '}
        based in your area will reach out with pricing information and next steps.
      </p>
    </>
  );

  return (
    <section className="request-quote" aria-labelledby="request-quote-title">
      <div className="request-quote__shell">
        <Reveal className="request-quote__hero">
          <p className="request-quote__eyebrow">{requestQuoteCopy.eyebrow}</p>
          <h1 id="request-quote-title" className="request-quote__title">
            {requestQuoteCopy.title}
          </h1>
          <p className="request-quote__description">{requestQuoteCopy.description}</p>
        </Reveal>

        <div className="request-quote__layout">
          <div className="request-quote__primary">
            <Reveal className="request-quote__options-wrap" y={20}>
              <fieldset className="request-quote__options" id="quote-configuration">
                <legend className="visually-hidden">Choose a Powercell package</legend>
                {quotePackages.map((item) => {
                  const selected = selectedPackageId === item.id;
                  return (
                    <label
                      key={item.id}
                      className={`request-quote__option${selected ? ' is-selected' : ''}`}
                    >
                      <input
                        className="request-quote__option-input"
                        type="radio"
                        name="quotePackage"
                        value={item.id}
                        checked={selected}
                        onChange={() => {
                          setSelectedPackageId(item.id);
                          setErrors((current) => {
                            if (!current.package) return current;
                            const next = { ...current };
                            delete next.package;
                            return next;
                          });
                        }}
                      />
                      <span className="request-quote__option-copy">
                        <span className="request-quote__option-title">{item.title}</span>
                        {item.description ? (
                          <span className="request-quote__option-note">{item.description}</span>
                        ) : null}
                      </span>
                      <span className="request-quote__option-price">{item.price}</span>
                    </label>
                  );
                })}
              </fieldset>
              {errors.package ? (
                <p className="request-quote__error" role="alert">
                  {errors.package}
                </p>
              ) : null}

              <p className="request-quote__disclaimer">
                {requestQuoteCopy.disclaimer}{' '}
                <Link to={requestQuoteCopy.disclaimerLinkHref}>
                  {requestQuoteCopy.disclaimerLinkLabel}
                </Link>
              </p>
            </Reveal>

            <Reveal className="request-quote__preview request-quote__preview--mobile" y={24} delay={0.32}>
              {previewBlock}
            </Reveal>

            <Reveal className="request-quote__form-wrap" y={24} delay={0.12}>
              <h2 className="request-quote__form-title">{requestQuoteCopy.formTitle}</h2>

              <form className="request-quote__form" onSubmit={handleSubmit} noValidate>
                <div className="request-quote__field">
                  <label htmlFor="rq-address">Installation Address</label>
                  <input
                    id="rq-address"
                    name="installationAddress"
                    type="text"
                    autoComplete="street-address"
                    placeholder="Enter a location"
                    value={form.installationAddress}
                    onChange={(event) => updateField('installationAddress', event.target.value)}
                  />
                  {errors.installationAddress ? (
                    <p className="request-quote__error" role="alert">
                      {errors.installationAddress}
                    </p>
                  ) : null}
                </div>

                <div className="request-quote__field">
                  <label htmlFor="rq-first-name">First Name</label>
                  <input
                    id="rq-first-name"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={(event) => updateField('firstName', event.target.value)}
                  />
                  {errors.firstName ? (
                    <p className="request-quote__error" role="alert">
                      {errors.firstName}
                    </p>
                  ) : null}
                </div>

                <div className="request-quote__field">
                  <label htmlFor="rq-last-name">Last Name</label>
                  <input
                    id="rq-last-name"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    value={form.lastName}
                    onChange={(event) => updateField('lastName', event.target.value)}
                  />
                  {errors.lastName ? (
                    <p className="request-quote__error" role="alert">
                      {errors.lastName}
                    </p>
                  ) : null}
                </div>

                <div className="request-quote__field">
                  <label htmlFor="rq-email">Email Address</label>
                  <input
                    id="rq-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={(event) => updateField('email', event.target.value)}
                  />
                  {errors.email ? (
                    <p className="request-quote__error" role="alert">
                      {errors.email}
                    </p>
                  ) : null}
                </div>

                <div className="request-quote__field">
                  <label htmlFor="rq-confirm-email">Confirm Email Address</label>
                  <input
                    id="rq-confirm-email"
                    name="confirmEmail"
                    type="email"
                    autoComplete="email"
                    value={form.confirmEmail}
                    onChange={(event) => updateField('confirmEmail', event.target.value)}
                  />
                  {errors.confirmEmail ? (
                    <p className="request-quote__error" role="alert">
                      {errors.confirmEmail}
                    </p>
                  ) : null}
                </div>

                <div className="request-quote__field">
                  <label htmlFor="rq-phone">Phone Number</label>
                  <div className="request-quote__phone">
                    <span className="request-quote__phone-code" aria-hidden="true">
                      NG +234
                    </span>
                    <input
                      id="rq-phone"
                      name="phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel-national"
                      placeholder="7400 123456"
                      value={form.phone}
                      onChange={(event) => updateField('phone', event.target.value)}
                    />
                  </div>
                  {errors.phone ? (
                    <p className="request-quote__error" role="alert">
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <fieldset className="request-quote__solar">
                  <legend>Do You Currently Have Solar?</legend>
                  <div className="request-quote__solar-options" role="presentation">
                    {['No', 'Yes'].map((option) => {
                      const value = option.toLowerCase();
                      const selected = form.hasSolar === value;
                      return (
                        <label
                          key={option}
                          className={`request-quote__solar-option${selected ? ' is-selected' : ''}`}
                        >
                          <input
                            type="radio"
                            name="hasSolar"
                            value={value}
                            checked={selected}
                            onChange={() => updateField('hasSolar', value)}
                          />
                          <span>{option}</span>
                        </label>
                      );
                    })}
                  </div>
                  {errors.hasSolar ? (
                    <p className="request-quote__error" role="alert">
                      {errors.hasSolar}
                    </p>
                  ) : null}
                </fieldset>

                <p className="request-quote__installer-note">{requestQuoteCopy.installerNote}</p>

                <label className="request-quote__checkbox">
                  <input
                    type="checkbox"
                    checked={form.receiveUpdates}
                    onChange={(event) => updateField('receiveUpdates', event.target.checked)}
                  />
                  <span>{requestQuoteCopy.updatesLabel}</span>
                </label>
                <Link className="request-quote__updates-link" to={requestQuoteCopy.updatesLinkHref}>
                  {requestQuoteCopy.updatesLinkLabel}
                </Link>

                <p className="request-quote__legal">{requestQuoteCopy.legal}</p>

                <Button type="submit" variant="brand" className="request-quote__submit">
                  {requestQuoteCopy.submitLabel}
                </Button>

                {status ? (
                  <p className="request-quote__status" role="status">
                    {status}
                  </p>
                ) : null}

                {receipt ? (
                  <button
                    type="button"
                    className="request-quote__view-quote"
                    onClick={() => setReceiptOpen(true)}
                  >
                    View quotation
                  </button>
                ) : null}
              </form>
            </Reveal>
          </div>

          <Reveal className="request-quote__preview request-quote__preview--desktop" y={28} delay={0.32}>
            {previewBlock}
          </Reveal>
        </div>
      </div>

      <QuoteReceiptModal
        receipt={receipt}
        open={receiptOpen}
        onClose={() => setReceiptOpen(false)}
      />
    </section>
  );
}
