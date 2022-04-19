import React from 'react'
import styled from '@emotion/styled'

import SubNavigation from './SubNavigation'
import { getProfilerSubNavigation } from '../util/AppUtil'
import Profiler from './Profiler'

const ProfilerWrapper = () => {
  return (
    <Wrapper>
      <SubNavigation subNavList={getProfilerSubNavigation()} />
      <Profiler />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  padding: 48px;
`

export default ProfilerWrapper
