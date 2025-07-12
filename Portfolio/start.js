const { spawn } = require('child_process');

const port = process.env.PORT || 3000;
const hostname = '0.0.0.0';

console.log('Starting Next.js server...');
console.log('Environment:', process.env.NODE_ENV);
console.log('Port:', port);
console.log('Hostname:', hostname);

// Start Next.js with explicit port and hostname
const nextProcess = spawn('npx', ['next', 'start', '-H', hostname, '-p', port.toString()], {
  stdio: 'inherit',
  env: { ...process.env, PORT: port.toString() }
});

nextProcess.on('error', (err) => {
  console.error('Failed to start Next.js:', err);
  process.exit(1);
});

nextProcess.on('exit', (code) => {
  console.log(`Next.js process exited with code ${code}`);
  process.exit(code);
}); 