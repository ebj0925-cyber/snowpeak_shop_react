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
      alert('\uD488\uC808 \uC0C1\uD488\uC740 \uC7A5\uBC14\uAD6C\uB2C8\uC5D0 \uB2F4\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.');
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
          <span className="product-price">{item.price}{'\uC6D0'}</span>
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
          {isSoldOut ? '\uD488\uC808' : '\uC7A5\uBC14\uAD6C\uB2C8'}
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
              <h3 id={`cart-modal-title-${item.id}`}>{'\uC7A5\uBC14\uAD6C\uB2C8 \uB2F4\uAE30'}</h3>
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
              <div className="cart-modal-icon">{'\u25B1'}</div>
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
    </div>
  );
};

export default Products;