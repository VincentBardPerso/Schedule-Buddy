import React from "react";
import Tilt from 'react-parallax-tilt'
import './Logo.css'
import logo from './LogoBlue.png'

const Logo = () => {
    
    return(
        <div style={{display: 'flex',justifyContent: 'flex-start'}}> 
            <Tilt style={{height: '150px', width: '150px' }} className='br2 center mb3 shadow-2 parallax-effect-glare-scale ' tiltAxis={'y'} transitionSpeed={600} glareEnable={true} glareMaxOpacity={0.45} scale={1.02}>
            <img src={logo} style={{height: '125px', width: '125px'}} className='pt2-l'/>
            </Tilt>
        </div>
    )
}
export default Logo;