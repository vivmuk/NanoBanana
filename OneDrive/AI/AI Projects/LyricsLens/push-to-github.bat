@echo off
echo ========================================
echo Pushing LyricLens to GitHub
echo ========================================
echo.

git remote -v
echo.
echo Verifying commit...
git log --oneline -1
echo.
echo Attempting to push to GitHub...
echo (You may be prompted for GitHub credentials)
echo.

git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ SUCCESS! Code pushed to GitHub!
    echo.
    echo Next steps:
    echo 1. Visit https://github.com/vivmuk/LyricLens to verify
    echo 2. Deploy to Railway: https://railway.app
    echo 3. Add environment variable: VENICE_API_KEY
) else (
    echo.
    echo ⚠️  Push failed. You may need to authenticate.
    echo.
    echo Options:
    echo - Use GitHub Personal Access Token as password
    echo - Or configure SSH keys
    echo - Or use GitHub CLI: gh auth login
)

pause



