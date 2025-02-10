import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { displayMessage } from './popupReducer'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    addBlog(state, action) {
      state.push(action.payload)
    },
    addAllBlogs(state, action) {
      return action.payload
    },
    addLike(state, action) {
      const { id } = action.payload
      const blog = state.find((ele) => ele.id === id)
      const blogWithLike = {
        ...blog,
        likes: blog.likes + 1,
      }

      return state.map((ele) => (ele.id === id ? blogWithLike : ele))
    },
    removeBlog(state, action) {
      const { id } = action.payload
      return state.filter((ele) => ele.id !== id)
    },
    sort(state, action) {
      return state.sort((a, b) => b.likes - a.likes)
    },
    addComment(state, action) {
      const { id, comment } = action.payload
      const blog = state.find((ele) => ele.id === id)
      blog.comments.push({ comment })
    },
  },
})

export const getAllBlogs = () => {
  return async (dispatch) => {
    const resp = await blogService.getAll()
    dispatch(addAllBlogs(resp))
    dispatch(sort())
  }
}

export const addOneBlog = (blog) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.addBlog(blog)
      dispatch(addBlog(resp))
      dispatch(
        displayMessage(
          `blog created with title: ${resp.title}, author: ${resp.author}`,
          'ok'
        )
      )
    } catch (e) {
      dispatch(
        displayMessage(
          `error while creating a blog: ${e.response.data.error}`,
          'error'
        )
      )
    }
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blog.id)
    dispatch(removeBlog(blog))
    dispatch(displayMessage(`you deleted ${blog.title}!`, 'ok'))
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    try {
      const likedBlog = {
        likes: blog.likes + 1,
      }
      const resp = await blogService.editBlog(likedBlog, blog.id)
      //voisi varmaan poistaa addlike, tai tehdä reducer joka vain mappaa staten uudestaan..
      dispatch(addLike(blog))
      dispatch(sort())
      dispatch(
        displayMessage(`You liked ${resp.title} by ${resp.author}`, 'ok')
      )
    } catch (e) {
      dispatch(
        displayMessage(
          `error while liking a blog: ${e.response.data.error}`,
          'error'
        )
      )
    }
  }
}

export const commentBlog = (blog, comment) => {
  return async (dispatch) => {
    try {
      const resp = await blogService.postComment(blog, { comment: comment })
      dispatch(addComment({ id: resp.id, comment }))
      dispatch(displayMessage(`You commented ${resp.title} succesfully`, 'ok'))
    } catch (e) {
      dispatch(
        displayMessage(
          `error while commenting a blog: ${e.response.data.error}`,
          'error'
        )
      )
      console.log('error', e.response.data.error)
    }
  }
}
export const { addBlog, addAllBlogs, addLike, sort, removeBlog, addComment } =
  blogSlice.actions
export default blogSlice.reducer
