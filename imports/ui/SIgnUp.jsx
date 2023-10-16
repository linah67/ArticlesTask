import React,{Fragment, useState } from 'react';
 import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Accounts } from 'meteor/accounts-base';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { Link, Navigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';

// import SimpleSchema from 'simpl-schema';
// import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
 

  /* Handle SignUp submission. Create user account and a profile entry, then redirect to the home page. */
 
 export const SignUp = () => {
    const [error, setError] = useState('');
    const submit = (doc) => {
        const { email, password } = doc;
        Accounts.createUser({ email: email, password:password }, (err) => {
          if (err) {
            setError(err.reason);
            console.log(error);
          } else {
            setError('');
            console.log("3amal sign up");
          }
        });
      };
      const SignupSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email').required('Required'),
        password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Please confirm your password'),
      });
     
      return(
   <div style={{justifyContent:'center',display:'flex', backgroundColor: 'lightgray',height: '100vh'}}>
     <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        height:'50vh',
      }}
    >
           <Paper elevation={3} sx={{ width: 300,textAlign: 'center',padding: '10px 60px' }} >

     <h1>SignUp</h1>
     <AccountCircleIcon style={{ fontSize: 60,marginBottom:20 }}></AccountCircleIcon>

     <Formik
        initialValues={{
            email: '',
            password:'',
            confirmpassword:''
          }}
          validationSchema={SignupSchema}
          onSubmit={values => {
            // same shape as initial values
            console.log(values);
            submit(values);
          }}
     >
       {({ errors, touched }) => (
         <Form style={{display:'flex',flexDirection:'column',textAlign:'left'}}>
           <label> Email*</label>
           <Field name="email" type="email" />
          
           {errors.email && touched.email ? <div> <Alert severity="error">{errors.email}</Alert></div> : null}
           <label> Password*</label>
           <Field name="password" type="password" />
           {errors.password && touched.password ? <div><Alert severity="error">{errors.password}</Alert></div> : null}
           <label>Confirm Password*</label>
           <Field name="confirmpassword" type="confirmpassword" />
           {errors.confirmpassword && touched.confirmpassword ? <div><Alert severity="error">{errors.confirmpassword}</Alert></div> : null}
                {error==""?(
            <Fragment></Fragment>
          ):(
            <Alert severity="error">{error}</Alert>

          )}
           <Button style={{marginTop:'30px'}} type="submit">SIgn Up</Button>
         </Form>
       )}
     </Formik>
   
     <Button variant="text"  component={Link} to={`/`}>Complete as a guest</Button>
     </Paper> 
         </Box>
   </div>
      );
 };