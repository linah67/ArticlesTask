import React,{useState} from 'react';
import { AllArticles } from './AllArticles.jsx';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
// import { Roles } from 'meteor/alanning:roles';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import { SignIn } from './SignIn.jsx';
import { SignUp } from './SIgnUp.jsx';
import { ArticleCard } from './ArticleCard.jsx';
import { FormArticle } from './FormArticle.jsx';
import { MyArticles } from './MyArticles.jsx';
export const App = () => {
 
return(
  <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar></NavBar>
        <Routes>
          <Route exact path="/" element={<AllArticles />} />
          <Route exact path="/signin" element={<SignIn/>}></Route>
          <Route exact path="/signup" element={<SignUp/>}></Route>
          <Route exact path="/article/:_id" element={<ArticleCard/>}></Route>
          <Route exact path="/article/add" element={<FormArticle/>}></Route>
          <Route exact path="/myarticles" element={<MyArticles/>}></Route>

        </Routes>
      </div>
    </Router>  
);
};
