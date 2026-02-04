@echo off
echo Iniciando Clash of Clans Equipment Viewer...
echo.

echo [1/2] Iniciando Backend...
start "Backend" cmd /k "cd server && npm run dev"

timeout /t 3 /nobreak > nul

echo [2/2] Iniciando Frontend...
start "Frontend" cmd /k "npm start"

echo.
echo Aplicacao iniciada!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
pause