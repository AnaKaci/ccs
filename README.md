# C.C.S React Website

React/Vite recreation of the CCS website and shop experience, with client-side routes,
dark mode, Albanian/English toggle, mobile navigation, product search, filtering, and
GitHub Pages deployment support.

## Local Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## GitHub Pages

The project includes `.github/workflows/deploy.yml`. Push to the `main` branch, then
enable GitHub Pages with **Source: GitHub Actions** in the repository settings.

The Vite build uses relative asset paths and `public/404.html` redirects direct route
visits back into the React app, so sublinks such as `/network-security/` and `/shop/`
work on GitHub Pages.
