# 와튼영어스쿨 월말 리포트 생성기

## 📦 Vercel 배포 방법 (10분이면 완료!)

### 1단계 — Anthropic API 키 발급
1. https://console.anthropic.com 접속 → 회원가입
2. 좌측 메뉴 "API Keys" → "Create Key" 클릭
3. 키 복사해두기 (sk-ant-... 형식)
4. 💳 결제 수단 등록 → 월 사용량 $5~10 수준

### 2단계 — GitHub에 업로드
1. https://github.com 로그인 (없으면 무료 가입)
2. "New repository" → 이름: wharton-report → Create
3. 이 폴더 파일들을 모두 업로드

### 3단계 — Vercel 배포
1. https://vercel.com 접속 → GitHub로 로그인
2. "New Project" → wharton-report 선택 → Import
3. **Environment Variables** 섹션에서:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...` (발급받은 키)
4. "Deploy" 클릭 → 2분 후 완료!

### 4단계 — URL 공유
- Vercel이 자동으로 URL 생성 (예: wharton-report.vercel.app)
- 이 URL을 선생님들에게 카카오톡으로 공유
- 선생님들은 **로그인 없이** 즉시 사용 가능!

---

## 💰 예상 비용
- Vercel 호스팅: **무료** (Hobby 플랜)
- Anthropic API: 리포트 1건당 약 23원
- 선생님 10명 × 월 20명 = 200건 → **약 4,600원/월**

## 🔒 보안
- API 키는 서버 환경변수에만 저장 → 외부에 절대 노출되지 않음
- 사용자 브라우저에서는 키 확인 불가
