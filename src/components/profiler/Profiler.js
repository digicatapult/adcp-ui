import React from 'react'
import styled from '@emotion/styled'

import SubNavigation from './../SubNavigation'
import { getProfilerSubNavigation } from '../../util/AppUtil'

const Profiler = () => {
  return (
    <Wrapper>
      <SubNavigation subNavList={getProfilerSubNavigation()} />
      <Content>Profiler Main</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-columns: 330px auto;
  grid-template-areas: 'sub-navigation main';
  height: 100%;
`

const Content = styled.div`
  grid-area: main;
  display: grid;
  justify-content: center;
  height: 100%;
  padding: 64px;
`

export default Profiler
