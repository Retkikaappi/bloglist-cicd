import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { displayMessage } from './popupReducer'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    username: null,
    name: null,
  },
  reducers: {
    loginUser(state, action) {
      return action.payload
    },
    logoutUser(state, action) {
      return {
        token: null,
        username: null,
        name: null,
      }
    },
  },
})

export const storageLogin = (user) => {
  return async (dispatch) => {
    dispatch(loginUser(user))
    blogService.setUserToken(user.token)
  }
}

export const login = (username, password) => {
  return async (dispatch) => {
    try {
      const resp = await loginService.login({ username, password })
      window.localStorage.setItem('activeUser', JSON.stringify(resp))
      blogService.setUserToken(resp.token)
      dispatch(loginUser(resp))
      dispatch(displayMessage(`login succesful with ${resp.username}`, 'ok'))
    } catch (e) {
      dispatch(displayMessage(e.response.data.error, 'error'))
    }
  }
}

export const logout = () => {
  return async (dispatch) => {
    dispatch(logoutUser())
    dispatch(displayMessage('logout succesful', 'ok'))
  }
}

export const { loginUser, logoutUser } = userSlice.actions

export default userSlice.reducer
