import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  text-align: center;
`

const Logo = () => {
  let baseUrl = ''

  if (typeof window !== 'undefined' && window.location.host.match(/github/i)) {
    baseUrl = 'https://raw.githubusercontent.com/tacnoman/mustard-player/master/public'
  }

  return (
    <Wrapper>
      <img src={`${baseUrl}/logo.png`} alt="Mustard Player" />
    </Wrapper>
  )
}

export default Logo
