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


  const mostLikes = (blogList) => {
    let mostLikesAuthor = {}
    let mostLikeSize = 0
      const likeStats = blogList.reduce((blogStats, blog) => {
      if(!blogStats[blog.author]) {
        blogStats[blog.author] = blog.likes
      }else {
        blogStats[blog.author] += blog.likes 
      }
      return blogStats
      
      }, {}) 
      const likesList = Object.entries(likeStats)
      likesList.reduce((acc, author) => {
        if (author[1] > mostLikeSize) {
          mostLikeSize = author[1]
          mostLikesAuthor.author = author[0]
          mostLikesAuthor.likes = author[1]
        }
      }, likesList[0])
      return mostLikesAuthor
  }
  


  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }