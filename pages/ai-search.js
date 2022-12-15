import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { AiOutlineRobot } from 'react-icons/ai';
import HeadComponent from '../components/Head';
import Nav from '../components/Nav';
import Footer from "../components/Footer/footer";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  async function onSubmit(event) {
    event.preventDefault();

    if(loading) { 
      return;
    };

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch("/api/generate-aisearch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ topic }),
      });
      const data = await response.json();
      setResult(data.result.replaceAll('\n', '<br />'));
    } catch (e) {
        alert('Failed to generate ideas, try later');
    } finally {
        setLoading(false);
    }
  }

  function refineSearch() {
    if(loading) {
      return;
    };

    setResult(null);
  }

  function resetSearch() {
    if(loading) {
      return;
    };

    setResult(null);
    setTopic(null);
  }

  return (
    <div>
      <HeadComponent />
      <Nav />

      <main className={styles.main}>
      <AiOutlineRobot 
                size='100px' 
                color='green'
                />
        <h3>AI Search</h3>

        

        {!result && (
          <form onSubmit={onSubmit}>
          <input
            type="text"
            name="searchTerm"
            placeholder="Ask anything"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
            <input type="submit" value="Search with AI" />
        </form>
        )}

        {loading && (
          <div>
            <img src="/loading.gif" className={styles.loading} />
            <h6>AI is answering your question..</h6>
          </div>
        )}
      
        {result && (

          <>
            <div>
              <button onClick={refineSearch}>
                Refine Search
              </button>
              <button onClick={resetSearch}>
                New Search
              </button>
            </div>
            <div
                className={styles.result}
                dangerouslySetInnerHTML={{ __html: result }} />
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
