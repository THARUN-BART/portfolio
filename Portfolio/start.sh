#!/bin/bash
# Set default port if not provided
export PORT=${PORT:-3000}

# Start Next.js application
exec npm start