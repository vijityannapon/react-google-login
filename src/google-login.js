import React, { useState } from 'react'
import PropTypes from 'prop-types'
import useGoogleLogin from './use-google-login'
import Icon from './icon'

const GoogleLogin = props => {
  const [hovered] = useState(false)
  const [active] = useState(false)
  const {
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    className,
    disabledStyle,
    buttonText,
    render,
    theme,
    disabled: disabledProp,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt,
    setHovered,
    setActive
  } = props

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    onAutoLoadFinished,
    onRequest,
    onFailure,
    onScriptLoadFailure,
    clientId,
    cookiePolicy,
    loginHint,
    hostedDomain,
    autoLoad,
    isSignedIn,
    fetchBasicProfile,
    redirectUri,
    discoveryDocs,
    uxMode,
    scope,
    accessType,
    responseType,
    jsSrc,
    prompt
  })
  const disabled = disabledProp || !loaded

  if (render) {
    return render({ onClick: signIn, disabled })
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
      onClick={signIn}
      style={defaultStyle}
      disabled={disabled}
      className={className}
    >
      <Icon /> {buttonText}
    </button>
  )
}

GoogleLogin.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onFailure: PropTypes.func.isRequired,
  onScriptLoadFailure: PropTypes.func,
  clientId: PropTypes.string.isRequired,
  jsSrc: PropTypes.string,
  onRequest: PropTypes.func,
  buttonText: PropTypes.node,
  scope: PropTypes.string,
  className: PropTypes.string,
  redirectUri: PropTypes.string,
  cookiePolicy: PropTypes.string,
  loginHint: PropTypes.string,
  hostedDomain: PropTypes.string,
  disabledStyle: PropTypes.object,
  fetchBasicProfile: PropTypes.bool,
  prompt: PropTypes.string,
  autoLoad: PropTypes.bool,
  disabled: PropTypes.bool,
  discoveryDocs: PropTypes.array,
  uxMode: PropTypes.string,
  isSignedIn: PropTypes.bool,
  responseType: PropTypes.string,
  accessType: PropTypes.string,
  render: PropTypes.func,
  theme: PropTypes.string
}

GoogleLogin.defaultProps = {
  buttonText: 'Sign in with Google',
  scope: 'profile email',
  accessType: 'online',
  prompt: '',
  cookiePolicy: 'single_host_origin',
  fetchBasicProfile: true,
  isSignedIn: false,
  uxMode: 'popup',
  disabledStyle: {
    opacity: 0.6
  },
  theme: 'light',
  onRequest: () => {}
}

export default GoogleLogin
