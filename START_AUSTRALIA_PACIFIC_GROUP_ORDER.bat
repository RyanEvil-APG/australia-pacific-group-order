@echo off
cd /d "%~dp0"
start "Australia Pacific Group Order Server" cmd /k "npm run dev"
timeout /t 3 >nul
start http://127.0.0.1:5288
