# Snow Peak Shop React

React를 활용해 Snow Peak 브랜드 쇼핑몰의 메인 페이지, 카테고리 목록, 상품 상세페이지, 장바구니 흐름을 구현한 쇼핑몰 클론 프로젝트입니다.

실제 쇼핑몰의 구매 전환 흐름을 참고해 상품 이미지 갤러리, 색상 및 사이즈 옵션 선택, 카테고리 필터링, 장바구니 담기, 수량 변경, 총액 계산 기능을 구성했습니다.

## Portfolio

![Snow Peak Portfolio Preview](./portfolio/img/snowpeak_portfolio_final/slide01.png)

- [포트폴리오 PDF 보기](./portfolio/snowpeak_portfolio_final.pdf)
- [포트폴리오 PPT 다운로드](./portfolio/snowpeak_portfolio_final.pptx)
- [포트폴리오 슬라이드 이미지 폴더](./portfolio/img/snowpeak_portfolio_final)

## 프로젝트 목표

- Snow Peak 쇼핑몰의 화면 구조와 구매 흐름을 React로 구현
- 메인, 카테고리, 상세페이지, 장바구니 페이지를 라우팅으로 연결
- 상품 데이터를 JS 파일로 분리해 여러 화면에서 재사용
- 색상, 사이즈, 이미지, 장바구니 상태를 React 상태 관리로 제어
- 포트폴리오 발표에서 코드 구조와 UI 구현 과정을 설명할 수 있는 프로젝트 제작

## 주요 기능

### 메인 페이지

- 메인 슬라이드 배너
- New Arrivals 상품 영역
- Spring Collection 상품 영역
- Snowpeak Bag 상품 슬라이더
- Influencer Style 영역
- Instagram 이미지 영역

### 카테고리 페이지

- MEN, WOMEN, KIDS, ACC & SHOES, OUTLET 카테고리 이동
- 상의, 아우터, 하의, 가방, 모자, 용품, 슈즈 등 세부 필터 구성
- `ProductCatalog.js` 기반 상품 목록 렌더링
- 상품 클릭 시 `/detail/:id` 상세페이지로 이동

### 상품 상세페이지

- 상품별 메인 이미지와 썸네일 갤러리
- 색상 선택 시 메인 이미지 변경
- 상품 카테고리에 따른 사이즈 옵션 분기
- 상세정보, 사이즈, 리뷰, 문의 탭 스크롤 이동
- 우측 구매 박스 sticky 배치
- 장바구니 담기 완료 모달
- 품절 상품 장바구니 담기 제한

### 장바구니

- `CartContext`를 사용한 전역 장바구니 상태 관리
- `localStorage` 저장으로 새로고침 후에도 장바구니 유지
- 동일 상품과 동일 옵션 담기 시 수량 증가
- 수량 변경, 상품 삭제, 전체 비우기
- 상품 총액, 배송비, 최종 결제 금액 계산

### 준비 중 페이지

- 로그인
- 회원가입
- 고객센터

## 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Front-end | React 19 |
| Routing | react-router-dom 7 |
| 상태 관리 | useState, useEffect, useMemo, Context API |
| 스타일 | CSS, Flexbox, Grid, Media Query |
| UI Library | Swiper, Bootstrap, React Bootstrap |
| 데이터 관리 | JavaScript 배열/객체 기반 상품 데이터 |
| 저장 방식 | localStorage |

## 폴더 구조

```text
snowpeak_shop03
public/
  img/
    bag/
    banner/
    detail/
    influencer/
    Instagram/
    new_arrivals/
    springcollection/
src/
  components/
    MainSlider.js
    NewArrivalsSection.js
    SpringCollectionSection.js
    BagSection.js
    InfluencerSection.js
    InstagramSection.js
    Products.js
  context/
    CartContext.js
  db/
    ProductCatalog.js
    BagData.js
    SpringCollectionData.js
    NewArrivalsData.js
    InfluencerData.js
  layout/
    Header.js
    Header.css
    Footer.js
  pages/
    CategoryPage.js
    Detail01.js
    Cart.js
    ComingSoon.js
  App.js
  Home.js
  index.js
portfolio/
  snowpeak_portfolio_final.pdf
  snowpeak_portfolio_final.pptx
  img/snowpeak_portfolio_final/
```

## 핵심 구현 포인트

### 1. 상품 데이터 통합

`BagData.js`, `SpringCollectionData.js` 등 섹션별 데이터를 `ProductCatalog.js`에서 카테고리 기준으로 통합했습니다.

이를 통해 카테고리 페이지와 상세페이지가 같은 상품 데이터를 바라보도록 만들었고, 상품을 클릭하면 개별 상세페이지로 이동할 수 있게 구성했습니다.

### 2. 동적 상세페이지 렌더링

