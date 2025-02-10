import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
import Styled from '../styles'

const TogglePanel = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const showOn = { display: visible ? 'none' : '' }
  const showOff = { display: visible ? '' : 'none' }

  const toggleVisible = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisible,
    }
  })

  return (
    <>
      <div style={showOn}>
        <Styled.Button onClick={toggleVisible}>{props.btnLabel}</Styled.Button>
      </div>
      <div style={showOff}>
        {props.children}
        <Styled.Button onClick={toggleVisible}>cancel</Styled.Button>
      </div>
    </>
  )
})

TogglePanel.displayName = 'TogglePanel'

TogglePanel.propTypes = {
  btnLabel: PropTypes.string.isRequired,
}

export default TogglePanel
