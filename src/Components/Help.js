import {React, useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';

const Help = ({showNavOpt,showNavbar})=>{

 useEffect(()=>{
  showNavbar(false);
  showNavOpt(false);
 })
 return(
  <>
   <div style={{color:'black'}}>
    Help Page
   </div>
  </>
 )
}

export default Help;