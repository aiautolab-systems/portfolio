# Protfloi Portfolio

Personal portfolio site for Alper Oktem built with React and Vite.

## Local Development
- `npm install` — install dependencies
- `npm run dev` — start the dev server on `http://localhost:5173`
- `npm run build` — produce the static site in `dist/`
- `npm run preview` — serve the production build locally

## Deployment (GitHub Pages)
- Every push to `main` triggers `.github/workflows/deploy.yml`
- The workflow builds the Vite app and uploads `dist/` to GitHub Pages
- First time only: go to GitHub `Settings → Pages` and set **Build and deployment → Source** to **GitHub Actions**
- The published site will be available at `https://<your-org>.github.io/portfolio/`

### Custom Domain
- Add a `CNAME` file to the published branch with your domain name
- Point your DNS provider’s `A` records to GitHub Pages’ IPs or use a `CNAME` record per [GitHub’s docs](https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site)
