# Snow Peak Shop React

React로 제작한 Snow Peak 쇼핑몰 클론 프로젝트입니다. 실제 브랜드 쇼핑몰의 메인 화면, 카테고리 목록, 상품 상세페이지, 옵션 선택, 장바구니 흐름을 분석해 구현했습니다.

단순 정적 페이지가 아니라 상품 데이터, 라우팅, 상태 관리, 장바구니 기능을 연결해 쇼핑몰의 기본 구매 흐름을 경험할 수 있도록 구성했습니다.

## 프로젝트 목표

- Snow Peak 공식 쇼핑몰의 화면 구조와 구매 흐름을 React로 구현
- 메인 페이지, 카테고리 페이지, 상품 상세페이지, 장바구니 페이지 연결
- 상품 데이터를 별도 JS 파일로 관리해 여러 화면에서 재사용
- 색상, 사이즈, 이미지, 장바구니 상태를 React 상태 관리로 제어
- 포트폴리오 발표용으로 코드 구조와 UI 구현 과정을 설명할 수 있는 프로젝트 제작

## 주요 기능

### 메인 페이지

- 메인 슬라이드 배너
- New Arrivals 상품 영역
- Spring Collection 상품 영역
- 이벤트 배너 및 이미지 배너
- Snowpeak Bag 상품 영역
- Influencer Style 영역
- Instagram 이미지 영역

### 카테고리 페이지

- MEN, WOMEN, KIDS, ACC & SHOES, OUTLET 카테고리 이동
- 상의, 아우터, 하의, 가방, 모자, 용품, 슈즈 등 세부 필터 구성
- `ProductCatalog.js` 기반 상품 목록 렌더링
- 상품 클릭 시 `/detail/:id` 상세페이지로 이동

### 상품 상세페이지

- 상품별 메인 이미지와 썸네일 갤러리
- 색상 선택 시 대표 이미지 변경
- 상품 카테고리에 따른 사이즈 옵션 분기
  - 의류: 95(M), 100(L), 105(XL), 110(2XL)
  - 슈즈: 230 ~ 280
  - 가방/모자/용품: FREE 또는 용량 표기
- 상세정보, 사이즈, 리뷰, 문의 탭 스크롤 이동
- 우측 구매 박스 고정 배치
- 장바구니 담기 모달
- 품절 상품 장바구니 담기 제한

### 장바구니

- `CartContext`를 활용한 전역 장바구니 상태 관리
- `localStorage` 저장으로 새로고침 후에도 장바구니 유지
- 동일 상품 + 동일 옵션 담기 시 수량 증가
- 수량 변경, 상품 삭제, 전체 비우기
- 상품 총액, 배송비, 최종 결제 금액 계산

### 준비 중 페이지

- 로그인
- 회원가입
- 고객센터

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Front-end | React |
| Routing | react-router-dom |
| 상태 관리 | useState, useEffect, useMemo, Context API |
| 스타일 | CSS, Flexbox, Grid, Media Query |
| UI 라이브러리 | Swiper, Bootstrap, React Bootstrap |
| 데이터 관리 | JavaScript 배열/객체 기반 상품 데이터 |
| 저장 방식 | localStorage |

## 폴더 구조

```text
snowpeak_shop03
├─ public
│  └─ img
│     ├─ bag
│     ├─ banner
│     ├─ detail
│     ├─ influencer
│     ├─ Instagram
│     ├─ new_arrivals
│     └─ springcollection
├─ src
│  ├─ components
│  │  ├─ MainSlider.js
│  │  ├─ NewArrivalsSection.js
│  │  ├─ SpringCollectionSection.js
│  │  ├─ BagSection.js
│  │  ├─ InfluencerSection.js
│  │  ├─ InstagramSection.js
│  │  └─ Review.js
│  ├─ context
│  │  └─ CartContext.js
│  ├─ db
│  │  ├─ ProductCatalog.js
│  │  ├─ BagData.js
│  │  ├─ SpringCollectionData.js
│  │  ├─ NewArrivalsData.js
│  │  ├─ InfluencerData.js
│  │  └─ ReviewData.js
│  ├─ layout
│  │  ├─ Header.js
│  │  ├─ Header.css
│  │  └─ Footer.js
│  ├─ pages
│  │  ├─ CategoryPage.js
│  │  ├─ Detail01.js
│  │  ├─ Cart.js
│  │  └─ ComingSoon.js
│  ├─ App.js
│  ├─ Home.js
│  └─ index.js
└─ package.json
```

## 핵심 구현 포인트

### 1. 상품 데이터 통합

