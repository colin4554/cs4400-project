import React, {useState} from "react"
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Select from 'react-select'
import Symptoms from './symptoms.js'
import Conditions from './conditions.js'

const inter = Inter({ subsets: ['latin'] })


const Home = () => {
  const [display, setDisplay] = useState('Symptoms');
  const [data, setData] = useState([]);

  function changeDisplay() {
    if(display == 'Symptoms') {
      setDisplay('Conditions')
    } else {
      setDisplay('Symptoms')
    }
    console.log('changed display to', display)
  }
  function renderInner() {
    console.log('called renderInner')
    if(display === 'Symptoms') {
      return <Symptoms onHandleData={handleData} />
    } else if (display === 'Conditions') {
      return <Conditions data={data}/>
    }
  }

  function handleData(data) {
    console.log('handleData called')
    setData(data)
    changeDisplay();
  }

  return (
    <div>
      {display == 'Symptoms' ? <Symptoms onHandleData={handleData} /> : <Conditions data={data} onHandleData={handleData}/>}
    </div>
  )
}

export default Home;
