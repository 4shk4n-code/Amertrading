# Auto commit and push script for AMER Trading
Write-Host "Starting auto commit and push..." -ForegroundColor Green

# Try to find Git
$gitPath = $null
$possiblePaths = @(
    "C:\Program Files\Git\bin\git.exe",
    "C:\Program Files (x86)\Git\bin\git.exe",
    "$env:LOCALAPPDATA\Programs\Git\bin\git.exe",
    "git"
)

foreach ($path in $possiblePaths) {
    if ($path -eq "git") {
        try {
            $result = Get-Command git -ErrorAction Stop
            $gitPath = "git"
            break
        } catch {
            continue
        }
    } else {
        if (Test-Path $path) {
            $gitPath = $path
            break
        }
    }
}

if (-not $gitPath) {
    Write-Host "ERROR: Git not found. Please install Git for Windows:" -ForegroundColor Red
    Write-Host "https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Or add Git to your PATH and try again." -ForegroundColor Yellow
    exit 1
}

Write-Host "Found Git at: $gitPath" -ForegroundColor Green
Write-Host ""

# Get current branch
$branch = & $gitPath rev-parse --abbrev-ref HEAD
Write-Host "Current branch: $branch" -ForegroundColor Cyan

# Check if there are changes
$status = & $gitPath status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "No changes to commit." -ForegroundColor Yellow
    exit 0
}

Write-Host "Changes detected:" -ForegroundColor Cyan
Write-Host $status
Write-Host ""

# Add all changes
Write-Host "Adding all changes..." -ForegroundColor Green
& $gitPath add .

# Commit with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
$commitMessage = "Auto commit: Update homepage and layout - $timestamp"
Write-Host "Committing with message: $commitMessage" -ForegroundColor Green
& $gitPath commit -m $commitMessage

if ($LASTEXITCODE -ne 0) {
    Write-Host "Commit failed. Check for errors above." -ForegroundColor Red
    exit 1
}

# Push to remote
Write-Host "Pushing to origin/$branch..." -ForegroundColor Green
& $gitPath push origin $branch

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "Successfully pushed to origin/$branch!" -ForegroundColor Green
    Write-Host "Deployment should start automatically if configured." -ForegroundColor Cyan
} else {
    Write-Host "Push failed. Check for errors above." -ForegroundColor Red
    exit 1
}

