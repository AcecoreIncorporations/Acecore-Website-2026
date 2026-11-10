# Acecore Incorporations Website

Official public website for Acecore — renewable clean energy generation and battery storage technology.

---

## Architecture Overview

- **Frontend**: High-performance React 19 application built with Vite and Framer Motion. Compiles into 100% static HTML, CSS, and client-side JavaScript (`frontend/dist/`).
- **cPanel Production Backend (Native PHP)**: Zero-dependency PHP API located in `api/` (`contact.php`, `pricing.php`, `pricing.json`) configured with `.htaccess` for Apache URL rewriting and SPA fallback. Runs natively on 100% of cPanel and XAMPP setups.
- **Node.js Local Dev Backend**: Optional Node.js REST API server in `backend/` for local standalone API development.

### Rendering and SEO behavior

The frontend is a client-rendered React SPA; the production build does not prerender route content. Vite generates `robots.txt` and `sitemap.xml` from the canonical, indexable entries in `frontend/src/data/seoData.js`. Route-specific titles, descriptions, canonical URLs, social metadata, and robots directives are applied by the React app after it loads. Consequently, those per-route values and page content are not present in the initial HTML response. If dependable server-rendered or prerendered route HTML is required, adopt a prerendering solution as a separately scoped rendering change.

The Apache deployment rules provide permanent redirects for legacy aliases, a genuine HTTP 404 for unknown paths, and an `X-Robots-Tag: noindex` header for transaction routes. This behavior applies to the cPanel/Apache package only; configure equivalent redirects, indexing controls, and status handling separately if the site is hosted elsewhere.

---

## Quick Start (Local Development)

### 1. Frontend
```bash
cd frontend
npm install
npm run dev
# Vite runs at http://localhost:5173
```

### 2. Backend (Node.js Local Server)
```bash
cd backend
npm start
# Server starts at http://localhost:5001 (proxied automatically via Vite /api)
```

### 3. Run Automated Tests
```bash
# Node backend tests:
cd backend && npm test

# cPanel PHP API tests:
php backend/tests/php_api.test.php
```

---

## How to Deploy to cPanel (One-Click Package)

Because React compiles to static HTML/CSS/JavaScript and the API is implemented in native PHP, **you do NOT need Node.js installed on your cPanel server**.

### Step 1: Generate the Deployment Package
Run the packaging script from the project root:
```bash
./scripts/package-cpanel.sh
```
This generates `cpanel-deploy.zip` in your project root containing:
- Compiled static React application (`index.html`, `assets/`, `favicon/`, `sitemap.xml`, `robots.txt`)
- Apache `.htaccess` (with SPA route rewrites and `/api/*` handlers)
- Native PHP API (`api/contact.php`, `api/pricing.php`, `api/pricing.json`, `api/config.php`)

### Step 2: Upload to cPanel
1. Log in to your **cPanel** dashboard.
2. Open **File Manager** and enter your website's root folder (`public_html` or your subdomain folder).
3. Click **Upload** and upload `cpanel-deploy.zip`.
4. Right-click `cpanel-deploy.zip` in File Manager and choose **Extract**.
5. Your website and dynamic PHP endpoints are now live!

### Step 3: Configure SMTP Email on cPanel (Optional)
To send live contact form emails through your own mail server:
1. Open `public_html/api/config.php` in the cPanel File Manager code editor.
2. Fill in your SMTP details:
   ```php
   define('SMTP_HOST', 'mail.yourdomain.com'); // or smtp.gmail.com
   define('SMTP_PORT', 587);
   define('SMTP_USER', 'support@yourdomain.com');
   define('SMTP_PASS', 'your_password_here');
   define('CONTACT_TO_EMAIL', 'support@acecore.tech');
   ```
3. Save the file. If left blank, the API runs in **Preview Mode** or falls back to server-level PHP `mail()`.

---

## Repository Structure

```text
Acecore-Website-2026/
├── frontend/               # React 19 source code & assets
│   ├── public/             # Static files copied to dist
│   │   ├── .htaccess       # Apache rewrite rules for cPanel & SPA routing
│   │   └── api/            # Native PHP API for cPanel
│   │       ├── config.php  # SMTP credentials configuration
│   │       ├── contact.php # Contact inquiry handler with SMTP socket
│   │       ├── pricing.php # Dynamic pricing handler
│   │       └── pricing.json# Dynamic pricing data
│   ├── src/                # React components, pages, hooks, services
│   └── dist/               # Static production build output
├── backend/                # Standalone Node.js REST API & test suites
│   ├── src/                # Node.js server, controllers, email services
│   └── tests/              # Automated pricing, contact, & PHP test suites
├── scripts/
│   └── package-cpanel.sh   # 1-click builder for cpanel-deploy.zip
└── cpanel-deploy.zip       # Ready-to-upload zip for cPanel public_html
```
