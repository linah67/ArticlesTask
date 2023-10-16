import React,{useState} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import { ArticlesCollection } from '../db/ArticlesCollection.js';
import { Article } from './Article.jsx';
import { FormArticle } from './FormArticle.jsx';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';

export const MyArticles = () => {
  const articles = useTracker(() => ArticlesCollection.find({ createdBy: Meteor.userId() },
    ).fetch());
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
  const[addArticle,setAddArticle]=useState(false);
  const deleteArticle = ({ _id }) => Meteor.call('articles.remove',_id);
  const handleClose = () => {
    setAddArticle(false);
  };
  
  const [title, setTitle] = useState("");
  const[description,setDescription]=useState("");
  // const handleSubmit = e => {
  //   e.preventDefault();

  //   if (!title&&!description) return;

  //   ArticlesCollection.insert({
  //     title: title.trim(),
  //     description:description.trim(),
  //     createdAt: new Date()
  //   });
  //   setAddArticle(false);
  //   setTitle("");
  //   setDescription("");
  // };

  

return(
    <div style={{padding:'10px 200px',backgroundColor: 'white',textAlign:'center'}} >
    <Typography variant="h2" gutterBottom>
       Your Articles
     </Typography>
   <Stack spacing={2} sx={{backgroundColor: 'lightgray',height:'100vh',padding:20}}> 
   {articles.map(task => (
               <Article
                 key={task._id}
                 article={task}
                 onDeleteClick={deleteArticle}
               />
             ))}
   <IconButton color="inherit" component={Link} to={`/article/add`}>
 <AddIcon></AddIcon> ADD ARTICLE
</IconButton>
</Stack>


 </div>
);

    
};
