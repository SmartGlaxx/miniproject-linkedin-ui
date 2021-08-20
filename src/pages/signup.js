import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {Link} from 'react-router-dom'
import GoogleLogo from '../assets'
import Axios from 'axios'
import { Redirect } from 'react-router-dom';
import GoogleLogin from 'react-google-login'

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
  	width:"22rem",
  	height:"26rem",
  	textAlign:'center',
  	padding:"2rem",
  	[theme.breakpoints.down('sm')]:{
  		width:"100%"
  	}
  },
  input:{
  	margin:'1rem',
  	width:"95%",
  	// height:"1.7rem",
  	margin:"0 auto",
  	padding:"0.3rem",
   '&:focus':{
      outline:"1px solid #0a66c2"
    }
  },
  inputContainer:{
  	width:"95%",
  	margin:"0 auto",
  	[theme.breakpoints.down('sm')]:{
  		width:"50%"
  	},
  	 [theme.breakpoints.down('xs')]:{
  		width:"100%"
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
  link3:{
  	textDecoration:'none',
  	padding:"0 0.5rem",
  	color: "#777"
  },
  name1:{
  	textAlign:"center",
  	fontWeight:"700",
  	color:"#0a66c2"
  },
  name2:{  
  	background:"#0a66c2",
  	padding:"0rem 0.3rem",
  	color:"#fff",
  	borderRadius:"3px"
  },
  title:{
  	textAlign:"center",
  	fontWeight:"400",
  	fontSize:"1.6rem",
  	[theme.breakpoints.down('sm')]:{
  		fontSize:"1.5rem",
  		margin:"0 2rem"
  	}
  },
  agree:{
  	margin:"0.5rem 0",
    border:"1.4px solid #0a63bb",
    borderRadius:"3rem",
    color:"#0a63bb",
    padding:"0.6rem 2rem",
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
  googlecontainer:{
  	border:"1.4px solid #0a63bb",
  	borderRadius:"3rem",
  	"&:hover":{
  		cursor:"pointer"
  	}
  },
  google:{
  	textAlign:"center",
  	margin:"0 50%",
  	// paddingLeft:"3rem",
  	transform:"translateX(-50%)",
    // border:"1.4px solid #0a63bb",
    // zIndex:'-10',
    // color:"#0a63bb",
    // padding:"0rem 2rem",
    
    '&:hover':{
    	background:"#fff",
    	cursor:"pointer"
    }
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
  },
  error2:{
    border:"1px solid red",
    margin:'1rem',
  	width:"95%",
  	// height:"1.7rem",
  	margin:"0 auto",
  	padding:"0.3rem",
   '&:focus':{
      outline:"1px solid #0a66c2"
    }

  },
   bottomNav:{
    fontSize:"0.7rem",
    textAlign:'center',
    width:"100%",
    position:"fixed",
    bottom:"0rem",
    color: "#000",  
    zIndex:"10",
    padding: "1rem 0",
    background:"#fff",
    [theme.breakpoints.down('sm')]:{
    display:'none'
    },
  },
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
  		setSingedUp(false)
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
         }else if(message == 'User signed-up.'){
         	setSingedUp(true)
         }
    })
    .catch(error=>{
    	console.log(error)
    })
    }


    const responseGoogleCall =async(response)=>{
    	const {email, googleId} = response.profileObj
    	
        const postParams2 = {
            email : email,
            password : googleId
        }
        console.log(postParams2)
    
		   await Axios.post(url, postParams2)
		    .then(result =>{
		      const {message} = result.data
		      console.log(result)
		         if(message == 'Email exists'){
		           setErrorEmail(true)
		         }
		         else if(message == 'Password length'){
		           setErrorPassword(true)
		         }else if(message == 'User signed-up.'){
		         	setSingedUp(true)
		         }
		    })
		    .catch(error=>{
		    	console.log(error)
		    })
    	 setSingedUp(true)
    }
    const responseGoogle2 =(response)=>{
 
    	setSingedUp(false)
    }



  return (
    <div className={classes.root}>
    {singedUp && (<Redirect push to="/welcome"/>)}
      <div className={classes.main}>
      <h2 className={classes.name1}>Linked<span className={classes.name2}>in</span></h2>
       	<h2 className={classes.title}>Make the most of your professional life</h2>
       	<Grid className={classes.container} container>
	       	<Grid item className={classes.item}>
	       	<div className={classes.inputContainer}>
	       	<div className={classes.label}>Email or phone number</div>

	       	<input type='email' value={signInValue.email} onChange={setSignIn} name='email' className={errorEmail ? classes.error2 : classes.input}/><br />
	       	{errorEmail && <div className={classes.error}>Email exists. <Link to='/login' className={classes.link2}> Please login</Link></div>}
	       	
	       	<div className={classes.label}>Password (6 or more characters)</div>
	       	<input type='password' value={signInValue.password} onChange={setSignIn} name='password' className={errorPassword ? classes.error2 : classes.input}/><br />
	       	{errorPassword && <div className={classes.error}>The password you provided must have at least 6 characters.</div>}

	       	<span className={classes.terms}>By clicking Agree & Join, you agree to the LinkedIn <Link to='/' className={classes.link2}>User Agreement</Link>
	       	<Link to='/' className={classes.link2}>Privacy Policy</Link>, and <Link to='/' className={classes.link2}>Cookie Policy</Link>.</span><br />
	       	<Button variant='text'  className={classes.agree} onClick={signup}>
	       	<span className={classes.agree1}>A</span><span className={classes.agree2}>gree & Join</span></Button><br />
	       	<span className={classes.hr}><hr className={classes.hr1}/>or<hr className={classes.hr1}/></span>
	       	
	       	<div className={classes.googlecontainer}>
	       	<GoogleLogin 
	       	clientId ='643162463921-gf96ma4qgc131dknjf393ao0m66spv4p.apps.googleusercontent.com'
	       	buttonText=''
	       	onSuccess={responseGoogleCall}
	       	onFailure={responseGoogle2}
	       	cookiePolicy={'single_host_origin'}
	       	>
	       	<span className={classes.google1}>J</span>
	       	<span className={classes.google2}>oin with <span className={classes.google1}>G</span>oogle</span>
	       	</GoogleLogin></div>
	       	<br />
	       	<span>Already on LinkedIn? <Link to= '/login' className={classes.link}>Sign in</Link></span>
	       	</div>
	       	</Grid>
       	</Grid>
      </div>
   	<div className={classes.bottomNav}>
   	<Link to='/' className={classes.link3}>Español</Link>
   	<Link to='/' className={classes.link3}>Português</Link>
   	<Link to='/' className={classes.link3}>Français</Link>
   	<Link to='/' className={classes.link3}>简体中文</Link>
   	</div>
    </div>
  );
}

