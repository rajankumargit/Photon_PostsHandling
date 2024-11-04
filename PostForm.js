import React, {useState, useEffect} from "react"

const PostForm = ({posts, onClose, onSubmit}) =>{
  const[tittle, setTitle] = useState("")
  const[body, setBody] = useState("")

 useEffect(()=>{
   if(posts){
     setTitle(posts.tittle)
     setBody(posts.body)
   }
 },[posts])

  const handleSubmit = (e) =>{
    e.prevantDefault()
    onSubmit({tittle,body})
    onClose()
  }

  

  return(
    <div className="app">
      <form onSubmit={handleSubmit}> 
       <input type="text" placeholder="Title" value={tittle}
       onChange={(e)=>setTitle(e.target.value)} required />

       <textarea placeholder="Body" value={body}
       onChange={(e)=>setBody(e.target.value)} required />
       
       <button type="submit" > Submit</button>
       <button type="button" onClick={onClose}> Cancel</button>
      </form>
    </div>
  )
}

export default PostForm
