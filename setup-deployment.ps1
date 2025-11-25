# PowerShell script to generate SSH keys for deployment

Write-Host ""
Write-Host "=== Auto-Deployment Setup Helper ===" -ForegroundColor Cyan
Write-Host ""

# Check if SSH directory exists
$sshDir = "$env:USERPROFILE\.ssh"
if (-not (Test-Path $sshDir)) {
    New-Item -ItemType Directory -Path $sshDir -Force | Out-Null
    Write-Host "[OK] Created .ssh directory" -ForegroundColor Green
}

# Key paths
$privateKeyPath = "$sshDir\github_deploy"
$publicKeyPath = "$sshDir\github_deploy.pub"

# Check if key exists
if (Test-Path $privateKeyPath) {
    Write-Host "[WARNING] SSH key already exists" -ForegroundColor Yellow
    $overwrite = Read-Host "Overwrite? (y/N)"
    if ($overwrite -eq "y" -or $overwrite -eq "Y") {
        Remove-Item $privateKeyPath -Force -ErrorAction SilentlyContinue
        Remove-Item $publicKeyPath -Force -ErrorAction SilentlyContinue
    }
}

# Generate key if needed
if (-not (Test-Path $privateKeyPath)) {
    Write-Host "[INFO] Generating SSH key..." -ForegroundColor Cyan
    $null = ssh-keygen -t ed25519 -C "github-deploy" -f $privateKeyPath -N '""'
    Write-Host "[OK] SSH key generated" -ForegroundColor Green
}

# Display keys
Write-Host ""
Write-Host "=== PUBLIC KEY (for VPS) ===" -ForegroundColor Yellow
Write-Host ""
Get-Content $publicKeyPath
Write-Host ""

Write-Host "=== PRIVATE KEY (for GitHub Secrets) ===" -ForegroundColor Yellow
Write-Host ""
Get-Content $privateKeyPath
Write-Host ""

# Save to files
$publicKeyFile = "vps-public-key.txt"
$privateKeyFile = "github-private-key.txt"

Get-Content $publicKeyPath | Out-File -FilePath $publicKeyFile -Encoding UTF8
Get-Content $privateKeyPath | Out-File -FilePath $privateKeyFile -Encoding UTF8

Write-Host "[OK] Keys saved to:" -ForegroundColor Green
Write-Host "  - $publicKeyFile" -ForegroundColor Gray
Write-Host "  - $privateKeyFile" -ForegroundColor Gray
Write-Host ""
Write-Host "[WARNING] Delete these files after setup!" -ForegroundColor Red
Write-Host ""
