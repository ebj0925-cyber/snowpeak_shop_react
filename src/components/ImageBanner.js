import React from "react";

function ImageBanner() {
  const banners = [
    {
      id: 1,
      image: "/img/banner/banner04.jpg",
      alt: "멤버십 배너",
      href: "/membership",
    },
    {
      id: 2,
      image: "/img/banner/banner05.jpg",
      alt: "카카오 플러스친구 배너",
      href: "/kakao",
    },
  ];

  const styles = {
    section: {
      width: "100%",
      padding: "40px 20px 40px",
      background: "#fff",
    },
    inner: {
      maxWidth: "1460px",
      margin: "0 auto",
    },
    bannerLink: {
      display: "block",
    },
    bannerImage: {
      width: "100%",
      display: "block",
    },
  };

  return (
    <section style={styles.section}>
      <div style={styles.inner}>
        {banners.map((banner, index) => (
          <a
            key={banner.id}
            href={banner.href}
            style={{
              ...styles.bannerLink,
              marginBottom: index === banners.length - 1 ? 0 : "20px",
            }}
          >
            <img
              src={banner.image}
              alt={banner.alt}
              style={styles.bannerImage}
            />
          </a>
        ))}
      </div>
    </section>
  );
}

export default ImageBanner;