`BagData.js`, `SpringCollectionData.js` 등 화면별로 나뉘어 있던 데이터를 `ProductCatalog.js`에서 카테고리 기준으로 통합했습니다.

이를 통해 카테고리 페이지와 상세페이지가 같은 상품 데이터를 바라보도록 만들었고, 상품을 클릭하면 개별 상세페이지로 이동할 수 있게 구성했습니다.

### 2. 동적 상세페이지 렌더링

상품마다 상세페이지 파일을 따로 만드는 대신 `/detail/:id` 라우팅을 사용했습니다.

```jsx
<Route path="/detail/:id" element={<Detail01 />} />
```

`Detail01.js`는 URL의 `id` 값을 읽고, `ProductCatalog`에서 해당 상품을 찾아 화면에 보여줍니다. 이 방식으로 하나의 상세페이지 컴포넌트가 여러 상품 상세페이지 역할을 합니다.

### 3. 옵션 선택 상태 관리

상세페이지에서는 사용자가 선택한 대표 이미지, 색상, 사이즈를 상태값으로 관리합니다.

```jsx
const [selectedMainImage, setSelectedMainImage] = useState(0);
const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
const [selectedSize, setSelectedSize] = useState('');
```

색상을 선택하면 메인 이미지가 함께 바뀌고, 사이즈를 선택하면 선택 상태가 버튼 UI에 반영됩니다.

### 4. 장바구니 전역 상태 관리

장바구니 데이터는 `CartContext.js`에서 관리합니다. 상품을 담거나 삭제하고, 수량을 변경하는 기능을 전역에서 사용할 수 있게 구성했습니다.

```jsx
const optionKey = `${product.id}-${product.color || 'default'}-${product.size || 'default'}`;
```

같은 상품이라도 색상과 사이즈가 다르면 다른 옵션으로 구분되도록 `optionKey`를 생성했습니다.

### 5. 품절 상품 예외 처리

품절 상품은 장바구니에 담기지 않도록 상세페이지에서 먼저 검사합니다.

```jsx
if (product.isSoldOut) {
  alert('품절 상품은 장바구니에 담을 수 없습니다.');
  return;
}
```

사용자가 실제 쇼핑몰에서 기대하는 기본 예외 처리를 구현했습니다.

## 라우팅 구조

| 경로 | 화면 |
| --- | --- |
| `/` | 메인 페이지 |
| `/category/:group` | 카테고리 상품 목록 |
| `/detail/:id` | 상품 상세페이지 |
| `/cart` | 장바구니 |
| `/login` | 준비 중 페이지 |
| `/join` | 준비 중 페이지 |
| `/support` | 준비 중 페이지 |

## 실행 방법

```bash
npm install
npm start
```

브라우저에서 아래 주소로 접속합니다.

```text
http://localhost:3000
```

## 빌드 방법

```bash
npm run build
```

## 작업하면서 신경 쓴 부분

- 실제 쇼핑몰처럼 메인, 카테고리, 상세, 장바구니 흐름이 이어지도록 구성
- 폴더를 `components`, `pages`, `layout`, `db`, `context`로 나누어 역할을 명확히 정리
- 상품 카테고리를 MEN, WOMEN, KIDS, ACC & SHOES, OUTLET으로 분리
- 상품명에 여성 상품이 포함된 경우 WOMEN 카테고리로 분류되도록 데이터 기준 정리
- 슈즈, 가방, 의류처럼 상품 종류에 따라 사이즈 옵션이 다르게 보이도록 처리
- 상세페이지 구매 박스와 상품 이미지 영역이 스크롤 흐름에서 자연스럽게 보이도록 조정
- 장바구니 모달과 장바구니 페이지를 연결해 구매 흐름을 구체화

## 개선 예정

- 장바구니 페이지 일부 한글 문구 인코딩 정리
- 상품 데이터를 JSON 또는 API 형태로 분리
- 로그인 기반 찜하기 기능 추가
- 주문/결제 단계 페이지 확장
- 리뷰 작성 기능 추가
- 모바일 화면 디테일 보강

## 프로젝트 회고

이번 프로젝트에서는 React의 기본 상태 관리와 라우팅을 실제 쇼핑몰 UI에 적용하는 데 집중했습니다.

특히 상품 상세페이지를 하나씩 만드는 방식이 아니라, 상품 데이터를 기준으로 하나의 상세페이지 컴포넌트가 여러 상품을 보여주는 구조를 이해하고 적용한 점이 가장 큰 성장 포인트였습니다.

또한 장바구니 기능을 구현하면서 옵션별 상품 구분, 수량 변경, 총액 계산, localStorage 저장처럼 실제 쇼핑몰에 필요한 기본 흐름을 직접 구성해볼 수 있었습니다.
