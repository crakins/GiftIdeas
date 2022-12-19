import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import HeadComponent from '../components/Head';
import { GiCat } from 'react-icons/gi';
import Nav from "../components/Nav";
import Footer from "../components/Footer/footer";

export default function Home() {
  const [animalInput, setAnimalInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ animal: animalInput }),
    });
    const data = await response.json();
    setResult(data.result);
    setAnimalInput("");
  }

  return (
    <div>
      <HeadComponent />
      <Nav />

      <main className={styles.main}>
      <GiCat 
        size='100px' 
        color='green'
        />
      
        <h3>Name my pet</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="animal"
            placeholder="Enter an animal"
            value={animalInput}
            onChange={(e) => setAnimalInput(e.target.value)}
          />
          <input type="submit" value="Generate names" />
        </form>
        
        {result &&(
          <div className={styles.result}>{result}</div>
        )}
      </main>
      <Footer />
    </div>
  );
}
