import React, {useState} from "react"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Select from 'react-select'
const inter = Inter({ subsets: ['latin'] })

const Symptoms = (props) => {
    const [selectedSymptoms, setSelectedSymptoms] = useState();
    const [selectedSex, setSelectedSex] = useState();
    const [symptomsList, setSymptomsList] = useState(initSymptoms());
  
  
    function handleSelect(symptoms) {
      setSelectedSymptoms(symptoms);
    }
  
    function handleRadioChange(event) {
      setSelectedSex(event.target.value);
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      console.log(selectedSymptoms, selectedSex);
      try {
        const response = await fetch("/api/hello", {
          method: "POST",
          body: {symptoms: selectedSymptoms, sex: selectedSex}
        });
        const data = await response.json();
        console.log(data);
        props.onHandleData(data)
  
      } catch (err) {
        console.log(err);
      }
    }
  
    function initSymptoms() {
      var symptoms = require('../public/symptomsList.json')
      symptoms = symptoms.map((symptom) => {return {value: symptom.value, label: symptom.value}})
      return symptoms;
    }
  
    return (
      <>
        <Head>
          <title>Chronic Illness Condition and Treatment Recommender</title>
          <meta name="description" content="Chronic Illness Condition and Treatment Recommender" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className={styles.main}>
          <div className={styles.description}>
            <h1>Chronic Illness Condition and Treatment Recommender</h1>
          </div>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formInputs}>
              <div className={styles.inputBlock}>
                <h2 className={styles.label}>Select your symptoms</h2>
                <div className={styles.selectContainer}>
                  <Select 
                    id="symptomsSelector"
                    options={symptomsList}
                    placeholder="Select Symptoms"
                    value={selectedSymptoms}
                    onChange={handleSelect}
                    isSearchable={true}
                    isMulti
                  />
                </div>
              </div>
              <div className={styles.inputBlock}>
              <h2 className={styles.label}>Select your sex</h2>
                <div className={styles.radioContainer}>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Male"
                        checked={selectedSex === "Male"}
                        onChange={handleRadioChange}
                      />
                       <span className={styles.radioLabel}>Male</span>
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Female"
                        checked={selectedSex === "Female"}
                        onChange={handleRadioChange}
                      />
                      <span className={styles.radioLabel}>Female</span>
                    </label>
                  </div>
                  <div className="radio">
                    <label>
                      <input
                        type="radio"
                        value="Other"
                        checked={selectedSex === "Other"}
                        onChange={handleRadioChange}
                      />
                       <span className={styles.radioLabel}>Other</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <input type="submit" className={styles.button}/>
          </form>
        </main>
      </>
    )
  }
  export default Symptoms;
  