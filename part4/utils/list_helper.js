//const blogs = require('../models/blog')


const dummy = (blogs) => {
  return 1
}
const totalLikes=(blogs)=> {
  const reducer =(total,blogs)=> {
    return total + blogs.likes
  }
  return blogs.reduce(reducer,0)
} 
const favoriteBlog=(blogs)=> {
  const f_Blog = blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  const {_id,__v,url, ...other} = f_Blog
  return other

} 
const mostBlogs = (blogs) => {
  //const authors = blogs.map((blog) => blog.author)
  var authorsCount = blogs.reduce(function(res, obj) {
    var authorName = obj.author
    if (authorName in res)
      res[authorName] += 1
    
    else
      res[authorName] = 1
    return res 
  }, {})
  var maxKey = Object.keys(authorsCount).reduce(function (prev, next){ 
    return authorsCount[prev] > authorsCount[next] ? prev : next 
  }) 
  var result = {}
  result[maxKey] = authorsCount[maxKey]
  var output = Object.entries(result).map(([author, blogs]) => ({author,blogs}))
  const obj = Object.fromEntries(output.flatMap(Object.entries))
  return obj  
   
}
const mostLikes = (blogs) => {
  var authorsCount = blogs.reduce(function(res, obj) {
    var authorName = obj.author
    var authorLikes=obj.likes
    if (res[authorName])
      res[authorName] += authorLikes
    else   
      res[authorName] = authorLikes
    return res 
  }, {})
  var maxKey = Object.keys(authorsCount).reduce(function (prev, next){ 
    return authorsCount[prev] > authorsCount[next] ? prev : next
  })
  var result = {}
  result[maxKey] = authorsCount[maxKey]
  var output = Object.entries(result).map(([author, likes]) => ({author,likes}))
  const obj = Object.fromEntries(output.flatMap(Object.entries))
  return obj   
}
module.exports = {
  dummy,totalLikes,favoriteBlog, mostBlogs, mostLikes
}