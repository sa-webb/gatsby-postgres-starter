const path = require('path');
const slugifyPost = require('./slugify');

exports.createPages = async ({graphql, actions: { createPage}}) => {
  const result = await graphql(`
  {
    postgres {
      posts: allPostsList {
        id
        title
      }
    }
  }
  `)

  result.data.postgres.posts.forEach(post => {
    createPage({
      path: slugifyPost(post),
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        postId: post.id,
      },
    });
  });

}
