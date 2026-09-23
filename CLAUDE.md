# CLAUDE.md — 천일지붕(CHUNIL ROOF) 프로젝트 작업 지침

> 이 파일은 Claude Code가 세션 시작 시 자동으로 읽습니다.
> PC를 옮겨도 이 파일 하나로 프로젝트 맥락과 작업 규칙이 그대로 이어집니다.
> 추가 세부 기억은 `_handoff/memory/` (복원 시 `~/.claude/projects/<경로슬러그>/memory/`)와 `docs/대화기록-*.md` 참고.

---

## 1. 프로젝트 개요

- **천일지붕 (CHUNIL ROOF)** — 징크 지붕공사 전문업체 웹사이트
- 정적 단일 페이지 사이트: `index.html`, `style.css`, `main.js` (+ `privacy.html`)
- 디자인: 다크 시네마틱 + 앰버 포인트 (`#E8A849`). 히어로 아래는 PREFA 스타일 밝음/어두움 교차 섹션 (2026-03 리디자인 완료)
- 폰트: Cormorant Garamond(serif), Inter(sans), Noto Sans KR
- 이미지/영상: `/pic/` (1.jpeg ~ 10.jpg, hero-bg.mp4, logo.png 등)
- 이미지 가공 도구: `sharp` + `ffmpeg` (`package.json`, `node_modules/`는 gitignore)

## 2. 호스팅 / 배포

- **Cloudflare Pages** (`roof-cle.pages.dev`) — GitHub `jjlist002/roof` **main 브랜치 push 시 자동 배포**. Firebase 아님 (`firebase-debug.log`는 과거 흔적)
- 라이브 도메인: **chunilroof.com** (2026-08 이전 완료). 구 도메인 `misotechne.co.kr` → 301 리다이렉트 설정됨
- Cloudflare Pages **파일당 25MB 제한** — 이미지/영상 추가 시 주의
- 문의 폼: **Web3Forms API** (mailto 아님). access key는 `main.js`에 있고 **공개되어도 안전한 public key**임. 실제 수신처는 코드가 아니라 Web3Forms 대시보드에서 결정됨
- 분석: GA `G-6C163FQBC6`

## 3. 작업 규칙 (사용자 지침 — 반드시 지킬 것)

### 3.1 변경 후 항상 자동 commit + push
코드 수정이 끝나면 별도 요청 없이 바로 `git add` → `commit` → `push`까지 완료하고 결과를 보고한다.
사용자가 매번 푸시를 따로 요청하길 원하지 않음. push하면 Cloudflare Pages가 자동 배포됨.

### 3.2 포인트 컬러는 주황(amber `#E8A849`)으로 통일
- 버튼·태그·CTA 등 모든 포인트 컬러는 `var(--amber)` 계열 사용. **빨강(`#d32f2f`)을 다시 쓰지 말 것**
- 복원이 필요할 경우 이전 빨강 설정값:
  - `--red-accent: #d32f2f`
  - `.btn-red { background:#d32f2f; color:#fff }` → hover `#b71c1c`
  - `.sol-tag { border:1px solid #d32f2f; color:#d32f2f }`

### 3.3 모델 위임
총괄(오케스트레이션·최종 판단·코드 수정)은 메인 세션이 직접 수행하고,
**기획·분석·자료조사성 작업은 Agent 도구로 Opus 서브에이전트(`model: "opus"`)에 위임**한 뒤 결과를 종합한다.

### 3.4 GitHub 인증 만료 시 (device flow)
`git push`에서 "Invalid username or token" 오류가 나면 **사용자에게 PAT 발급을 시키지 말고** device flow로 재인증한다.
사용자는 비개발자이므로 **URL과 8자리 코드만** 주면 브라우저에서 승인해 준다.

