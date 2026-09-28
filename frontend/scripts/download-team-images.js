import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const folder = path.join(__dirname, '..', 'src', 'assets', 'images', 'team');
fs.mkdirSync(folder, { recursive: true });

const urls = {
  'leadership-1.jpg': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=900&q=80',
  'leadership-2.jpg': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80',
  'leadership-3.jpg': 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80',
  'leadership-4.jpg': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=80',
  'leadership-5.jpg': 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=80',
  'leadership-6.jpg': 'https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&w=900&q=80',
  'operations-1.jpg': 'https://images.unsplash.com/photo-1546964125-0807b8d9077c?auto=format&fit=crop&w=900&q=80',
  'operations-2.jpg': 'https://images.unsplash.com/photo-1504257432389-52343af06ae3?auto=format&fit=crop&w=900&q=80',
  'operations-3.jpg': 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=900&q=80',
  'operations-4.jpg': 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=900&q=80',
};

const download = (name, url) =>
  new Promise((resolve, reject) => {
    const filePath = path.join(folder, name);
    const req = https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        https.get(res.headers.location, (followRes) => {
          const chunks = [];
          followRes.on('data', (chunk) => chunks.push(chunk));
          followRes.on('end', () => {
            fs.writeFileSync(filePath, Buffer.concat(chunks));
            console.log(`downloaded ${name}`);
            resolve();
          });
        }).on('error', reject);
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        fs.writeFileSync(filePath, Buffer.concat(chunks));
        console.log(`downloaded ${name}`);
        resolve();
      });
    });

    req.on('error', reject);
  });

(async () => {
  try {
    for (const [name, url] of Object.entries(urls)) {
      await download(name, url);
    }
    console.log(`total files: ${Object.keys(urls).length}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
