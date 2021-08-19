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
  	background:'#f3f2ef',
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
  	padding:"2rem",
  	[theme.breakpoints.down('sm')]:{
  		width:"100%"
  	}
  },
  input:{
  	margin:'1rem',
  	width:"95%",
  	height:"1.3rem",
  	margin:"0 auto",
  },
  inputContainer:{
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
  link:{
  	textDecoration:'none'
  },
  link2:{
  	textDecoration:'none',
  	color:"#0a66c2"
  },
  name1:{
  	textAlign:"center",
  	fontWeight:"700",
  	color:"#0a66c2"
  },
  name2:{  
  	background:"#0a66c2",
  	padding:"0rem 0.3rem",
  	color:"#fff"
  },
  title:{
  	textAlign:"center",
  	fontWeight:"400"
  },
  agree:{
  	margin:"0.5rem 0",
    border:"1.4px solid #0a63bb",
    borderRadius:"3rem",
    color:"#0a63bb",
    padding:"0.1rem 2rem",
    color:"#fff",
    width:"100%",
    background:"#0a66c2",
    "&:hover":{
    	background:"#fff",
    	color:"#0a66c2",
    }
  },
  agree1:{
    textTransform:"uppercase",
  },
  agree2:{
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
    width:"100%"
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
  	height:"0.1rem",
  },
  error:{
  	textAlign:"left",
  	color:'red',
  	fontSize:"0.8rem"
  }

}));



export default function Signup() {
  const classes = useStyles();
  const [signInValue, setSignInValue] = useState({})
  const [errorEmail, setErrorEmail] = useState(false)
  const [errorPassword, setErrorPassword] = useState(false)
  const [singedUp, setSingedUp] = useState(false)

  const url = 'http://localhost:5000/signup' 

  const setSignIn =(e)=>{
  	const name = e.target.name
  	const value = e.target.value

  	setSignInValue(prev =>{
  		setErrorEmail(false)
  		setErrorPassword(false)
  		return {...prev, [name] : value}
  	})
  }


   const signup = async()=>{
        const email = signInValue.email
        const password = signInValue.password

        const postParams = {
            email : email,
            password : password
        }
    
   await Axios.post(url, postParams)
    .then(result =>{
      const {message} = result.data
      console.log(result)
         if(message == 'Email exists'){
           setErrorEmail(true)
         }
         else if(message == 'Password length'){
           setErrorPassword(true)
         }else if(message == 'User signed-up'){
         	setSingedUp(true)
         }
    })
    .catch(error=>{
    	console.log(error)
    })
    }




  return (
    <div className={classes.root}>
    {singedUp && (<Redirect push to="/welcome"/>)}
      <div className={classes.main}>
      <h2 className={classes.name1}>Valid <span className={classes.name2}>Profits</span></h2>
       	<h2 className={classes.title}>Make the most of your professional life</h2>
       	<Grid className={classes.container} container>
	       	<Grid item className={classes.item}>
	       	<div className={classes.inputContainer}>
	       	<div className={classes.label}>Email or phone number</div>

	       	<input type='text' value={signInValue.email} onChange={setSignIn} name='email' className={classes.input}/><br />
	       	{errorEmail && <div className={classes.error}>Email exists. <Link to='/login' className={classes.link2}> Please login</Link></div>}
	       	
	       	<div className={classes.label}>Password (6 or more characters)</div>
	       	<input type='password' value={signInValue.password} onChange={setSignIn} name='password' className={classes.input}/><br />
	       	{errorPassword && <div className={classes.error}>The password you provided must have at least 6 characters.</div>}

	       	<span className={classes.terms}>By clicking Agree & Join, you agree to the LinkedIn <Link to='/' className={classes.link2}>User Agreement</Link>
	       	<Link to='/' className={classes.link2}>Privacy Policy</Link>, and <Link to='/' className={classes.link2}>Cookie Policy</Link>.</span><br />
	       	<Button variant='text'  className={classes.agree} onClick={signup}>
	       	<span className={classes.agree1}>A</span><span className={classes.agree2}>gree & Join</span></Button><br />
	       	<span className={classes.hr}><hr className={classes.hr1}/>or<hr className={classes.hr1}/></span>
	       	<Button variant='text'  className={classes.google}>
	       	
	       	<span className={classes.google1}>J</span>
	       	<span className={classes.google2}>oin with Google</span></Button><br />
	       	<span>Already on LinkedIn? <Link to= '/login' className={classes.link}>Sign in</Link></span>
	       	</div>
	       	</Grid>
       	</Grid>
      </div>
    </div>
  );
}

