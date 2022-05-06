import * as React from 'react'
import styled from '@emotion/styled'
import uniqid from 'uniqid'

import { CustomSubNavLink } from '../util/AppUtil'

const SubNavigation = ({ subNavList }) => {
  return (
    <Wrapper rows={subNavList.length}>
      {subNavList.map((item) => (
        <CustomSubNavLink key={uniqid()} to={item.to} styles={{ margin: '48px' }}>
          {item.name}
        </CustomSubNavLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: sub-navigation;
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 48px);
  font-size: 1.2rem;
  background-color: #ccc;
`

export default SubNavigation
