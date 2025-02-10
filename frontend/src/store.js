import { configureStore } from '@reduxjs/toolkit'
import popupReducer from './reducers/popupReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'
import usersReducer from './reducers/usersReducer'

const store = configureStore({
  reducer: {
    popup: popupReducer,
    blogs: blogReducer,
    user: userReducer,
    users: usersReducer,
  },
})

export default store
