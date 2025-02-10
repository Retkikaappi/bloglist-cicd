import { useState } from 'react'
import PropTypes from 'prop-types'
import Styled from '../styles'

const BlogPanel = ({ handleBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const createBlog = (e) => {
    e.preventDefault()
    handleBlog({ title: title, author: author, url: url })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={createBlog}>
        <Styled.Input
          name="title"
          placeholder="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
        <br />
        <Styled.Input
          name="author"
          placeholder="Author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
        <br />
        <Styled.Input
          name="url"
          placeholder="Url"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
        <br />
        <Styled.Button type="submit">add blog</Styled.Button>
      </form>
    </div>
  )
}

BlogPanel.propTypes = {
  handleBlog: PropTypes.func.isRequired,
}

export default BlogPanel
