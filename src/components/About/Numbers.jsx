import React from "react";
import styles from "./css/about.module.css";

export default function Numbers() {
  return (
    <div>
      <div className={styles.NumbersWrapper}>
        {/* <div className={styles.numbersHeader}>ABOUT US IN NUMBERS</div> */}

        <div className={styles.numbersRow}>
          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>20k +</div>
            <div className={styles.NumbersExpla}>Platform investors</div>
          </div>
          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>80% +</div>
            <div className={styles.NumbersExpla}>Series B or beyond</div>
          </div>

          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>7+</div>
            <div className={styles.NumbersExpla}>Juridictions</div>
          </div>

          <div className={styles.numberItem}>
            <div className={styles.NumbersNumber}>24/7</div>
            <div className={styles.NumbersExpla}>Customer support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
