import React from 'react'
import './Footer.scss'

export default function Footer (props) {
    return (
        <div className="footer">
            {props.children}
        </div>
    )
}