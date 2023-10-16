import React, { Fragment,useState } from 'react';
import Modal from '@mui/material/Modal';
import { ArticlesCollection } from '../db/ArticlesCollection';
import { red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Link, Navigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import DescriptionIcon from '@mui/icons-material/Description';
export const FormArticle = () => {
  const [title, setTitle] = useState("");
  const[description,setDescription]=useState("");
  const[addArticle,setAddArticle]=useState(true);
  const[redirect,setRedirect]=useState(false);
  const[error,setError]=useState("");
  const handleClose = () => {
    setAddArticle(false);
  };
  const handleSubmit = e => {
    e.preventDefault();

    if (!title){
      setError("title is required!");
      return;
    }
    Meteor.call('articles.insert',title,description);
    // ArticlesCollection.insert({
    //   title: title.trim(),
    //   description:description,
    //   createdAt: new Date(),
    //   createdBy:Meteor.userId()
    // });
      setRedirect(true);
  };
  if (redirect) {
    console.log("hi"+Meteor.user());
    return (<Navigate to="/" />);
  }else{
  return(
<div style={{justifyContent:'center',backgroundColor: 'lightgray',height:'100vh',display:'flex',textAlign:'center'}}>
 <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    height: '50vh'
  }}
>
<Paper elevation={3} sx={{ width: 300,textAlign: 'center',padding: '10px 60px' }} >
<h1> New Article</h1>
<DescriptionIcon style={{ fontSize: 60,marginBottom:20 }} ></DescriptionIcon>
<form className="task-form" style={{textAlign:'left'}} onSubmit={handleSubmit}>
 <label> Article's Title*</label>
 <input
   type="text"
   placeholder="Add Title"
   value={title}
   onChange={(e) => setTitle(e.target.value)}
 />
 {error===''?(
  <Fragment></Fragment>
 ):(
           <Alert severity="error">{error}</Alert>
 )}
  <label> Article's Description</label>
<input
   type="text"
   placeholder="Add Description"
   value={description}
   onChange={(e) => setDescription(e.target.value)}
 />
 <Button type="submit">Add Task</Button>
</form>
       
 
 </Paper> 
     </Box>
</div>
  );
   }
 
  }