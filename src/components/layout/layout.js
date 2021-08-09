import React from 'react';
import './layout.scss';
import MobilePlaceholder from '../../assets/images/mobile-placeholder.png';

export default function MainLayout (props) {
    return (
        <div className="main-layout">
            <img src={MobilePlaceholder} alt="" style={{ width:'100%' }}/>
            {props.children}
        </div>
    )
}