
const blogList = 
[
    {
      "_id": "691a35bd4919c7dede708409",
      "title": "First blog",
      "author": "A. blog1",
      "url": "http://blog1",
      "likes": 1,
      "__v": 0
    },
    {
      "_id": "691a35f44919c7dede70840b",
      "title": "Second blog",
      "author": "B. blog1",
      "url": "http://blog2",
      "likes": 4,
      "__v": 0
    },
    {
      "_id": "691aec0b6019b40690e098f9",
      "title": "Third blog",
      "author": "C. blog3",
      "url": "http://blog3",
      "likes": 2,
      "__v": 0
    },
    {
      "_id": "691a35f44919c7dede70840b",
      "title": "Second blog",
      "author": "B. blog1",
      "url": "http://blog2",
      "likes": 2,
      "__v": 0
  },
    
    {
    "_id": "691b00286374eadc64bbea35",
    "title": "Fourth blog",
    "author": "C. blog4",
    "url": "http://blog4",
    "likes": 1,
    "__v": 0
    },

    {
      "_id": "691a35bd4919c7dede708409",
      "title": "First blog",
      "author": "D. blog1",
      "url": "http://blog1",
      "likes": 13,
      "__v": 0
    },
]


const mostBlogs = (blogs) => {
  const blogTotals = {}
  const blogTotalsList = blogs.reduce((blogStats, blog) => {
                          blogStats.author !== null ? blogStats.author += 1 : blogStats.author = 1
                        }, blogTotals)
    console.log(blogTotals)                  
  //return blogTotalsList.reduce((res, ele) => res.author > ele.author ? res : ele)                      
}


// const blogTotals = {}
//   const blogStatsList = blogList.reduce((blogStats, blog) => {
//     if(!blogStats[blog.author]) {
//       blogStats[blog.author] = 1
//     }else {
//       blogStats[blog.author] += 1 
//     }
//     return blogStats
//     }, {})
// console.log(blogStatsList)


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
    //console.log(likeStats)
    const likesList = Object.entries(likeStats)
    likesList.reduce((acc, author) => {
      if (author[1] > mostLikeSize) {
        //console.log(author)
        mostLikeSize = author[1]
        mostLikesAuthor.author = author[0]
        mostLikesAuthor.likes = author[1]
        //console.log(mostLikesAuthor)
      }
      
    }, likesList[0])
    return mostLikesAuthor
}

//console.log(mostLikes(blogList))
//console.log(Object.entries({ 'A. blog1': 2, 'B. blog1': 6, 'C. blog3': 2, 'C. blog4': 1 }))
