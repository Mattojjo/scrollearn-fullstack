#!/bin/bash

# ScrolLearn Fullstack Startup Script
# This script helps you start all services

echo "🚀 ScrolLearn Fullstack Startup"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check prerequisites
echo "Checking prerequisites..."

if ! command -v python3 &> /dev/null; then
    echo -e "${RED}✗ Python 3 not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Python 3 found${NC}"

if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js found${NC}"

echo ""
echo "Starting services..."
echo ""

# Start backend
echo -e "${YELLOW}1. Starting Backend (Port 8000)${NC}"
cd backend

# Check if venv exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate 2>/dev/null || . venv/Scripts/activate 2>/dev/null

# Install dependencies if needed
if [ ! -f "venv_initialized" ]; then
    pip install -r requirements.txt
    touch venv_initialized
fi

# Start uvicorn in background
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 &
BACKEND_PID=$!
echo -e "${GREEN}✓ Backend started (PID: $BACKEND_PID)${NC}"
cd ..

sleep 2

# Start frontend
echo -e "${YELLOW}2. Starting Web Frontend (Port 5173)${NC}"
cd frontend-web

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    npm install
fi

# Start dev server in background
npm run dev &
FRONTEND_PID=$!
echo -e "${GREEN}✓ Web Frontend started (PID: $FRONTEND_PID)${NC}"
cd ..

echo ""
echo "================================"
echo -e "${GREEN}All services started successfully!${NC}"
echo "================================"
echo ""
echo "Available at:"
echo "  Backend API: http://localhost:8000"
echo "  API Docs:    http://localhost:8000/docs"
echo "  Web App:     http://localhost:5173"
echo ""
echo "PIDs:"
echo "  Backend:  $BACKEND_PID"
echo "  Frontend: $FRONTEND_PID"
echo ""
echo "To stop services:"
echo "  kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Press Ctrl+C to stop this script and all services"
echo ""

# Wait for interrupt
wait
