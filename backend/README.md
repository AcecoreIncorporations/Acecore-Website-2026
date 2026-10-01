# Acecore Backend API

A lightweight, zero-dependency Node.js REST API service for dynamic product pricing, health monitoring, and system configuration.

## Features

- **Zero External Dependencies**: Implemented natively with `node:http`, `node:tls`, and `node:net`, guaranteeing instant startup, zero vulnerability exposure, and offline execution without downloading external npm packages.
- **Dynamic Pricing Service**: Serves live pricing plans, configurations, and specs stored in `data/pricing.json`.
- **Contact Us Email SMTP Service**: Native RFC 5321/5322 socket transport + optional nodemailer fallback. Includes safe [SMTP Preview Mode] when credentials are not yet configured.
- **CORS & Proxy Ready**: Built-in CORS headers for cross-origin access and seamlessly proxied via Vite at `/api/*`.
- **Offline / Fallback Resilience**: Designed to work in concert with the frontend fallback so the client never crashes if the backend is restarting.

## Getting Started

### 1. Environment Configuration (Optional)
To send real live emails, create `.env` from the template:
```bash
cp .env.example .env
```
Edit `.env` with your SMTP provider details:
```env
PORT=5001
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_char_app_password
CONTACT_TO_EMAIL=support@acecore.tech
CONTACT_FROM_EMAIL=support@acecore.tech
```
> **Note**: If `.env` is omitted or SMTP credentials are left blank, the backend operates in **SMTP Preview Mode**, safely logging inquiries to the terminal for debugging without failing requests.

### 2. Start the Server
```bash
cd backend
npm start
# Server starts at http://localhost:5001 (port 5001 is used by default to avoid macOS AirPlay on port 5000)
```

### 3. Run Tests
```bash
cd backend
npm test               # Runs both pricing and contact test suites
npm run test:pricing   # Runs pricing tests only
npm run test:contact   # Runs contact tests only
```

## API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` / `/api/health` | Health check and uptime status |
| `GET` | `/api/pricing` | Retrieve all dynamic pricing plans and copy |
| `GET` | `/api/pricing/:id` | Retrieve single plan by ID (`prime`, `prime-plus`, `ultra`) |
| `PUT` | `/api/pricing` | Update entire pricing data payload |
| `PUT` | `/api/pricing/:id` | Update price and configuration for a specific plan |
| `POST` | `/api/pricing/reset` | Restore default factory pricing data |
| `POST` | `/api/contact` | Submit contact inquiry & dispatch via SMTP email |

### Contact Form Payload
```json
{
  "fullName": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+234 801 234 5678",
  "message": "Inquiry regarding Powercell Prime installation."
}
```

## Architecture

```
backend/
├── .env.example             # Template for SMTP & server variables
├── data/
│   └── pricing.json         # Persisted dynamic pricing data store
├── src/
│   ├── controllers/
│   │   ├── contactController.js  # Validation, sanitization & email dispatch
│   │   └── pricingController.js  # Dynamic pricing logic & persistence
│   ├── services/
│   │   └── emailService.js       # Native TLS/socket SMTP + preview mode
│   └── server.js            # HTTP server, routing, CORS & error handling
├── tests/
│   ├── contact.test.js      # Automated tests for contact endpoint & SMTP
│   └── pricing.test.js      # Automated tests for pricing endpoints
└── package.json
```

