import React from 'react'
import './layout.scss'

export default function MainLayout (props) {
    return (
        <div className="main-layout">
            {props.children}
        </div>
    )
}