# 📋 Smart Portfolio - IMPLEMENTATION PLAN (Phase-by-Phase)

PRD, UI 명세, Tech Stack을 종합하여 도출한 단계별 개발 로드맵입니다.
각 Phase는 이전 단계의 완료를 전제로 진행됩니다.

---

## Phase 1: 프로젝트 초기 설정 (Project Initialization)
> **목표**: 개발 환경을 구축하고 기본 레이아웃을 완성하여 뼈대를 잡습니다.

- [ ] **Next.js 프로젝트 생성**: `npx create-next-app@latest` (TypeScript, Tailwind, App Router).
- [ ] **Tailwind CSS & Shadcn/UI 설정**: `components.json` 설정 및 기본 폰트(Inter, Outfit) 적용.
- [ ] **Supabase 프로젝트 생성**: Dashboard에서 새 프로젝트 생성 및 환경 변수(`NEXT_PUBLIC_SUPABASE_URL`, `ANON_KEY`) 확보.
- [ ] **DB 스키마 적용**: `schema.sql` 작성 및 Supabase SQL Editor에서 실행 (Tables: `projects`, `skills` 등).
- [ ] **폴더 구조 잡기**: `app/`, `components/`, `lib/`, `types/` 등 디렉토리 정리.
- [ ] **공통 레이아웃 구현**:
    - [ ] `Header` (Navigation) 컴포넌트 제작.
    - [ ] `Footer` 컴포넌트 제작.
    - [ ] `RootLayout`에 다크 모드(Theme Provider) 적용.

## Phase 2: 코어 데이터 관리 (Database & Admin)
> **목표**: 포트폴리오 데이터를 관리할 수 있는 백오피스 기능을 먼저 구현합니다. (데이터가 있어야 프론트를 그릴 수 있음)

- [ ] **인증 시스템 구축**: `Supabase Auth` 연동 (로그인 페이지 `/admin/login`).
- [ ] **관리자 접근 제어**: Middleware 작성하여 허용된 이메일만 `/admin` 접근 가능하도록 설정.
- [ ] **관리자 레이아웃**: 사이드바(Sidebar)가 포함된 Admin 전용 레이아웃 구성.
- [ ] **프로젝트 관리 기능 (CRUD)**:
    - [ ] 프로젝트 목록 조회 테이블.
    - [ ] 프로젝트 추가/수정 폼 (이미지 업로드 포함).
    - [ ] 프로젝트 삭제 기능.
- [ ] **스킬/프로필 관리**: 자기소개 및 기술 스택 수정 기능.

## Phase 3: 사용자 화면 구현 (User Interface)
> **목표**: 방문자에게 보여질 메인 페이지와 상세 페이지를 매력적으로 구현합니다.

- [ ] **메인 페이지 (/) 구현**:
    - [ ] `Hero Section`: 자기소개 및 CTA 버튼.
    - [ ] `Skills Section`: 관리자에서 입력한 스택 데이터 렌더링.
    - [ ] `Projects Section`: 프로젝트 카드 그리드 및 카테고리 필터링.
    - [ ] `Career Section`: 경력 타임라인.
- [ ] **프로젝트 상세 페이지 (/project/[id]) 구현**:
    - [ ] 동적 라우팅 설정.
    - [ ] 프로젝트 상세 데이터 페칭 (SSG/ISR 고려).
    - [ ] 미디어 갤러리 (이미지 슬라이더) 구현.
    - [ ] 이전/다음 프로젝트 네비게이션.

## Phase 4: AI 챗봇 & RAG 파이프라인 (AI Integration)
> **목표**: 포트폴리오 데이터를 학습한 AI 챗봇을 연동합니다.

- [ ] **API 라우트 구축**: `/api/chat` 엔드포인트 생성 (`streamText` 활용).
- [ ] **RAG 시스템 구현**:
    - [ ] `Vector Store` 설정 (Supabase pgvector).
    - [ ] 임베딩 생성 스크립트 (Admin에서 텍스트/PDF 업로드 시).
    - [ ] 사용자 질문 → 임베딩 → 유사도 검색(Similiarity Search) 로직 구현.
- [ ] **챗봇 UI 위젯 구현**:
    - [ ] 플로팅 버튼 및 채팅 윈도우 컴포넌트.
    - [ ] 메시지 스트리밍 UI 연동.
    - [ ] 컨텍스트 주입 (현재 보고 있는 프로젝트 정보 전송).

## Phase 5: 최적화 및 배포 (Polish & Deploy)
> **목표**: 성능을 다듬고 실제 서비스로 런칭합니다.

- [ ] **SEO 최적화**:
    - [ ] `Metadata` API 활용하여 Open Graph(OG) 태그 및 Title/Description 설정.
    - [ ] `sitemap.xml` 및 `robots.txt` 생성.
- [ ] **반응형 디자인 점검**: 모바일 기기에서의 UI 깨짐 확인 및 수정.
- [ ] **배포 (Vercel)**:
    - [ ] GitHub Repository 연결.
    - [ ] Vercel 환경 변수 입력.
    - [ ] 프로덕션 배포 및 도메인 연결.
- [ ] **최종 테스트**:
    - [ ] 챗봇 응답 정확도 테스트.
    - [ ] 리드(Lead) 수집 데이터 확인.
