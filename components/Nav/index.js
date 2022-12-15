import React from 'react'
import styles from './nav.module.css';

function Nav() {
    return (
        <main className={styles.main}>
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </main>
    )
};

export default Nav;