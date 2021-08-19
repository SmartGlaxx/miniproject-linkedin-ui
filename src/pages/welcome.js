import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
   homePage:{
    color:"#0a63bb",
    fontSize:"2rem",
    width:"100%",
    height:"100vh",
    display:"grid",
    placeItems:"center",
    position:"absolute",
    top:"0",
    lwft:"0",
    bottom:"0",
    right:"0",
    zIndex:"0"
  }
})
)

export default function Welcome(){
	const classes = useStyles();

	return(<div className={classes.root}>
	<div className={classes.homePage}>
	<h1>WELCOME TO LINKEDIN</h1>
	</div>
	</div>
)
}