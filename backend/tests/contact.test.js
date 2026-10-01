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

function assert(condition, message) {
  if (!condition) {
    throw new Error(`Assertion failed: ${message}`);
  }
}

async function runTests() {
  console.log('\n🧪 Running Contact Endpoint Backend Tests...\n');
  const server = createServer();
  let passed = 0;
  let failed = 0;

  const testCases = [
    {
      name: 'OPTIONS /api/contact returns CORS preflight headers',
      run: async () => {
        const res = await testRequest(server, { method: 'OPTIONS', url: '/api/contact' });
        assert(res.status === 204, `Expected status 204, got ${res.status}`);
        assert(
          res.headers['Access-Control-Allow-Origin'] === '*',
          'Missing Access-Control-Allow-Origin header'
        );
      },
    },
    {
      name: 'GET / endpoint lists /api/contact',
      run: async () => {
        const res = await testRequest(server, { method: 'GET', url: '/' });
        assert(res.status === 200, `Expected status 200, got ${res.status}`);
        assert(
          Array.isArray(res.data.endpoints) && res.data.endpoints.includes('/api/contact'),
          'Endpoints list should include /api/contact'
        );
      },
    },
    {
      name: 'POST /api/contact rejects empty body with 400',
      run: async () => {
        const res = await testRequest(server, {
          method: 'POST',
          url: '/api/contact',
          body: {},
        });
        assert(res.status === 400, `Expected 400, got ${res.status}`);
        assert(res.data.success === false, 'Expected success: false');
        assert(res.data.error.includes('full name'), 'Expected full name error message');
      },
    },
    {
      name: 'POST /api/contact rejects header injection in fullName',
      run: async () => {
        const res = await testRequest(server, {
          method: 'POST',
          url: '/api/contact',
          body: {
            fullName: 'Jane Doe\r\nBcc: hacker@example.com',
            email: 'jane@example.com',
            message: 'Hello world',
          },
        });
        assert(res.status === 400, `Expected 400, got ${res.status}`);
        assert(res.data.error.includes('invalid characters'), 'Should catch newline injection');
      },
    },
    {
      name: 'POST /api/contact rejects invalid email format',
      run: async () => {
        const res = await testRequest(server, {
          method: 'POST',
          url: '/api/contact',
          body: {
            fullName: 'Jane Doe',
            email: 'not-an-email',
            message: 'Inquiry message',
          },
        });
        assert(res.status === 400, `Expected 400, got ${res.status}`);
        assert(res.data.error.includes('valid email'), 'Expected valid email error');
      },
    },
    {
      name: 'POST /api/contact rejects message shorter than 5 chars',
      run: async () => {
        const res = await testRequest(server, {
          method: 'POST',
          url: '/api/contact',
          body: {
            fullName: 'Jane Doe',
            email: 'jane@example.com',
            message: 'Hi',
          },
        });
        assert(res.status === 400, `Expected 400, got ${res.status}`);
        assert(res.data.error.includes('at least 5 characters'), 'Expected message length error');
      },
    },
    {
      name: 'POST /api/contact succeeds with valid submission',
      run: async () => {
        const res = await testRequest(server, {
          method: 'POST',
          url: '/api/contact',
          body: {
            fullName: 'Jane Doe',
            email: 'jane.doe@example.com',
            phone: '+1 555-0199',
            message: 'Interested in the Solar System residential installation.',
          },
        });
        assert(res.status === 200, `Expected 200, got ${res.status}`);
        assert(res.data.success === true, 'Expected success: true');
        assert(typeof res.data.message === 'string', 'Expected confirmation message');
      },
    },
  ];

  for (const test of testCases) {
    try {
      await test.run();
      console.log(`  ✅ PASS: ${test.name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${test.name}`);
      console.error(`     Error: ${err.message}`);
      failed++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Results: ${passed} passed, ${failed} failed (${passed + failed} total)`);
  console.log(`========================================\n`);

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
