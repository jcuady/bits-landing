@echo off
REM Windows launcher for Claude SEO (bash scripts\claude-seo equivalent).
setlocal
set "LAUNCHER_DIR=%~dp0"
set "RUNTIME=%LAUNCHER_DIR%runtime.py"

if not exist "%RUNTIME%" (
  echo Claude SEO runtime is missing. Reinstall Claude SEO. 1>&2
  exit /b 2
)

if defined CLAUDE_SEO_PYTHON (
  "%CLAUDE_SEO_PYTHON%" "%RUNTIME%" %*
  exit /b %ERRORLEVEL%
)

where py >nul 2>&1
if %ERRORLEVEL%==0 (
  py -3 "%RUNTIME%" %*
  exit /b %ERRORLEVEL%
)

where python >nul 2>&1
if %ERRORLEVEL%==0 (
  python "%RUNTIME%" %*
  exit /b %ERRORLEVEL%
)

echo Claude SEO requires Python 3.10 or newer. 1>&2
exit /b 2