1. `curl -s -X POST https://github.com/login/device/code -H "Accept: application/json" -d "client_id=178c6fc778ccc68e1d6a&scope=repo"`
2. 응답의 `verification_uri`(https://github.com/login/device)와 `user_code`(예: XXXX-XXXX)를 크게 보여주고 승인 요청
3. 5초 간격으로 `https://github.com/login/oauth/access_token`에 device_code 폴링 (`grant_type=urn:ietf:params:oauth:grant-type:device_code`). `authorization_pending`/`slow_down`은 계속 대기
4. 토큰 수신 시: `git config --global credential.helper store` + `~/.git-credentials`에 `https://jjlist002:<token>@github.com` 저장(chmod 600) → push

### 3.5 커뮤니케이션
- 사용자는 **비개발자**. 설명은 한국어로, 전문용어는 풀어서 설명한다.
- 사용자가 직접 해야 하는 작업(대시보드 설정 등)은 단계별로 명확히 안내한다.

## 4. 주요 파일

| 파일 | 내용 |
|------|------|
| `index.html` | 메인 페이지 (히어로, 시공분야, 포트폴리오, 프로세스, 문의, 푸터, JSON-LD) |
| `style.css` | 전체 스타일 |
| `main.js` | 스크롤·네비·문의 폼(Web3Forms)·플로팅 버튼 로직 |
| `privacy.html` | 개인정보처리방침 |
| `sitemap.xml`, `robots.txt`, `site.webmanifest` | SEO/PWA |
| `docs/대화기록-*.md` | 과거 작업 맥락 기록 |
| `pic/` | 이미지·영상 자산 |

## 5. 연락처 / 계정

- 전화: **010-7270-6053**
- 이메일: **bodigadj@naver.com** (2026-05 misotechne@naver.com에서 변경)
- 블로그: blog.naver.com/misotechne
- 카카오톡 오픈채팅: open.kakao.com/o/sZz7Nn4h
- GitHub: https://github.com/jjlist002/roof (jjlist002 / jjlist002@gmail.com)

## 6. 진행 중 / 남은 작업

### 시공사례 페이지 (SEO 핵심 과제)
사용자가 시공사례를 다수 등록할 예정. 단일 페이지라 "지역명+자재" 검색어를 잡을 페이지가 없는 것이 약점.
- **전달 방식**: 사진을 `pic/cases/<사례명>/`에 넣고 채팅으로 정보(위치/지역, 자재, 건물 종류, 시공 내용, 시기) 전달 → 또는 네이버 블로그 글 링크를 주면 WebFetch로 읽어 생성
- **구현 방향**: 사례별 개별 HTML(`cases/<slug>.html`) 생성 → 지역+자재 롱테일 키워드 title/description → `sitemap.xml` 등록 → 메인 `#portfolio`에서 링크 → 사진은 sharp로 웹용 압축(25MB 제한 주의)
- 첫 몇 건으로 페이지 디자인 틀부터 잡아 보여주기로 합의됨

### 도메인 이전 잔여 (chunilroof.com, 2026-08)
- [x] Cloudflare 존 추가 / NS: `keaton.ns.cloudflare.com`, `poppy.ns.cloudflare.com`
- [x] Pages 커스텀 도메인 연결, 코드 도메인 교체(2e9c626), 301 리다이렉트
- [~] Google Search Console: 신규 속성 등록·sitemap 제출 완료. **기존 속성 '주소 변경' 도구 실행은 사용자 진행 중**
- [ ] **네이버 서치어드바이저**: chunilroof.com 신규 등록·소유확인·sitemap 제출 (주소 변경 도구 없음)
- [ ] **Web3Forms** 등 외부 서비스의 도메인 제한 설정 갱신 확인

### 기타 권장
- [ ] `og-image.png` 1.25MB → 압축 (카톡/SNS 공유 속도)
- [ ] Web3Forms 대시보드에 Allowed Domains 설정 + hCaptcha 활성화 (키 도용·스팸 차단)

## 7. 저장소 주의사항

- `.gitignore`: `node_modules/`, `backup.zip`, `*.log`, `pic/plan.png`, `.claude/`
- `.claude/settings.local.json`(권한 설정)은 gitignore라 GitHub에 없음 → 이전 패키지 `_handoff/`에 포함되어 있음
- `pic/blueprint-bg.jpg`는 로컬 수정 상태지만 사이트 미사용 — 그대로 둠

## 8. 로컬 환경 (2026-09-23 이전 완료)

- 로컬 경로 `E:\Firebase_Studio\roof` (Windows 11). 기억 파일은 `~/.claude/projects/E--Firebase-Studio-roof/memory/`에 복원됨
- git push 인증은 Windows **Git Credential Manager**가 처리함 (`~/.git-credentials` 없음). 만료 시 3.4 절차
- 도구 확인: node 24, npm 11, sharp(프리빌드 정상), ffmpeg 9. npm 11은 install 스크립트를 기본 차단하지만 sharp는 문제없음

## 9. 현재 상태 (2026-09-23 세션 마무리)

- 당장 해야 할 작업 없음. 사이트는 정상 배포 중이며 몇 달간 변경 없이 운영 중
- 6절의 "남은 작업"은 **참고 목록**이다. 특히 시공사례 페이지(2026-07 합의)와 Web3Forms 대시보드 설정은 **사용자가 먼저 꺼내기 전에는 권하지 말 것** — 사용자가 "추후 다시 물어보겠다"고 보류함
- 세션은 사용자가 요청하는 작업부터 시작한다
