import { useEffect, useMemo, useState } from 'react'

export const CART_STORAGE_KEY = 'ccs-cart'
const WHATSAPP_NUMBER = '355684088507'

function toPositiveInteger(value) {
  const quantity = Number(value)
  return Number.isFinite(quantity) && quantity > 0 ? Math.floor(quantity) : 0
}

function readStoredCart() {
  if (typeof window === 'undefined') return []

  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_STORAGE_KEY) || '[]')
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

function normalizeCartEntry(entry) {
  if (typeof entry === 'number' || typeof entry === 'string') {
    return { productId: Number(entry), variantId: null, quantity: 1 }
  }

  const productId = Number(entry?.productId)
  const variantId = entry?.variantId == null ? null : Number(entry.variantId)
  const quantity = toPositiveInteger(entry?.quantity)

  if (!Number.isFinite(productId) || quantity < 1) return null
  if (variantId !== null && !Number.isFinite(variantId)) return null

  return { productId, variantId, quantity }
}

function cartLineKey(productId, variantId = null) {
  return `${productId}:${variantId || 'base'}`
}

function findCartProduct(products, entry) {
  const product = products.find((item) => item.id === entry.productId)
  if (!product) return null

  if (entry.variantId) {
    const variant = product.variants?.find((item) => item.id === entry.variantId)
    return variant ? { product, variant } : null
  }

  return { product, variant: null }
}

function validateCartEntries(entries, products) {
  const merged = new Map()

  entries
    .map(normalizeCartEntry)
    .filter(Boolean)
    .forEach((entry) => {
      if (!findCartProduct(products, entry)) return

      const key = cartLineKey(entry.productId, entry.variantId)
      const current = merged.get(key)
      merged.set(key, {
        ...entry,
        quantity: (current?.quantity || 0) + entry.quantity,
      })
    })

  return [...merged.values()]
}

export function formatLek(value) {
  return `${new Intl.NumberFormat('sq-AL', { maximumFractionDigits: 0 }).format(value)} LEK`
}

function extractSku(product) {
  const lines = [...(product.specs || []), ...(product.description || [])]

  for (const line of lines) {
    const match = String(line).match(/P\/N:\s*([^;,]+)/i)
    if (match?.[1]) return match[1].replace(/\s+/g, ' ').trim()
  }

  return ''
}

function configurationLabel(variant) {
  if (!variant) return ''
  return String(variant.attributeValue || variant.name || '').replace(/^["']|["']$/g, '').trim()
}

function resolveCartLines(entries, products) {
  return entries
    .map((entry) => {
      const match = findCartProduct(products, entry)
      if (!match) return null

      const { product, variant } = match
      const unitPrice = variant?.price ?? product.price
      const unitPriceLabel = variant?.priceLabel || product.priceLabel || (product.kind === 'software' ? 'Inquiry' : 'Quote')
      const hasNumericPrice = Number.isFinite(unitPrice) && unitPrice > 0

      return {
        key: cartLineKey(entry.productId, entry.variantId),
        product,
        variant,
        name: variant?.name || product.name,
        baseName: product.name,
        brand: product.brand || product.brands?.[0]?.name || 'CCS',
        image: variant?.image || product.image,
        sku: extractSku(product),
        configuration: configurationLabel(variant),
        quantity: entry.quantity,
        unitPrice: hasNumericPrice ? unitPrice : null,
        unitPriceLabel,
        linePrice: hasNumericPrice ? unitPrice * entry.quantity : null,
      }
    })
    .filter(Boolean)
}

function buildWhatsAppMessage(lines) {
  const productLines = lines
    .map((line, index) => {
      const details = [
        `${index + 1}. ${line.baseName}`,
        line.sku ? `   SKU / P/N: ${line.sku}` : '',
        line.configuration ? `   Configuration: ${line.configuration}` : '',
        `   Quantity: ${line.quantity}`,
        line.unitPrice ? `   Price: ${line.unitPriceLabel} each` : `   Price: ${line.unitPriceLabel}`,
        line.linePrice ? `   Line total: ${formatLek(line.linePrice)}` : '',
      ]
        .filter(Boolean)
        .join('\n')

      return details
    })
    .join('\n\n')

  return `Hello CCS,

I am interested in the following products:

${productLines}

Please contact me regarding availability and ordering.

Thank you.`
}

export function buildWhatsAppUrl(lines) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(lines))}`
}

export function useCart(products) {
  const [cart, setCart] = useState(readStoredCart)

  useEffect(() => {
    setCart((current) => validateCartEntries(current, products))
  }, [products])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart])

  const addToCart = (product, variant = null) => {
    if (!product) return

    const entry = {
      productId: product.id,
      variantId: variant?.id || null,
      quantity: 1,
    }

    setCart((current) => {
      const validEntries = validateCartEntries(current, products)
      const key = cartLineKey(entry.productId, entry.variantId)
      const existing = validEntries.find((item) => cartLineKey(item.productId, item.variantId) === key)

      if (existing) {
        return validEntries.map((item) =>
          cartLineKey(item.productId, item.variantId) === key
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        )
      }

      return [...validEntries, entry]
    })
  }

  const updateQuantity = (lineKey, change) => {
    setCart((current) =>
      validateCartEntries(current, products)
        .map((entry) =>
          cartLineKey(entry.productId, entry.variantId) === lineKey
            ? { ...entry, quantity: entry.quantity + change }
            : entry,
        )
        .filter((entry) => entry.quantity > 0),
    )
  }

  const removeCartLine = (lineKey) => {
    setCart((current) =>
      validateCartEntries(current, products).filter((entry) => cartLineKey(entry.productId, entry.variantId) !== lineKey),
    )
  }

  const clearCart = () => setCart([])

  const cartItems = useMemo(() => resolveCartLines(validateCartEntries(cart, products), products), [cart, products])
  const cartCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems])

  return {
    cartItems,
    cartCount,
    addToCart,
    increaseCartLine: (lineKey) => updateQuantity(lineKey, 1),
    decreaseCartLine: (lineKey) => updateQuantity(lineKey, -1),
    removeCartLine,
    clearCart,
  }
}
