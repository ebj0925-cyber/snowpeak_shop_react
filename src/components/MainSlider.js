import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import sliderData from '../db/MainSliderData.js';

function MainSlider() {
  return (
    <div style={{ width: '100%', height: '85vh' }}>
      <Swiper
        modules={[Navigation, Autoplay, Pagination]}
        navigation autoplay={{ delay: 4000 }} loop
        style={{ width: '100%', height: '100%' }}
      >
        {sliderData.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div style={{
              width: '100%', height: '100%',
              backgroundImage: slide.id === 1 
                ? `url(${slide.img})` 
                : `linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.1)), url(${slide.img})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',    /* 텍스트 덩어리 자체는 중앙 배치 */
              justifyContent: 'center', /* 세로 중앙 배치 */
              color: '#fff',
            }}>
              
              {slide.id !== 1 && (
                <div style={{ 
                  // [핵심 수정] 박스 너비를 충분히 확보하고 모든 요소를 왼쪽 끝에 정렬
                  width: '100%',
                  maxWidth: '1500px',   /* 전체적인 글자 위치의 기준선 */
                  padding: '0 10%',     /* 여기서 위치를 조절 (왼쪽에서 10% 뗌) */
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start', /* 내부 요소들(제목, 설명, 버튼) 왼쪽 정렬 */
                  textAlign: 'left'         /* 텍스트 시작점 왼쪽 고정 */
                }}>
                  <h2 style={{ 
                    fontSize: '70px', 
                    fontWeight: '900', 
                    marginBottom: '10px', 
                    textShadow: '2px 2px 10px rgba(0,0,0,0.3)',
                    lineHeight: '1',
                    textTransform: 'uppercase'
                  }}>
                    {slide.title}
                  </h2>
                  <p style={{ 
                    fontSize: '22px', 
                    fontWeight: '500', 
                    marginBottom: '35px',
                    opacity: '0.9'
                  }}>
                    {slide.desc}
                  </p>

                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default MainSlider;