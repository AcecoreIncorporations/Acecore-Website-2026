import http from 'node:http';
import { URL } from 'node:url';
import {
  getAllPricing,
  getPlanById,
  updatePricing,
  updatePlanPrice,
  resetPricing,
} from './controllers/pricingController.js';
import { handleContactSubmission } from './controllers/contactController.js';

const PORT = process.env.PORT || 5001;

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });
  res.end(JSON.stringify(data, null, 2));
}

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
      // Safeguard against oversized payloads (>1MB)
      if (body.length > 1e6) {
        req.destroy();
        reject(new Error('Payload Too Large'));
      }
    });
    req.on('end', () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error('Invalid JSON payload'));
      }
    });
    req.on('error', reject);
  });
}

export function createServer() {
  return http.createServer(async (req, res) => {
    // 1. CORS Preflight
    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400',
      });
      return res.end();
    }

    const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    console.log(`[${new Date().toISOString()}] ${method} ${pathname}`);

    try {
      // 2. Health Check
      if (pathname === '/health' || pathname === '/api/health') {
        return sendJson(res, 200, {
          status: 'healthy',
          uptime: process.uptime(),
          timestamp: new Date().toISOString(),
        });
      }

      // Root endpoint
      if (pathname === '/') {
        return sendJson(res, 200, {
          name: 'Acecore API Server',
          version: '1.0.0',
          endpoints: [
            '/health',
            '/api/pricing',
            '/api/pricing/:id',
            '/api/pricing/reset',
            '/api/contact',
          ],
        });
      }

      // 3. Pricing Endpoints
      // GET /api/pricing
      if (pathname === '/api/pricing' && method === 'GET') {
        const pricing = getAllPricing();
        return sendJson(res, 200, {
          success: true,
          data: pricing,
        });
      }

      // PUT /api/pricing (full update)
      if (pathname === '/api/pricing' && method === 'PUT') {
        const body = await parseJsonBody(req);
        const updated = updatePricing(body);
        return sendJson(res, 200, {
          success: true,
          message: 'Pricing updated successfully',
          data: updated,
        });
      }

      // POST /api/pricing/reset
      if (pathname === '/api/pricing/reset' && method === 'POST') {
        const reset = resetPricing();
        return sendJson(res, 200, {
          success: true,
          message: 'Pricing reset to default configuration',
          data: reset,
        });
      }

      // Single plan matching: /api/pricing/:id
      const singlePlanMatch = pathname.match(/^\/api\/pricing\/([a-zA-Z0-9_-]+)$/);
      if (singlePlanMatch) {
        const planId = singlePlanMatch[1];

        // GET /api/pricing/:id
        if (method === 'GET') {
          const plan = getPlanById(planId);
          if (!plan) {
            return sendJson(res, 404, {
              success: false,
              error: `Plan not found: ${planId}`,
            });
          }
          return sendJson(res, 200, {
            success: true,
            data: plan,
          });
        }

        // PUT /api/pricing/:id
        if (method === 'PUT') {
          const body = await parseJsonBody(req);
          try {
            const updated = updatePlanPrice(planId, body);
            return sendJson(res, 200, {
              success: true,
              message: `Plan ${planId} updated successfully`,
              data: updated,
            });
          } catch (err) {
            return sendJson(res, 404, {
              success: false,
              error: err.message,
            });
          }
        }
      }

      // 4. Contact Form Endpoint
      // POST /api/contact
      if (pathname === '/api/contact' && method === 'POST') {
        const body = await parseJsonBody(req);
        const result = await handleContactSubmission(body);
        return sendJson(res, result.status, result.body);
      }

      // 5. 404 Not Found
      return sendJson(res, 404, {
        success: false,
        error: `Route not found: ${method} ${pathname}`,
      });
    } catch (err) {
      console.error('[Server Error]', err);
      return sendJson(res, 500, {
        success: false,
        error: err.message || 'Internal Server Error',
      });
    }
  });
}

// Start server if executed directly
const isDirectRun = process.argv[1] && process.argv[1].endsWith('server.js');
if (isDirectRun) {
  const server = createServer();
  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`\n❌ Error: Port ${PORT} is already in use.`);
      console.error(`Tip: You can specify a different port: PORT=5002 npm start\n`);
    } else {
      console.error('[Server Listen Error]', err);
    }
    process.exit(1);
  });
  server.listen(PORT, () => {
    console.log(`🚀 Acecore API Server running at http://localhost:${PORT}`);
    console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
    console.log(`⚡ Pricing API: http://localhost:${PORT}/api/pricing`);
  });
}
