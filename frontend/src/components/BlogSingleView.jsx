import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogReducer'
import Styled from '../styles'

const BlogSingleView = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { id } = useParams()
  const { username, token } = useSelector((state) => state.user)
  const blog = useSelector((state) => state.blogs.find((e) => e.id === id))

  const handleLike = (blogObj) => {
    dispatch(likeBlog(blogObj))
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(deleteBlog(blog))
      navigate('/blogs')
    }
  }

  const handleComment = (e) => {
    e.preventDefault()
    dispatch(commentBlog(blog, e.target.comment.value))
    e.target.comment.value = ''
  }

  if (!blog) {
    return <div>No blog to be found...</div>
  }
  if (!token) {
    return <div>Not logged in... Single Blog View</div>
  }

  return (
    <Styled.SingleBlogDiv>
      <p>title: {blog.title}</p>
      <p>
        url: <a href="#">{blog.url}</a>
      </p>
      <p>
        likes: {blog.likes}{' '}
        <Styled.Button onClick={() => handleLike(blog)}>like</Styled.Button>
      </p>
      <p>author: {blog.author}</p>
      <p>user: {blog.user.username}</p>
      {username === blog.user.username && (
        <Styled.Button onClick={() => handleDelete(blog)}>remove</Styled.Button>
      )}
      <div>
        <h4>Comments</h4>
        <form onSubmit={handleComment}>
          <Styled.Input name="comment" type="text" />
          <Styled.Button>add comment</Styled.Button>
        </form>
        <ul>
          {blog.comments.map((ele, index) => (
            <li key={`commment_${index}`}>{ele.comment}</li>
          ))}
        </ul>
      </div>
    </Styled.SingleBlogDiv>
  )
}

export default BlogSingleView
