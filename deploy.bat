@echo off
echo 🚀 Portfolio Deployment Helper
echo ==============================
echo.

echo 📋 Pre-deployment checklist:
echo 1. Update your name in index-new.html title
echo 2. Update meta descriptions
echo 3. Replace placeholder images with your actual photos
echo 4. Test the contact form popup
echo.

set /p deploy_type="Choose deployment type (1=GitHub Pages, 2=Netlify, 3=Vercel): "

if "%deploy_type%"=="1" goto github_pages
if "%deploy_type%"=="2" goto netlify
if "%deploy_type%"=="3" goto vercel

:github_pages
echo.
echo 📦 Preparing for GitHub Pages deployment...
echo.
echo 1. Go to https://github.com and create a new repository
echo 2. Name it: YOUR_USERNAME.github.io (replace with your GitHub username)
echo 3. Make it PUBLIC
echo 4. Don't initialize with README
echo.
set /p github_username="Enter your GitHub username: "
set /p repo_name="Enter repository name (or press Enter for %github_username%.github.io): "

if "%repo_name%"=="" set repo_name=%github_username%.github.io

echo.
echo 🔧 Running Git commands...
git init
git add .
git commit -m "Initial portfolio deployment"
git branch -M main
git remote add origin https://github.com/%github_username%/%repo_name%.git

echo.
echo ⚠️  Now run this command to push to GitHub:
echo git push -u origin main
echo.
echo After pushing, go to your repository settings and enable GitHub Pages!
echo Your site will be live at: https://%github_username%.github.io
goto end

:netlify
echo.
echo 📦 Preparing for Netlify deployment...
echo.
echo Option 1 - Drag & Drop:
echo 1. Go to https://netlify.com
echo 2. Sign up/Login
echo 3. Drag this entire folder to the deploy area
echo.
echo Option 2 - Git Integration:
echo 1. Push your code to GitHub first
echo 2. Connect Netlify to your GitHub account
echo 3. Select your repository and deploy
echo.
goto end

:vercel
echo.
echo 📦 Preparing for Vercel deployment...
echo.
echo 1. Go to https://vercel.com
echo 2. Sign up with GitHub
echo 3. Import your repository
echo 4. Deploy with one click
echo.
goto end

:end
echo.
echo ✅ Deployment preparation complete!
echo 📖 Check DEPLOYMENT_GUIDE.md for detailed instructions
echo.
pause