상품마다 상세페이지 파일을 따로 만들지 않고 `/detail/:id` 라우팅을 사용했습니다.

```jsx
<Route path="/detail/:id" element={<Detail01 />} />
```

`Detail01.js`에서 URL의 `id` 값을 읽고, `ProductCatalog`에서 해당 상품을 찾아 화면에 렌더링합니다.

### 3. 옵션 선택 상태 관리

상세페이지에서 사용자가 선택한 메인 이미지, 색상, 사이즈를 상태값으로 관리했습니다.

```jsx
const [selectedMainImage, setSelectedMainImage] = useState(0);
const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
const [selectedSize, setSelectedSize] = useState('');
```

색상을 선택하면 메인 이미지가 함께 변경되고, 사이즈 선택 상태도 버튼 UI에 반영됩니다.

### 4. 장바구니 전역 상태 관리

장바구니 데이터는 `CartContext.js`에서 관리합니다. 상품 추가, 삭제, 수량 변경, 총액 계산 기능을 전역에서 사용할 수 있게 구성했습니다.

```jsx
const optionKey = `${product.id}-${product.color || 'default'}-${product.size || 'default'}`;
```

같은 상품이라도 색상과 사이즈가 다르면 다른 옵션 상품으로 구분되도록 `optionKey`를 생성했습니다.

### 5. 품절 상품 예외 처리

품절 상품은 장바구니에 담기지 않도록 상세페이지에서 먼저 검증했습니다.

```jsx
if (product.isSoldOut) {
  alert('품절 상품은 장바구니에 담을 수 없습니다.');
  return;
}
```

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


## 포트폴리오 전체 슬라이드

아래 이미지는 최종 포트폴리오 PPT를 슬라이드별 이미지로 변환한 자료입니다.

### Slide 01

![Snow Peak Portfolio Slide 01](./portfolio/img/snowpeak_portfolio_final/slide01.png)

### Slide 02

![Snow Peak Portfolio Slide 02](./portfolio/img/snowpeak_portfolio_final/slide02.png)

### Slide 03

![Snow Peak Portfolio Slide 03](./portfolio/img/snowpeak_portfolio_final/slide03.png)

### Slide 04

![Snow Peak Portfolio Slide 04](./portfolio/img/snowpeak_portfolio_final/slide04.png)

### Slide 05

![Snow Peak Portfolio Slide 05](./portfolio/img/snowpeak_portfolio_final/slide05.png)

### Slide 06

![Snow Peak Portfolio Slide 06](./portfolio/img/snowpeak_portfolio_final/slide06.png)

### Slide 07

![Snow Peak Portfolio Slide 07](./portfolio/img/snowpeak_portfolio_final/slide07.png)

### Slide 08

![Snow Peak Portfolio Slide 08](./portfolio/img/snowpeak_portfolio_final/slide08.png)

### Slide 09

![Snow Peak Portfolio Slide 09](./portfolio/img/snowpeak_portfolio_final/slide09.png)

### Slide 10

![Snow Peak Portfolio Slide 10](./portfolio/img/snowpeak_portfolio_final/slide10.png)

### Slide 11

![Snow Peak Portfolio Slide 11](./portfolio/img/snowpeak_portfolio_final/slide11.png)

### Slide 12

![Snow Peak Portfolio Slide 12](./portfolio/img/snowpeak_portfolio_final/slide12.png)

### Slide 13

![Snow Peak Portfolio Slide 13](./portfolio/img/snowpeak_portfolio_final/slide13.png)

### Slide 14

![Snow Peak Portfolio Slide 14](./portfolio/img/snowpeak_portfolio_final/slide14.png)

### Slide 15

![Snow Peak Portfolio Slide 15](./portfolio/img/snowpeak_portfolio_final/slide15.png)

### Slide 16

![Snow Peak Portfolio Slide 16](./portfolio/img/snowpeak_portfolio_final/slide16.png)

### Slide 17

![Snow Peak Portfolio Slide 17](./portfolio/img/snowpeak_portfolio_final/slide17.png)

### Slide 18

![Snow Peak Portfolio Slide 18](./portfolio/img/snowpeak_portfolio_final/slide18.png)

### Slide 19

![Snow Peak Portfolio Slide 19](./portfolio/img/snowpeak_portfolio_final/slide19.png)

### Slide 20

![Snow Peak Portfolio Slide 20](./portfolio/img/snowpeak_portfolio_final/slide20.png)

### Slide 21

![Snow Peak Portfolio Slide 21](./portfolio/img/snowpeak_portfolio_final/slide21.png)

### Slide 22

![Snow Peak Portfolio Slide 22](./portfolio/img/snowpeak_portfolio_final/slide22.png)

### Slide 23

