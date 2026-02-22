#!/bin/bash

# ScrolLearn Fullstack - Run All Services
# This script starts the backend API, web frontend, and mobile frontend simultaneously

set -e

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$PROJECT_ROOT/backend"
WEB_DIR="$PROJECT_ROOT/frontend-web"
MOBILE_DIR="$PROJECT_ROOT/frontend-mobile"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║   ScrolLearn Fullstack - Starting All       ║${NC}"
echo -e "${BLUE}║   Backend + Web + Mobile Services          ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════╝${NC}"
echo ""

# Function to print service info
print_service() {
    echo -e "${GREEN}✓${NC} $1"
}

# Function to print error
print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if directories exist
if [ ! -d "$BACKEND_DIR" ]; then
    print_error "Backend directory not found: $BACKEND_DIR"
    exit 1
fi

if [ ! -d "$WEB_DIR" ]; then
    print_error "Web frontend directory not found: $WEB_DIR"
    exit 1
fi

if [ ! -d "$MOBILE_DIR" ]; then
    print_error "Mobile frontend directory not found: $MOBILE_DIR"
    exit 1
fi

# Cleanup function
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down all services...${NC}"
    kill $(jobs -p) 2>/dev/null || true
    echo -e "${GREEN}All services stopped.${NC}"
    exit 0
}

# Trap Ctrl+C and cleanup
trap cleanup SIGINT SIGTERM

echo -e "${YELLOW}Starting services...${NC}"
echo ""

# Start Backend
echo -e "${BLUE}[1/3]${NC} Starting Backend API Server..."
cd "$BACKEND_DIR"
if [ ! -d "venv" ]; then
    print_error "Virtual environment not found. Creating one..."
    python3.12 -m venv venv || print_error "Failed to create venv. Make sure Python 3.12 is installed."
    exit 1
fi
source venv/bin/activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000 > "$PROJECT_ROOT/backend.log" 2>&1 &
BACKEND_PID=$!
print_service "Backend API started (PID: $BACKEND_PID)"
echo "  📍 API: http://localhost:8000"
echo "  📍 Docs: http://localhost:8000/docs"
echo ""

# Start Web Frontend
echo -e "${BLUE}[2/3]${NC} Starting Web Frontend (React + Vite)..."
cd "$WEB_DIR"
npm run dev > "$PROJECT_ROOT/web.log" 2>&1 &
WEB_PID=$!
print_service "Web frontend started (PID: $WEB_PID)"
echo "  📍 Web App: http://localhost:5173"
echo ""

# Start Mobile Frontend
echo -e "${BLUE}[3/3]${NC} Starting Mobile Frontend (React Native)..."
cd "$MOBILE_DIR"
npm start > "$PROJECT_ROOT/mobile.log" 2>&1 &
MOBILE_PID=$!
print_service "Mobile frontend started (PID: $MOBILE_PID)"
echo "  📍 Metro Bundler: http://localhost:8081"
echo ""

echo -e "${GREEN}╔════════════════════════════════════════════╗${NC}"
echo -e "${GREEN}║   All services are now running!            ║${NC}"
echo -e "${GREEN}╚════════════════════════════════════════════╝${NC}"
echo ""
echo -e "${YELLOW}Service URLs:${NC}"
echo -e "  ${BLUE}Backend API${NC}      → http://localhost:8000"
echo -e "  ${BLUE}API Docs${NC}         → http://localhost:8000/docs"
echo -e "  ${BLUE}Web App${NC}          → http://localhost:5173"
echo -e "  ${BLUE}Mobile Metro${NC}     → http://localhost:8081"
echo ""
echo -e "${YELLOW}Logs:${NC}"
echo -e "  Backend: $PROJECT_ROOT/backend.log"
echo -e "  Web:     $PROJECT_ROOT/web.log"
echo -e "  Mobile:  $PROJECT_ROOT/mobile.log"
echo ""
echo -e "${YELLOW}To stop all services:${NC} Press ${BLUE}Ctrl+C${NC}"
echo ""

# Wait for all background jobs
wait
