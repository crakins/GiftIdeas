import React from 'react'
import Head from 'next/head';
import styles from "./shortstory.module.css";
import { AiOutlineRobot } from 'react-icons/ai';


export default function Index() {
    return (
        <div>
            <Head>
                <title>AI Powered Forms</title>
                <link rel="icon" href="/robot.png" />
            </Head>

            <main className={styles.main}>
            <AiOutlineRobot 
                size='100px' 
                color='blue'
                />
            <h3>ChatGPT AI Powered Forms</h3>
            <label><a href='pets'>Animal Name Generator</a></label>
            <label><a href='gifts'>Last Minute Gift Ideas</a></label>
            <label><a href='dad-joke'>Joke Machine</a></label>
            <label><a href='short-story'>Short Story Writer</a></label>
            </main>
        </div>
    );
};