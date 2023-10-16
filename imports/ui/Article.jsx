import React, { Fragment, useState,useEffect} from 'react';
import { useTracker } from 'meteor/react-meteor-data';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const Article = ({ article ,onDeleteClick}) => {
  const[candelete,setCandelete]=useState(false);
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.userId() ? Meteor.users.findOne({ _id: Meteor.userId() }) : '',
  }), []);
  userid=Meteor.userId();
  useEffect(() => {
    if (currentUser) {
      if (article.createdBy) {
        if(article.createdBy === userid){
          setCandelete(true);
          console.log(article.createdBy === userid);
        }
      }
    }
  }, [userid, article.createdBy]);

 
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'left',
        color: theme.palette.text.secondary,
      }));
  return (
  <Item style={{backgroundColor:'white'}}>
    <div style={{display:'flex'}}>
        <Typography gutterBottom variant="h5" component="div" >
          {article.title}
        </Typography>
        {candelete?(
              <Button
              startIcon={<DeleteForeverIcon />}
              onClick={ () => onDeleteClick(article) }
            > 
             </Button>       
        ):(
            <Fragment></Fragment>
        )}
      
    <Button style={{marginLeft:'auto'}} variant="outlined" component={Link} to={`/article/${article._id}`}>
            view
          </Button>
     </div>
        </Item>
  );
};