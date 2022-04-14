import React from 'react'
import styled from 'styled-components'

import SubNavigation from './SubNavigation'
import { getCatalogueSubNavigation } from '../util/AppUtil'
import Catalogue from './Catalogue'

const CatalogueWrapper = () => {
  const subNavList = getCatalogueSubNavigation()

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Catalogue />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  padding: 48px;
`

export default CatalogueWrapper
