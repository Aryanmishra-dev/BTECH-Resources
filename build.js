const fs = require('fs');

// Vercel provides these environment variables during the build process
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL 
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` 
  : (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://aryanmishra-dev.github.io/BTech-Subjects-/');

console.log(`Setting up deployment for: ${vercelUrl}`);

// 1. Update index.html
let html = fs.readFileSync('index.html', 'utf8');
// Replace the hardcoded GitHub pages URL
html = html.replace(/https:\/\/aryanmishra-dev\.github\.io\/BTech-Subjects-\//g, vercelUrl);
// Inject canonical URL tag if missing to improve SEO
if (!html.includes('rel="canonical"')) {
  html = html.replace('<!-- SEO -->', `<!-- SEO -->\n<link rel="canonical" href="${vercelUrl}/" />`);
}
fs.writeFileSync('index.html', html);

// 2. Update sitemap.xml
if (fs.existsSync('sitemap.xml')) {
  let sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  sitemap = sitemap.replace(/https:\/\/aryanmishra-dev\.github\.io\/BTech-Subjects-\//g, vercelUrl);
  fs.writeFileSync('sitemap.xml', sitemap);
}

// 3. Update robots.txt
if (fs.existsSync('robots.txt')) {
  let robots = fs.readFileSync('robots.txt', 'utf8');
  robots = robots.replace(/https:\/\/aryanmishra-dev\.github\.io\/BTech-Subjects-\//g, vercelUrl);
  fs.writeFileSync('robots.txt', robots);
}

console.log('Build completed successfully.');