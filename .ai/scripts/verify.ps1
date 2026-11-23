
param([Parameter(Mandatory=$true)][string]$Task)
$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$repo = Split-Path -Parent (Split-Path -Parent $PSScriptRoot)
Set-Location $repo
if (-not (Get-Command codex -ErrorAction SilentlyContinue)) { throw "codex CLI not found in PATH" }
$review = ".ai/reviews/$Task.review.md"

function Get-Snapshot { if (Test-Path .git) { (git status --porcelain -- . ':!.ai'; git diff -- . ':!.ai') -join "`n" } else { "" } }
$before = Get-Snapshot

$prompt = "You are the VERIFIER. Read AGENTS.md and .ai/roles/verifier.md and follow them strictly. " +
  "Verify task .ai/tasks/$Task.md against the executor report .ai/reports/$Task.report.md. " +
  "Inspect the real changes with git status and git diff, run the commands in the task section Kiem tra. " +
  "Do NOT modify any source file. " +
  "Your final message must be the full review in the exact format from .ai/roles/verifier.md, written in Vietnamese, with a standalone line VERDICT: APPROVED or VERDICT: CHANGES_REQUESTED."

Write-Host "==> [VERIFIER] codex reviewing $Task ..." -ForegroundColor Yellow
& codex exec --sandbox workspace-write --output-last-message $review $prompt | Out-Host

$after = Get-Snapshot
if ($before -ne $after) { Write-Warning "Working tree changed during verification! Verifier may have edited files - check git diff." }

if (-not (Test-Path $review)) { throw "No review produced" }
$verdict = (Select-String -Path $review -Pattern '^\s*VERDICT:\s*(\w+)' | Select-Object -First 1).Matches.Groups[1].Value
if (-not $verdict) { $verdict = 'UNKNOWN' }
Write-Host "==> VERDICT: $verdict" -ForegroundColor Green
return $verdict
