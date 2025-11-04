import React from "react";
import styles from "./index.module.scss";
import styles2 from "./index.module.css";
import { APP_CONFIG } from "@/utils/constants";

import { Wallet, Palette, CheckCircle } from "lucide-react";

const AboutUs = () => {
  const STORE_NAME = APP_CONFIG.FULL_REGISTERED_COMPANY_NAME;
  const features = [
    {
      icon: CheckCircle,
      title: "Quality First",
      description: "Premium fabrics and stitching that last.",
    },
    {
      icon: Palette,
      title: "Style for All",
      description: "Designs that are versatile, modern, and inclusive.",
    },
    {
      icon: Wallet,
      title: "Accessible Fashion",
      description: "Great style shouldn’t come at a heavy price.",
    },
  ];

  return (
    <section className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <>
        <section className={styles.nav_section}></section>
        <section className={styles.section}>
          <div className={styles2["app-container"]}>
            {/* Main Content Wrapper (About Us) */}
            <section className={styles2["about-container"]}>
              <div className={styles2["content-area"]}>
                {/* Tagline */}
                <h2 className={styles2["tagline"]}>
                  From Shirts to Style – Fashion for Every Tomorrow
                </h2>

                <p className={styles2["short-pitch"]}>
                  At <strong>{STORE_NAME}</strong>, we started with a passion
                  for crafting timeless shirts that combine comfort and style.
                  Today, we’re growing into a complete apparel destination,
                  bringing you fashion that evolves with trends and seasons. Our
                  mission is simple —{" "}
                  <strong>
                    quality, affordability, and style made for you
                  </strong>
                  .
                </p>

                <div className={styles2["long-pitch-area"]}>
                  {/* Long & Detailed Version - Paragraph 1 */}
                  <p>
                    Welcome to <strong>{STORE_NAME}</strong> – your destination
                    for everyday style. We began our journey with a focus on one
                    wardrobe essential: the shirt. Designed for comfort,
                    stitched for durability, and styled for every occasion, our
                    shirts reflect our belief that fashion should be effortless
                    yet impactful.
                  </p>

                  {/* Long & Detailed Version - Paragraph 2 */}
                  <p>
                    But this is only the beginning. As we continue to grow,
                    we’re expanding into a wider range of{" "}
                    <strong className={styles2["apparel"]}>apparel</strong> —
                    from casual wear to statement pieces, creating collections
                    that move with you through every season and lifestyle.
                  </p>

                  {/* Features Section */}
                  <div className={styles2["features-section"]}>
                    <h3 className="features-heading">What sets us apart?</h3>

                    <div className={styles2["features-grid"]}>
                      {features.map((feature, index) => (
                        <div key={index} className={styles2["feature-card"]}>
                          <feature.icon className={styles2["feature-icon"]} />
                          <strong className={styles2["feature-title"]}>
                            {feature.title}
                          </strong>
                          <p className={styles2["feature-description"]}>
                            {feature.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Long & Detailed Version - Conclusion */}
                  <p className={styles2["conclusion-paragraph"]}>
                    Our vision is to become more than just a clothing brand. We
                    want to be part of your everyday story — helping you dress
                    with confidence, ease, and individuality. Thank you for
                    choosing us. Together, we’re shaping the future of fashion,
                    one piece at a time.
                  </p>
                </div>
              </div>
            </section>
          </div>
          <div></div>
        </section>
      </>
      {/* Tagline */}
    </section>
  );
};

export default AboutUs;
