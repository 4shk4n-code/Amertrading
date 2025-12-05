# Auto deploy script - runs commit and push, then checks deployment
param(
    [string]$CommitMessage = "Auto deploy: Update website"
)

Write-Host "=== AMER Trading Auto Deploy ===" -ForegroundColor Cyan
Write-Host ""

# Run commit and push
& .\commit-and-push.ps1

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "=== Deployment Status ===" -ForegroundColor Cyan
    Write-Host "Changes have been pushed successfully!" -ForegroundColor Green
    Write-Host ""
    Write-Host "If you're using:" -ForegroundColor Yellow
    Write-Host "  - Vercel: Check your Vercel dashboard for deployment status" -ForegroundColor White
    Write-Host "  - GitHub Actions: Check Actions tab in your repository" -ForegroundColor White
    Write-Host "  - Custom VPS: SSH into your server and pull the latest changes" -ForegroundColor White
    Write-Host ""
} else {
    Write-Host "Deployment failed. Please check the errors above." -ForegroundColor Red
    exit 1
}

