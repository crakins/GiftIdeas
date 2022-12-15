import React from "react";
import styles from './footer.module.css';

function Footer() {
    return (
        <main className={styles.main}>
            <div className={styles.hr}></div>
            &copy; 2022 <a href="https://crakins.com">crakins.com</a>
        </main>
    );
};

export default Footer;