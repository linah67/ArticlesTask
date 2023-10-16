import React, { Fragment } from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BoxArrowRight, PersonFill, PersonPlusFill } from 'react-bootstrap-icons';
import { AppBar, Toolbar, Typography, makeStyles, Button } from '@material-ui/core';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));
 
const NavBar = () => {
  // useTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
  const { currentUser } = useTracker(() => ({
    currentUser: Meteor.userId() ? Meteor.users.findOne({ _id: Meteor.userId() }) : '',
  }), []);
  // console.log(currentUser.email);
//   console.log(Meteor.user().username);
console.log(`user: ${JSON.stringify(currentUser)}`);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handlesignout=()=>{
    // console.log(currentUser);
    Meteor.logout();
    // console.log("user:"+Meteor.user())
  }
  const classes = useStyles();

  return (
    <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Articles Hub
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          {currentUser?(
            <Fragment>
             <Button color="inherit" component={Link} to="/myarticles">
             MyArticles
           </Button>
              <Button color="inherit" onClick={handlesignout}>
              SignOut
            </Button>
            </Fragment>
          ):(
            <div>
            <Button
              id="fade-button"
              aria-controls={open ? 'fade-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              SignIn/SignUp
            </Button>
            <Menu
              id="fade-menu"
              MenuListProps={{
                'aria-labelledby': 'fade-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              TransitionComponent={Fade}
            >
              <MenuItem component={Link} to="/signin">SIgnIn</MenuItem>
              <MenuItem component={Link} to="/signup" >SIgnUp</MenuItem>
            </Menu>
          </div>          )}
        
        
        </Toolbar>
      </AppBar>
  );
};

export default NavBar;
