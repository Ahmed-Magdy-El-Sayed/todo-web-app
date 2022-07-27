import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../components/store";
import Styles from "../styles/Login.module.css";
import loaderStyle from "../styles/Home.module.css"
import { useRouter } from "next/router";

export default function Login(){
    let router = useRouter();
    useEffect(
        () => {
            if (localStorage.getItem('user')) {
                router.replace('/home') ;
            }
        }
    )
    let dispatch =useDispatch();
    let checkinput = (t,txt,reg) =>{
        if(!reg.test(t.value)){
            if(!document.querySelector("input[type='"+t.type+"']+p")){
                let p = document.createElement('p');
                p.appendChild(document.createTextNode(txt));
                t.after(p);
                t.style.borderColor="red";
            }
        }else{
            if(document.querySelector("input[type='"+t.type+"']+p")){
                document.querySelector("input[type='"+t.type+"']+p").remove();
            }
            t.style.borderColor="green";
        }
    }
    let onLogin = (e)=>{
        e.preventDefault();
        var email =document.querySelectorAll(`.${Styles.login} input`)[0];
        var password =document.querySelectorAll(`.${Styles.login} input`)[1];
        var newUser = {eMail:email.value,
            pass:password.value,
        };
        if(!document.querySelector(`.${Styles.login} p`) && email.value && password.value){
            dispatch(addUser(newUser));
            router.push('/home')
            document.querySelector(`.${loaderStyle.circledLoader}`).style.display = "block";
        }
        if(!email.value && !password.value){
            alert("email and password are required")
        }
    }
    return(
        <form className={Styles.login}>
            <input type="email" placeholder="Enter your email" required 
                onChange={(e)=>{checkinput(e.target,
                    "email should folow this form :****@****.**",
                    /^\w+(\.\w+|\w)+@\w+(\.\w+|\w)+\.([a-z]{2,})$/g
                )}}
            />
            <input type="password" placeholder="enter your password" required
                onChange={(e)=>{checkinput(e.target,
                    "should be more than 8 char.",
                    /^(.){8,}$/g
                )}}
            />
            <button type="submit" onClick={(e)=>onLogin(e)}> submit</button>
        </form>
    )
}