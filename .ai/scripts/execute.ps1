
param([Parameter(Mandatory=$true)][string]$Task)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo
$taskFile = ".ai/tasks/$Task.md"
if (-not (Test-Path $taskFile)) { throw "Task file not found: $taskFile" }
if (-not (Get-Command agy -ErrorAction SilentlyContinue)) { throw "agy (Antigravity CLI) not found in PATH" }

$prompt = "You are the EXECUTOR. Read AGENTS.md and .ai/roles/executor.md and follow them strictly. " +
  "Implement the task in $taskFile. " +
  "If .ai/reviews/$Task.review.md exists and says VERDICT: CHANGES_REQUESTED, fix exactly the numbered items in it. " +
  "Run the commands in the task section Kiem tra. " +
  "Finally write your report to .ai/reports/$Task.report.md using the format in .ai/roles/executor.md (write it in Vietnamese). " +
  "Do not commit."

Write-Host "==> [EXECUTOR] agy working on $Task ..." -ForegroundColor Cyan
& agy -p $prompt --mode accept-edits
if (-not (Test-Path ".ai/reports/$Task.report.md")) { Write-Warning "Executor did not write .ai/reports/$Task.report.md" }
