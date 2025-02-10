import PropTypes from 'prop-types'
import Styled from '../styles'

const LoginPanel = ({ handleLogin }) => {
  return (
    <div>
      <form onSubmit={handleLogin}>
        <Styled.Input name="username" type="text" placeholder="Username" />
        <br />
        <Styled.Input name="password" type="password" placeholder="Password" />
        <br />
        <Styled.Button type="submit">Login</Styled.Button>
      </form>
    </div>
  )
}

LoginPanel.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginPanel
