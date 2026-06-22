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
            aria-label={'\uACF5\uC720\uD558\uAE30'}
          >
            <img src="/img/icons/icon-share.png" alt={'\uACF5\uC720\uD558\uAE30'} />
          </button>
        </div>

        <div className="detail-info-table">
          <div className="detail-info-row">
            <span className="detail-info-label">{'\uD310\uB9E4\uAC00'}</span>
            <strong className="detail-info-price">
              {product.price.toLocaleString()}{'\uC6D0'}
            </strong>
          </div>

          <div className="detail-info-row">
            <span className="detail-info-label">{'\uAD6C\uB9E4\uD61C\uD0DD'}</span>
            <div className="detail-info-value detail-benefit-list">
              {product.benefits.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>

          <div className="detail-info-row">
            <span className="detail-info-label">{'\uBAA8\uB378\uBA85'}</span>
            <div className="detail-info-value">{product.modelName}</div>
          </div>

          <div className="detail-info-row">
            <span className="detail-info-label">{'\uBC30\uC1A1\uC548\uB0B4'}</span>
            <div className="detail-info-value">
              <p>{product.shippingText1}</p>
              <p>{product.shippingText2}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="detail-option-group">
        <p className="detail-option-label">{'\uC0C9\uC0C1'}</p>
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
        <p className="detail-option-label">{'\uC0AC\uC774\uC988'}</p>
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
          {'\uC7A5\uBC14\uAD6C\uB2C8'}
        </button>
        <button type="button" className="detail-line-btn">
          {'\uCC1C\uD558\uAE30'}
        </button>
        <button type="button" className="detail-buy-btn">
          {'\uBC14\uB85C \uAD6C\uB9E4'}
        </button>
        <button type="button" className="detail-pay-btn">
          N pay {'\uAD6C\uB9E4'}
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
  title: '\uB79C\uB4DC \uD6C4\uB4DC \uD2F0\uC154\uCE20 Vintage Gray',
  subtitle: '\uAC00\uBCCD\uAC8C \uC785\uAE30 \uC88B\uC740 \uD6C4\uB4DC \uC2A4\uC6E8\uD2B8 \uC154\uCE20',
  price: 99000,
  modelName: 'S26SMF-HD50 VY',
  benefits: [
    '\uCE74\uCE74\uC624 \uCC44\uB110 \uCD94\uAC00 \uC2DC \uC989\uC2DC \uD560\uC778 \uCFE0\uD3F0 \uB2E4\uC6B4\uB85C\uB4DC',
    '\uC2E0\uADDC\uAC00\uC785\uC2DC 5\uCC9C\uC6D0 / 1\uB9CC\uC6D0 / 2\uB9CC\uC6D0 \uD560\uC778 \uCFE0\uD3F0 \uC81C\uACF5',
    '\uD68C\uC6D0\uAD6C\uB9E4\uC2DC 5% \uB9C8\uC77C\uB9AC\uC9C0 \uC99D\uC815',
  ],
  shippingText1: '\uD3C9\uC77C 15\uC2DC \uC774\uC804 \uC8FC\uBB38\uAC74 \uB2F9\uC77C \uCD9C\uACE0',
  shippingText2: '3\uB9CC\uC6D0 \uC774\uC0C1 \uAD6C\uB9E4 \uC2DC \uBB34\uB8CC\uBC30\uC1A1',
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

  if (catalogProduct.category === '\uAC00\uBC29') {
    return getBagSize(catalogProduct.title);
  }

  if (catalogProduct.category === '\uC288\uC988') {
    return SHOES_SIZES;
  }

  if (catalogProduct.category === '\uBAA8\uC790' || catalogProduct.category === '\uC6A9\uD488') {
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
      { name: catalogProduct.color || '\uAE30\uBCF8', image: mainImage },
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
      alert('\uD488\uC808 \uC0C1\uD488\uC740 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.');
      return;
    }

    if (!selectedColor || !selectedSize) {
      alert('\uC0C9\uC0C1\uACFC \uC0AC\uC774\uC988\uB97C \uC120\uD0DD\uD574\uC8FC\uC138\uC694.');
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
                {'\uC0C1\uC138\uC815\uBCF4'}
              </button>

              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-size' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-size')}
              >
                {'\uC0AC\uC774\uC988'}
              </button>

              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-review' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-review')}
              >
                {'\uB9AC\uBDF0'}
              </button>

              <button
                type="button"
                className={`detail-tab-btn ${
                  activeTab === 'detail-qna' ? 'active' : ''
                }`}
                onClick={() => moveToSection('detail-qna')}
              >
                {'\uBB38\uC758'}
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
              <h3 className="detail-section-heading">{'\uBB38\uC758'}</h3>
              <p className="detail-placeholder-text">
                {'\uB4F1\uB85D\uB41C \uC0C1\uD488\uBB38\uC758\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.'}
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
              <h3 id="cart-modal-title">{'\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30'}</h3>
              <button
                type="button"
                className="cart-modal-close"
                aria-label={'\uB2EB\uAE30'}
                onClick={() => setIsCartModalOpen(false)}
              >
                x
              </button>
            </div>

            <div className="cart-modal-body">
              <div className="cart-modal-icon">{'\uD83D\uDED2'}</div>
              <strong>{'\uC0C1\uD488\uC774 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uACBC\uC2B5\uB2C8\uB2E4.'}</strong>
              <p>{'\uC7A5\uBC14\uAD6C\uB2C8\uB85C \uC774\uB3D9\uD558\uC2DC\uACA0\uC2B5\uB2C8\uAE4C?'}</p>
            </div>

            <div className="cart-modal-actions">
              <button type="button" onClick={() => setIsCartModalOpen(false)}>
                {'\uC1FC\uD551 \uACC4\uC18D\uD558\uAE30'}
              </button>
              <button
                type="button"
                className="primary"
                onClick={() => navigate('/cart')}
              >
                {'\uC7A5\uBC14\uAD6C\uB2C8 \uAC00\uAE30'}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Detail01;
