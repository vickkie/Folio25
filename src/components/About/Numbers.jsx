import React from "react";
import styles from "./css/about.module.css";

export default function Numbers() {
  return (
    <div>
      <div className={styles.NumbersWrapper}>
        {/* <div className={styles.numbersHeader}>ABOUT US IN NUMBERS</div> */}

        <div className={styles.numbersRow}>
          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>6+</div>
            <div className={styles.NumbersExpla}>Experience</div>
          </div>
          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>10+</div>
            <div className={styles.NumbersExpla}>Production projects</div>
          </div>

          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>3</div>
            <div className={styles.NumbersExpla}>Collaborative countries</div>
          </div>
        </div>
      </div>
    </div>
  );
}
