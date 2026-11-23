
param([Parameter(Mandatory=$true)][string]$Task, [int]$MaxRounds = 3)
$ErrorActionPreference = 'Stop'
for ($i = 1; $i -le $MaxRounds; $i++) {
  Write-Host "######## $Task - round $i / $MaxRounds ########" -ForegroundColor Magenta
  & "$PSScriptRoot/execute.ps1" -Task $Task
  $report = Join-Path (Split-Path -Parent $PSScriptRoot) "reports/$Task.report.md"
  if ((Test-Path $report) -and (Select-String -Path $report -Pattern 'STATUS:\s*BLOCKED' -Quiet)) {
    Write-Host "Executor is BLOCKED - send the report to Claude (orchestrator)." -ForegroundColor Red; exit 2
  }
  $v = & "$PSScriptRoot/verify.ps1" -Task $Task | Select-Object -Last 1
  if ($v -eq 'APPROVED') { Write-Host "$Task APPROVED. Tell Claude so it can update the plan." -ForegroundColor Green; exit 0 }
}
Write-Host "$Task not approved after $MaxRounds rounds - escalate to Claude." -ForegroundColor Red
exit 1
