import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

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
    setResult(null)

    try {
      const response = await fetch("/api/generate-dadjoke", {
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

  return (
    <div>
      <Head>
        <title>Funny Dad Jokes</title>
        <link rel="icon" href="/robot.png" />
      </Head>

      <main className={styles.main}>
        <img src="/robot.png" className={styles.icon} />
        <h3>Joke Machine</h3>

        {!loading ? (
          //display form
          <form onSubmit={onSubmit}>
          <label>What kind of Jokes?</label>
            <select
              name="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
            >
              <option value="funny">Funny</option>
              <option value="dad">Dad</option>
              <option value="silly">Silly</option>
              <option value="gross">Gross</option>
            </select>
            <input type="submit" value="Create Jokes" />
        </form>
        ) : 
          // display loading image and link to reset
          <div>
            <img src="/loading.gif" className={styles.loading} />
            <h6>We are writing your jokes now!</h6>
        </div>
        }        

        {result && (

          <><div className={styles.result}>
              
            </div>
            <div
                className={styles.result}
                dangerouslySetInnerHTML={{ __html: result }} />
          </>
        )}
      </main>
    </div>
  );
}
