const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})


describe('Total likes', () => {
    test('of blog list with 9 total likes', () => {
    const blogList9 = 
    [
        {
        "_id": "691a35bd4919c7dede708409",
        "title": "First blog",
        "author": "A. blog1",
        "url": "http://blog1",
        "likes": 2,
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
        "_id": "691b00286374eadc64bbea35",
        "title": "Fourth blog",
        "author": "C. blog4",
        "url": "http://blog4",
        "likes": 1,
        "__v": 0
        }
    ]
        const result = listHelper.totalLikes(blogList9)
        assert.strictEqual(result, 9)
    })

    test('of blog list with 2 total likes', () => {
    const blogList2 = 
    [
        {
        "_id": "691a35bd4919c7dede708409",
        "title": "First blog",
        "author": "A. blog1",
        "url": "http://blog1",
        "likes": 2,
        "__v": 0
        },
    ]
        const result = listHelper.totalLikes(blogList2)
        assert.strictEqual(result, 2)
    })

    test('of blog list with 0 total likes', () => {
        const blogList0 = []
        const result = listHelper.totalLikes(blogList0)
        assert.strictEqual(result, 0)
    })

})


describe('Favorite blog', () => {
    test('has a total of 4 likes', () => {
    const blogList4 = 
    [
        {
        "_id": "691a35bd4919c7dede708409",
        "title": "First blog",
        "author": "A. blog1",
        "url": "http://blog1",
        "likes": 2,
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
        }
    ]
        const result = listHelper.favoriteBlog(blogList4)
        assert.deepStrictEqual(result, {
            "_id": "691a35f44919c7dede70840b",
            "title": "Second blog",
            "author": "B. blog1",
            "url": "http://blog2",
            "likes": 4,
            "__v": 0
            })
    })

    test('Favorite blog has a total of likes 2', () => {
    const blogList2 = 
    [
        {
        "_id": "691a35bd4919c7dede708409",
        "title": "First blog",
        "author": "A. blog1",
        "url": "http://blog1",
        "likes": 2,
        "__v": 0
        },
    ]
        const result = listHelper.favoriteBlog(blogList2)
        assert.deepStrictEqual(result, {
            "_id": "691a35bd4919c7dede708409",
            "title": "First blog",
            "author": "A. blog1",
            "url": "http://blog1",
            "likes": 2,
            "__v": 0
           })
    })  

})

test('Most blog', () => {
    const blogList4 = 
    [
    {
        "_id": "691a35bd4919c7dede708409",
        "title": "First blog",
        "author": "A. blog1",
        "url": "http://blog1",
        "likes": 2,
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
        "_id": "691a35f44919c7dede70840b",
        "title": "Second blog",
        "author": "B. blog1",
        "url": "http://blog2",
        "likes": 2,
        "__v": 0
    },
    ]

    const result = listHelper.mostBlogs(blogList4)
    assert.deepStrictEqual(result, {"B. blog1": 3})
})



