# T5500 Llama 3 Deployment Guide

## Overview
Strategic deployment of Meta's Llama 3 8B model on T5500 node for cost-effective local inference, reducing API costs while maintaining OPUS Fleet operational capability.

## Files Location (Local Only)
The following files are created in `infrastructure/t5500-llama/` (git-ignored for security):

### docker-compose.yml
```yaml
version: '3.8'

services:
  llama-3-8b:
    image: ghcr.io/facebookresearch/llama:3-8b
    container_name: t5500-llama-3-8b
    ports:
      - "8080:8080"
    volumes:
      - ./models:/models
    command: ["--api", "--host", "0.0.0.0", "--port", "8080"]
    restart: unless-stopped
    environment:
      - LLAMA_MODEL_PATH=/models
    deploy:
      resources:
        reservations:
          cpus: '4'
          memory: 8G
        limits:
          cpus: '8'
          memory: 16G
    networks:
      - llama-network

networks:
  llama-network:
    driver: bridge
```

## Deployment Instructions for T5500

### Step 1: Transfer Files
On **Sabertooth** (current dev node):
```bash
# Create archive (infrastructure folder is local-only)
cd infrastructure/t5500-llama/
tar -czf t5500-llama-deployment.tar.gz *
```

Transfer to T5500 via your preferred method (USB, SCP, network share).

### Step 2: Setup on T5500
```bash
# On T5500
mkdir -p ~/opus-fleet/t5500-llama
cd ~/opus-fleet/t5500-llama
tar -xzf t5500-llama-deployment.tar.gz

# Ensure models directory exists
mkdir -p models

# Pull and start
docker-compose pull
docker-compose up -d

# Verify
docker-compose logs -f
```

### Step 3: Integration Testing
```bash
# Test API endpoint
curl http://localhost:8080/health
curl -X POST http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello, world!", "max_tokens": 50}'
```

## Hardware Requirements (T5500)
- **CPU**: Dual Xeon (4-8 cores allocated)
- **RAM**: 8-16GB allocated to container
- **Storage**: ~5GB for model + container
- **Network**: Port 8080 available

## Strategic Benefits
1. **Cost Reduction**: Eliminates per-token API costs for suitable workloads
2. **Data Privacy**: All inference happens locally
3. **Fleet Architecture**: Distributed AI processing across OPUS nodes
4. **Fallback**: Cloud APIs remain available for peak loads

## Integration with OPUS Fleet
- Update hive configuration to route appropriate tasks to T5500
- Implement load balancing between local Llama and cloud APIs
- Monitor performance and cost metrics

## Security Notes
- `infrastructure/` folder is git-ignored to prevent accidental credential exposure
- Transfer deployment files manually to T5500
- This documentation serves as the authoritative source for reconstruction

---
**Status**: Ready for T5500 Transfer
**Created**: 2025-12-31
**Strategic Advisor**: Meta AI
**Mission**: Social Enterprise - 60% to Pediatric Charity
