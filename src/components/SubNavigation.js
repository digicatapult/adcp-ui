import * as React from 'react'
import styled from '@emotion/styled'
import uniqid from 'uniqid'

import { CustomSubNavLink } from '../util/AppUtil'

const SubNavigation = ({ subNavList }) => {
  return (
    <Wrapper>
      {subNavList.map((item) => (
        <CustomSubNavLink key={uniqid()} to={item.to}>
          {item.name}
        </CustomSubNavLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: sub-navigation;
  font-size: 1.1rem;
`

export default SubNavigation
