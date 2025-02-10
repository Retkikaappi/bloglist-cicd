import { addOneBlog } from '../reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import TogglePanel from '../components/TogglePanel'
import BlogPanel from '../components/BlogPanel'
import Blog from '../components/Blog'

const BlogView = () => {
  const blogs = useSelector((state) => state.blogs)
  const { username, token } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const blogRef = useRef()

  const handleBlog = (blogObj) => {
    dispatch(addOneBlog(blogObj))
    blogRef.current.toggleVisible()
  }

  if (!token) {
    return <div>Not logged in...</div>
  }

  return (
    <>
      <h3>Blogs</h3>
      <TogglePanel btnLabel="click here to add a new blog" ref={blogRef}>
        <BlogPanel handleBlog={handleBlog}></BlogPanel>
      </TogglePanel>

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} username={username} />
      ))}
    </>
  )
}

export default BlogView
