/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import React, { ReactNode } from "react"
import Header from "./header"
import "./layout.css"
import Footer from "./footer"

type LayoutProps = {
  children: ReactNode
}
const Layout = ({ children }:LayoutProps) => {
 
  return (
    <>
    <Header siteTitle="Tech Blogs"/>
    {children}
    <Footer/>
    </>
  )
  }

export default Layout
