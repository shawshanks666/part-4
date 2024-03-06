const dummy = (blogs) => {
    if(Array.isArray(blogs))
      return 1;
  }
  
const totalLikes = (blogs) => {
  let sum=0;
  blogs.map(blog=>{
    sum= sum+blog.likes
  })
  return sum;
}




  module.exports = {
    dummy,
    totalLikes
  }

