@echo off
cd /d "%~dp0"
where py >nul 2>nul && (py -3 ADD_PIRATES_TAB.py & pause & exit /b)
where python >nul 2>nul && (python ADD_PIRATES_TAB.py & pause & exit /b)
echo Python is not on your PATH. Open READ_ME_FIRST.txt for the one-line manual option.
pause
