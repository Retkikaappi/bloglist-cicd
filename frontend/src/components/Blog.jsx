import { useState } from 'react'
import { Link } from 'react-router-dom'
import Styled from '../styles'

const Blog = ({ blog, handleLike, handleDelete, username }) => {
  const [view, setView] = useState(false)

  return (
    <Styled.BlogDiv>
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} - {blog.author}
      </Link>
    </Styled.BlogDiv>
  )
}

export default Blog
