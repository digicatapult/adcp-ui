import { Link } from 'react-router-dom'
import * as React from 'react'
import styled from '@emotion/styled'

export const HOME_URI = '/'

export const REGISTRATION_URI = '/registration'
export const REGISTRATION_SERVICE_ADD_URI = `${REGISTRATION_URI}/service/add`
export const REGISTRATION_SERVICE_REMOVE_URI = `${REGISTRATION_URI}/service/remove`
export const REGISTRATION_SERVICE_ATTACH_CATEGORY_URI = `${REGISTRATION_URI}/service/category/attach`
export const REGISTRATION_SERVICE_DETACH_CATEGORY_URI = `${REGISTRATION_URI}/service/category/detach`

export const CATALOGUE_URI = '/catalogue'
export const CATALOGUE_CATEGORY_ADD_URI = `${CATALOGUE_URI}/category/add`
export const CATALOGUE_CATEGORY_EDIT_URI = `${CATALOGUE_URI}/category/edit`
export const CATALOGUE_CATEGORY_REMOVE_URI = `${CATALOGUE_URI}/category/remove`
export const CATALOGUE_CATEGORY_ATTACH_URI = `${CATALOGUE_URI}/category/attach`
export const CATALOGUE_CATEGORY_DETACH_URI = `${CATALOGUE_URI}/category/detach`

export const PROFILER_URI = '/profiler'
export const PROFILER_PROJECT_URI = `${PROFILER_URI}/project`
export const PROFILER_PROJECT_ADD_URI = `${PROFILER_URI}/project/add`
export const PROFILER_PROJECT_SERVICES_URI = `${PROFILER_PROJECT_URI}/services`
export const PROFILER_SOLUTION_TEMPLATE_URI = `${PROFILER_URI}/solution-template`
export const PROFILER_SOLUTION_TEMPLATE_ADD_URI = `${PROFILER_SOLUTION_TEMPLATE_URI}/add`
export const PROFILER_SOLUTION_TEMPLATE_EDIT_URI = `${PROFILER_SOLUTION_TEMPLATE_URI}/edit`
export const PROFILER_SOLUTION_TEMPLATE_REMOVE_URI = `${PROFILER_SOLUTION_TEMPLATE_URI}/remove`

export const ORCHESTRATOR_URI = '/orchestrator'

export const getRegistrationSubNavigation = () => [
  {
    to: REGISTRATION_URI,
    name: 'List Services',
  },
  {
    to: REGISTRATION_SERVICE_ADD_URI,
    name: 'Register Service',
  },
  {
    to: REGISTRATION_SERVICE_REMOVE_URI,
    name: 'Unregister Service',
  },
  {
    to: REGISTRATION_SERVICE_ATTACH_CATEGORY_URI,
    name: 'Attach Category',
  },
  {
    to: REGISTRATION_SERVICE_DETACH_CATEGORY_URI,
    name: 'Detach Category',
  },
]

export const getCatalogueSubNavigation = () => [
  {
    to: CATALOGUE_URI,
    name: 'List Categories',
  },
  {
    to: CATALOGUE_CATEGORY_ADD_URI,
    name: 'Add Category',
  },
  {
    to: CATALOGUE_CATEGORY_EDIT_URI,
    name: 'Edit Category',
  },
  {
    to: CATALOGUE_CATEGORY_REMOVE_URI,
    name: 'Remove Category',
  },
  {
    to: CATALOGUE_CATEGORY_ATTACH_URI,
    name: 'Attach Category',
  },
  {
    to: CATALOGUE_CATEGORY_DETACH_URI,
    name: 'Detach Category',
  },
]

export const getProfilerSubNavigation = () => [
  {
    to: PROFILER_PROJECT_URI,
    name: 'Project',
  },
  {
    to: PROFILER_PROJECT_ADD_URI,
    name: 'Add Project',
  },
  {
    to: PROFILER_PROJECT_SERVICES_URI,
    name: 'Services',
  },
  {
    to: PROFILER_SOLUTION_TEMPLATE_URI,
    name: 'List Solution Templates',
  },
  {
    to: PROFILER_SOLUTION_TEMPLATE_ADD_URI,
    name: 'Add Solution Template',
  },
  {
    to: PROFILER_SOLUTION_TEMPLATE_EDIT_URI,
    name: 'Edit Solution Template',
  },
  {
    to: PROFILER_SOLUTION_TEMPLATE_REMOVE_URI,
    name: 'Remove Solution Template',
  },
]

export const getOrchestratorSubNavigation = () => []

const CustomLink = ({ children, to, ...props }) => {
  return (
    <NavElement>
      <Link to={to} {...props}>
        {children}
      </Link>
    </NavElement>
  )
}

const NavElement = styled.div`
  margin: 8px 16px;
  color: #000;
`

export const CustomNavLink = styled(CustomLink)`
  display: block;
  color: #000;
  text-decoration: none;

  &:hover {
    text-decoration: underline 3px;
  }
`

export const CustomSubNavLink = styled(CustomNavLink)`
  margin-bottom: 16px;
`
