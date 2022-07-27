import { useEffect } from "react";
import { useSelector } from "react-redux";
import Styles from "../styles/Comments.module.css"

export default function Comments({comments}){
    let {user} = useSelector(state=>state);
    let url;
    useEffect(()=>{
        if(user.eMail){
            document.querySelector(`.${Styles.layout}`).style.display = "none";
        }
        url = window.location.href.split('/')
        url.pop();
        url = url.join('/') + "/api/comments";
    });
    let apiComments = comments;


    let toggle = e =>{
        e.target.parentElement.lastChild.classList.toggle(`${Styles.active}`);
    }
    
    let addPost = e =>{
        e.preventDefault();
        let lastpost = document.querySelector(`.${Styles.comment}:last-child`);
        let id = lastpost? parseInt(lastpost.dataset.id) + 1 : 1;
        let title = e.target.parentElement.children['title'].value;
        let body = e.target.parentElement.children['body'].value;
        if(title === '' || body === ''){
            alert("fill title and body fields before press post")
        }else{
            (async () =>{console.log(url)
                await fetch(url ,{
                    method:"POST",
                    body:JSON.stringify({id,title,body}) ,
                })
            })();
            window.location.reload();
        }
    }

    let deletePost = e =>{
        let id = parseInt(e.target.parentElement.dataset.id) ;
        if(confirm("do yo sure you want to delete post ?")){
            (async () =>{
                await fetch(url ,{
                    method:"DELETE",
                    body:JSON.stringify(id) ,
                })
            })();
            window.location.reload();
        }
    }

    let addToForm = e =>{
        let id = e.target.parentElement.dataset.id;
        let title = e.target.parentElement.firstChild.innerText;
        let body = e.target.parentElement.lastChild.innerText;
        let form = document.querySelector(`.${Styles.comments} form`);
        form.firstChild.innerText = "Edit Post"
        form.children[form.children.length-1].dataset.id = id;
        form.children['title'].value = title;
        form.children['body'].value = body;
        form.children[form.children.length-1].style = null;
        form.children[form.children.length-2].style.display = "none";
    }

    let updatePost = e =>{
        e.preventDefault();
        let id = parseInt(e.target.dataset.id) ;
        let title = e.target.parentElement.children['title'].value;
        let body = e.target.parentElement.children['body'].value;
        if(title === '' || body === ''){
            alert("fill title and body fields before press edit")
        }else{
            (async () =>{
                await fetch(url ,{
                    method:"PATCH",
                    body:JSON.stringify({id,title,body}) ,
                })
            })();
            window.location.reload();
        }
    }

    return(
        <div className={Styles.comments}>
            <div className={Styles.commentsContainer}>
                {
                    apiComments.map((c, i)=>
                        <div key={i} className={Styles.comment} data-id={c.id}>
                            <h3 onClick={toggle}>{c.title}</h3>
                            <span onClick={deletePost}>x</span>
                            <span onClick={addToForm}>modify</span>
                            <p>{c.body}</p>
                        </div>
                    )
                }
            </div>
            <form >
                <h2>Add Post</h2>
                <input name="title" type="text" placeholder="Enter the title" required/>
                <br/>
                <textarea name="body" placeholder="Enter the body" required/>
                <br/>
                <button type="submit" onClick={addPost} >Post</button> 
                <button 
                    type="submit" 
                    onClick={updatePost} 
                    style={{display:"none"}}
                    data-id=""
                >Edit</button> 
            </form>
            <div className={Styles.layout} onClick={()=>{alert("sign up first")}}></div>
        </div>
    )
}

export async function getStaticProps(){
    let res = await fetch("http://localhost:3000/api/comments");
    let comments = await res.json();
    return({
        props:{
            comments,
        }
    })
}