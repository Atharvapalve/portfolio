# How to Push Your Portfolio to GitHub

## Option 1: Install Git and Run the Script (Recommended)

1. **Install Git for Windows:**
   - Download from: https://git-scm.com/download/win
   - Run the installer with default settings
   - **Important:** Make sure to check "Add Git to PATH" during installation

2. **Restart your terminal/PowerShell** after installation

3. **Run the push script:**
   ```powershell
   .\push-to-github.ps1
   ```

4. **If you get authentication errors:**
   - GitHub no longer accepts passwords for HTTPS
   - You'll need to create a Personal Access Token:
     - Go to: https://github.com/settings/tokens
     - Click "Generate new token (classic)"
     - Give it a name like "Portfolio Push"
     - Select scope: `repo` (full control)
     - Copy the token
     - When prompted for password, paste the token instead

## Option 2: Use GitHub Desktop (Easier, No Command Line)

1. **Download GitHub Desktop:**
   - https://desktop.github.com/

2. **After installation:**
   - File → Add Local Repository
   - Browse to: `C:\Users\athar\OneDrive\Documents\portfolio\portfolio`
   - Click "Create a Repository" if needed
   - Click "Publish repository"
   - Select: `Atharvapalve/Portfolio-Website`
   - Click "Publish Repository"

## Option 3: Manual Git Commands

If Git is installed, open PowerShell in this folder and run:

```powershell
git init
git remote add origin https://github.com/Atharvapalve/Portfolio-Website.git
git add .
git commit -m "Portfolio website with 3D Spaceship scene"
git branch -M main
git push -u origin main
```

## Troubleshooting

- **"git is not recognized"**: Git is not installed or not in PATH. Install Git and restart terminal.
- **"Authentication failed"**: Use a Personal Access Token instead of password.
- **"Repository not found"**: Make sure the repository exists at https://github.com/Atharvapalve/Portfolio-Website
- **"Updates were rejected"**: The remote has content. Run: `git pull origin main --allow-unrelated-histories` first

