import React from 'react'
import './Header.scss'

export default function Header (props) {
    return (
        <div className="header">
            {props.children}
        </div>
    )
}