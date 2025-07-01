import React from "react";
import Styles from "./css/about.module.css";

export default function Hero() {
  return (
    <div className={Styles.th}>
      <div className={Styles.heroContent}>
        <div className={Styles.HeroText}>
          <div>Pioneering your future</div>
        </div>
        <div>
          <div className={Styles.heroExpla}>
            We empower people to confidently navigate the future of digital assets by seamlessly merging traditional
            financial systems with the emerging digital asset ecosystem.
            <div className={Styles.heroSub}>
              What drives us is our unwavering commitment to security, compliance, and client-centricity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
