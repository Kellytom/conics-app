#!/usr/bin/env node

/**
 * Setup script for Conics Explorer TypeScript modernization
 * Run with: node setup.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Setting up Conics Explorer with TypeScript and Tailwind CSS');
console.log('');

// Check if Node.js and npm are available
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js ${nodeVersion}`);
  console.log(`✅ npm ${npmVersion}`);
} catch (error) {
  console.error('❌ Node.js and npm are required. Please install them first.');
  process.exit(1);
}

console.log('');
console.log('📦 Installing dependencies...');

try {
  // Install dependencies
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies:', error.message);
  process.exit(1);
}

console.log('');
console.log('🎨 Building Tailwind CSS...');

try {
  // Build CSS
  execSync('npx tailwindcss -i ./src/styles/main.css -o ./css/styles-new.css --watch=false', { stdio: 'inherit' });
  console.log('✅ Tailwind CSS compiled successfully');
} catch (error) {
  console.error('❌ Failed to compile Tailwind CSS:', error.message);
  console.log('You can compile it manually later with:');
  console.log('npx tailwindcss -i ./src/styles/main.css -o ./css/styles-new.css');
}

console.log('');
console.log('🔧 Setting up development environment...');

// Create development task for VS Code
const taskConfig = {
  version: "2.0.0",
  tasks: [
    {
      label: "Start Conics Explorer Dev Server",
      type: "shell", 
      command: "npm run dev",
      group: "build",
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new"
      },
      isBackground: true,
      problemMatcher: []
    },
    {
      label: "Build Conics Explorer",
      type: "shell",
      command: "npm run build", 
      group: "build",
      presentation: {
        echo: true,
        reveal: "always",
        focus: false,
        panel: "new"
      }
    },
    {
      label: "Watch Tailwind CSS",
      type: "shell",
      command: "npx tailwindcss -i ./src/styles/main.css -o ./css/styles-new.css --watch",
      group: "build",
      isBackground: true,
      presentation: {
        echo: true,
        reveal: "silent",
        focus: false,
        panel: "new"
      }
    }
  ]
};

// Ensure .vscode directory exists
const vscodeDir = path.join(__dirname, '.vscode');
if (!fs.existsSync(vscodeDir)) {
  fs.mkdirSync(vscodeDir);
}

// Write tasks.json
fs.writeFileSync(
  path.join(vscodeDir, 'tasks.json'),
  JSON.stringify(taskConfig, null, 2)
);

console.log('✅ VS Code tasks configured');

console.log('');
console.log('🎉 Setup complete!');
console.log('');
console.log('Next steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Open http://localhost:8000 in your browser');
console.log('3. Try the new index-new.html for the modernized interface');
console.log('');
console.log('Available commands:');
console.log('- npm run dev     : Start development server with hot reload');
console.log('- npm run build   : Build for production'); 
console.log('- npm run preview : Preview production build');
console.log('- npm run type-check : Check TypeScript types');
console.log('');
console.log('Happy coding! 🚀');
