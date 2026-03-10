/**
 * Ensures the `content/` directory is accessible before the Next.js build.
 *
 * In local development, `content/` is a symlink to `../docs` which resolves fine.
 * In some CI/CD environments (e.g. Webflow Cloud) the symlink target may be
 * outside the working directory and therefore unresolvable. This script detects
 * that case and copies the docs in as a real directory so the build can proceed.
 */

const fs = require('fs');
const path = require('path');

const contentPath = path.join(__dirname, '..', 'content');
const docsPath = path.join(__dirname, '..', '..', 'docs');

let accessible = false;
try {
  fs.readdirSync(contentPath);
  accessible = true;
} catch {
  // symlink is broken or directory is missing
}

if (accessible) {
  console.log('content/ is accessible — skipping copy.');
  process.exit(0);
}

console.log('content/ is not accessible — copying from ../docs ...');

if (!fs.existsSync(docsPath)) {
  console.error('Error: ../docs directory not found. Cannot populate content/.');
  process.exit(1);
}

// Remove broken symlink if present
try {
  fs.rmSync(contentPath, { force: true });
} catch {
  // nothing to remove
}

fs.cpSync(docsPath, contentPath, { recursive: true });
console.log('Done — docs copied to content/.');
