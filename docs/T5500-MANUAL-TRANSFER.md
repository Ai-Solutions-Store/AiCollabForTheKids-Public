# T5500 Manual Transfer Instructions - Operation "AIR BRIDGE"

## Status Report
**Date**: 2025-12-31
**Connection Test**: ✅ PASSED - T5500 is alive at 192.168.0.101 (<1ms latency)
**SSH Test**: ❌ FAILED - Requires password/key authentication
**Automated Bridge**: ❌ Not Available - Manual transfer required

## Network Diagnostics
```
Ping 192.168.0.101: SUCCESS
- Packets: 4 sent, 4 received, 0% loss
- Latency: <1ms (excellent local network)
- TTL: 128 (Windows host confirmed)

SSH Access: AUTHENTICATION REQUIRED
- Tested: t5500, josh@192.168.0.101, admin@192.168.0.101
- Error: Permission denied (publickey,password,keyboard-interactive)
- Solution: Manual transfer or SSH key setup required
```

## OPTION 1: Manual File Transfer (Recommended for First Deployment)

### Step 1: Package Files on Sabertooth
```bash
# On Sabertooth (current machine)
cd c:\AiCollabForTheKids\infrastructure\t5500-llama
```

### Step 2: Choose Transfer Method

#### Method A: Network Share (Fastest)
1. Open File Explorer on Sabertooth
2. Navigate to: `c:\AiCollabForTheKids\infrastructure\t5500-llama\`
3. Right-click folder → "Give access to" → "Specific people"
4. Share with your user account
5. On T5500, map network drive: `\\SABERTOOTH\t5500-llama` (or use IP)
6. Copy entire folder to T5500: `C:\opus-fleet\t5500-llama\`

#### Method B: USB Transfer (Most Reliable)
1. Copy entire `infrastructure\t5500-llama\` folder to USB drive
2. Physically move USB to T5500
3. Copy to: `C:\opus-fleet\t5500-llama\`

#### Method C: Remote Desktop
1. RDP to T5500: `mstsc /v:192.168.0.101`
2. Enable clipboard sharing
3. Copy files directly through RDP session

### Step 3: Deploy on T5500
Open PowerShell/Command Prompt on T5500:
```bash
cd C:\opus-fleet\t5500-llama

# Ensure Docker is running
docker --version

# Pull Llama 3 image
docker-compose pull

# Start the service
docker-compose up -d

# Verify deployment
docker-compose ps
docker-compose logs -f llama-3-8b

# Test API
curl http://localhost:8080/health
```

## OPTION 2: Setup SSH for Future Deployments

### On Sabertooth (Generate SSH Key)
```bash
# Generate new SSH key
ssh-keygen -t ed25519 -C "sabertooth-to-t5500"
# Save to: %USERPROFILE%\.ssh\id_ed25519_t5500

# Display public key
type %USERPROFILE%\.ssh\id_ed25519_t5500.pub
```

### On T5500 (Add Public Key)
```bash
# Create .ssh directory if not exists
mkdir %USERPROFILE%\.ssh

# Add Sabertooth's public key to authorized_keys
echo [paste-public-key-here] >> %USERPROFILE%\.ssh\authorized_keys

# Set permissions (if using OpenSSH on Windows)
icacls %USERPROFILE%\.ssh\authorized_keys /inheritance:r /grant:r "%USERNAME%:F"
```

### Configure SSH on Sabertooth
Create/edit `%USERPROFILE%\.ssh\config`:
```
Host t5500
    HostName 192.168.0.101
    User josh
    IdentityFile ~/.ssh/id_ed25519_t5500
    ForwardAgent yes
```

### Test Connection
```bash
ssh t5500 "echo 'T5500 Online'"
```

### Automated Deployment Script (After SSH Setup)
Save as `deploy-to-t5500.bat`:
```batch
@echo off
echo === OPUS FLEET: AIR BRIDGE TO T5500 ===

REM Create remote directory
ssh t5500 "mkdir -p ~/opus-fleet/t5500-llama/models"

REM Transfer files
scp -r infrastructure/t5500-llama/* t5500:~/opus-fleet/t5500-llama/

REM Deploy
ssh t5500 "cd ~/opus-fleet/t5500-llama && docker-compose up -d"

REM Verify
ssh t5500 "docker ps | grep llama"

echo === DEPLOYMENT COMPLETE ===
```

## Files to Transfer
```
infrastructure/t5500-llama/
├── docker-compose.yml  (877 bytes)
├── README.md          (1.3 KB)
└── models/            (empty - will hold Llama 3 model)
```

## Expected Deployment Result
Once deployed, you should see:
```
CONTAINER ID   IMAGE                                    STATUS         PORTS
xxxxx          ghcr.io/facebookresearch/llama:3-8b     Up 2 minutes   0.0.0.0:8080->8080/tcp
```

## Verification Commands (Run on T5500)
```bash
# Check container status
docker-compose ps

# View logs
docker-compose logs -f

# Test API health
curl http://localhost:8080/health

# Test inference
curl -X POST http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{"prompt": "Hello from OPUS Fleet", "max_tokens": 50}'
```

## Troubleshooting

### Docker Not Running on T5500
```bash
# Check if Docker service is running
Get-Service docker

# Start Docker if stopped
Start-Service docker
```

### Port 8080 Already in Use
```bash
# Check what's using port 8080
netstat -ano | findstr :8080

# Modify docker-compose.yml ports if needed:
# Change "8080:8080" to "8081:8080"
```

### Insufficient Memory
```bash
# Check available RAM
systeminfo | findstr /C:"Available Physical Memory"

# Reduce memory limits in docker-compose.yml if needed
```

---
**Mission**: Deploy Llama 3 8B on T5500 for cost-effective local inference
**Network Status**: T5500 reachable at 192.168.0.101 (excellent connectivity)
**Next Action**: Choose transfer method and execute deployment
