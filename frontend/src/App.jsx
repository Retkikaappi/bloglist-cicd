import { useState, useEffect, useRef } from 'react'

import PopUp from './components/PopUp'
import LoginPanel from './components/LoginPanel'
import TogglePanel from './components/TogglePanel'
import BlogView from './components/BlogView'
import UsersView from './components/UsersView'
import UserView from './components/UserView'
import BlogSingleView from './components/BlogSingleView'

import { getAllBlogs } from './reducers/blogReducer'
import { storageLogin, login, logout } from './reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

import { Routes, Link, Route } from 'react-router-dom'

import Styled from './styles'

const App = () => {
  const user = useSelector((state) => state.user)

  const loginRef = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllBlogs())
  }, [])

  useEffect(() => {
    const activeUser = window.localStorage.getItem('activeUser')
    if (activeUser) {
      const parsedUser = JSON.parse(activeUser)
      dispatch(storageLogin(parsedUser))
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    dispatch(login(e.target.username.value, e.target.password.value))
    e.target.username.value = ''
    e.target.password.value = ''
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('activeUser')
    dispatch(logout())

    console.log('logged out')
  }

  return (
    <>
      <Styled.Global />
      <Styled.Body>
        <Styled.Nav>
          <Link to="/blogs">Blogs</Link>
          <Link to="/users">Users</Link>

          {user.token ? (
            <p>
              logged in as <strong>{user.name}</strong>{' '}
              <Styled.Button onClick={handleLogout}>logout</Styled.Button>
            </p>
          ) : (
            <TogglePanel btnLabel="click here to login" ref={loginRef}>
              <LoginPanel handleLogin={handleLogin}></LoginPanel>
            </TogglePanel>
          )}
          <h3>Blog app</h3>
          <PopUp />
        </Styled.Nav>

        <Routes>
          <Route path="/" element={<div>Nothing here</div>} />
          <Route path="/blogs" element={<BlogView />} />
          <Route path="/blogs/:id" element={<BlogSingleView />} />
          <Route path="/users" element={<UsersView />} />
          <Route path="/users/:id" element={<UserView />} />
        </Routes>
      </Styled.Body>
    </>
  )
}

export default App
