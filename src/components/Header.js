import * as React from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import { HOME_URI } from '../util/AppUtil'
import Navigation from './Navigation'

const Header = () => {
  const navigate = useNavigate()

  const onClickHandler = (e, value) => {
    navigate(value)
  }

  return (
    <Wrapper>
      <LogoWrapper>
        <Logo onClick={(e) => onClickHandler(e, HOME_URI)}>Logo</Logo>
      </LogoWrapper>
      <Navigation />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: header;
  display: grid;
  grid-template-areas: 'logo-wrapper navigation';
  padding: 16px;
  background-color: #9a9b9c;
`

const LogoWrapper = styled.span`
  grid-area: logo-wrapper;
  display: grid;
  grid-template-areas: 'logo';
  justify-content: left;
  margin: 8px 16px;
`

const Logo = styled.div`
  grid-area: logo;
  cursor: pointer;
`

export default Header
