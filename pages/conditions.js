import React, {useState} from "react"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Select from 'react-select'

const inter = Inter({ subsets: ['latin'] })

const Conditions = (props) => {
  const [data, setData] = useState(initData());

  function initData() {
    console.log(props.data)
    return props.data
  }

  function handleClick() {
    props.onHandleData(data);
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
                <h1>Condition and Treatment Recommendations</h1>
            </div>
            <div className={styles.inputBlock}>
                <div className={styles.row}>
                    {data && data.map((condition, index) => (
                        <div key={condition.name} className={styles.col}>
                            <h2 className={styles.label}>{(index + 1)+ '. ' + condition.name.charAt(0).toUpperCase() + condition.name.slice(1)}</h2>
                            <div>
                                {condition.treatments && condition.treatments.map(treatment => (
                                    <li key={treatment}>
                                        {treatment.charAt(0).toUpperCase() + treatment.slice(1)}{treatment.dosage && <span> - {treatment.dosage}</span>}
                                    </li>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
                <button type="button" className={styles.button} onClick={handleClick}>Back to Home</button>
            </div>
        </main>
    </>
  )


}
export default Conditions;