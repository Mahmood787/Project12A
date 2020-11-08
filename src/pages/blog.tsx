import React from "react"
import { Link } from "gatsby"
import {useStaticQuery, graphql} from 'gatsby'
import Img from 'gatsby-image'
import Layout from "../components/layout"
import './blog.css'
import FavoriteIcon from '@material-ui/icons/Favorite';



const Blog = () => {
 
  const data = useStaticQuery(graphql`
  query {
    allContentfulBlogPost(sort: {order: DESC, fields: pdate}) {
      edges {
        node {
          id
          title
          slug
          pdate(formatString: "Do MMMM, YYYY")
          image {
            fluid {
              src
            }
          }
          excerpt {
            childMarkdownRemark {
              excerpt(pruneLength: 150)
            }
          }
        }
      }
    }
  }
  `)
 
 return (
 <Layout>
    <div className="container-blog">
      <div className="blog-top">
        <p>All Posts</p>
        <input type="search" name="search" placeholder="search" />
      </div>
      {data.allContentfulBlogPost.edges.map((edge:any)=>{
        
        return (
          <Link to={`/blog/${edge.node.slug}`}>
          <div className="blog-post">
          <div className="image">
            <img src={edge.node.image.fluid.src}/>
          </div>
          <div className="text">
            <div className="top-text">
              <span>Tech Blog </span><br/>
              <span>{edge.node.pdate} </span>
              <h2>{edge.node.title}</h2>
              <p>{edge.node.excerpt.childMarkdownRemark.excerpt}</p>
            </div>
            <div className="bottom-text">
              <br/>
              <div className="line"></div>
              <div className="comments">
                <p>Write Comments</p>
                <div className="likes">
                  <span className="likes-number"> 4</span> 
                  <div className="icon">
                  <FavoriteIcon style={{color: "red", width:"40px"}}/>
                  </div>
                </div>
              </div>  
            </div>
          </div>
        </div>
        </Link>
        )
      }
      )}
    </div>
  </Layout>
)
}
export default Blog
