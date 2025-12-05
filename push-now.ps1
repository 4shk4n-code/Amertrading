# Force push script
$ErrorActionPreference = "Stop"

Write-Host "Pushing to GitHub..." -ForegroundColor Green
Write-Host "Repository: https://github.com/4shk4n-code/Amertrading.git" -ForegroundColor Cyan
Write-Host ""

# Try push with verbose output
& "C:\Program Files\Git\bin\git.exe" push -v origin master 2>&1 | ForEach-Object {
    Write-Host $_ -ForegroundColor Yellow
}

$exitCode = $LASTEXITCODE

if ($exitCode -eq 0) {
    Write-Host ""
    Write-Host "SUCCESS! Changes pushed to GitHub!" -ForegroundColor Green
    Write-Host "Your website should deploy automatically if connected to Vercel or your hosting service." -ForegroundColor Cyan
} else {
    Write-Host ""
    Write-Host "Push may require authentication." -ForegroundColor Yellow
    Write-Host "Please run this command manually in Git Bash or PowerShell:" -ForegroundColor Yellow
    Write-Host "  git push origin master" -ForegroundColor White
    Write-Host ""
    Write-Host "Or use GitHub Desktop if you have it installed." -ForegroundColor Yellow
}

exit $exitCode

