import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useGoogleLogout from './use-google-logout'
import Icon from './icon'

const GoogleLogout = props => {
  const [hovered] = useState(false)
  const [active] = useState(false)
  const {
    className,
    disabledStyle,
    buttonText,
    render,
    theme,
    disabled: disabledProp,
    onLogoutSuccess,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    onFailure,
    onScriptLoadFailure,
    uxMode,
    scope,
    accessType,
    jsSrc,
    setHovered,
    setActive
  } = props

  const { signOut, loaded } = useGoogleLogout({
    jsSrc,
    onFailure,
    onScriptLoadFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    fetchBasicProfile,
    discoveryDocs,
    uxMode,
    redirectUri,
    scope,
    accessType,
    onLogoutSuccess
  })
  const disabled = disabledProp || !loaded

  if (render) {
    return render({ onClick: signOut, disabled })
  }

  const initialStyle = {
    backgroundColor: theme === 'dark' ? 'rgb(66, 133, 244)' : '#fff',
    display: 'inline-flex',
    alignItems: 'center',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    boxShadow: '0 2px 2px 0 rgba(0, 0, 0, .24), 0 0 1px 0 rgba(0, 0, 0, .24)',
    padding: 0,
    borderRadius: 2,
    border: '1px solid transparent',
    fontSize: 14,
    fontWeight: '500',
    fontFamily: 'Roboto, sans-serif'
  }

  const hoveredStyle = {
    cursor: 'pointer',
    opacity: 0.9
  }

  const activeStyle = {
    cursor: 'pointer',
    backgroundColor: theme === 'dark' ? '#3367D6' : '#eee',
    color: theme === 'dark' ? '#fff' : 'rgba(0, 0, 0, .54)',
    opacity: 1
  }

  const defaultStyle = (() => {
    if (disabled) {
      return Object.assign({}, initialStyle, disabledStyle)
    }

    if (active) {
      if (theme === 'dark') {
        return Object.assign({}, initialStyle, activeStyle)
      }

      return Object.assign({}, initialStyle, activeStyle)
    }

    if (hovered) {
      return Object.assign({}, initialStyle, hoveredStyle)
    }

    return initialStyle
  })()

  const setHoveredWrap = willHover => {
    if (setHovered) {
      setHovered(willHover)
    }
  }

  const setActiveWrap = willBeActive => {
    if (setActive) {
      setActive(willBeActive)
    }
  }

  return (
    <button
      onMouseEnter={() => setHoveredWrap(true)}
      onMouseLeave={() => {
        setHoveredWrap(false)
        setActiveWrap(false)
      }}
      onMouseDown={() => setActiveWrap(true)}
      onMouseUp={() => setActiveWrap(false)}
      onClick={signOut}
      style={defaultStyle}
      disabled={disabled}
      className={className}
    >
      <Icon /> {buttonText}
    </button>
  )
}

GoogleLogout.propTypes = {
  jsSrc: PropTypes.string,
  buttonText: PropTypes.node,
  className: PropTypes.string,
  disabledStyle: PropTypes.object,
  disabled: PropTypes.bool,
  onLogoutSuccess: PropTypes.func,
  render: PropTypes.func,
  theme: PropTypes.string,
  onFailure: PropTypes.func,
  onScriptLoadFailure: PropTypes.func
}

GoogleLogout.defaultProps = {
  buttonText: 'Logout of Google',
  disabledStyle: {
    opacity: 0.6
  },
  theme: 'light',
  jsSrc: 'https://apis.google.com/js/api.js'
}

export default GoogleLogout
