import { useSelector } from 'react-redux'
import Styled from '../styles'

const PopUp = () => {
  const { message, type } = useSelector((state) => state.popup)

  if (message === null) {
    return null
  }

  return (
    <Styled.PopUp $type={type}>
      <h3>{message}</h3>
    </Styled.PopUp>
  )
}

export default PopUp
