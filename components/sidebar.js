import Link from "next/link";
import Styles from "../styles/Home.module.css"

export default function SideBar(){
    let removeFun = ()=>{
        if(confirm("do you shure that you want to remove account ?")){
            localStorage.removeItem('user');
            let url = window.location.href.split('/');
            url.pop();
            url = url.join('/') ;
            window.location.href = url;
        }
    }
    return(
        <div className={Styles.sidebar}>
            <ul>
                <Link href="/home"> Home</Link>
                <Link href="/toDo"> ToDoList </Link>
                <Link href="/comments"> Comments</Link>
                <span onClick={removeFun}>Remove Account</span>
            </ul>
        </div>
    )
}