import { Link } from 'react-router-dom'
import * as React from 'react'
import styled from 'styled-components'

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
export const PROFILER_PROJECT_SERVICES_URI = `${PROFILER_PROJECT_URI}/services`

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
    to: PROFILER_PROJECT_SERVICES_URI,
    name: 'Services',
  },
]

export const getOrchestratorSubNavigation = () => []

export const CustomLink = ({ children, to, ...props }) => {
  return (
    <NavElement>
      <Link style={{ textDecoration: 'none', color: '#000' }} to={to} {...props}>
        {children}
      </Link>
    </NavElement>
  )
}

const NavElement = styled.div`
  margin: 8px 16px;
  color: #000;
`
