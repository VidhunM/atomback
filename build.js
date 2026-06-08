import fs from 'fs';
import path from 'path';

const srcDir = '.';
const distDir = './dist';

// Helper to recursively copy directories
function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

try {
  // Clean dist directory
  if (fs.existsSync(distDir)) {
    fs.rmSync(distDir, { recursive: true, force: true });
  }
  fs.mkdirSync(distDir, { recursive: true });

  // Copy server.js
  fs.copyFileSync(path.join(srcDir, 'server.js'), path.join(distDir, 'server.js'));

  // Copy directories
  const dirsToCopy = ['routes', 'models'];
  for (const dir of dirsToCopy) {
    const fullSrc = path.join(srcDir, dir);
    if (fs.existsSync(fullSrc)) {
      copyDir(fullSrc, path.join(distDir, dir));
    }
  }

  // Create uploads directory in dist
  fs.mkdirSync(path.join(distDir, 'uploads'), { recursive: true });

  console.log('Build completed successfully: Backend files copied to dist/');
} catch (err) {
  console.error('Build failed:', err);
  process.exit(1);
}
