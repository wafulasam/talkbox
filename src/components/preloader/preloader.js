import React from 'react'
import './preloader.scss'
import Logo from '../../assets/images/logo.png'

function Preloader () {
    return (
        <div className="preloader">
            <img src={Logo} alt="Microsoft" height="50" />
        </div>
    )
}
export default Preloader