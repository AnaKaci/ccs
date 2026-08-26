# CCS Shop Customization

This source package applies the CCS brandbook to the commerce experience while retaining the existing non-shop Terminal Elegance redesign.

## Commerce design

- Modern Professional Tech dark storefront.
- CCS primary palette: #231F20, #EF4136, #FFFFFF.
- CCS secondary accents: #B41E8E, #1C9AD6, #EFAC1F.
- Gotham is the intended type family throughout the shop. The source references Gotham but does not redistribute font files.
- 80px translucent navigation, 600px image hero, 3-column desktop product grid, 16px product cards, 8px controls, subtle CCS-red glow, and cubic-bezier(0.4, 0, 0.2, 1) transitions.
- Variable products open their configuration selector instead of adding an unresolved parent product directly to cart.

## WooCommerce CSV import

Source: `data/wc-product-export-25-8-2026-1787651307366.csv`

- 119 CSV rows processed.
- 101 simple products.
- 6 variable parent products.
- 12 variation records nested into their parent products.
- 107 storefront catalog entries total, with 12 selectable configurations attached to the six variable products.
- 18 brand filters generated from the export.
- Existing CSV descriptions, image URLs, brands, categories, prices, and attributes are preserved in `src/data/catalog.js`.

## IT solution imagery

The IT solutions imagery was replaced with new technology-focused imagery. The current implementation references externally hosted Pexels images rather than bundling or redistributing those photographs.

## Validation

`src/App.jsx` was syntax-checked with the TypeScript JSX transpiler. The generated catalog was programmatically checked against the supplied CSV row/type counts.

A full Vite production build was not run in the sandbox because the available dependency tree does not contain the Linux Rolldown native binding. On a normal development machine, run:

```bash
npm install
npm run dev
```

For a production build:

```bash
npm run build
```
