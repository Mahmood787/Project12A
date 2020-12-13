import FavoriteIcon from '@material-ui/icons/Favorite';
import React, { useState } from 'react'
import {GatsbyGraphQLObjectType, graphql, Link, PackageJson} from 'gatsby'
import Layout from '../components/layout'
import './blog-post.css' 
import FacebookIcon from '@material-ui/icons/Facebook';
import GithubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {documentToReactComponents} from '@contentful/rich-text-react-renderer'
import Paper from '@material-ui/core/Paper';
import firebase from 'firebase'
// note > Response of this query will be passed to the props of this component/page
// noete 2 > our query takes $slug as a filter parameter. This slug is made available to us
// because we passed it in as a page context in our gatsby-config.js.
export const query = graphql `
query ($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      pdate(formatString: "Do MMMM, YYYY")
      image {
        fluid {
         src
        }
      }
      body {
        json
      }
    }
  }
  
`
interface BlogPostTemplateProps {
    data: {
    contentfulBlogPost:{
      title: string
      pdate: string
      image: {
          fluid:{
              src: string
          }
      }
      body:{
          json: any
      }
    }
  }}
export default function Blogpost({data}:BlogPostTemplateProps)  {
    const [user, setUser]=useState<any>()
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          setUser(user)
        } else {
          setUser('')
        }
      })
    
    const theme = {
        spacing: 8,
      }
    return (
        <Layout>
            <div className="container-blog-post">
                <div className="blog-top">
                    <p>All Posts</p>
                    <input type="search" name="search" placeholder="search" />
                </div>
                <div className="blog-container">
                    {/* top blog content */}
                    <div className="top-content">
                        <ul>
                            <li className="pic-sm">
                                <img src={require("../images/dp.png")} alt =""/>
                            </li>
                            <li>
                            Mr. Tomy Haweak
                            </li>
                            <li>  {data.contentfulBlogPost.pdate}</li>
                            
                        </ul>
                        <div className="right-icon">< MoreVertIcon/></div>
                    </div>
                    <div className="blog-post-content">
                        <h2>{data.contentfulBlogPost.title}</h2>
                        <p>Plan your budget prior to your trip and then work backwards. If you know you are only wanting to spend $2000 on a trip then do not allow yourself to start planning a trip that requires $1500 worth of flights. Your budget helps you understand how much money needs to be saved before you travel. If you know your traveling style, you can even plan a daily spending budget in order to help you maintain. Try to estimate accommodations, transportation and food. </p>
                        <div className="blog-post-content-img">
                            <img src={data.contentfulBlogPost.image.fluid.src}/>
                        </div>
                        {!user ?(
                            <>
                            <p>Please Login to read more</p>
                            </>
                        ):(
                        <>
                        <p>{documentToReactComponents(data.contentfulBlogPost.body.json)}</p>
                        <p>1. Create a Budget Plan your budget prior to your trip and then work backwards. If you know you are only wanting to spend $2000 on a trip then do not allow yourself to start planning a trip that requires $1500 worth of flights. Your budget helps you understand how much money needs to be saved before you travel. If you know your traveling style, you can even plan a daily spending budget in order to help you maintain. Try to estimate accommodations, transportation and food. </p>
                        <p>2. Create a Budget Plan your budget prior to your trip and then work backwards. If you know you are only wanting to spend $2000 on a trip then do not allow yourself to start planning a trip that requires $1500 worth of flights. Your budget helps you understand how much money needs to be saved before you travel. If you know your traveling style, you can even plan a daily spending budget in order to help you maintain. Try to estimate accommodations, transportation and food. </p>
                        <p>3. Create a Budget Plan your budget prior to your trip and then work backwards. If you know you are only wanting to spend $2000 on a trip then do not allow yourself to start planning a trip that requires $1500 worth of flights. Your budget helps you understand how much money needs to be saved before you travel. If you know your traveling style, you can even plan a daily spending budget in order to help you maintain. Try to estimate accommodations, transportation and food. </p>
                        <p>4. Create a Budget Plan your budget prior to your trip and then work backwards. If you know you are only wanting to spend $2000 on a trip then do not allow yourself to start planning a trip that requires $1500 worth of flights. Your budget helps you understand how much money needs to be saved before you travel. If you know your traveling style, you can even plan a daily spending budget in order to help you maintain. Try to estimate accommodations, transportation and food. </p>
                        </>
                        )}
                    </div>
                    <div className="bottom-blog-post">
                        <div className="line-blog-post"></div>
                        <div className="social">
                            <FacebookIcon/>
                            <LinkedInIcon/>
                            <GithubIcon/>
                            <YouTubeIcon/>
                            <InstagramIcon/>
                        </div>
                        <div className="line-blog-post2"></div>
                    </div>
                    <div className="last-content">
                        <div className="views-comment">
                            <span>200 views</span>
                            <span>1 comment</span>
                        </div>
                        <div className="post-likes">
                            <div className="icon2">
                            <span className="likes-number2"> 4</span>
                                <FavoriteIcon style={{color: "red", width:"40px"}}/>
                            </div>
                        </div>
                    </div>
                    <br/>
                </div>
                <div className="recent-post">
                    <p>Recent Post</p>
                    <p>View All</p>
                </div>
                <br/>

                <br/>
                <br/>
                <br/>

            </div>

        </Layout>
    )
}




