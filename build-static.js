const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

// Ensure the out directory exists
const outDir = path.join(__dirname, 'out');
if (!fs.existsSync(outDir)){
    fs.mkdirSync(outDir, { recursive: true });
}

// Read the content of your global CSS file
let cssContent;
try {
  cssContent = fs.readFileSync(path.join(__dirname, 'app/globals.css'), 'utf8');
} catch (error) {
  console.error('Error reading CSS file:', error);
  process.exit(1);
}

// Bundling and transpiling
esbuild.build({
  entryPoints: ['app/page.tsx'],
  bundle: true,
  outfile: 'out/bundle.js',
  format: 'esm',
  platform: 'browser',
  target: ['es2015'],
  external: ['react', 'react-dom'],
  loader: { 
    '.tsx': 'tsx', 
    '.ts': 'ts',
    '.js': 'jsx',
    '.css': 'css'
  },
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  define: {
    'process.env.NODE_ENV': '"production"'
  },
}).then(() => {
  // Read the bundled JS
  let jsContent;
  try {
    jsContent = fs.readFileSync(path.join(__dirname, 'out/bundle.js'), 'utf8');
  } catch (error) {
    console.error('Error reading bundled JS:', error);
    process.exit(1);
  }

  // Create HTML template
  const htmlTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blanco Consulting</title>
    <style>${cssContent}</style>
</head>
<body>
    <div id="root"></div>
    <script src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
    <script type="module">
      ${jsContent}
      import Home from './bundle.js';
      const root = ReactDOM.createRoot(document.getElementById('root'));
      root.render(React.createElement(Home));
    </script>
</body>
</html>
  `;

  // Write the HTML file
  try {
    fs.writeFileSync(path.join(__dirname, 'out/index.html'), htmlTemplate);
    console.log('Static one-page website generated successfully!');
    
    // Read and log the generated HTML
    const generatedHtml = fs.readFileSync(path.join(__dirname, 'out/index.html'), 'utf8');
    console.log('Generated HTML:', generatedHtml);
  } catch (error) {
    console.error('Error writing or reading HTML file:', error);
    process.exit(1);
  }
}).catch((error) => {
  console.error('Build failed:', error);
  process.exit(1);
});