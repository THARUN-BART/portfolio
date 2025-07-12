#!/bin/bash
# Set default port if not provided
export PORT=${PORT:-10000}

# Start Next.js application
exec npm start