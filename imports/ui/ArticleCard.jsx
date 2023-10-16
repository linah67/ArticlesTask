import React,{Fragment, useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ArticlesCollection } from '../db/ArticlesCollection.js';
import Box from '@mui/material/Box';
import { useParams } from 'react-router';
import { Card,CardContent,Typography,CardActions,Button,TextField } from '@mui/material';
// import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { CommentsCollection } from '../db/CommentsCollection.js';
import Divider from '@mui/material/Divider';
import RemoveCircleOutlineTwoToneIcon from '@mui/icons-material/RemoveCircleOutlineTwoTone';
import ModeOutlinedIcon from '@mui/icons-material/ModeOutlined';
import { Link, Navigate } from 'react-router-dom';
import TextsmsOutlinedIcon from '@mui/icons-material/TextsmsOutlined';
export const ArticleCard = () => {
  const { _id } = useParams();
  const[edit,setEdit]=useState(false);
  const articles = useTracker(() => ArticlesCollection.find({ _id }).fetch());
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.userId() ? Meteor.users.findOne({ _id: Meteor.userId() }) : '',
  }), []);
  const[isdeleted,setIsdeleted]=useState(false);
  const article=articles[0];
  const[description,setDescription]=useState(article.description);
  const[title,setTitle]=useState(article.title);
  const[comment,setComment]=useState("");
  const[opencomments,setopencomments]=useState(false);
  const handleedit=()=>{
    setEdit(true);
  }
  const deleteArticle = () => 
  {
    ArticlesCollection.remove(_id);
    setIsdeleted(true);
  }
  const handleAddComment=()=>{
    try {
      Meteor.call('comments.insert',comment,_id)
      console.log('Comment added successfully.');
      setComment("");
    } catch (error) {
      console.error('Error adding comment:', error);
    }
   }
  
const handlecomment=()=>{
  setopencomments(!opencomments);
}
  const handlecommentchange=(event)=>{
setComment(event.target.value);
  }
  const updateArticle = (_id, description) => {
    Meteor.call('articles.update',_id,description);
  };

    const handlechange = (event)=>{
        setDescription(event.target.value);
        console.log(description);
    }
    const handler = Meteor.subscribe('comments');

    const { comments } = useTracker(() => {
      const comments = CommentsCollection.find({ articleId:_id }).fetch();
      return { comments };
    });
  console.log(article);  
  console.log(comments);
 console.log(_id);
 const handledone=()=>{
  setEdit(false);
  // const updatedFields = {
  //   title: title,
  //   description: description,
  //   // Add other fields you want to update here
  // };
  updateArticle(_id, description);
  
 }
 if(edit){
  return(
    <div style={{justifyContent:'center',display:'flex',backgroundColor: 'lightgray',textAlign:'center',overflow:'auto',height:'100vh'}}>
    <Card sx={{ maxWidth: 500 ,margin:3,padding:'20px 100px'}}>        
    <CardContent>
    <Typography gutterBottom variant="h2" component="div" style={{ textAlign: 'center',marginBottom:'120px',wordWrap: 'break-word' }}>
        {article.title}
      </Typography>
      <Divider />
      <Typography variant="h4" color="text.secondary" style={{textAlign:'left',wordWrap: 'break-word'}}>
      </Typography>
      <TextField
      style={{wordWrap: 'break-word' }}
         type="text"
         value={description}
        onChange={handlechange}
       />    
       </CardContent>
    <CardActions>
      <Button size="small" onClick={handledone}>Done</Button>
    </CardActions>
    </Card>
    </div>
);
 }else{
return(
  
  <div style={{justifyContent:'center',display:'flex',backgroundColor: 'lightgray'}}>
    <Card sx={{ maxWidth: 600 ,padding:'20px 100px',margin:'0px 200px',height:'100vh',textAlign:'center',overflow:'auto'}}>  
    <CardContent>
      <Typography gutterBottom variant="h2" component="div" style={{ textAlign: 'center',marginBottom:'120px',wordWrap: 'break-word' }}>
        {article.title}
      </Typography>
      <Divider />

      <Typography variant="h4" color="text.secondary" style={{textAlign:'left',wordWrap: 'break-word'}}>
         {article.description}
      </Typography>
     
    </CardContent>
   {currentUser&&currentUser._id===article.createdBy?(
         <Button
         variant="outlined"
         startIcon={< ModeOutlinedIcon/>}
         onClick={handleedit}
       >
         Edit
       </Button>
   ):(
    <Fragment></Fragment>
   )}
     {currentUser?(
             <Button
             variant="outlined"
             startIcon={<TextsmsOutlinedIcon />}
             onClick={handlecomment}
           >
             Comments
           </Button>
     ):(
      <Fragment></Fragment>
     )
     }
      {opencomments?(
 <Container  sx={{bgcolor:'lightgray',padding:'10px',overflow: 'auto',justifyContent:'center'}}>
 <h4> Comments :</h4>
{comments.map((comment) => (
  <Box sx={{ bgcolor: 'white',margin:'10px',height:'5vh',width:'350px',justifyContent:'center'}} 
  >
          <Typography variant="body2" color="text.secondary">

                {comment.text}
                </Typography>

    </Box>
            ))}
             <TextField
   type="text"
   value={comment}
  onChange={handlecommentchange}
 />    
       <Button size="small"onClick={handleAddComment} >Add Comment</Button>
</Container>    
         ):(
<Fragment></Fragment>
         )}
    </Card>
    </div>
);
 }

};
