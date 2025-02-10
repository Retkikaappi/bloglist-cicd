import userService from '../services/users'
import { createSlice } from '@reduxjs/toolkit'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setAllUsers(state, action) {
      return action.payload
    },
  },
})

export const getAllUsers = () => {
  return async (dispatch) => {
    const resp = await userService.getAll()
    dispatch(setAllUsers(resp))
  }
}

export const { setAllUsers } = usersSlice.actions

export default usersSlice.reducer
