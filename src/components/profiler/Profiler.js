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
  grid-template-areas: 'sub-navigation main';
  grid-template-columns: 300px auto;
  padding: 48px;
`

const Content = styled.div`
  grid-area: main;
  display: grid;
  justify-content: center;
`

export default Profiler
