# 3. 비기능 요구사항 및 기술 스펙 (Non-functional & Tech Specs)

본 문서는 [PRD_Master_Index](./PRD_Master_Index.md)의 하위 문서입니다.

## 3.1 비기능 요구사항 (Non-functional Requirements)

### ⚡ 성능 (Performance)
- **응답 속도**: AI 답변 생성은 평균 **3초 이내**에 시작되어야 함 (Streaming 적용 필수).
- **RAG 검색 정확도**: 사용자 질문에 대해 상위 3개의 관련 청크(Chunk)를 정확히 찾아내야 함.
- **이미지 최적화**: 프로젝트 목록의 썸네일 이미지는 Next.js Image 컴포넌트를 사용하여 로딩 속도를 최적화해야 함 (LCP 2.5초 이내).

### 🔒 보안 (Security)
- **데이터 보호**: 업로드된 포트폴리오 파일은 외부에서 직접 다운로드할 수 없도록 접근 제어(Private Bucket) 적용.
- **Row Level Security (RLS)**: Supabase RLS를 적용하여, 내 대시보드와 리드 정보는 오직 나(소유자)만 볼 수 있어야 함.
- **접근 통제**: 관리자 페이지는 허용된 이메일 계정 외에는 절대 접근 불가능해야 함.

### 📱 UI/UX (Mobile First)
- **★★모바일 최적화 필수 (Mobile Optimization)**:
    - 채용 담당자와 클라이언트의 50% 이상이 모바일 기기로 접근할 것으로 예상됨.
    - **프로젝트 뷰**: 모바일에서는 1열(Column) 그리드로, 데스크탑에서는 3~4열 그리드로 반응형 동작.
    - **상세 페이지**: 작은 화면에서도 이미지 슬라이더와 텍스트 가독성이 확보되어야 함.
    - 터치 타겟(버튼 크기)은 최소 44px 이상이어야 하며, 키보드가 올라왔을 때 채팅 입력창이 가려지지 않아야 함.

---

## 3.2 기술 제약사항 (Technical Constraints)

### 🛠️ Tech Stack
| 구분 | 기술 스택 | 선정 이유 |
| :--- | :--- | :--- |
| **Frontend** | **Next.js (App Router)** | SEO 최적화, Vercel 배포 용이성, React 생태계 활용 |
| **Deployment** | **Vercel** | Free Tier 제공, Serverless Function 지원, CI/CD 자동화 |
| **Database** | **Supabase** | PostgreSQL(프로젝트 메타데이터), Storage(이미지), pgvector(벡터 검색), Auth 무료 제공 |
| **AI / LLM** | **Google Gemini API** | `gemini-1.5-flash` 모델 사용 시 매우 저렴하고 빠름, 긴 문맥 처리 가능 |
| **Embedding** | **Google Gemini Embedding** | LLM과 동일한 생태계 사용으로 호환성 확보 (`text-embedding-004`) |

### 💰 비용 제약 (Cost Limits)
- **초기 운영 비용 $0 목표**:
    - Vercel Hobby Plan (무료)
    - Supabase Free Tier (500MB DB)
    - Gemini API Free Tier (분당 15회 요청 제한 내에서 MVP 가동 / 필요시 Pay-as-you-go 전환)

---

## 3.3 성공 기준 (MVP Completion Criteria)

이 프로젝트가 '완성'되었다고 판단하기 위한 최소 조건입니다.

1.  **회원가입/로그인 및 보안**: 특정 이메일 소유자만 관리자 페이지에 접근할 수 있다.
2.  **프로젝트 등록 및 전시**: 관리자가 프로젝트(제목, 내용, 이미지)를 등록하면, 메인 프로젝트 목록과 상세 페이지에 정상적으로 노출된다.
3.  **PDF 업로드 및 학습**: 사용자가 PDF를 올리면, 텍스트가 추출되어 Vector DB에 저장된다.
4.  **질의응답 성공 및 예외처리**: 포트폴리오 관련 질문에는 정확히 답변하고, 무관한 질문은 정중히 거절한다.
5.  **모바일 사용성**: 스마트폰에서도 프로젝트 탐색, 상세 보기, 채팅, 리드 확인이 완벽하게 가능하다.
6.  **리드 수집**: 대화 중 방문자가 이메일을 남기면, 관리자 대시보드 리스트에 해당 이메일이 즉시 표시된다.
