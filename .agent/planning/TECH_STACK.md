# 🛠️ Smart Portfolio - FINAL TECH STACK

이 문서는 Smart Portfolio 개발을 위한 **최종 확정된 기술 스택**입니다.
메가 프롬프트 및 초기 설정 시 이 내용을 그대로 참조하십시오.

## 1. Core Framework & Deployment
| 항목 | 내용 |
| :--- | :--- |
| **Name & Version** | **Next.js 15+ (App Router)** |
| **Role** | 풀스택 웹 프레임워크 (Server Actions, RSC 활용) |
| **NPM Packages** | `next@latest`, `react@latest`, `react-dom@latest` |
| **Env Variables** | `NEXT_PUBLIC_APP_URL` (서비스 도메인) |

## 2. Database & Authentication
| 항목 | 내용 |
| :--- | :--- |
| **Name & Version** | **Supabase (PostgreSQL 16+, pgvector v0.8)** |
| **Role** | 관계형 DB, 벡터 스토어, 사용자 인증, 이미지 스토리지 |
| **NPM Packages** | `@supabase/supabase-js`, `@supabase/ssr` |
| **Env Variables** | `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (Admin용) |

## 3. AI & RAG Pipeline
| 항목 | 내용 |
| :--- | :--- |
| **Name & Version** | **Google Gemini 2.5 Flash** + **Vercel AI SDK 6.0** |
| **Role** | 포트폴리오 Q&A 챗봇, RAG 임베딩 및 추론 엔진 |
| **NPM Packages** | `ai`, `@ai-sdk/google`, `@ai-sdk/react` |
| **Env Variables** | `GOOGLE_GENERATIVE_AI_API_KEY` |

## 4. UI/UX & Styling
| 항목 | 내용 |
| :--- | :--- |
| **Name & Version** | **Tailwind CSS v4** + **Shadcn/UI** |
| **Role** | 유틸리티 퍼스트 스타일링 및 재사용 가능한 UI 컴포넌트 |
| **NPM Packages** | `tailwindcss`, `postcss`, `autoprefixer`, `clsx`, `tailwind-merge`, `class-variance-authority`, `lucide-react` |
| **Env Variables** | (N/A) |

## 5. Animation & Effects
| 항목 | 내용 |
| :--- | :--- |
| **Name & Version** | **Framer Motion** |
| **Role** | 페이지 전환, 챗봇 등장 애니메이션, 스크롤 인터랙션 |
| **NPM Packages** | `framer-motion` |
| **Env Variables** | (N/A) |

## 6. Development Tools
| 항목 | 내용 |
| :--- | :--- |
| **Name & Version** | **TypeScript 5.x** + **ESLint** |
| **Role** | 정적 타입 시스템 및 코드 린팅 |
| **NPM Packages** | `typescript`, `@types/node`, `@types/react`, `eslint`, `eslint-config-next` |
