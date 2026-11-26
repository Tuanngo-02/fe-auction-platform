# Quy trình điều phối 3 vai

| Vai | Công cụ | Việc | Ghi vào |
|---|---|---|---|
| Orchestrator / Planner | Claude | Lập kế hoạch, chia task, viết tiêu chí chấp nhận, quyết định merge | `.ai/PLAN.md`, `.ai/STATUS.md`, `.ai/tasks/` |
| Executor | Antigravity CLI (`agy`) | Viết code theo task | code + `.ai/reports/` |
| Verifier | Codex CLI (`codex`) | Kiểm chứng, chạy test, review | `.ai/reviews/` |

## Vòng đời 1 task
```
TODO ──(execute)──► IN_REVIEW ──(verify)──► APPROVED ──(Claude chốt, bạn commit)──► DONE
                         ▲                     │
                         └── CHANGES_REQUESTED ┘   (tối đa 3 vòng, quá thì trả về Claude)
```

## Cách chạy (PowerShell, đứng ở thư mục gốc repo)
```powershell
# Chạy trọn vòng execute -> verify, tự lặp tối đa 3 lần
powershell -ExecutionPolicy Bypass -File .ai\scripts\run.ps1 -Task TASK-001

# Hoặc chạy lẻ từng bước
powershell -ExecutionPolicy Bypass -File .ai\scripts\execute.ps1 -Task TASK-001
powershell -ExecutionPolicy Bypass -File .ai\scripts\verify.ps1  -Task TASK-001
```
Sau khi có `VERDICT: APPROVED`, báo lại cho Claude: "TASK-001 xong". Claude đọc report + review, cập nhật STATUS/PLAN, đề xuất commit message và giao task tiếp theo.

## Thư mục
- `tasks/` — đề bài (chỉ Claude viết)
- `reports/` — báo cáo của executor
- `reviews/` — kết luận của verifier
- `roles/` — luật cho từng vai
- `templates/` — mẫu task
- `scripts/` — script gọi CLI
