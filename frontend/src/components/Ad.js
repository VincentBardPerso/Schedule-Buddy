import React from 'react';

import wings from './wings.jpg'

const Ad= ({link, width, height, float, position}) =>{

   let w = width;
   let h = height;
   let fl = float;
   let p = position;
  return (
    <div className="center" style={{width:'70%',minWidth:'500px', maxWidth:'700px', height:h, minHeight:h,minWidth:w, alignContent: "center", floar:fl, position:p}}>
      <img src={wings} alt="Ad" style={{width:"100%", height:"100%",objectFit: "contain"}}/>
    </div>
  );
}

export default Ad;