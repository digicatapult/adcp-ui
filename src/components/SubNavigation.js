import * as React from 'react'
import styled from 'styled-components'
import uniqid from 'uniqid'

import { CustomLink } from '../util/AppUtil'

const SubNavigation = ({ subNavList }) => {
  return (
    <Wrapper>
      {subNavList.map((item) => (
        <CustomLink key={uniqid()} to={item.to}>
          {item.name}
        </CustomLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: sub-navigation;
  display: grid;
`

export default SubNavigation
