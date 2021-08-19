import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import GoogleLogo from '../assets'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    position:"absolute",
    top:"0",
    bottom:"0",
    left:"0",
    right:"0",
    // background:'#f3f2ef',
    background:"#fff",
    height:"100vh",
    width:"100%",
    padding:"0",
    margin:"0",
    [theme.breakpoints.down('sm')]:{
    background:"#fff"
    },
    '& > *': {
      // margin: theme.spacing(1),
    },
  },
  loginBtn:{
    display:'flex',
  },
  container:{
    width:"100%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",

  },
  item:{
    background:"#fff",
    width:"25rem",
    height:"30rem",
    textAlign:'center',
    padding:"2rem 0",
    //boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),0 22.3px 17.9px rgba(0, 0, 0, 0.042),0 41.8px 33.4px rgba(0, 0, 0, 0.05),0 100px 80px rgba(0, 0, 0, 0.07)",
    [theme.breakpoints.down('sm')]:{
      width:"100%",
      padding:"2rem 0",
    }
  },
  innerItem:{
    background:"#fff",
    width:"100%",
    height:"25rem",
    // textAlign:'center',
    padding:"2rem",
    boxSizing:"border-box",
    boxShadow: "0 2.8px 2.2px rgba(0, 0, 0, 0.02), 0 6.7px 5.3px rgba(0, 0, 0, 0.028), 0 12.5px 10px rgba(0, 0, 0, 0.035),0 22.3px 17.9px rgba(0, 0, 0, 0.042),0 41.8px 33.4px rgba(0, 0, 0, 0.05),0 100px 80px rgba(0, 0, 0, 0.07)",

    // boxShadow: "0 0.2px 2.7px rgba(0, 0, 0, 0.022),0 0.4px 6.9px rgba(0, 0, 0, 0.031),0 0.9px 14.2px rgba(0, 0, 0, 0.039), 1.8px 29.2px rgba(0, 0, 0, 0.048),0 5px 80px rgba(0, 0, 0, 0.07)",


    [theme.breakpoints.down('sm')]:{
      width:"100%"
    }
  },
  input:{
    margin:'1rem',
    width:"95%",
    height:"1.3rem",
    margin:"0 auto",
    // [theme.breakpoints.down('sm')]:{
    //  width:"50%"
    // }
  },
  inputContainer:{
    // margin:'1rem',
    width:"95%",
    margin:"0 auto",
    [theme.breakpoints.down('sm')]:{
      width:"50%"
    }
  },
  inputContainer2:{
    // margin:'1rem',
    width:"95%",
    margin:"0 auto",
    [theme.breakpoints.down('sm')]:{
      width:"50%"
    }
  },
  inputContainer3:{
    textAlign:"center",
    marginTop:'2rem',
    width:"95%",
    margin:"0 auto",
    [theme.breakpoints.down('sm')]:{
      width:"50%"
    }
  },
  label:{
    textAlign:"left",
    fontSize:"0.9rem",
    color:"#555",
    margin:"0.1rem"
  },
  reset:{
    textAlign:'left'
  },
  link:{
    textDecoration:'none'
  },
  link2:{
    textDecoration:'none',
    color:"#0a66c2"
  },
  name1:{
    textAlign:"left",
    fontWeight:"700",
    color:"#0a66c2"
  },
  name2:{  
    background:"#0a66c2",
    padding:"0rem 0.3rem",
    color:"#fff"
  },
  title:{
    textAlign:"left",
    fontWeight:"400"
  },
  sub:{
    textAlign:'left',
  },
  signin:{
    margin:"0.5rem 0",
    border:"1.4px solid #0a63bb",
    borderRadius:"3rem",
    color:"#0a63bb",
    padding:"0.3rem 2rem",
    color:"#fff",
    width:"100%",
    background:"#0a66c2"
  },
  signin1:{
    textTransform:"uppercase",
  },
  signin2:{
    textTransform:"lowercase",
  },
  terms:{
    fontWeight:"400",
    fontSize:"0.8rem",
    color:"#555"
  },
  google:{
    margin:"0.5rem 0",
    border:"1.4px solid #0a63bb",
    borderRadius:"3rem",
    color:"#0a63bb",
    padding:"0.1rem 2rem",
    width:"100%",
    // background:"#0a66c2"
  },
  google1:{
    textTransform:"uppercase",
  },
  google2:{
    textTransform:"lowercase",
  },
  hr:{
    display:"flex",
    [theme.breakpoints.down('sm')]:{
      display:'none'
    }
  },
  hr1:{
    width:"40%",
    height:"0.1rem"
  },
  error:{
    textAlign:"left",
    color:'red',
    fontSize:"0.8rem"
  }
}));



export default function Login() {
  const classes = useStyles();
  const [signInValue, setSignInValue] = useState({})
  const [redirect, setRedirect] = useState(false)
  const [errorValidate, setErrorValidate] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const url = 'http://localhost:5000/login' 

  const setSignIn =(e)=>{
    const name = e.target.name
    const value = e.target.value

    setSignInValue(prev =>{
      setErrorValidate(false)
      setErrorPassword(false)
      return {...prev, [name] : value}
    })
  }

   const signin = async()=>{
        const email = signInValue.email
        const password = signInValue.password

        const postParams = {
            email : email,
            password : password
        }
    
   await Axios.post(url, postParams)
    .then(result =>{
      const {message} = result.data
         if(message == 'success'){
           setRedirect(true)
         }else if(message == 'failed'){
          setErrorValidate(true)
         }else if(message == 'Password length'){
           setErrorPassword(true)
         }
    })
    .catch(error=>{
      console.log(error)
    })
    } 


  return (
    <div className={classes.root}>
    {redirect && (<Redirect push to="/welcome"/>)}
      <div className={classes.main}>
        <Grid className={classes.container} container>
          <Grid item className={classes.item}>
          <div className={classes.inputContainer2}><h2 className={classes.name1}>Valid <span className={classes.name2}>Profits</span></h2></div>
          <div className={classes.inputContainer}>
          <div className={classes.innerItem}>
          <h2 className={classes.title}>Sign in</h2>
          <div className={classes.sub}>Stay updated on your professional world</div>
          <div className={classes.label}>Email or phone number</div>
          <input type='text' value={signInValue.email} onChange={setSignIn} name='email' className={classes.input}/><br />
          {errorValidate && <div className={classes.error}>Couldn’t find a LinkedIn account associated with this email / password combination. Please try again.</div>}
          <div className={classes.label}>Password (6 or more characters)</div>
          <input type='password' value={signInValue.password} onChange={setSignIn} name='password' className={classes.input}/><br />
         {errorPassword && <div className={classes.error}>The password you provided must have at least 6 characters.</div>}

          <div className={classes.reset}><Link to='/' className={classes.link2}>Forgot password?</Link></div><br />

          <Button variant='text'  className={classes.signin} onClick={signin}><span className={classes.signin1}>S</span>
          <span className={classes.signin2}>ign in</span></Button><br />
          </div>
          </div>
          </Grid>
          <Grid xs={12}>
          <div className={classes.inputContainer3}>New to LinkedIn? <Link to='/signup' className={classes.link2}>Join now</Link></div>
          </Grid>
        </Grid>

      </div>
    </div>
  );
}

