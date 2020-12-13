import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useState } from "react"
import './header.css'
import Button from '@material-ui/core/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import Login from "./auth";
type Props ={
    siteTitle: string
}
const Header = ({ siteTitle }:Props) => {
    const [scroll, setScroll] =useState(true)
  return (
    <div className="header-bg">
    <div className={scroll ? "header scrolled" : "header"}>
        <div className="top-bar">
            <div className="branding">
                <h2>{siteTitle}</h2>
            </div>
            <ul className="nav">
                <li><a href="//#endregion" className="hello1">Home</a></li>
                <li><a href="//#endregion" className="hello2">About</a></li>
                <li><a href="#" className="hello3">Services</a></li>
                <li><a href="#" className="hello4">Products</a></li>
                <li><a href="//#endregion" className="hello5">Contact</a></li>

            </ul>
            <div className="right">
               <Link to={`/blog/`}>
                    <Button variant="contained" color="secondary" href="#contained-buttons">
                    Latest Blogs
                    </Button>
               </Link>              
                    <Login/>
            </div>
            <a href="#" className="font-icon">
                <FontAwesomeIcon   icon={faBars} size="2x" />
            </a>
        </div>
    </div>
</div>
  )
}
export default Header
