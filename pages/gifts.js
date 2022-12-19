import React, { Text } from 'react';
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";
import { TbChristmasTree } from 'react-icons/tb';
import HeadComponent from '../components/Head';
import Nav from '../components/Nav';
import Footer from '../components/Footer/footer';


export default function Gifts() {
  const [gender, setGender] = useState("");
  const [age, setAge] = useState();
  const [priceMin, setPriceMin] = useState();
  const [priceMax, setPriceMax] = useState();
  const [hobbies, setHobbies] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState(true);
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();

    if(loading) { 
      return;
    }
    setLoading(true);
    setResult(null);
    setForm(false);

    try {
      const response = await fetch("/api/generate-gifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceMin, priceMax, gender, age, hobbies }),
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
    setPriceMin(null);
    setPriceMax(null);
    setGender(null);
    setAge(null);
    setHobbies(null);
  }

  return (
    <div>
      <HeadComponent />
      <Nav />

      <main className={styles.main}>
      <TbChristmasTree 
        size='100px' 
        color='green'
        />
        <h3>Last Minute Gift Ideas</h3>

        {!form 
          ? (
                <div>
                <button onClick={refineSearch}>
                  Refine Search
                </button>
                <button onClick={resetSearch}>
                  New Search
                </button>
              </div>
            ) 
          : (
            <form onSubmit={onSubmit}>
              <label>For who is the gift?</label>
              <select
                name="gender"
                placeholder='Select Gender'
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="man">Male</option>
                <option value="woman">Female</option>
              </select>

              <label>Age*</label>
              <input
                type="number"
                required
                min={1}
                max={99}
                name="age"
                placeholder="Enter the age"
                value={age}
                onChange={(e) => setAge(Number.parseInt(e.target.value))}
              />

              <label>Price from*</label>
              <input
                type="number"
                required
                min={1}
                name="priceMin"
                placeholder="Enter the minimum price"
                value={priceMin}
                onChange={(e) => setPriceMin(Number.parseInt(e.target.value))}
              />

              <label>Price to*</label>
              <input
                type="number"
                required
                min={1}
                name="priceMax"
                placeholder="Enter the maximum price"
                value={priceMax}
                onChange={(e) => setPriceMax(Number.parseInt(e.target.value))}
              />

              <label>Hobbies</label>
              <input
                type="text"
                name="hobbies"
                placeholder="Enter the hobbies"
                value={hobbies}
                onChange={(e) => setHobbies(e.target.value)}
              />
              <input type="submit" value="Generate Gift Ideas" />
            </form>
          ) }

        {loading && ( // display loading image and link to reset form
          <div>
              <img src="/loading.gif" className={styles.center} />
              <h6>We are loading your last minute gift ideas!</h6>
          </div> 
        )}
        
        {result && (
          <>
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
