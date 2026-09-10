# Lunelle Women's T-Shirts

GitHub Pages-ready React + Vite storefront.

## GitHub Pages

This project is configured for:

`https://zarifhasan214-sys.github.io/lunelle-womens-tshirts/`

The Vite `base` is already set to `/lunelle-womens-tshirts/`.

A GitHub Actions workflow is included at `.github/workflows/deploy-pages.yml`.
In the repository, go to **Settings → Pages** and set **Source** to **GitHub Actions**.
Then push to the `main` branch. The workflow builds `dist` and deploys it to GitHub Pages.

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
```
