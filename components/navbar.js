import { useSelector,useDispatch } from "react-redux"
import Styles from "../styles/Home.module.css"
import { restoreUser } from "../components/store";
import { useEffect } from "react";
import Link from "next/link";

export default function NavBar(){
    let dispatch =useDispatch ();
    useEffect(()=>{
        if(typeof window !== 'undefined' && localStorage.getItem("user")){
            let oldUser = JSON.parse(localStorage.getItem("user"));
            dispatch(restoreUser(oldUser));
        }
    },[])
    const {user} =useSelector(state=>state)
    return(
        <div className={Styles.navbar}>
            <h1>Next.js App</h1>
            <p>{user.eMail? `Hello ${user.eMail.split("@")[0]}!` : <Link href="/">Sign up</Link>}</p>
        </div>
    )
}