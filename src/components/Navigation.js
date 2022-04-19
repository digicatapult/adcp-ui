import * as React from 'react'
import styled from '@emotion/styled'

import { CATALOGUE_URI, CustomNavLink, ORCHESTRATOR_URI, PROFILER_URI, REGISTRATION_URI } from '../util/AppUtil'

const Navigation = () => {
  return (
    <Wrapper>
      <CustomNavLink to={REGISTRATION_URI}>Registration</CustomNavLink>
      <CustomNavLink to={CATALOGUE_URI}>Catalogue</CustomNavLink>
      <CustomNavLink to={PROFILER_URI}>Profiler</CustomNavLink>
      <CustomNavLink to={ORCHESTRATOR_URI}>Orchestrator</CustomNavLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: navigation;
  display: grid;
  grid-template-columns: repeat(4, min-content);
  justify-content: right;
`

export default Navigation
