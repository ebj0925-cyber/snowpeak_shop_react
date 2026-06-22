import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function Cart() {
  const navigate = useNavigate();
  const { cartItems, cartTotal, removeFromCart, updateQuantity, clearCart } = useCart();
  const deliveryFee = cartTotal >= 30000 || cartTotal === 0 ? 0 : 3000;
  const finalTotal = cartTotal + deliveryFee;
  const totalCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <main className="cart-page">
      <div className="cart-inner">
        <div className="cart-head">
          <h2>장바구니</h2>
          <div className="cart-step">
            <strong>01 장바구니</strong>
            <span>02 주문서작성/결제</span>
            <span>03 주문완료</span>
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>담은 상품이 없습니다.</p>
            <button type="button" onClick={() => navigate('/')}>쇼핑 계속하기</button>
          </div>
        ) : (
          <>
            <div className="cart-table-wrap">
              <table className="cart-table">
                <colgroup>
                  <col className="cart-col-check" />
                  <col className="cart-col-product" />
                  <col className="cart-col-qty" />
                  <col className="cart-col-price" />
                  <col className="cart-col-discount" />
                  <col className="cart-col-total" />
                  <col className="cart-col-delivery" />
                </colgroup>
                <thead>
                  <tr>
                    <th scope="col">
                      <input type="checkbox" checked readOnly aria-label="전체 선택" />
                    </th>
                    <th scope="col">상품/옵션 정보</th>
                    <th scope="col">수량</th>
                    <th scope="col">상품금액</th>
                    <th scope="col">할인/적립</th>
                    <th scope="col">합계금액</th>
                    <th scope="col">배송비</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.optionKey}>
                      <td className="cart-check-cell">
                        <input type="checkbox" checked readOnly aria-label={`${item.title} 선택`} />
                      </td>
                      <td className="cart-product-cell">
                        <div className="cart-product-info">
                          <div className="cart-product-thumb">
                            <img src={process.env.PUBLIC_URL + item.image} alt={item.title} />
                          </div>
                          <div className="cart-product-text">
                            <span className="cart-product-badge">루트전용</span>
                            <h3>{item.title}</h3>
                            {(item.color || item.size) && (
                              <p>
                                {item.color && <span>색상 : {item.color}</span>}
                                {item.size && <span>사이즈 : {item.size}</span>}
                              </p>
                            )}
                            <button
                              type="button"
                              className="cart-row-remove"
                              onClick={() => removeFromCart(item.optionKey)}
                            >
                              삭제
                            </button>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="cart-qty-text">{item.quantity}개</div>
                        <div className="cart-quantity">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.optionKey, item.quantity - 1)}
                            disabled={item.quantity === 1}
                          >
                            -
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.optionKey, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="cart-money">{item.price.toLocaleString()}원</td>
                      <td className="cart-muted">-</td>
                      <td className="cart-money">{(item.price * item.quantity).toLocaleString()}원</td>
                      <td className="cart-delivery">기본 - 금액별배송비<br />{deliveryFee === 0 ? '0원' : '3,000원'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button type="button" className="cart-continue" onClick={() => navigate('/')}>
              &lt; 쇼핑 계속하기
            </button>

            <div className="cart-total-box">
              <div>
                <span>총 {totalCount}개의 상품금액</span>
                <strong>{cartTotal.toLocaleString()}원</strong>
              </div>
              <span className="cart-total-symbol">+</span>
              <div>
                <span>배송비</span>
                <strong>{deliveryFee.toLocaleString()}원</strong>
              </div>
              <span className="cart-total-symbol">=</span>
              <div>
                <span>합계</span>
                <strong>{finalTotal.toLocaleString()}원</strong>
              </div>
            </div>

            <div className="cart-actions">
              <button type="button" className="cart-clear-btn" onClick={clearCart}>전체 비우기</button>
              <button type="button" className="cart-checkout-btn">주문하기</button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Cart;