import React from "react";
import styles from "./DesktopHomeLogo.module.css";
import home from "../../assets/images/home.png";
import lock from "../../assets/icons/lock.svg";

const DesktopHomeLogo = () => {
  return (
    <div className={styles.desktopHome}>
      <div className={styles.homeImageContainer}>
        <img src={home} alt="homeImage" className={styles.homeImage} />
      </div>
      <div className={styles.headingContainer}>
        <h1 className={styles.heading}>Pocket Notes</h1>
      </div>
      <div className={styles.paraContainer}>
        <p className={styles.homePara}>
          Send and receive messages without keeping your phone online.
          <br />
          Use Pocket Notes on up to 4 linked devices and 1 mobile phone
        </p>
      </div>
      <div className={styles.homeLock}>
        <img src={lock} alt="lockImage" className={styles.lock} />
        <span className={styles.encryptMessage}>end-to-end encrypted</span>
      </div>
    </div>
  );
};

export default DesktopHomeLogo;
