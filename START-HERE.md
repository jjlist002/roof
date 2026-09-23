# 로컬(VS Code)에서 이어서 작업하기 — 시작 안내

천일지붕(CHUNIL ROOF) 프로젝트 이전 패키지입니다.
압축을 풀고 **아래 3단계만** 하면 이전 대화의 맥락·지침·기억이 그대로 이어집니다.

---

## 0. 압축 풀기

원하는 위치에 풀어주세요. 예)
- Windows: `C:\dev\roof`
- macOS: `~/dev/roof`

> 폴더 경로에 **한글이나 공백이 없는 곳**을 권장합니다.

---

## 1. Claude Code(CLI) 설치 — 이미 있으면 건너뛰기

터미널(VS Code 하단 터미널)에서:

```bash
npm install -g @anthropic-ai/claude-code
```

설치 후 프로젝트 폴더에서 `claude` 를 실행하면 로그인 안내가 나옵니다. (Claude 계정으로 로그인)

---

## 2. 기억(메모리) 복원 — 딱 한 번만 실행

프로젝트 폴더에서 터미널을 열고:

**macOS / Linux**
```bash
bash _handoff/restore.sh
```

**Windows (PowerShell)**
```powershell
powershell -ExecutionPolicy Bypass -File _handoff\restore.ps1
```

이 스크립트가 하는 일:
- 이전 세션의 기억 파일 7개를 `~/.claude/projects/<현재경로>/memory/` 로 복사
- 도구 사용 권한 설정(`.claude/settings.local.json`) 복원 → 매번 허용 묻는 것을 줄여줌

---

## 3. 작업 시작

```bash
claude
```

프로젝트 폴더에서 실행하면 **`CLAUDE.md`를 자동으로 읽어** 프로젝트 개요·작업 규칙(자동 push, 포인트 컬러 통일, 모델 위임, GitHub 재인증 절차 등)·남은 할 일을 그대로 파악합니다.

첫 메시지로 이렇게 물어보면 바로 확인됩니다:
> "CLAUDE.md랑 기억 읽고, 지금 남은 작업이 뭔지 정리해줘"

---

## 참고 — 이 패키지에 들어있는 것

| 위치 | 내용 |
|------|------|
| `CLAUDE.md` | **핵심.** 프로젝트 지침·규칙·남은 작업 (Claude가 자동 로드) |
| `_handoff/memory/` | 이전 세션 기억 파일 (복원 스크립트가 알맞은 위치로 복사) |
| `_handoff/settings.local.json` | 도구 권한 설정 (GitHub에 없는 파일) |
| `_handoff/restore.sh` / `.ps1` | 복원 스크립트 |
| `docs/대화기록-*.md` | 과거 작업 대화 기록 |
| `.git/` | **git 기록 포함** — 바로 `git push` 가능 (GitHub 연결 유지됨) |
| `index.html` 등 | 사이트 소스 전체 + `pic/` 이미지 자산 |

**빠진 것 (일부러 제외 — 용량 절감)**
- `node_modules/` → 이미지 가공 도구가 필요할 때만 `npm install`
- `backup.zip`(123MB), 로그 파일 → 불필요

---

## GitHub 연결 확인

압축 해제 후 첫 push 때 인증을 물을 수 있습니다. 인증 오류가 나면
Claude에게 **"깃허브 인증 다시 해줘"** 라고 말하면 됩니다.
(URL과 8자리 코드를 알려주는 방식으로 자동 처리됩니다 — `CLAUDE.md` 3.4 참고)

연결 확인:
```bash
git remote -v      # https://github.com/jjlist002/roof.git 이면 정상
git status
```

---

## 배포

`main` 브랜치에 push하면 **Cloudflare Pages가 자동 배포**합니다 (약 1분).
라이브: https://chunilroof.com
