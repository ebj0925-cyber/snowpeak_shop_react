import React from 'react';

function Footer() {
  const footerMenus = ["회사소개", "이용약관", "개인정보처리방침", "이용안내", "대리점 개설문의", "매장안내"];
  const socialIcons = [{ src: "/img/footer/insta.svg", alt: "instagram" }, { src: "/img/footer/face.svg", alt: "facebook" }, { src: "/img/footer/youtu.svg", alt: "youtube" }];

  const textStyle = { color: '#8d8d8d', fontSize: '12.5px', lineHeight: '1.8', margin: '0 0 2px 0' };
  const menuStyle = (isHighlight = false) => ({ cursor: 'pointer', fontSize: '13px', lineHeight: 1, color: isHighlight ? '#fff' : '#9a9a9a', fontWeight: isHighlight ? '700' : '400', whiteSpace: 'nowrap' });

  return (
    <footer style={{ backgroundColor: '#1a1a1a', padding: '48px 0 52px', marginTop: '80px', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '48px', maxWidth: '1460px', margin: '0 auto', padding: '0 20px', boxSizing: 'border-box' }}>
        <div style={{ flex: 1, minWidth: 0, textAlign: 'left' }}>
          <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', columnGap: '28px', rowGap: '12px', marginBottom: '26px' }}>
            {footerMenus.map((menu) => (
              <span key={menu} style={menuStyle(menu === "개인정보처리방침")}>
                {menu}
              </span>
            ))}
          </div>

          <div style={{ marginBottom: '28px' }}>
            <span style={{ display: 'block', color: '#fff', fontSize: '14px', fontWeight: '700', marginBottom: '10px', lineHeight: 1.4 }}>
              감성코퍼레이션 주식회사
            </span>

            <p style={textStyle}>대표이사 : 김호선 &nbsp;|&nbsp; 주소 : 서울특별시 서초구 방배로 162 4층 &nbsp;|&nbsp; A/S : 02-3140-1004</p>
            <p style={textStyle}>통신판매업신고 : 2019-서울서초-0483 &nbsp;|&nbsp; 사업자번호 : 105-81-66548</p>
          </div>

          <div style={{ color: '#fff', fontSize: '12px', lineHeight: 1.6, marginTop: '30px' }}>
            Copyright © Gamsung Corp. All Rights Reserved.
          </div>
        </div>

        <div style={{ width: '320px', flexShrink: 0, textAlign: 'left' }}>
          <div style={{ color: '#fff', fontSize: '12px', fontWeight: '700', marginBottom: '8px', lineHeight: 1 }}>
            CS CENTER
          </div>

          <div style={{ color: '#fff', fontWeight: '700', fontSize: '34px', lineHeight: 1.1, letterSpacing: '-1px', marginBottom: '14px' }}>
            02-3140-1004
          </div>

          <p style={{ color: '#8d8d8d', fontSize: '12.5px', lineHeight: '1.8', margin: 0 }}>
            평일 9:30 - 18:00 (마지막주 금요일 16:00 종료)
            <br />
            점심시간 12:30 - 13:30 / 주말 공휴일 휴무
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '28px' }}>
            <a href="#!" style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/img/footer/kakao.png" alt="kakao" style={{ width: '52px', display: 'block' }} />
            </a>

            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              {socialIcons.map((icon) => (
                <a key={icon.alt} href="#!" style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={icon.src} alt={icon.alt} style={{ width: '28px', height: '28px', display: 'block' }} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;