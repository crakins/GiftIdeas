import React from 'react'
import Link from 'next/link';
import styles from "./shortstory.module.css";
import { AiOutlineRobot } from 'react-icons/ai';
import Nav from '../components/Nav';
import HeadComponent from '../components/Head';
import Footer from '../components/Footer/footer';


function Index() {
    return (
        <>
            <HeadComponent />

            <Nav />

            <main className={styles.main}>
            <AiOutlineRobot 
                size='100px' 
                color='blue'
                />
            <h3>AI Powered Search</h3>
            <Link href={"/gifts"}>Last Minute Gifts</Link>
            <Link href={"/ai-search"}>AI Search</Link>
            <Link href={"pets"}>Pet Name Generator</Link>
            <Link href={"/dad-joke"}>Joke Machine</Link>
            <Link href={"/short-story"}>Short Story Writer</Link>
            </main>
            <Footer />
        </>
    );
};

export default Index;