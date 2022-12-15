import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import styles from "./shortstory.module.css";
import { AiOutlineRobot } from 'react-icons/ai';
import Nav from '../components/Nav';
import HeadComponent from '../components/Head';
import Footer from '../components/Footer/footer';


function Index() {
    return (
        <div>
            <HeadComponent />

            <Nav />

            <main className={styles.main}>
            <AiOutlineRobot 
                size='100px' 
                color='blue'
                />
            <h3>AI Powered Search</h3>
                <div>Powered by <a href="https://crakins.com">crakins.com</a></div>
            </main>
            <Footer />
        </div>
    );
};

export default Index;