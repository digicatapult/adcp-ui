import React from 'react'
import styled from '@emotion/styled'

import SubNavigation from './../../SubNavigation'
import { getRegistrationSubNavigation } from '../../../util/AppUtil'
import ReactDropzone from './Dropzone'

const RegisterService = () => {
  const subNavList = getRegistrationSubNavigation()

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Content>
        <ReactDropzone />
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  grid-template-columns: 300px auto;
  //height: 100%;
  padding: 48px;
`

const Content = styled.div`
  grid-area: main;
  display: grid;
  //width: 100%;git status
  //height: 100%;
  justify-content: center;
`

export default RegisterService
