import fs from 'node:fs';
import path from 'node:path';

const FORBIDDEN_STRINGS = [
  '(555)',
  '010-0199',
  '+1555',
  'example.com',
  'hello@',
  'Your business address',
  'Plumbera',
  '24/7',
  '224K',
  'https://facebook.com',
  'https://linkedin.com',
  'https://youtube.com',
  'https://x.com',
  'https://twitter.com',
];

const REQUIRED_STRINGS_IN_HTML = [
  '0570477234',
  'tel:+966570477234',
  'Malaz, Riyadh, Saudi Arabia 12831',
  'https://www.instagram.com/cablejointsa/',
  'https://www.facebook.com/people/The-saif-ahmed/100065301078114/#',
];

function scanDirectory(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.git' && file !== 'dist') {
        scanDirectory(fullPath, fileList);
      }
    } else {
      if (
        fullPath.endsWith('.js') ||
        fullPath.endsWith('.jsx') ||
        fullPath.endsWith('.ts') ||
        fullPath.endsWith('.tsx') ||
        fullPath.endsWith('.html') ||
        fullPath.endsWith('.json') ||
        fullPath.endsWith('.txt') ||
        fullPath.endsWith('.xml')
      ) {
        // Exclude this test script itself from forbidden checks
        if (!fullPath.includes('check-content.mjs')) {
          fileList.push(fullPath);
        }
      }
    }
  }
  return fileList;
}

console.log('Running content audit check on codebase...');

const filesToScan = scanDirectory('./src').concat(
  ['./index.html', './public/robots.txt', './public/sitemap.xml'].filter((f) => fs.existsSync(f))
);

let errorsFound = 0;

for (const filePath of filesToScan) {
  const content = fs.readFileSync(filePath, 'utf8');

  for (const forbidden of FORBIDDEN_STRINGS) {
    if (content.includes(forbidden)) {
      console.error(`[FAIL] Found forbidden token "${forbidden}" in file: ${filePath}`);
      errorsFound++;
    }
  }

  // Check for any unauthorized phone strings like (xxx) or standard fake numbers
  const phoneMatches = content.match(/\b\d{3}[-.\s]\d{3}[-.\s]\d{4}\b/g);
  if (phoneMatches) {
    console.error(`[FAIL] Found unexpected phone format match in ${filePath}:`, phoneMatches);
    errorsFound++;
  }
}

// Check index.html or dist/index.html or source for required contact and address data
const sourceHtml = fs.readFileSync('./index.html', 'utf8');
const siteContentSrc = fs.readFileSync('./src/data/siteContent.js', 'utf8');

for (const req of REQUIRED_STRINGS_IN_HTML) {
  if (!sourceHtml.includes(req) && !siteContentSrc.includes(req)) {
    console.error(`[FAIL] Missing required string across project: "${req}"`);
    errorsFound++;
  }
}

if (errorsFound > 0) {
  console.error(`\nContent check FAILED with ${errorsFound} error(s).`);
  process.exit(1);
} else {
  console.log('Content check PASSED. All contact information, addresses, and social links are verified.');
  process.exit(0);
}
