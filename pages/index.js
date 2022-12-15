import React from 'react'
import Head from 'next/head';
import Link from 'next/link';
import styles from "./shortstory.module.css";
import { AiOutlineRobot } from 'react-icons/ai';


function Index() {
    return (
        <div>
            <Head>
                <title>AI Powered Search</title>
                <link rel="icon" href="/robot.png" />
            </Head>

            <main className={styles.main}>
            <AiOutlineRobot 
                size='100px' 
                color='blue'
                />
            <h3>AI Powered Search</h3>
            <Link href={"/"}>Home</Link>
            <Link href={"/gifts"}>Last Minute Gifts</Link>
            <Link href={"/ai-search"}>AI Search</Link>
            <Link href={"pets"}>Pet Name Generator</Link>
            <Link href={"/dad-joke"}>Joke Machine</Link>
            <Link href={"/short-story"}>Short Story Writer</Link>
            </main>
        </div>
    );
};

export default Index;