import React from "react";
import styles from './footer.module.css';

function Footer() {

    const year = new Date();

    return (
        <main className={styles.main}>
            <div className={styles.hr}></div>
            &copy; {year.getFullYear()} <a href="https://crakins.com">crakins.com</a>
        </main>
    );
};

export default Footer;