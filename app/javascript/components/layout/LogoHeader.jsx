import React from 'react';
import Brimstone from '../../../assets/images/items/brimstone'; //logo image

//top left header layout
function LogoHeader(props){
  return (
  <div>
    <img className="logo-image" src={Brimstone}/>
    <h4 className="display-inline logo-text">Project Isaac</h4>
  </div>
  )
}

export default LogoHeader;