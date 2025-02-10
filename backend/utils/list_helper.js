const lodash = require('lodash')

const dummy = (blogs) => {
  return blogs ? 1 : 0
}

const totalLikes = (blogs) => {
  let sum = 0
  blogs.forEach((element) => {
    sum += element.likes
  })
  return blogs.length === 0 ? 0 : sum
}

const favoriteBlog = (blogs) => {
  let blog = blogs[0]
  blogs.forEach((element) => {
    if (blog.likes < element.likes) {
      blog = element
    }
  })
  return blogs.length === 0 ? 'empty array' : blog
}

const mostBlogs = (blogs) => {
  let retval = {
    author: '',
    blogs: 0,
  }
  Object.entries(lodash.countBy(blogs, 'author')).forEach(([key, value]) => {
    if (value > retval.blogs) {
      retval.author = key
      retval.blogs = value
    }
  })
  return blogs.length === 0 ? 'empty array' : retval
}

const mostLikes = (blogs) => {
  //lodash dokumentaatiosta ei löytynyt sopivaa funktiota käsittelemään tätä helpommin kuin perinteisesti
  let arr = []
  let retval = {
    author: '',
    likes: 0,
  }

  blogs.forEach((e) => {
    console.log(e)
    if (
      arr.find((element) => {
        if (element.author === e.author) {
          console.log('taalla')
          element.likes = element.likes + e.likes
          return true
        }
      })
    ) {
      /* empty */
    } else {
      arr.push({
        author: e.author,
        likes: e.likes,
      })
    }
  })

  arr.forEach((e) => {
    if (e.likes > retval.likes) {
      retval = e
    }
  })

  return blogs.length === 0 ? 'empty array' : retval
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}
