import { ArrowLeft, Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { buildWhatsAppUrl, formatLek } from '../../cart'

function CartNavLink({ to, navigate, appUrl, className = '', children }) {
  return (
    <a
      href={appUrl(to)}
      className={className}
      onClick={(event) => {
        event.preventDefault()
        navigate(to)
      }}
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
  const whatsAppUrl = hasItems ? buildWhatsAppUrl(cartItems) : ''

  return (
    <section className="cart-page">
      <div className="cart-page-header">
        <div>
          <span className="kicker">{copy.common.cart}</span>
          <h1>{isAl ? 'Shporta juaj' : 'Your cart'}</h1>
          <p>
            {isAl
              ? 'Rishikoni produktet dhe dergoni listen tek CCS ne WhatsApp.'
              : 'Review products and send the complete list to CCS on WhatsApp.'}
          </p>
        </div>
        <CartNavLink to="/shop/" navigate={navigate} appUrl={appUrl} className="secondary-action">
          <ArrowLeft size={17} />
          {copy.common.viewShop}
        </CartNavLink>
      </div>

      {!hasItems ? (
        <div className="cart-empty account-panel">
          <ShoppingCart size={36} />
          <h2>{isAl ? 'Shporta eshte bosh' : 'Your cart is empty'}</h2>
          <p>{isAl ? 'Shtoni produkte nga dyqani per te krijuar kerkesen.' : 'Add products from the shop to build your inquiry.'}</p>
          <button type="button" className="primary-action" disabled>
            {isAl ? 'Kontakto ne WhatsApp' : 'Contact on WhatsApp'}
          </button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" aria-label={copy.common.cart}>
            {cartItems.map((item) => (
              <article className="cart-item" key={item.key}>
                <CartNavLink to={`/product/${item.product.slug}/`} navigate={navigate} appUrl={appUrl} className="cart-item-image">
                  <img src={item.image} alt={item.baseName} />
                </CartNavLink>

                <div className="cart-item-main">
                  <CartNavLink to={`/product/${item.product.slug}/`} navigate={navigate} appUrl={appUrl}>
                    <h2>{item.baseName}</h2>
                  </CartNavLink>
                  <div className="cart-item-meta">
                    <span>{item.brand}</span>
                    {item.sku && <span>SKU / P/N: {item.sku}</span>}
                    {item.configuration && <span>{isAl ? 'Konfigurimi' : 'Configuration'}: {item.configuration}</span>}
                  </div>
                  <div className="cart-item-price">
                    <span>{isAl ? 'Cmimi' : 'Unit price'}</span>
                    <strong>{item.unitPriceLabel}</strong>
                    {item.linePrice !== null && <small>{isAl ? 'Linja' : 'Line'}: {formatLek(item.linePrice)}</small>}
                  </div>
                </div>

                <div className="cart-quantity" aria-label={`${item.baseName} quantity`}>
                  <button type="button" onClick={() => decreaseCartLine(item.key)} aria-label={`Decrease ${item.baseName}`}>
                    <Minus size={15} />
                  </button>
                  <strong>{item.quantity}</strong>
                  <button type="button" onClick={() => increaseCartLine(item.key)} aria-label={`Increase ${item.baseName}`}>
                    <Plus size={15} />
                  </button>
                </div>

                <button type="button" className="cart-remove" onClick={() => removeCartLine(item.key)}>
                  <Trash2 size={16} />
                  {isAl ? 'Hiq' : 'Remove'}
                </button>
              </article>
            ))}
          </div>

          <aside className="cart-summary">
            <div>
              <span>{isAl ? 'Produkte' : 'Items'}</span>
              <strong>{cartCount}</strong>
            </div>
            <div>
              <span>{isAl ? 'Totali' : 'Total'}</span>
              <strong>{canShowTotal ? formatLek(total) : isAl ? 'Me oferte' : 'Quote required'}</strong>
            </div>
            <a href={whatsAppUrl} className="primary-action" target="_blank" rel="noopener noreferrer">
              {isAl ? 'Kontakto ne WhatsApp' : 'Contact on WhatsApp'}
            </a>
            <button type="button" onClick={clearCart}>
              {isAl ? 'Pastro shporten' : 'Clear cart'}
            </button>
          </aside>
        </div>
      )}
    </section>
  )
}
