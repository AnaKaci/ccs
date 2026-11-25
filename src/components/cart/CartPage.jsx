import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Laptop,
  Mail,
  Minus,
  Monitor,
  Phone,
  Plus,
  Printer,
  ShoppingCart,
  Trash2,
} from 'lucide-react'
import { buildEmailUrl, buildWhatsAppUrl, formatLek } from '../../cart'

function CartNavLink({ to, navigate, appUrl, className = '', children, ...props }) {
  return (
    <a
      href={appUrl(to)}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        navigate(to)
      }}
      {...props}
    >
      {children}
    </a>
  )
}

export function CartPage({
  copy,
  lang,
  navigate,
  appUrl,
  cartItems,
  cartCount,
  increaseCartLine,
  decreaseCartLine,
  removeCartLine,
  clearCart,
}) {
  const isAl = lang === 'al'
  const hasItems = cartItems.length > 0
  const canShowTotal = hasItems && cartItems.every((item) => item.linePrice !== null)
  const total = cartItems.reduce((sum, item) => sum + (item.linePrice || 0), 0)
  const quoteItems = cartItems.filter((item) => item.linePrice === null).length
  const whatsAppUrl = hasItems ? buildWhatsAppUrl(cartItems) : ''
  const emailUrl = hasItems ? buildEmailUrl(cartItems) : ''

  const steps = isAl
    ? ['Rishikoni produktet', 'Dergoni listen ne WhatsApp ose email', 'C.C.S ju kontakton per disponueshmerine']
    : ['Review your products', 'Send the list on WhatsApp or email', 'C.C.S contacts you about availability']

  const shortcuts = [
    [Laptop, copy.shop.laptop, '/product-category/laptop/'],
    [Monitor, copy.shop.monitor, '/product-category/monitor/'],
    [Printer, copy.shop.printer, '/product-category/printer/'],
    [AppWindow, copy.shop.software, '/product-category/software/'],
  ]

  return (
    <div className="hp ct">
      <div className="sol-wrap">
        <nav className="pd-crumbs" aria-label={isAl ? 'Gjurma' : 'Breadcrumb'}>
          <CartNavLink to="/" navigate={navigate} appUrl={appUrl}>
            {copy.nav.home}
          </CartNavLink>
          <span aria-hidden="true">/</span>
          <CartNavLink to="/shop/" navigate={navigate} appUrl={appUrl}>
            {isAl ? 'Dyqani' : 'Shop'}
          </CartNavLink>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{copy.common.cart}</span>
        </nav>

        <header className="ct-head">
          <div>
            <h1>
              {isAl ? 'Shporta juaj' : 'Your cart'}
              {hasItems && <span className="ct-count">{cartCount}</span>}
            </h1>
            <p>
              {isAl
                ? 'Rishikoni produktet dhe dergoni listen e plote tek C.C.S.'
                : 'Review your products and send the complete list to the C.C.S team.'}
            </p>
          </div>
          <CartNavLink to="/shop/" navigate={navigate} appUrl={appUrl} className="hp-link">
            <ArrowLeft size={15} aria-hidden="true" />
            {isAl ? 'Vazhdo blerjet' : 'Continue shopping'}
          </CartNavLink>
        </header>

        <ol className="ct-steps">
          {steps.map((step, index) => (
            <li key={step} className={index === 0 && hasItems ? 'is-current' : ''}>
              <span>{index + 1}</span>
              {step}
            </li>
          ))}
        </ol>

        {!hasItems ? (
          <div className="ct-empty">
            <span className="ct-empty__icon" aria-hidden="true">
              <ShoppingCart size={30} />
            </span>
            <h2>{isAl ? 'Shporta eshte bosh' : 'Your cart is empty'}</h2>
            <p>
              {isAl
                ? 'Shtoni produkte nga dyqani per te krijuar kerkesen tuaj.'
                : 'Add products from the shop to build your inquiry.'}
            </p>
            <CartNavLink to="/shop/" navigate={navigate} appUrl={appUrl} className="hp-btn hp-btn--primary ct-pill">
              {isAl ? 'Shfleto dyqanin' : 'Browse the shop'}
              <ArrowRight size={17} aria-hidden="true" />
            </CartNavLink>
            <div className="ct-empty__shortcuts">
              {shortcuts.map(([Icon, label, to]) => (
                <CartNavLink to={to} navigate={navigate} appUrl={appUrl} key={to}>
                  <Icon size={16} aria-hidden="true" />
                  {label}
                </CartNavLink>
              ))}
            </div>
          </div>
        ) : (
          <div className="ct-layout">
            <section className="ct-items" aria-label={copy.common.cart}>
              <div className="ct-items__head" aria-hidden="true">
                <span>{isAl ? 'Produkti' : 'Product'}</span>
                <span>{isAl ? 'Sasia' : 'Quantity'}</span>
                <span>{isAl ? 'Totali' : 'Total'}</span>
              </div>
              {cartItems.map((item) => (
                <article className="ct-item" key={item.key}>
                  <CartNavLink
                    to={`/product/${item.product.slug}/`}
                    navigate={navigate}
                    appUrl={appUrl}
                    className="ct-item__image"
                  >
                    <img src={item.image} alt={item.baseName} />
                  </CartNavLink>

                  <div className="ct-item__info">
                    {item.brand && <span className="ct-item__brand">{item.brand}</span>}
                    <CartNavLink
                      to={`/product/${item.product.slug}/`}
                      navigate={navigate}
                      appUrl={appUrl}
                      className="ct-item__name"
                    >
                      {item.baseName}
                    </CartNavLink>
                    <div className="ct-item__meta">
                      {item.configuration && <span>{item.configuration}</span>}
                      {item.sku && <span>P/N {item.sku}</span>}
                    </div>
                    <span className="ct-item__unit">
                      {item.unitPriceLabel}
                      {item.linePrice !== null && <small> {isAl ? 'cope' : 'each'}</small>}
                    </span>
                  </div>

                  <div className="ct-qty" role="group" aria-label={`${item.baseName} ${isAl ? 'sasia' : 'quantity'}`}>
                    <button
                      type="button"
                      onClick={() => decreaseCartLine(item.key)}
                      aria-label={`${isAl ? 'Ul' : 'Decrease'} ${item.baseName}`}
                    >
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <strong aria-live="polite">{item.quantity}</strong>
                    <button
                      type="button"
                      onClick={() => increaseCartLine(item.key)}
                      aria-label={`${isAl ? 'Rrit' : 'Increase'} ${item.baseName}`}
                    >
                      <Plus size={15} aria-hidden="true" />
                    </button>
                  </div>

                  <strong className="ct-item__total">
                    {item.linePrice !== null ? formatLek(item.linePrice) : isAl ? 'Me oferte' : 'Quote'}
                  </strong>

                  <button
                    type="button"
                    className="ct-item__remove"
                    onClick={() => removeCartLine(item.key)}
                    aria-label={`${isAl ? 'Hiq' : 'Remove'} ${item.baseName}`}
                    title={isAl ? 'Hiq' : 'Remove'}
                  >
                    <Trash2 size={17} aria-hidden="true" />
                  </button>
                </article>
              ))}
              <div className="ct-items__foot">
                <button type="button" className="ct-clear" onClick={clearCart}>
                  <Trash2 size={15} aria-hidden="true" />
                  {isAl ? 'Pastro shporten' : 'Clear cart'}
                </button>
              </div>
            </section>

            <aside className="ct-summary">
              <h2>{isAl ? 'Permbledhja' : 'Order summary'}</h2>
              <dl>
                <div>
                  <dt>{isAl ? 'Produkte' : 'Items'}</dt>
                  <dd>{cartCount}</dd>
                </div>
                {quoteItems > 0 && (
                  <div>
                    <dt>{isAl ? 'Me oferte' : 'Priced on request'}</dt>
                    <dd>{quoteItems}</dd>
                  </div>
                )}
                <div className="ct-summary__total">
                  <dt>{canShowTotal ? (isAl ? 'Totali' : 'Total') : isAl ? 'Nentotali' : 'Subtotal'}</dt>
                  <dd>{canShowTotal ? formatLek(total) : total > 0 ? `${formatLek(total)} +` : isAl ? 'Me oferte' : 'Quote required'}</dd>
                </div>
              </dl>
              <p className="ct-summary__note">
                {isAl
                  ? 'Dergoni listen dhe ekipi i C.C.S do t’ju kontaktoje per disponueshmerine dhe porosine.'
                  : 'Send the list and the C.C.S team will contact you about availability and ordering.'}
              </p>
              <a href={whatsAppUrl} className="hp-btn hp-btn--primary ct-pill ct-summary__cta" target="_blank" rel="noopener noreferrer">
                <Phone size={18} aria-hidden="true" />
                {isAl ? 'Dergo ne WhatsApp' : 'Send on WhatsApp'}
              </a>
              <a href={emailUrl} className="hp-btn ct-pill ct-summary__alt">
                <Mail size={18} aria-hidden="true" />
                {isAl ? 'Dergo me email' : 'Email the list'}
              </a>
            </aside>
          </div>
        )}
      </div>
    </div>
  )
}
