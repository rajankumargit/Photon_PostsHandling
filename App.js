import React,{useState, useEffect} from "react";
import "./style.css";

import PostForm from "./PostForm"

export default function App() {
  const[posts, setPosts] = useState([])
  const[isFormOpen, setIsFormOpen] = useState(false)
  const[currentPost, setCurrentPost] = useState(null)

  useEffect(()=>{
    const storePosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(storePosts)
  },[])


  useEffect(()=>{
  const fetchData = async () =>{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts")
    const data = await response.json()
    setPosts(data)
    // console.log(data)
  }
  fetchData()
},[])

const handleAddPost = (post) =>{
  const updatePosts = [...posts, {id: Date.now(), ...post}]
  setPosts(updatePosts)
  localStorage.setItem("posts", JSON.stringify(updatePosts))
}

const handleUpdatePost = (updatedPost) =>{
  const updatePost = posts.map((post)=>{
    post.id === currentPost.id ? {...post,...updatedPost}:post
  })
  setPosts(updatePost)
  localStorage.setItem("posts", JSON.stringify(updatedPost))

}

const handleDeletePost= (id)=>{
  const deletedPosts = posts.filter((post)=>post.id !==id)
  setPosts(deletedPosts)
  localStorage.setItem("posts", JSON.stringify(deletedPosts))
}

const handleEditPost = (post) =>{
  setCurrentPost(post)
  setIsFormOpen(true)
}
const handleSubmit = (post) =>{
  if(currentPost){
    handleUpdatePost(post)
  }else{
    handleAddPost(post)
  }


}

const handleCloseForm = () =>{
  setCurrentPost(null)
  setIsFormOpen(false)

}

const handleOpenForm =() =>{
  setCurrentPost(null)
  setIsFormOpen(true)

}
  return (
    <div className = "form-container">
      <h1>Post Manager </h1>
      <button onClick={handleOpenForm}> Add Post</button>
      {
        isFormOpen && (
          <PostForm posts={currentPost} onSubmit={handleSubmit} onClose={handleCloseForm}/>
        )
      }
     <ul>
       {
         posts.map((post)=>(
           <li key={post.id}> 
           <h3>{post.title} </h3>
           <p>{post.body}</p>
           <button onClick={handleEditPost}> Edit </button>  
           <button onClick={handleDeletePost}> Delete </button> 
           </li>
         ))
       }
     </ul>
      
    </div>
  );
}
