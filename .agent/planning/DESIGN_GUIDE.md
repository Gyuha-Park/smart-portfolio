# 🎨 Smart Portfolio - DESIGN GUIDE

이 문서는 Smart Portfolio 서비스의 디자인 원칙, 컬러 시스템, 타이포그래피, UI 컴포넌트 스타일을 정의합니다.

## 1. 🌈 디자인 컨셉 (Design Concept)

> **"Warm Professionalism in Dark"**
>
> 개발자의 전문성을 보여주는 **다크 모드**를 기본으로 하되, 딱딱하고 차가운 순수 블랙 대신 깊이감 있는 **Gunmetal(건메탈)** 컬러를 사용합니다.
> 여기에 **Soft Indigo(인디고)**와 **Warm Amber(앰버)**를 더해 신뢰감 있으면서도 유연한 AI의 느낌을 전달합니다.

---

## 2. 🎨 컬러 팔레트 (Color Palette)

다크 모드를 기준으로 설계되었습니다.

| 역할 | 색상명 | HEX 코드 | 사용 예시 |
| :--- | :--- | :--- | :--- |
| **Background** | **Deep Gunmetal** | `#0F1115` | 전체 페이지 배경 (Not pure black) |
| **Surface** | **Dark Slate** | `#1F2937` | 카드, 사이드바, 헤더 배경 |
| **Primary** | **Electric Indigo** | `#6366F1` | 주요 버튼, 링크, 활성 상태 (Trust & Tech) |
| **Secondary** | **Soft Lavender** | `#A5B4FC` | 보조 버튼, 비강조 텍스트, 은은한 테두리 |
| **Accent** | **Warm Amber** | `#F59E0B` | **AI 챗봇 말풍선**, 알림, 중요 강조 점 (Warmth) |
| **Text (Main)** | **Off White** | `#F9FAFB` | 본문, 제목 (가독성 최적화) |
| **Text (Muted)** | **Cool Gray** | `#9CA3AF` | 부가 설명, 날짜, 비활성 텍스트 |
| **Border** | **Subtle Line** | `#374151` | 카드 테두리, 구분선 |

---

## 3. 🔡 타이포그래피 (Typography)

구글 폰트(Google Fonts)의 무료 폰트를 사용합니다.

### 3.1 제목용 (Headings)
- **Font Family**: **[Outfit](https://fonts.google.com/specimen/Outfit)**
- **특징**: 모던하고 기하학적인 산세리프. 스마트하고 트렌디한 느낌을 줌.
- **적용**: H1, H2, H3, 네비게이션 메뉴, 숫자 강조.

### 3.2 본문용 (Body)
- **Font Family**: **[Inter](https://fonts.google.com/specimen/Inter)**
- **특징**: 가독성이 뛰어나고 중립적인 폰트. 긴 글을 읽을 때 피로감이 적음.
- **적용**: 본문 텍스트, 설명, 버튼 텍스트, 챗봇 대화 내용.

---

## 4. 📐 레이아웃 및 간격 (Layout & Spacing)

### 4.1 여백 기준 (Spacing)
- **톤**: **Comfortable (편안함)**
- **특징**: 정보가 빽빽하지 않고 숨 쉴 공간이 충분함.
- **Base Unit**: `4px` (Tailwind CSS 기준)
- **Section Padding**:
    - Desktop: `80px` ~ `120px` (y-axis)
    - Mobile: `40px` ~ `60px` (y-axis)
- **Gap**:
    - Grid Item Gap: `24px` (Standard)

### 4.2 모서리 스타일 (Border Radius)
- **스타일**: **Rounded (Medium)**
- **값**:
    - **카드/컨테이너**: `12px` (`rounded-xl`) - 부드럽고 친근한 느낌.
    - **버튼 (Primary)**: `8px` (`rounded-lg`) - 단단하고 클릭하고 싶은 느낌.
    - **태그/뱃지**: `9999px` (`rounded-full`) - Pill Shape.
    - **AI 채팅창**: `16px` (`rounded-2xl`) - 대화의 유연함 강조.

---

## 5. 📱 반응형 디자인 기준 (Responsive Breakpoints)

화면 크기에 따른 레이아웃 변경 기준(Breakpoint)을 정의합니다.

### 5.1 Mobile (`< 768px`)
- **타깃**: 스마트폰 세로 모드.
- **레이아웃**: **1열 (Single Column)** 스택 구조.
- **네비게이션**: 상단 헤더 + **햄버거 메뉴** (Drawer).
- **그리드**: 프로젝트 카드 1열 배치.
- **챗봇**: 아이콘 클릭 시 **전체 화면 (Full Screen)** 모달 또는 바텀 시트.

### 5.2 Tablet (`768px ~ 1024px`)
- **타깃**: 태블릿 세로/가로 모드 및 작은 랩탑.
- **레이아웃**: 여백이 있는 컨테이너 구조.
- **네비게이션**: 풀 네비게이션 또는 아이콘 위주의 사이드바.
- **그리드**: 프로젝트 카드 **2열 (2 Columns)** 그리드.
- **챗봇**: 우측 하단 팝업 (너비 350px~400px).

### 5.3 Desktop (`> 1024px`)
- **타깃**: 데스크탑 모니터 및 대형 랩탑.
- **레이아웃**: 좌우 분할(Split) 및 다단 레이아웃 적극 활용.
- **네비게이션**: **풀 네비게이션 바** (모든 링크 노출).
- **그리드**: 프로젝트 카드 **3열 (3 Columns)** 이상 그리드.
- **챗봇**: 우측 하단 고정 팝업.

---

## 6. ✨ 이펙트 (Effects)

### 6.1 그림자 (Shadows)
- **스타일**: **Subtle & Glow (미세함과 발광)**
- **특징**: 다크 모드에서는 진한 그림자가 잘 보이지 않으므로, **미세한 테두리(Border)**와 **약한 발광 효과(Glow)**를 조합하여 깊이감을 줌.
- **적용 예시**:
    - **카드 기본**: `border: 1px solid #374151` (그림자 없음)
    - **카드 호버**:
        - `border-color: #6366F1` (Primary Color)
        - `box-shadow: 0 0 15px rgba(99, 102, 241, 0.15)` (Soft Indigo Glow)

### 6.2 인터랙션 (Interaction)
- **Hover**: 즉각적인 색상 변경보다는 `Transfrom` (위로 3~5px 이동)과 `Opacity` 조정 위주.
- **Transition**: `all 0.3s ease-in-out` (부드러운 감속).

---

## 7. 🤖 AI 챗봇 전용 스타일

챗봇은 서비스의 핵심 페르소나이므로 별도의 시각적 강조를 줍니다.

- **위젯 아이콘**: **Accent Color (#F59E0B)** 배경 + 흰색 아이콘. (가장 눈에 띔)
- **말풍선 (AI)**: Surface Color (`#1F2937`) 배경 + 둥근 모서리.
- **말풍선 (User)**: Primary Color (`#6366F1`) 배경 + 흰색 텍스트.
- **타이핑 애니메이션**: Accent Color의 점 3개가 물결치는 모션.
