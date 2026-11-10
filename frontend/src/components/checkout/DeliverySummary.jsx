import { Link } from 'react-router-dom';
import { checkoutCopy } from '../../data/checkout';

export default function DeliverySummary({ view }) {
  return (
    <section className="checkout-delivery" aria-labelledby="checkout-delivery-title">
      <h3 id="checkout-delivery-title" className="checkout-subheading">
        {checkoutCopy.deliveryTitle}
      </h3>

      <div className="checkout-delivery__stack">
        <div className="checkout-block">
          <div className="checkout-block__copy">
            <p className="checkout-block__title">{view.customerName}</p>
            <p className="checkout-block__support">{view.phone}</p>
          </div>
          <Link className="checkout-link" to={view.editContactHref}>
            {checkoutCopy.editContact}
          </Link>
        </div>

        {view.deliveryState ? (
          <div className="checkout-block">
            <div className="checkout-block__copy">
              <p className="checkout-block__title">{view.deliveryState}</p>
            </div>
            <Link className="checkout-link" to={view.changeStateHref}>
              {checkoutCopy.changeDelivery}
            </Link>
          </div>
        ) : null}

        <div className="checkout-block">
          <div className="checkout-block__copy">
            <p className="checkout-block__title">{view.address}</p>
            <p className="checkout-block__support">{checkoutCopy.shippingPrefix}</p>
          </div>
          <Link className="checkout-link" to={view.changeDeliveryHref}>
            {checkoutCopy.changeDelivery}
          </Link>
        </div>
      </div>
    </section>
  );
}
