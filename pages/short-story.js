import React, { Text } from 'react';
import Head from "next/head";
import { useState } from "react";
import styles from "./shortstory.module.css";
import { VscBook } from 'react-icons/vsc';
import HeadComponent from '../components/Head';
import Nav from '../components/Nav';
import Footer from '../components/Footer/footer';

export default function Home() {
  const [protagonist, setProtagonist] = useState();
  const [conflict, setConflict] = useState();
  const [resolution, setResolution] = useState();
  const [location, setLocation] = useState();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  const [form, setForm] = useState(true);

  return (
    <div>
      <HeadComponent />
      <Nav />

      <main className={styles.main}>
      <VscBook 
        size='100px' 
        color='blue'
        />
        <h3>Short Story Engine</h3>

        {!form 
          ? (
            <div>
                <button className={styles.button} onClick={refineSearch}>
                  Refine Search
                </button> &nbsp;
                <button className={styles.button} onClick={resetSearch}>
                  New Search
                </button>
              </div>
            ) 
          : (
            <form onSubmit={onSubmit}>
              <label>What does the character do for work?*</label>
              <input
                type="text"
                required
                name="protagonist"
                placeholder=''
                value={protagonist}
                onChange={(e) => setProtagonist(e.target.value)}
              />

              <label>What kind of conflict do they have?</label>
              <select
                name="conflict"
                placeholder='Select Conflict'
                value={conflict}
                onChange={(e) => setConflict(e.target.value)}
              >
                <option value="emotional">Emotional</option>
                <option value="funny">Funny</option>
                <option value="money">Money</option>
              </select>

              <label>What resolution does the story have?</label>
              <select
                name="resolution"
                placeholder='Select Resolution'
                value={resolution}
                onChange={(e) => setResolution(e.target.value)}
              >
                <option value="happy">Happy</option>
                <option value="sad">Sad</option>
                <option value="violent">Romantic</option>
              </select>

              <label>Location</label>
              <input
                type="text"
                name="location"
                placeholder="Enter the location of story"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />

              <input type="submit" value="Write me a short story" />
            </form>
            )}

        {loading && (
          <div>
            <img src="/loading.gif" className={styles.loading} />
            <h6>We are writing your story now!</h6>
          </div>
        )}
        

        {result && (
            <div
                className={styles.result}
                dangerouslySetInnerHTML={{ __html: result }} />
        )}
      </main>
      <Footer />
    </div>
  );

  async function onSubmit(event) {
    event.preventDefault();

    if(loading) { 
      return;
    }
    setLoading(true);
    setResult(null);
    setForm(false);

    try {
      const response = await fetch("/api/generate-shortstory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ protagonist, conflict, resolution, location }),
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
    setForm(true);
  }

  function resetSearch() {
    if(loading) {
      return;
    };

    setResult(null);
    setForm(true);
    setProtagonist(null);
    setConflict(null);
    setResolution(null);
    setLocation(null);
  }
}
