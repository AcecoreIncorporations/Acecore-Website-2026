#!/usr/bin/env bash
# ==============================================================================
# Acecore cPanel Deployment Packager
# Builds the production static JavaScript/CSS bundle and packages it with
# the native PHP API and .htaccess into a single cpanel-deploy.zip ready for
# upload into cPanel's public_html directory.
# ==============================================================================

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"
FRONTEND_DIR="${ROOT_DIR}/frontend"
DIST_DIR="${FRONTEND_DIR}/dist"
OUTPUT_ZIP="${ROOT_DIR}/cpanel-deploy.zip"

echo "🚀 [1/3] Building frontend production bundle..."
cd "${FRONTEND_DIR}"
npm run build

echo "📦 [2/3] Verifying required cPanel files in dist/..."
for file in index.html .htaccess api/config.php api/contact.php api/pricing.php api/pricing.json; do
  if [ ! -f "${DIST_DIR}/${file}" ]; then
    echo "❌ Error: Missing required file in dist: ${file}"
    exit 1
  fi
done
echo "   ✓ All required files verified in dist/"

echo "🗜️  [3/3] Packaging into cpanel-deploy.zip..."
cd "${DIST_DIR}"
rm -f "${OUTPUT_ZIP}"
zip -q -r "${OUTPUT_ZIP}" . -x "*.DS_Store"

echo "
==============================================================================
🎉 CPANEL DEPLOYMENT PACKAGE CREATED SUCCESSFULLY!
==============================================================================
Package: ${OUTPUT_ZIP}
Size:    $(du -sh "${OUTPUT_ZIP}" | cut -f1)

HOW TO DEPLOY TO CPANEL:
1. Log in to your cPanel dashboard.
2. Open 'File Manager' and navigate to 'public_html' (or your domain root).
3. Click 'Upload' and select 'cpanel-deploy.zip'.
4. Right-click 'cpanel-deploy.zip' and select 'Extract'.
5. That's it! Your React website and PHP contact/pricing APIs are now live.

Optional: To configure SMTP email credentials on cPanel:
- Edit 'public_html/api/config.php' in cPanel File Manager and enter your
  SMTP_HOST, SMTP_USER, and SMTP_PASS.
==============================================================================
"
