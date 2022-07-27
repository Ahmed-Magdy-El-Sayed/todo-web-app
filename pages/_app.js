import '../styles/globals.css'
import Head from 'next/head'
import {wrapper} from "../components/store"
import NavBar from '../components/navbar';
import SideBar from '../components/sidebar'
import { useEffect } from 'react';
import Styles from '../styles/Home.module.css'
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  let router = useRouter();
  useEffect(()=>{
    if(router.pathname === '/'){
      document.querySelectorAll(`.${Styles.sidebar} a`)[0].style.display="none";
      document.querySelectorAll(`.${Styles.sidebar} a`)[1].style.display='none';
      document.querySelector(`.${Styles.sidebar} span`).style.display='none';
    }
  },[])

  return <>
    <Head>
      <title>Next App</title>
      <meta name="description" content="todo list and posts app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <NavBar/>
    <div style={{display:"grid",gridTemplateColumns:"auto 75vw",gridTemplateRows:"auto auto"}}>
      <SideBar/>
      <Component {...pageProps} />
      <div className={Styles.circledLoader}>
        <div></div>
        <p>Loading...</p>
      </div>
    </div>
    
  </>
}

export default wrapper.withRedux(MyApp);
