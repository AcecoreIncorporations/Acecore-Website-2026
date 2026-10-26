import { Readable, Writable } from 'node:stream';
import { createServer } from '../src/server.js';

function testRequest(server, { method = 'GET', url = '/', body = null, headers = {} }) {
  return new Promise((resolve) => {
    const req = new Readable({
      read() {
        if (body) {
          this.push(typeof body === 'string' ? body : JSON.stringify(body));
        }
        this.push(null);
      },
    });
    req.method = method;
    req.url = url;
    req.headers = { host: 'localhost', ...headers };

    let statusCode = 200;
    const responseHeaders = {};
    let responseData = '';

    const res = new Writable({
      write(chunk, encoding, callback) {
        responseData += chunk.toString();
        callback();
      },
    });

    res.writeHead = function (code, h) {
      statusCode = code;
      Object.assign(responseHeaders, h || {});
      return this;
    };

    res.setHeader = function (name, value) {
      responseHeaders[name.toLowerCase()] = value;
    };

    res.end = function (data) {
      if (data) responseData += data;
      try {
        resolve({
          status: statusCode,
          headers: responseHeaders,
          data: responseData ? JSON.parse(responseData) : null,
          raw: responseData,
        });
      } catch {
        resolve({
          status: statusCode,
          headers: responseHeaders,
          raw: responseData,
        });
      }
    };

    server.emit('request', req, res);
  });
}

async function runTests() {
  console.log('🧪 Starting Acecore Backend & Pricing Tests...\n');
  const server = createServer();

  try {
    // Test 1: Health check
    const health = await testRequest(server, { url: '/api/health' });
    if (health.status !== 200 || health.data.status !== 'healthy') {
      throw new Error(`Health check failed: ${JSON.stringify(health)}`);
    }
    console.log('✓ Health check passed (HTTP 200, status: healthy)');

    // Test 2: GET /api/pricing
    const pricing = await testRequest(server, { url: '/api/pricing' });
    if (pricing.status !== 200 || !pricing.data.success) {
      throw new Error(`GET /api/pricing failed: ${JSON.stringify(pricing)}`);
    }
    if (!Array.isArray(pricing.data.data.plans) || pricing.data.data.plans.length !== 3) {
      throw new Error(`Expected 3 pricing plans, got: ${pricing.data.data.plans?.length}`);
    }
    console.log(`✓ GET /api/pricing returned ${pricing.data.data.plans.length} plans successfully`);

    // Test 3: GET /api/pricing/prime
    const prime = await testRequest(server, { url: '/api/pricing/prime' });
    if (prime.status !== 200 || prime.data.data.id !== 'prime') {
      throw new Error(`GET /api/pricing/prime failed: ${JSON.stringify(prime)}`);
    }
    console.log(`✓ GET /api/pricing/prime returned plan: "${prime.data.data.name}"`);

    // Test 4: Dynamic update of price via PUT /api/pricing/prime
    const testUpdate = await testRequest(server, {
      method: 'PUT',
      url: '/api/pricing/prime',
      body: {
        prices: {
          solar: '₦2,800,000',
        },
      },
    });
    if (testUpdate.status !== 200 || !testUpdate.data.success) {
      throw new Error(`PUT /api/pricing/prime failed: ${JSON.stringify(testUpdate)}`);
    }

    // Verify change persisted
    const verifyUpdated = await testRequest(server, { url: '/api/pricing/prime' });
    if (verifyUpdated.data.data.prices.solar !== '₦2,800,000') {
      throw new Error(`Price update did not persist: ${verifyUpdated.data.data.prices.solar}`);
    }
    console.log(`✓ Dynamic pricing update verified: solar price is now "${verifyUpdated.data.data.prices.solar}"`);

    // Test 5: Reset to default pricing
    const reset = await testRequest(server, { method: 'POST', url: '/api/pricing/reset' });
    if (reset.status !== 200) {
      throw new Error(`POST /api/pricing/reset failed`);
    }
    const verifyReset = await testRequest(server, { url: '/api/pricing/prime' });
    if (verifyReset.data.data.prices.solar !== '₦2,500,000') {
      throw new Error(`Reset failed: ${verifyReset.data.data.prices.solar}`);
    }
    console.log(`✓ Reset to defaults verified: solar price restored to "${verifyReset.data.data.prices.solar}"`);

    // Test 6: 404 for nonexistent route
    const notFound = await testRequest(server, { url: '/api/nonexistent' });
    if (notFound.status !== 404) {
      throw new Error(`Expected 404, got: ${notFound.status}`);
    }
    console.log('✓ 404 Not Found handling verified');

    // Test 7: CORS Preflight
    const cors = await testRequest(server, { method: 'OPTIONS', url: '/api/pricing' });
    if (cors.status !== 204 || cors.headers['Access-Control-Allow-Origin'] !== '*') {
      throw new Error(`CORS options failed: ${JSON.stringify(cors)}`);
    }
    console.log('✓ CORS OPTIONS preflight verified (HTTP 204)');

    console.log('\n🎉 ALL BACKEND TESTS PASSED SUCCESSFULLY!');
  } catch (err) {
    console.error('\n❌ Test suite failed:', err);
    process.exit(1);
  }
}

runTests();