![Snow Peak Portfolio Slide 23](./portfolio/img/snowpeak_portfolio_final/slide23.png)

### Slide 24

![Snow Peak Portfolio Slide 24](./portfolio/img/snowpeak_portfolio_final/slide24.png)

### Slide 25

![Snow Peak Portfolio Slide 25](./portfolio/img/snowpeak_portfolio_final/slide25.png)

### Slide 26

![Snow Peak Portfolio Slide 26](./portfolio/img/snowpeak_portfolio_final/slide26.png)

### Slide 27

![Snow Peak Portfolio Slide 27](./portfolio/img/snowpeak_portfolio_final/slide27.png)

### Slide 28

![Snow Peak Portfolio Slide 28](./portfolio/img/snowpeak_portfolio_final/slide28.png)

### Slide 29

![Snow Peak Portfolio Slide 29](./portfolio/img/snowpeak_portfolio_final/slide29.png)

### Slide 30

![Snow Peak Portfolio Slide 30](./portfolio/img/snowpeak_portfolio_final/slide30.png)

### Slide 31

![Snow Peak Portfolio Slide 31](./portfolio/img/snowpeak_portfolio_final/slide31.png)

### Slide 32

![Snow Peak Portfolio Slide 32](./portfolio/img/snowpeak_portfolio_final/slide32.png)

### Slide 33

![Snow Peak Portfolio Slide 33](./portfolio/img/snowpeak_portfolio_final/slide33.png)

### Slide 34

![Snow Peak Portfolio Slide 34](./portfolio/img/snowpeak_portfolio_final/slide34.png)

### Slide 35

![Snow Peak Portfolio Slide 35](./portfolio/img/snowpeak_portfolio_final/slide35.png)

### Slide 36

![Snow Peak Portfolio Slide 36](./portfolio/img/snowpeak_portfolio_final/slide36.png)

### Slide 37

![Snow Peak Portfolio Slide 37](./portfolio/img/snowpeak_portfolio_final/slide37.png)

### Slide 38

![Snow Peak Portfolio Slide 38](./portfolio/img/snowpeak_portfolio_final/slide38.png)

### Slide 39

![Snow Peak Portfolio Slide 39](./portfolio/img/snowpeak_portfolio_final/slide39.png)

### Slide 40

![Snow Peak Portfolio Slide 40](./portfolio/img/snowpeak_portfolio_final/slide40.png)

### Slide 41

![Snow Peak Portfolio Slide 41](./portfolio/img/snowpeak_portfolio_final/slide41.png)

### Slide 42

![Snow Peak Portfolio Slide 42](./portfolio/img/snowpeak_portfolio_final/slide42.png)

### Slide 43

![Snow Peak Portfolio Slide 43](./portfolio/img/snowpeak_portfolio_final/slide43.png)

### Slide 44

![Snow Peak Portfolio Slide 44](./portfolio/img/snowpeak_portfolio_final/slide44.png)

## 작업하면서 신경 쓴 부분

- 실제 쇼핑몰처럼 메인, 카테고리, 상세, 장바구니 흐름이 이어지도록 구성
- 폴더를 `components`, `pages`, `layout`, `db`, `context`로 나누어 역할을 명확히 정리
- 상품 카테고리를 MEN, WOMEN, KIDS, ACC & SHOES, OUTLET으로 분리
- 상품명에 여성 상품이 포함된 경우 WOMEN 카테고리로 분류되도록 데이터 기준 정리
- 슈즈, 가방, 의류처럼 상품 종류에 따라 사이즈 옵션이 다르게 보이도록 처리
- 상세페이지 구매 박스와 상품 이미지 영역의 스크롤 흐름을 자연스럽게 조정
- 장바구니 모달과 장바구니 페이지를 연결해 구매 흐름을 구체화

## 개선 예정

- 장바구니 페이지 일부 표기 문구 정리
- 상품 데이터를 JSON 또는 API 형태로 분리
- 로그인 기반 찜하기 기능 추가
- 주문/결제 단계 페이지 확장
- 리뷰 작성 기능 추가
- 모바일 화면 디테일 보강

## 프로젝트 회고

이번 프로젝트에서는 React의 상태 관리와 라우팅을 실제 쇼핑몰 UI에 적용하는 데 집중했습니다.

특히 상품 상세페이지를 상품마다 하나씩 만드는 방식이 아니라, 상품 데이터를 기준으로 하나의 상세페이지 컴포넌트가 여러 상품을 보여주는 구조를 이해하고 적용한 점이 가장 큰 학습 포인트였습니다.

또한 장바구니 기능을 구현하면서 옵션별 상품 구분, 수량 변경, 총액 계산, localStorage 저장처럼 실제 쇼핑몰에 필요한 기본 흐름을 직접 구성해볼 수 있었습니다.
