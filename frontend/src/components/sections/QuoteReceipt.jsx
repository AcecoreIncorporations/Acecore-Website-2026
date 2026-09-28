import logoWhite from '../../assets/logos/acecore-white.svg';
import { quoteReceiptMeta } from '../../data/requestQuote';

function formatOrdinalDate(date = new Date()) {
  const day = date.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  const month = date.toLocaleString('en-GB', { month: 'long' });
  return `${day}${suffix} ${month} ${date.getFullYear()}`;
}

function parseDisplayPrice(price) {
  if (!price || /free/i.test(price)) return 0;
  const numeric = Number(String(price).replace(/[^\d.]/g, ''));
  return Number.isFinite(numeric) ? numeric : 0;
}

function formatCurrency(amount) {
  return `£${amount.toLocaleString('en-GB')}*`;
}

export default function QuoteReceipt({ form, packageItem, quotationNumber }) {
  const customerName = `${form.firstName} ${form.lastName}`.trim().toUpperCase();
  const location = form.installationAddress.trim().toUpperCase();
  const dateLabel = formatOrdinalDate();

  const productRow = {
    item: packageItem.title,
    description:
      packageItem.description ||
      (form.hasSolar === 'yes'
        ? 'Includes solar configuration as selected'
        : 'Powercell package as selected'),
    price: packageItem.price,
    qty: '1',
    total: packageItem.price,
  };

  const rows = [productRow, ...quoteReceiptMeta.addOns];
  const totalAmount =
    parseDisplayPrice(packageItem.price) +
    quoteReceiptMeta.addOns.reduce(
      (sum, row) => sum + parseDisplayPrice(row.total),
      0,
    );

  return (
    <article className="quote-receipt" aria-label={`Quotation ${quotationNumber}`}>
      <header className="quote-receipt__banner">
        <div className="quote-receipt__brand">
          <img src={logoWhite} alt="Acecore" className="quote-receipt__logo" />
        </div>
        <div className="quote-receipt__address">
          <p>
            {quoteReceiptMeta.companyName}, {quoteReceiptMeta.companyAddress}
          </p>
        </div>
      </header>

      <p className="quote-receipt__rc">{quoteReceiptMeta.rcNumber}</p>

      <div className="quote-receipt__meta">
        <div className="quote-receipt__customer">
          <p>
            <span>FOR:</span> <strong>{customerName || '—'}</strong>
          </p>
          <p>
            <span>LOCATION:</span> <strong>{location || '—'}</strong>
          </p>
        </div>
        <div className="quote-receipt__quote-id">
          <h3>
            QUOTATION <span>#{quotationNumber}</span>
          </h3>
          <p>
            <span>Date:</span> {dateLabel}
          </p>
        </div>
      </div>

      <div className="quote-receipt__table-wrap">
        <table className="quote-receipt__table">
          <thead>
            <tr>
              <th scope="col">ITEM</th>
              <th scope="col">ITEM DESCRIPTION</th>
              <th scope="col">PRICE</th>
              <th scope="col">QTY.</th>
              <th scope="col">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.item}-${row.total}`}>
                <td data-label="Item">{row.item}</td>
                <td data-label="Description">{row.description}</td>
                <td data-label="Price">{row.price}</td>
                <td data-label="Qty">{row.qty}</td>
                <td data-label="Total">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="quote-receipt__discount">{quoteReceiptMeta.discountNote}</p>

      <div className="quote-receipt__payment-row">
        <div className="quote-receipt__payment">
          <p className="quote-receipt__thanks">{quoteReceiptMeta.thankYou}</p>
          <h4>{quoteReceiptMeta.paymentTitle}</h4>
          <p>Bank: {quoteReceiptMeta.bank}</p>
          <p>Account No.: {quoteReceiptMeta.accountNumber}</p>
          <p>Account Name: {quoteReceiptMeta.accountName}</p>
          <p className="quote-receipt__contact-line">
            {form.email} · +234 {form.phone}
          </p>
        </div>
        <p className="quote-receipt__total">TOTAL: {formatCurrency(totalAmount)}</p>
      </div>

      <div className="quote-receipt__notes">
        <p className="quote-receipt__notes-title">{quoteReceiptMeta.notesTitle}</p>
        <ul>
          {quoteReceiptMeta.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      </div>

      <footer className="quote-receipt__footer">
        {quoteReceiptMeta.companyName} | {quoteReceiptMeta.website} |{' '}
        {quoteReceiptMeta.phone}
      </footer>
    </article>
  );
}
