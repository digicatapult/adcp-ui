import React from 'react'
import { Link } from 'react-router-dom'
import styled from '@emotion/styled'
import moment from 'moment'

import { PROJECT_DATE_FORMAT } from './ComponentUtil'

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
export const PROFILER_PROJECT_EDIT_URI = `${PROFILER_URI}/project/edit/:id`
export const PROFILER_PROJECT_REMOVE_URI = `${PROFILER_URI}/project/remove`
export const PROFILER_PROJECT_SERVICES_URI = `${PROFILER_PROJECT_URI}/services`
export const PROFILER_CLIENT_URI = `${PROFILER_URI}/client`
export const PROFILER_CLIENT_ADD_URI = `${PROFILER_URI}/client/add`
export const PROFILER_CLIENT_EDIT_URI = `${PROFILER_URI}/client/edit/:id`
export const PROFILER_CLIENT_REMOVE_URI = `${PROFILER_URI}/client/remove`
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
    name: 'List Projects',
  },
  {
    to: PROFILER_PROJECT_SERVICES_URI,
    name: 'List Project Services',
  },
  {
    to: PROFILER_PROJECT_ADD_URI,
    name: 'Add Project',
  },
  {
    to: PROFILER_PROJECT_EDIT_URI,
    name: 'Edit Project',
  },
  {
    to: PROFILER_PROJECT_REMOVE_URI,
    name: 'Remove Project',
  },
  {
    to: PROFILER_CLIENT_URI,
    name: 'List Clients',
  },
  {
    to: PROFILER_CLIENT_ADD_URI,
    name: 'Add Client',
  },
  {
    to: PROFILER_CLIENT_EDIT_URI,
    name: 'Edit Client',
  },
  {
    to: PROFILER_CLIENT_REMOVE_URI,
    name: 'Remove Client',
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

const CustomLink = ({ to, styles, children, ...props }) => {
  return (
    <NavElement styles={styles}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </NavElement>
  )
}

const NavElement = styled.div`
  margin: ${({ styles }) => (styles ? styles.margin : '0px')};
  color: #000;
`

export const CustomNavLink = styled(CustomLink)`
  color: #000;
  text-decoration: none;
`

export const CustomSubNavLink = styled(CustomNavLink)``

export const isoDateFormatter = (date) => {
  return moment(date, PROJECT_DATE_FORMAT).isValid() ? moment(date, PROJECT_DATE_FORMAT).toISOString() : null
}

export const floatFormatter = (value) => (!isNaN(value) && parseFloat(value) ? parseFloat(value) : null)

const PROFILER_API_HOST = process.env.REACT_APP_PROFILER_API_HOST || 'localhost'
const PROFILER_API_PORT = process.env.REACT_APP_PROFILER_API_PORT || 3001
const PROFILER_API_URI_PREFIX = process.env.REACT_APP_PROFILER_API_URI_PREFIX || 'v1'

export const getClientsApi = async () => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/client`

  return fetch(`${apiPrefix}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const getClientByIdApi = async (id) => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/client/${id}`

  return fetch(`${apiPrefix}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const postClientApi = async (client) => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/client`

  return fetch(`${apiPrefix}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  })
}

export const putClientApi = async (id, client) => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/client/${id}`

  return fetch(`${apiPrefix}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(client),
  })
}

export const getProjectByIdApi = async (id) => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/project/${id}`

  return fetch(`${apiPrefix}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
}

export const postProjectApi = async (project) => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/project`

  return fetch(`${apiPrefix}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  })
}

export const putProjectApi = async (id, project) => {
  const apiPrefix = `http://${PROFILER_API_HOST}:${PROFILER_API_PORT}/${PROFILER_API_URI_PREFIX}/profiler/project/${id}`

  return fetch(`${apiPrefix}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(project),
  })
}
