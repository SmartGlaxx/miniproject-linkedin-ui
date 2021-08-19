import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  loginBtn:{
    display:'flex',
    float: 'right'
  },
  login1:{
    textTransform:"uppercase",
  },
  login2:{
    textTransform:"lowercase",
  },
  joinnow:{
    border:"1.4px solid #0a63bb",
    borderRadius:"3rem",
    color:"#0a63bb",
    padding:"0rem",
    marginTop:"0.3rem"
  },
  joinnow1:{
    textTransform:"uppercase",
  },
  joinnow2:{
    textTransform:"lowercase",
  },
  link:{
    textDecoration:"none"
  },
  homePage:{
    color:"#0a63bb",
    fontSize:"5rem",
    fontWeight:"600",
    width:"100%",
    height:"100vh",
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    position:"absolute",
    top:"0",
    lwft:"0",
    bottom:"0",
    right:"0",
    zIndex:"0"
  },
  name2:{  
    background:"#0a66c2",
    padding:"0rem 0.7rem",
    color:"#fff",
    borderRadius:"6px"
  },
}));

export default function Home() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
    <div className={classes.homePage}><span>Linked</span><span className={classes.name2}>in</span></div>
      <div className={classes.loginBtn}>
        <Link to='/signup' className={classes.link}>
          <Button variant="text">
            <span className={classes.login1}>J</span><span className={classes.login2}>oin now</span>
          </Button></Link>
        <Link to='/login' className={classes.link}>
          <Button variant="text" className={classes.joinnow}>
        <span className={classes.joinnow1}>S</span><span className={classes.joinnow2}>ign in</span>
        </Button>
        </Link>
      </div>
    </div>
  );
}
