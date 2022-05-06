import * as React from 'react'
import styled from '@emotion/styled'
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
      <LogoWrapper styles={{ padding: '32px' }}>
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
  font-size: 1.1rem;
  background-color: #9a9b9c;
`

const LogoWrapper = styled.div`
  grid-area: logo-wrapper;
  display: grid;
  grid-template-areas: 'logo';
  justify-content: left;
  padding: ${({ styles }) => (styles ? styles.padding : '0px')};
`

const Logo = styled.div`
  grid-area: logo;
  cursor: pointer;
`

export default Header
