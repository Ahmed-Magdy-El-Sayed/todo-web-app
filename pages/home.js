import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from '../styles/Home.module.css'


export default function Home() {
  const {user} = useSelector(state => state)
  useEffect(()=>{
    document.querySelector(`.${styles.circledLoader}`).style.display = null;
    document.querySelectorAll(`.${styles.sidebar} a`)[0].style.display=null;
    document.querySelectorAll(`.${styles.sidebar} a`)[1].style.display=null;
    document.querySelector(`.${styles.sidebar} span`).style.display=null;
  })
  return (
    <div className={styles.container}>
      <h1>Welcome {user.eMail.split("@")[0]} !</h1>
      <p>You have {user.jobs.length} jobs in todo list</p>
    </div>
  )
}
