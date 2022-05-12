import * as React from 'react'
import styled from '@emotion/styled'
import uniqid from 'uniqid'
import { MenuList } from '@mui/material'

import { CustomSubNavLink } from '../util/AppUtil'
import { CustomSubNavMenuItem } from '../util/ComponentUtil'

const SubNavigation = ({ currentPage, subNavList }) => {
  return (
    <Wrapper rows={subNavList.length}>
      {subNavList.map((item) => (
        <CustomSubNavLink key={uniqid()} to={item.to}>
          <CustomSubNavMenuItem currentPage={currentPage === item.to}>{item.name}</CustomSubNavMenuItem>
        </CustomSubNavLink>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled(MenuList)`
  grid-area: sub-navigation;
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 48px);
  grid-template-columns: 100%;
  padding-top: 32px;
  justify-content: center;
  background-color: #bababb;
`

export default SubNavigation
