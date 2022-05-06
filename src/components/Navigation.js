import * as React from 'react'
import styled from '@emotion/styled'

import { CATALOGUE_URI, CustomNavLink, ORCHESTRATOR_URI, PROFILER_URI, REGISTRATION_URI } from '../util/AppUtil'

const Navigation = () => {
  return (
    <Wrapper>
      <CustomNavLink to={REGISTRATION_URI} styles={{ margin: '32px' }}>
        Registration
      </CustomNavLink>
      <CustomNavLink to={CATALOGUE_URI} styles={{ margin: '32px' }}>
        Catalogue
      </CustomNavLink>
      <CustomNavLink to={PROFILER_URI} styles={{ margin: '32px' }}>
        Profiler
      </CustomNavLink>
      <CustomNavLink to={ORCHESTRATOR_URI} styles={{ margin: '32px' }}>
        Orchestrator
      </CustomNavLink>
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
