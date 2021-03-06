const path = require('path')

exports.createPages=async({actions, graphql})=>{
    const {createPage}= actions;
    const response = await graphql(`
    query {
        allContentfulBlogPost {
          edges {
            node {
              slug
            }
          }
        }
      }
    `)
      response.data.allContentfulBlogPost.edges.forEach(edge=>{
          createPage({
              path: `/blog/${edge.node.slug}`,
              component: path.resolve('./src/templates/blog-post.tsx'),
              context:{
                  slug: edge.node.slug
              }
          })
      })
}