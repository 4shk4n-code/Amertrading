# Copy Website Project Script
# Usage: .\copy-project.ps1

$source = "E:\AmerTrading\amertrading-web"
$destination = "E:\AmerTrading\amertrading-web-copy"

Write-Host "📦 Copying project from: $source"
Write-Host "📁 To: $destination"
Write-Host ""

# Create destination folder if it doesn't exist
if (-not (Test-Path $destination)) {
    New-Item -ItemType Directory -Path $destination | Out-Null
}

# Copy files excluding node_modules, .next, out, .git
Write-Host "Copying files (excluding node_modules, .next, out, .git)..."
robocopy $source $destination /E /XD node_modules .next out .git /XF .env.local /NFL /NDL /NJH /NJS

Write-Host ""
Write-Host "✅ Project copied successfully!"
Write-Host ""
Write-Host "📋 Next steps:"
Write-Host "1. cd $destination"
Write-Host "2. npm install"
Write-Host "3. Copy .env.local from original location (or create new one)"
Write-Host "4. npm run dev"
Write-Host ""
Write-Host "💡 To run on different port: PORT=3001 npm run dev"

