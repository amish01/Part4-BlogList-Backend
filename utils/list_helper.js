const dummy = (blogs) => {
  return 1  
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, ele) => sum + ele.likes, 0) 
  }

  const favoriteBlog = (blogs) => {
    return blogs.reduce((sum, ele) => sum.likes > ele.likes ? sum : ele) 
  }

  const mostBlogs = (blogList) => {
    let mostBlogsAuthor = {}
    let mostBlogsSize = 0
      blogList.reduce((blogStats, blog) => {
      if(!blogStats[blog.author]) {
        blogStats[blog.author] = 1
      }else {
        blogStats[blog.author] += 1 
      }
      if (blogStats[blog.author] > mostBlogsSize) {
        mostBlogsAuthor = {}
        mostBlogsAuthor[blog.author] = blogStats[blog.author]
        mostBlogsSize = blogStats[blog.author]
      }
      return blogStats
      }, {}) 
      
      return mostBlogsAuthor
  }
  


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  }