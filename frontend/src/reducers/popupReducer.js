import { createSlice } from '@reduxjs/toolkit'

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    message: null,
    type: 'ok',
  },
  reducers: {
    showMessage(state, action) {
      return {
        message: action.payload.message,
        type: action.payload.type,
      }
    },
    hideMessage(state, action) {
      return {
        message: null,
        type: null,
      }
    },
  },
})

let notif = null

export const displayMessage = (message, type) => {
  return async (dispatch) => {
    if (notif) {
      clearTimeout(notif)
    }
    dispatch(showMessage({ message, type }))

    notif = setTimeout(() => {
      dispatch(hideMessage())
    }, 5000)
  }
}

export const { showMessage, hideMessage } = popupSlice.actions
export default popupSlice.reducer
