import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Header.css';

const TEXT = {
  luckyDraw: '\uB7ED\uD0A4\uB4DC\uB85C\uC6B0',
  login: '\uB85C\uADF8\uC778',
  join: '\uD68C\uC6D0\uAC00\uC785',
  cart: '\uC7A5\uBC14\uAD6C\uB2C8',
  support: '\uACE0\uAC1D\uC13C\uD130',
  search: '\uAC80\uC0C9',
  mainMenu: '\uC8FC\uC694 \uBA54\uB274',
  searchPlaceholder: '\uD589\uC6B4\uC758 \uC21C\uAC04, LUCKY DRAW',
};

const CATEGORY = {
  top: '\uC0C1\uC758',
  outer: '\uC544\uC6B0\uD130',
  bottom: '\uD558\uC758',
  bag: '\uAC00\uBC29',
  hat: '\uBAA8\uC790',
  goods: '\uC6A9\uD488',
  shoes: '\uC288\uC988',
  tshirtShort: '\uBC18\uD314 \uD2F0\uC154\uCE20',
  sweatshirt: '\uB9E8\uD22C\uB9E8 / \uD6C4\uB514',
  tshirtLong: '\uAE34\uD314 \uD2F0\uC154\uCE20',
  onepiece: '\uC6D0\uD53C\uC2A4',
  jacket: '\uC790\uCF13',
  windbreaker: '\uCD08\uACBD\uB7C9 \uBC14\uB78C\uB9C9\uC774',
  anorak: '\uC544\uB178\uB77D',
  vest: '\uBCA0\uC2A4\uD2B8',
  pants: '\uD32C\uCE20',
  shorts: '\uC1FC\uCE20',
  skirt: '\uC2A4\uCEE4\uD2B8',
  backpack: '\uBC31\uD329',
  crossbag: '\uD06C\uB85C\uC2A4\uBC31 / \uD1A0\uD2B8\uBC31',
  slingbag: '\uC2AC\uB9C1\uBC31 / \uD799\uC0C9',
  keyring: '\uD0A4\uB9C1',
  cap: '\uCEA1',
  hatItem: '\uD587',
  gloves: '\uC7A5\uAC11',
  supporter: '\uC11C\uD3EC\uD130',
  socks: '\uC591\uB9D0',
  sneakers: '\uC2A4\uB2C8\uCEE4\uC988',
  rainboots: '\uB808\uC778\uBD80\uCE20',
  sandals: '\uC0CC\uB4E4 & \uC2AC\uB77C\uC774\uB4DC',
  rashguard: '\uB798\uC26C\uAC00\uB4DC / \uBCF4\uB4DC\uC20F',
  kids: '\uD0A4\uC988',
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
