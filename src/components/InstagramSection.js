import React from "react";
import Title from "./Title";

function InstagramSection() {
  const instagramImages = [
    "/img/Instagram/Instagram10.jpg",
    "/img/Instagram/Instagram11.jpg",
    "/img/Instagram/Instagram12.jpg",
    "/img/Instagram/Instagram06.jpg",
    "/img/Instagram/Instagram08.jpg",
    "/img/Instagram/Instagram09.jpg",
  ];

  return (
    <section className="instagram-section">
      <Title
        subtitle="@snowpeak_outdoor"
        title="INSTAGRAM"
      />

      <div className="instagram-grid">
        {instagramImages.map((image, index) => (
          <div key={index} className="instagram-card">
            <div className="instagram-thumb-wrap">
              <img
                src={image}
                alt={`instagram-${index + 1}`}
                className="instagram-thumb"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default InstagramSection;