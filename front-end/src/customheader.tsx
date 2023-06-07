import React from 'react';

import { GiHamburgerMenu } from "react-icons/gi";


export default ({isOpen,setIsOpen}) => {

  return (
    <div className='customHeader'> 
          <div className='divPlaceHolder'></div>
          <span className='headerClusterName'>Cluster : Mutu 200</span> 
          <span className='headerBurger'  onClick={() => setIsOpen(!isOpen) }><GiHamburgerMenu /></span>

    </div>
  );
};




