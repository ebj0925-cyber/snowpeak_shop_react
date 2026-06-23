import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Detail.css';
import Review from '../components/Review';
import ReviewData from '../db/ReviewData';
import { useCart } from '../context/CartContext';
import ProductCatalog from '../db/ProductCatalog';

function PurchaseBox({
  product,
  selectedColor,
  setSelectedColor,
  selectedSize,
  setSelectedSize,
  setSelectedMainImage,
  sticky = false,
  onGoCart,
}) {
  return (
    <aside className={`detail-purchase-box ${sticky ? 'is-sticky' : ''}`}>
      <div className="detail-product-summary">
        <div className="detail-product-head">
          <div className="detail-product-head-left">
            <p className="detail-brand">{product.brand}</p>
            <h1 className="detail-product-title">{product.title}</h1>
            {product.subtitle && (
              <p className="detail-product-subtitle">{product.subtitle}</p>
            )}
          </div>

          <button
            type="button"
            className="detail-share-btn"
            aria-label={'공유하기'}
          >
            <img src="/img/icons/icon-share.png" alt={'공유하기'} />
          </button>
        </div>

        <div className="detail-info-table">
          <div className="detail-info-row">
            <span className="detail-info-label">{'판매가'}</span>
            <strong className="detail-info-price">
              {product.price.toLocaleString()}{'원'}
            </strong>
          </div>

          <div className="detail-info-row">
            <span className="detail-info-label">{'구매혜택'}</span>
            <div className="detail-info-value detail-benefit-list">
              {product.benefits.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div className="detail-info-row">
            <span className="detail-info-label">{'모델명'}</span>
            <div className="detail-info-value">{product.modelName}</div>
          </div>

          <div className="detail-info-row">
            <span className="detail-info-label">{'배송안내'}</span>
            <div className="detail-info-value">
              <p>{product.shippingText1}</p>
              <p>{product.shippingText2}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-option-group">
        <p className="detail-option-label">{'색상'}</p>
        <div className="detail-color-row">
          {product.colors.map((color, index) => (
            <button
              key={color.name}
              type="button"
              className={`detail-color-btn ${
                selectedColor === color.name ? 'selected' : ''
              }`}
              onClick={() => {
                setSelectedColor(color.name);
                setSelectedMainImage(index);
              }}
            >
              <img src={color.image} alt={color.name} />
            </button>
          ))}
        </div>
      </div>

      <div className="detail-option-group">
        <p className="detail-option-label">{'사이즈'}</p>
        <div className="detail-size-row">
          {product.sizes.map((size) => (
            <button
              key={size}
              type="button"
              className={`detail-size-btn ${
                selectedSize === size ? 'selected' : ''
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      <div className="detail-action-grid">
        <button type="button" className="detail-line-btn" onClick={onGoCart}>
          {'장바구니'}
        </button>
        <button type="button" className="detail-line-btn">
          {'찜하기'}
        </button>
        <button type="button" className="detail-buy-btn">
          {'바로 구매'}
        </button>
        <button type="button" className="detail-pay-btn">
          N pay {'구매'}
        </button>
      </div>

      <div className="detail-side-banner">
        <img src={product.bannerImage} alt="Lucky Draw event banner" />
      </div>
    </aside>
  );
}

const DEFAULT_DETAIL_PRODUCT = {
  id: '1',
  brand: 'Snow Peak',
  title: '랜드 후드 티셔츠 Vintage Gray',
  subtitle: '가볍게 입기 좋은 후드 스웨트 셔츠',
  price: 99000,
  modelName: 'S26SMF-HD50 VY',
  benefits: [
    '카카오 채널 추가 시 즉시 할인 쿠폰 다운로드',
    '신규가입시 5천원 / 1만원 / 2만원 할인 쿠폰 제공',
    '회원구매시 5% 마일리지 증정',
  ],
  shippingText1: '평일 15시 이전 주문건 당일 출고',
  shippingText2: '3만원 이상 구매 시 무료배송',
  mainImages: [
    '/img/detail/detail01.jpg',
    '/img/detail/detail02.jpg',
    '/img/detail/detail03.jpg',
  ],
  infoImages: [
    '/img/detail/info01.jpg',
    '/img/detail/info02.jpg',
    '/img/detail/info03.jpg',
    '/img/detail/info04.jpg',
    '/img/detail/info05.jpg',
  ],
  sizeImages: ['/img/detail/size01.jpg', '/img/detail/sizeinfo.jpg'],
  bannerImage: '/img/detail/detail_banner02.jpg',
  colors: [
    { name: 'Black', image: '/img/detail/main01.jpg' },
    { name: 'Gray', image: '/img/detail/main02.jpg' },
    { name: 'Khaki', image: '/img/detail/main03.jpg' },
  ],
  sizes: ['95(M)', '100(L)', '105(XL)', '110(2XL)'],
};

const CLOTHING_SIZES = ['95(M)', '100(L)', '105(XL)', '110(2XL)'];
const SHOES_SIZES = ['230', '240', '250', '260', '270', '280'];

const parsePrice = (price) => {
  if (typeof price === 'number') return price;
  return Number(String(price).replace(/[^0-9]/g, '')) || 0;
};

const getBagSize = (title) => {
  const matched = String(title).match(/\d+L/i);
  return matched ? [matched[0].toUpperCase()] : ['FREE'];
};

const getSizeOptions = (catalogProduct) => {
  if (!catalogProduct) return CLOTHING_SIZES;

  if (catalogProduct.category === '가방') {
    return getBagSize(catalogProduct.title);
  }

  if (catalogProduct.category === '슈즈') {
    return SHOES_SIZES;
  }

  if (catalogProduct.category === '모자' || catalogProduct.category === '용품') {
    return ['FREE'];
  }

  return CLOTHING_SIZES;
};

const buildDetailProduct = (routeId) => {
  const catalogProduct = ProductCatalog.find(
    (item) => String(item.id) === String(routeId),
  );

  if (!catalogProduct) {
    return { ...DEFAULT_DETAIL_PRODUCT, id: routeId || DEFAULT_DETAIL_PRODUCT.id };
  }

  const mainImage = catalogProduct.img || DEFAULT_DETAIL_PRODUCT.mainImages[0];

  return {
    ...DEFAULT_DETAIL_PRODUCT,
    id: catalogProduct.id,
    title: catalogProduct.title,
    subtitle: catalogProduct.category || DEFAULT_DETAIL_PRODUCT.subtitle,
    price: parsePrice(catalogProduct.price),
    modelName: String(catalogProduct.id).toUpperCase(),
    mainImages: catalogProduct.mainImages || [mainImage],
    colors: catalogProduct.colors || [
      { name: catalogProduct.color || '기본', image: mainImage },
    ],
    sizes: getSizeOptions(catalogProduct),
    isSoldOut: catalogProduct.isSoldOut || catalogProduct.badge === 'SOLD OUT',
  };
};
function Detail01() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState('detail-info');
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);

  const product = buildDetailProduct(id);

  const [selectedMainImage, setSelectedMainImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.colors[0]?.name || '',
  );
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    setSelectedMainImage(0);
    setSelectedColor(product.colors[0]?.name || '');
    setSelectedSize('');
  }, [id]);

  const moveToSection = (sectionId) => {
    setActiveTab(sectionId);
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const goCart = () => {
    if (product.isSoldOut) {
      alert('품절 상품은 장바구니에 담을 수 없습니다.');
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert('색상과 사이즈를 선택해주세요.');
      return;
    }

    addToCart({
      id: product.id,
      title: product.title,
      price: product.price,
      image: product.mainImages[selectedMainImage],
      color: selectedColor,
      size: selectedSize,
      quantity: 1,
    });

    setIsCartModalOpen(true);
  };

  return (
    <main className="detail-page">
      <section className="detail-body">
        <div className="detail-body-inner">
          <section className="detail-content">
            <section className="detail-left detail-hero">
            <div className="detail-main-visual">
              <img
                src={product.mainImages[selectedMainImage]}
                alt={product.title}
              />
            </div>

            <div className="detail-thumb-row">
              {product.mainImages.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`detail-thumb-btn ${
                    selectedMainImage === index ? 'active' : ''
                  }`}
                  onClick={() => setSelectedMainImage(index)}
                >
                  <img
                    src={image}
                    alt={`${product.title} thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
            </section>

            <div className="detail-tabs">
              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-info' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-info')}
              >
                {'상세정보'}
              </button>

              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-size' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-size')}
              >
                {'사이즈'}
              </button>

              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-review' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-review')}
              >
                {'리뷰'}
              </button>

              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-qna' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-qna')}
              >
                {'문의'}
              </button>
            </div>

            <section id="detail-info" className="detail-section">
              <div className="detail-info-inner">
                {product.infoImages.map((image, index) => (
                  <div className="detail-info-image-box" key={index}>
                    <img src={image} alt={`detail image ${index + 1}`} />
                  </div>
                ))}
              </div>
            </section>

            <section id="detail-size" className="detail-section">
              <div className="detail-size-guide-images">
                {product.sizeImages.map((image, index) => (
                  <div className="detail-size-guide-box" key={index}>
                    <img
                      src={image}
                      alt={`size guide image ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section id="detail-review" className="detail-section">
              <Review reviews={ReviewData} />
            </section>

            <section id="detail-qna" className="detail-section">
              <h3 className="detail-section-heading">{'문의'}</h3>
              <p className="detail-placeholder-text">
                {'등록된 상품문의가 없습니다.'}
              </p>
            </section>
          </section>

          <aside className="detail-sticky-column">
            <PurchaseBox
              product={product}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              setSelectedMainImage={setSelectedMainImage}
              sticky={true}
              onGoCart={goCart}
            />
          </aside>
        </div>
      </section>

      {isCartModalOpen && (
        <div className="cart-modal-backdrop" role="presentation">
          <div
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
          >
            <div className="cart-modal-head">
              <h3 id="cart-modal-title">{'장바구니 담기'}</h3>
              <button
                type="button"
                className="cart-modal-close"
                aria-label={'닫기'}
                onClick={() => setIsCartModalOpen(false)}
              >
                x
              </button>
            </div>

            <div className="cart-modal-body">
              <div className="cart-modal-icon">{'🛒'}</div>
              <strong>{'상품이 장바구니에 담겼습니다.'}</strong>
              <p>{'장바구니로 이동하시겠습니까?'}</p>
            </div>

            <div className="cart-modal-actions">
              <button type="button" onClick={() => setIsCartModalOpen(false)}>
                {'쇼핑 계속하기'}
              </button>
              <button
                type="button"
                className="primary"
                onClick={() => navigate('/cart')}
              >
                {'장바구니 가기'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Detail01;
