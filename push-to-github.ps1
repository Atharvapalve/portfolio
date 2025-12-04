# PowerShell script to push portfolio to GitHub
# Run this after installing Git from https://git-scm.com/download/win

Write-Host "Initializing Git repository..." -ForegroundColor Green

# Initialize git (if not already initialized)
if (-not (Test-Path .git)) {
    git init
    Write-Host "Git repository initialized." -ForegroundColor Green
} else {
    Write-Host "Git repository already exists." -ForegroundColor Yellow
}

# Check if remote exists
$remoteExists = git remote get-url origin 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Adding remote repository..." -ForegroundColor Green
    git remote add origin https://github.com/Atharvapalve/Portfolio-Website.git
} else {
    Write-Host "Remote already configured." -ForegroundColor Yellow
    git remote set-url origin https://github.com/Atharvapalve/Portfolio-Website.git
}

# Create .gitignore if it doesn't exist
if (-not (Test-Path .gitignore)) {
    Write-Host "Creating .gitignore..." -ForegroundColor Green
    @"
node_modules/
dist/
build/
.DS_Store
*.log
.env
.env.local
.vscode/
.idea/
"@ | Out-File -FilePath .gitignore -Encoding UTF8
}

Write-Host "Adding all files..." -ForegroundColor Green
git add .

Write-Host "Creating commit..." -ForegroundColor Green
git commit -m "Portfolio website with 3D Spaceship scene and interactive controls"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "Note: You may need to authenticate with GitHub credentials." -ForegroundColor Yellow

# Try to push to main branch
git branch -M main
git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "Successfully pushed to GitHub!" -ForegroundColor Green
} else {
    Write-Host "Push failed. You may need to:" -ForegroundColor Red
    Write-Host "1. Authenticate with GitHub (username/password or token)" -ForegroundColor Yellow
    Write-Host "2. If repository has existing content, run: git pull origin main --allow-unrelated-histories" -ForegroundColor Yellow
}

