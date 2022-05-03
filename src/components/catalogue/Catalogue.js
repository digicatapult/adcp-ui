import React from 'react'
import styled from '@emotion/styled'

import SubNavigation from './../SubNavigation'
import { getCatalogueSubNavigation } from '../../util/AppUtil'

const Catalogue = () => {
  const subNavList = getCatalogueSubNavigation()

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Content>Catalogue Main</Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  grid-auto-columns: 300px auto;
  padding: 48px;
`

const Content = styled.div`
  grid-area: main;
  display: grid;
  justify-content: center;
`

export default Catalogue
