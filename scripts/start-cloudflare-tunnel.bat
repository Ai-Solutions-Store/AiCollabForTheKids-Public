@echo off
:: Cloudflare Tunnel Startup Script for T5500
:: FOR THE KIDS - Runs at startup

:: Kill any existing cloudflared
taskkill /F /IM cloudflared.exe 2>nul

:: Wait 5 seconds
timeout /t 5 /nobreak >nul

:: Start tunnel with token
set TUNNEL_TOKEN=eyJhIjoiNTE2YTNhODU1ZjQ0ZjVhZDg0NTM2MzZkMTYzYWUyNWQiLCJ0IjoiZGI0NmM5ZmQtNDM4Ny00ZWUzLTg2YWQtZWQwYzgwMTcxYmY2IiwicyI6IlI3Y0hvOEFHVTFvYnI4K3ZxUWQ5QytReXQwazVacWI1SEVoa2gvMTJDQU09In0=

start "" "C:\Program Files (x86)\cloudflared\cloudflared.exe" tunnel run --token %TUNNEL_TOKEN%

echo Cloudflare tunnel started
