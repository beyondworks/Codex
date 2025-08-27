Creator-Pulse Supabase 배포 가이드 (MVP)

1) 프로젝트 생성 및 환경변수 설정
- Supabase 프로젝트 생성 후 대시보드에서 Project URL과 anon/service role 키 확인
- 다음 환경변수를 프로젝트에 설정

```
SUPABASE_URL=your-project-url (e.g. https://rovkcrtpnknwdujebfca.supabase.co)
SUPABASE_ANON_KEY=public anon key
SUPABASE_SERVICE_ROLE_KEY=service role key (Edge Function 내부 전용)
KAKAO_REST_API_KEY=카카오 비즈니스 REST API 토큰 (선택)
```

로컬 개발 시에는 supabase/.env 또는 Supabase CLI의 functions/.env를 사용하세요.

2) 데이터베이스 마이그레이션
- KV 저장소 테이블 생성

```sql
-- supabase/migrations/0001_create_kv_store_e8bed437.sql
CREATE TABLE IF NOT EXISTS kv_store_e8bed437 (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_kv_store_key_prefix ON kv_store_e8bed437 (key text_pattern_ops);
```

Supabase SQL Editor에서 실행하거나, CLI로 실행하세요.

3) Edge Function 배포
- 함수 경로: supabase/functions/make-server-e8bed437/index.ts
- 의존성: hono, @supabase/supabase-js

CLI 예시:

```bash
supabase functions deploy make-server-e8bed437 --project-ref <PROJECT_REF>
# 환경변수 설정
supabase secrets set --env-file supabase/.env --project-ref <PROJECT_REF>
```

4) 클라이언트 연동
- 프런트에서 호출 URL: https://<projectId>.supabase.co/functions/v1/kakao/...
- Authorization 헤더에 Bearer <SUPABASE_ANON_KEY> 포함

5) 허용 오리진
- CORS 허용 도메인: https://void-ethics-85191026.figma.site, http://localhost:5173, http://localhost:3000
- 필요 시 supabase/functions/make-server-e8bed437/index.ts의 allowedOrigins를 수정하세요.

6) 크론/스케줄러 (선택)
- /kakao/check-trends, /kakao/weekly-reports 엔드포인트를 Supabase Scheduler로 주기 호출 설정 가능

---
- 레포: https://github.com/beyondworks/Creator-Pulse
- 퍼블릭 프리뷰/디자인: https://void-ethics-85191026.figma.site


