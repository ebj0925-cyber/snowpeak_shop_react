import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Products = ({ fruit }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [isCartModalOpen, setIsCartModalOpen] = useState(false);
  const item = fruit;

  if (!item) return null;

  const isSoldOut = item.isSoldOut || item.badge === 'SOLD OUT';

  const handleAddCart = () => {
    if (isSoldOut) {
      alert('품절 상품은 장바구니에 담을 수 없습니다.');
      return;
    }

    addToCart({
      id: item.id,
      title: item.title,
      price: item.price,
      image: item.img,
      quantity: 1,
    });

    setIsCartModalOpen(true);
  };

  return (
    <div className="product-card">
      <div
        className="product-thumb-wrap"
        onClick={() => navigate(`/detail/${item.id}`)}
      >
        <img
          className="product-thumb"
          src={process.env.PUBLIC_URL + item.img}
          alt={item.title}
        />
        {item.isNew && <span className="product-badge">NEW</span>}
        {isSoldOut && (
          <span className="product-badge soldout">SOLD OUT</span>
        )}
      </div>

      <div className="product-info">
        <h4
          className="product-name"
          onClick={() => navigate(`/detail/${item.id}`)}
        >
          {item.title}
        </h4>

        {item.content && <p className="product-desc">{item.content}</p>}

        <div className="product-price-row">
          <span className="product-price">{item.price}{'원'}</span>
          {item.discount && (
            <span className="product-discount">{item.discount}</span>
          )}
        </div>

        <button
          type="button"
          className="product-cart-btn"
          onClick={handleAddCart}
          disabled={isSoldOut}
        >
          {isSoldOut ? '품절' : '장바구니'}
        </button>
      </div>

      {isCartModalOpen && (
        <div className="cart-modal-backdrop" role="presentation">
          <div
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`cart-modal-title-${item.id}`}
          >
            <div className="cart-modal-head">
              <h3 id={`cart-modal-title-${item.id}`}>{'장바구니 담기'}</h3>
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
              <div className="cart-modal-icon">{'▱'}</div>
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
    </div>
  );
};

export default Products;