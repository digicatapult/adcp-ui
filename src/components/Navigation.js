import * as React from 'react'
import styled from 'styled-components'

import { CATALOGUE_URI, CustomLink, ORCHESTRATOR_URI, PROFILER_URI, REGISTRATION_URI } from '../util/AppUtil'

const Navigation = () => {
  return (
    <Wrapper>
      <CustomLink to={REGISTRATION_URI}>Registration</CustomLink>
      <CustomLink to={CATALOGUE_URI}>Catalogue</CustomLink>
      <CustomLink to={PROFILER_URI}>Profiler</CustomLink>
      <CustomLink to={ORCHESTRATOR_URI}>Orchestrator</CustomLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: navigation;
  display: grid;
  grid-template-columns: repeat(4, auto);
  justify-content: right;
`

export default Navigation
