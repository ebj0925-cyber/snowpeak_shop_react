import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const TEXT = {
  luckyDraw: '럭키드로우',
  login: '로그인',
  join: '회원가입',
  cart: '장바구니',
  support: '고객센터',
  search: '검색',
  mainMenu: '주요 메뉴',
  searchPlaceholder: '행운의 순간, LUCKY DRAW',
};

const CATEGORY = {
  top: '상의',
  outer: '아우터',
  bottom: '하의',
  bag: '가방',
  hat: '모자',
  goods: '용품',
  shoes: '슈즈',
  tshirtShort: '반팔 티셔츠',
  sweatshirt: '맨투맨 / 후디',
  tshirtLong: '긴팔 티셔츠',
  onepiece: '원피스',
  jacket: '자켓',
  windbreaker: '초경량 바람막이',
  anorak: '아노락',
  vest: '베스트',
  pants: '팬츠',
  shorts: '쇼츠',
  skirt: '스커트',
  backpack: '백팩',
  crossbag: '크로스백 / 토트백',
  slingbag: '슬링백 / 힙색',
  keyring: '키링',
  cap: '캡',
  hatItem: '햇',
  gloves: '장갑',
  supporter: '서포터',
  socks: '양말',
  sneakers: '스니커즈',
  rainboots: '레인부츠',
  sandals: '샌들 & 슬라이드',
  rashguard: '래쉬가드 / 보드숏',
  kids: '키즈',
};

const MENU_ITEMS = [
  {
    label: TEXT.luckyDraw,
    className: 'is-green',
  },
  {
    label: '26 SS NEW',
  },
  {
    label: 'MEN',
    path: '/category/men',
    columns: [
      { title: CATEGORY.top, key: 'top', items: [CATEGORY.tshirtShort, CATEGORY.sweatshirt, CATEGORY.tshirtLong] },
      { title: CATEGORY.outer, key: 'outer', items: [CATEGORY.jacket, CATEGORY.windbreaker, CATEGORY.anorak, CATEGORY.vest] },
      { title: CATEGORY.bottom, key: 'bottom', items: [CATEGORY.pants, CATEGORY.shorts] },
    ],
  },
  {
    label: 'WOMEN',
    path: '/category/women',
    columns: [
      { title: CATEGORY.top, key: 'top', items: [CATEGORY.tshirtShort, CATEGORY.onepiece, CATEGORY.sweatshirt, CATEGORY.tshirtLong] },
      { title: CATEGORY.outer, key: 'outer', items: [CATEGORY.jacket, CATEGORY.windbreaker, CATEGORY.anorak, CATEGORY.vest] },
      { title: CATEGORY.bottom, key: 'bottom', items: [CATEGORY.pants, CATEGORY.skirt, CATEGORY.shorts] },
    ],
  },
  {
    label: 'KIDS',
    path: '/category/kids',
    columns: [
      { title: CATEGORY.top, key: 'top', items: [CATEGORY.tshirtShort, CATEGORY.tshirtLong] },
      { title: CATEGORY.bottom, key: 'bottom', items: [CATEGORY.pants, CATEGORY.shorts] },
    ],
  },
  {
    label: 'ACC & SHOES',
    path: '/category/acc',
    columns: [
      { title: CATEGORY.bag, key: 'bag', items: [CATEGORY.backpack, CATEGORY.crossbag, CATEGORY.slingbag, CATEGORY.keyring] },
      { title: CATEGORY.hat, key: 'hat', items: [CATEGORY.cap, CATEGORY.hatItem] },
      { title: CATEGORY.goods, key: 'goods', items: [CATEGORY.gloves, CATEGORY.supporter, CATEGORY.socks] },
      { title: CATEGORY.shoes, key: 'shoes', items: [CATEGORY.sneakers, CATEGORY.rainboots, CATEGORY.sandals] },
    ],
  },
  {
    label: 'OUTLET',
    path: '/category/outlet',
    columns: [
      { title: CATEGORY.top, key: 'top', items: [CATEGORY.tshirtShort, CATEGORY.sweatshirt] },
      { title: CATEGORY.outer, key: 'outer', items: [CATEGORY.jacket, CATEGORY.windbreaker] },
      { title: CATEGORY.bottom, key: 'bottom', items: [CATEGORY.pants, CATEGORY.shorts] },
      { title: 'ACC & SHOES', key: 'acc', items: [CATEGORY.rashguard, CATEGORY.kids] },
    ],
  },
  {
    label: 'EVENT',
    className: 'is-light',
  },
  {
    label: 'EDITORIAL',
    className: 'is-light',
  },
];

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cartCount } = useCart();
  const [activeMenu, setActiveMenu] = useState(null);

  const goHome = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    navigate('/');
    setTimeout(() => window.scrollTo(0, 0), 0);
  };

  const handleMenuClick = (menu) => {
    if (!menu.columns) {
      goHome();
      setActiveMenu(null);
      return;
    }

    navigate(menu.path);
    setActiveMenu(null);
  };

  const handleCategoryClick = (menu, column) => {
    navigate(`${menu.path}?category=${column.key}`);
    setActiveMenu(null);
  };

  const activeMenuData = MENU_ITEMS.find((menu) => menu.label === activeMenu);

  return (
    <header className="site-header" onMouseLeave={() => setActiveMenu(null)}>
      <div className="header-top">
        <button type="button" className="header-logo" onClick={goHome}>
          <img src="/img/logo_s.png" alt="snowpeak" />
        </button>

        <div className="header-user-menu">
          <button type="button" onClick={() => navigate('/login')}>{TEXT.login}</button>
          <button type="button" onClick={() => navigate('/join')}>{TEXT.join}</button>
          <button
            type="button"
            className="header-cart-link"
            onClick={() => navigate('/cart')}
          >
            {TEXT.cart}
            {cartCount > 0 && <em>{cartCount}</em>}
          </button>
          <button type="button" onClick={() => navigate('/support')}>{TEXT.support}</button>
        </div>
      </div>

      <div className="header-main">
        <nav className="header-nav" aria-label={TEXT.mainMenu}>
          <ul>
            {MENU_ITEMS.map((menu) => (
              <li key={menu.label}>
                <button
                  type="button"
                  className={`header-nav-btn ${menu.className || ''} ${
                    activeMenu === menu.label ? 'is-active' : ''
                  }`}
                  onMouseEnter={() => setActiveMenu(menu.columns ? menu.label : null)}
                  onFocus={() => setActiveMenu(menu.columns ? menu.label : null)}
                  onClick={() => handleMenuClick(menu)}
                >
                  {menu.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-search">
          <strong>HOT KEYWORD</strong>
          <input type="text" placeholder={TEXT.searchPlaceholder} />
          <button type="button" aria-label={TEXT.search}>
            <img src="/img/icon-magnifier.png" alt="" />
          </button>
        </div>
      </div>

      {activeMenuData?.columns && (
        <div className="header-dropdown">
          <div className="header-dropdown-inner">
            {activeMenuData.columns.map((column) => (
              <div className="header-dropdown-column" key={column.title}>
                <strong>{column.title}</strong>
                <ul>
                  {column.items.map((item) => (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => handleCategoryClick(activeMenuData, column)}
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
