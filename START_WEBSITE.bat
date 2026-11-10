@echo off
setlocal
cd /d "%~dp0"
title GymOS Pro

echo ========================================
echo             GYMOS PRO
echo ========================================
echo.

where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed.
  echo Please install the LTS version from https://nodejs.org/
  echo Then double-click this file again.
  pause
  exit /b 1
)

where npm >nul 2>nul
if errorlevel 1 (
  echo npm was not found. Please reinstall Node.js from https://nodejs.org/
  pause
  exit /b 1
)

if not exist node_modules (
  echo First-time setup: installing project packages.
  echo This needs an internet connection and may take a few minutes.
  call npm install --include=dev --legacy-peer-deps
  if errorlevel 1 (
    echo.
    echo Package installation failed. Check your internet connection.
    pause
    exit /b 1
  )
)

echo.
echo Starting GymOS Pro...
echo Keep this window open while using the website.
echo The website will open at http://localhost:3000
echo.

start "" cmd /c "timeout /t 8 /nobreak >nul & start http://localhost:3000"
call npm start

echo.
echo The website server has stopped.
pause
