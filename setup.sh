#!/bin/bash

echo "🚀 Setting up Fahmi Ibrahim Portfolio Web..."

# Check Bun
if ! command -v bun &> /dev/null; then
  echo "⚠️ Bun not found in PATH. Adding default ~/.bun/bin to PATH..."
  export PATH=$PATH:~/.bun/bin
fi

# Install server dependencies
echo "📦 Installing server dependencies..."
cd server && bun install
cd ..

# Install client dependencies
echo "📦 Installing client dependencies..."
cd client && bun install
cd ..

echo "✅ Setup complete! You can start development server with: bun run dev"
