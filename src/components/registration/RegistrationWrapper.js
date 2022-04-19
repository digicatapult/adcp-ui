import React from 'react'
import styled from '@emotion/styled'

import SubNavigation from './../SubNavigation'
import Registration from './Registration'
import { getRegistrationSubNavigation } from '../../util/AppUtil'

const RegistrationWrapper = () => {
  const subNavList = getRegistrationSubNavigation()

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Registration />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  padding: 48px;
`

export default RegistrationWrapper
