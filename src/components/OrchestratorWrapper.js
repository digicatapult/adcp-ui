import React from 'react'
import styled from '@emotion/styled'

import SubNavigation from './SubNavigation'
import { getOrchestratorSubNavigation } from '../util/AppUtil'
import Orchestrator from './Orchestrator'

const OrchestratorWrapper = () => {
  const subNavList = getOrchestratorSubNavigation()

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Orchestrator />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  padding: 48px;
`

export default OrchestratorWrapper
