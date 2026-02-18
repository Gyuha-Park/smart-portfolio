# 🎯 Smart Portfolio - MVP SCOPE & ROADMAP

PRD와 구현 계획을 바탕으로 **MVP(최소 기능 제품)**와 **확장 기능(Expansion)**을 구분한 문서입니다.
초기 개발 단계에서는 `[MVP]` 태그가 붙은 항목에 집중하여 빠르게 배포 가능한 상태를 만듭니다.

## 🏁 MVP 기준 (Criteria)
1.  **메인 페이지**: 히어로, 스킬, 프로젝트 목록이 정상적으로 표시된다.
2.  **프로젝트 탐색**: 프로젝트 카드를 클릭하여 상세 내용을 볼 수 있다.
3.  **AI 챗봇**: 방문자의 질문에 RAG 기반으로 답변할 수 있다.
4.  **관리자 기능**: 소유자가 프로젝트와 프로필 데이터를 직접 관리할 수 있다.

---

## Phase 1: 프로젝트 초기 설정 (Initialization)
- [MVP] **Next.js 프로젝트 생성** (TypeScript, Tailwind, App Router)
- [MVP] **Supabase 프로젝트 연결** 및 환경 변수 설정
- [MVP] **기본 폴더 구조 및 라우팅** 설정
- [MVP] **공통 레이아웃** 구현 (헤더, 푸터)
- [MVP] **DB 스키마 적용** (`projects`, `skills`, `chat_logs` 등 기본 테이블)

## Phase 2: 코어 데이터 관리 (Database & Admin)
- [MVP] **관리자 로그인 페이지** (`/admin/login` + Supabase Auth)
- [MVP] **관리자 대시보드 레이아웃** (사이드바 포함)
- [MVP] **프로젝트 관리 (CRUD)**: 추가, 수정, 삭제, 목록 조회
- [MVP] **이미지 업로드 기능** (Supabase Storage 연동)
- [MVP] **프로필/스킬 데이터 관리** (자기소개, 기술 태그 수정)
- [확장] **리드(Leads) 관리 대시보드** (연락처 수집 내역 조회/상태 변경)

## Phase 3: 사용자 화면 구현 (User Interface)
- [MVP] **메인 페이지 (/)**:
    - [MVP] 히어로 섹션 (소개 + CTA)
    - [MVP] 스킬 섹션 (관리자 데이터 연동)
    - [MVP] 프로젝트 그리드 (썸네일 + 제목 노출)
    - [MVP] 경력 타임라인 표시
- [MVP] **프로젝트 상세 페이지 (/project/[id])**:
    - [MVP] 프로젝트 기본 정보 표시 (제목, 기간, 설명, 기술 스택)
    - [MVP] 메인 이미지 표시
- [확장] **카테고리 필터링 애니메이션** (메인 페이지)
- [확장] **이미지 라이트박스/슬라이더** (상세 페이지)
- [확장] **이전/다음 프로젝트 네비게이션**

## Phase 4: AI 챗봇 & RAG 파이프라인 (AI Integration)
- [MVP] **AI 챗봇 API 구축** (`/api/chat` + Gemini API)
- [MVP] **RAG 시스템 기본 구현** (Supabase pgvector + 임베딩)
- [MVP] **관리자 텍스트/PDF 데이터 업로드** 및 임베딩 처리
- [MVP] **챗봇 플로팅 위젯 UI** (메시지 전송/수신, 스트리밍 표시)
- [확장] **맥락 기반 질문 추천** (상세 페이지 진입 시 관련 질문 칩 표시)
- [확장] **능동형 세일즈 트리거** (스크롤 시 먼저 말 걸기)

## Phase 5: 최적화 및 배포 (Polish & Deploy)
- [MVP] **반응형 디자인 적용** (모바일/데스크톱 대응)
- [MVP] **기본 SEO 설정** (Title, Description 메타 태그)
- [MVP] **Vercel 프로덕션 배포** 및 도메인 연결
- [확장] **sitemap.xml 및 robots.txt 자동 생성**
- [확장] **소셜 미디어 공유용 Open Graph 이미지 자동 생성**
