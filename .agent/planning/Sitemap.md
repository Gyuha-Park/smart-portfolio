# 🗺️ Smart Portfolio 사이트맵 (Sitemap)

이 문서는 화면 목록을 기반으로 전체 사이트의 네비게이션 구조와 흐름을 시각화합니다.

## 1. 🌲 페이지 계층 구조 (Hierarchy)

### 🌐 Public Zone (방문자 영역)
```text
메인 (/)
 ├── [섹션] 자기소개 (Hero)
 ├── [섹션] 프로젝트 목록 (Project Grid)
 │    └── 프로젝트 상세 (/project/[id])
 │         └── [기능] AI에게 질문하기 (Context Trigger)
 └── 로그인 (/login)
      └── (성공 시) → 관리자 대시보드 (/admin)
```

### 🔐 Admin Zone (관리자 영역)
*진입 조건: 로그인 세션 유효 시*
```text
관리자 대시보드 (/admin)
 ├── 리드 관리 (/admin/leads)
 │    └── [기능] 리드 상세 보기 & 상태 변경
 ├── 지식 관리 (/admin/knowledge)
 │    └── [기능] PDF/Link 업로드 (RAG 학습)
 ├── 프로젝트 관리 (/admin/projects)
 │    ├── 프로젝트 등록 (/admin/projects/new)
 │    └── 프로젝트 수정 (/admin/projects/[id])
 └── 설정 (/admin/settings)
      └── [기능] AI 페르소나 및 사이트 정보 수정
```

---

## 2. 🧩 공통 요소 (Global Elements)

모든 페이지 또는 특정 영역에서 공통적으로 접근 가능한 UI 요소입니다.

### 🤖 AI 챗봇 위젯 (Floating Widget)
*   **노출 위치**: **Public Zone (`/`, `/project/[id]`)** 우측 하단 고정
*   **기능**:
    *   **Click**: 채팅창 열기/닫기 (Toggle)
    *   **Context Aware**: 현재 보고 있는 페이지(메인 vs 상세)에 따라 인사말 및 추천 질문 변경
    *   **Active**: 스크롤 일정 수준 이상 시 먼저 말 걸기 (Toast Message)

### 🧭 Public Navigation (Header/Footer)
*   **노출 위치**: Public Zone 상단/하단
*   **구성**:
    *   **Header**: 로고 (Home 링크)
    *   **Footer**: Copyright, 관리자 로그인 링크 (작게 배치), 소셜 링크 (GitHub, LinkedIn)

### ⚙️ Admin Navigation (Sidebar/Appbar)
*   **노출 위치**: Admin Zone 좌측 또는 상단
*   **구성**:
    *   대시보드 (Home)
    *   리드 관리 (Leads)
    *   지식 관리 (Knowledge)
    *   프로젝트 관리 (Projects)
    *   설정 (Settings)
    *   **[로그아웃 버튼]**
