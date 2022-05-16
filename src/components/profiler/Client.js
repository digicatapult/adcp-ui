import React from 'react'
import styled from '@emotion/styled'

import { FormInputError, FormTextInput, FormTextLabel } from '../../util/ComponentUtil'

const Client = ({ formik, disableFields = false }) => {
  return (
    <ClientFieldsWrapper>
      <ClientFirstNameWrapper>
        <FormTextLabel>*First name:</FormTextLabel>
        <FormTextInput
          disabled={disableFields}
          placeholder="Enter first name"
          id="firstName"
          name="firstName"
          value={formik.values.firstName}
          onChangeHandler={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        />
        <FormInputError>{!disableFields && formik.touched.firstName && formik.errors.firstName}</FormInputError>
      </ClientFirstNameWrapper>
      <ClientLastNameWrapper>
        <FormTextLabel>*Last name:</FormTextLabel>
        <FormTextInput
          disabled={disableFields}
          placeholder="Enter last name"
          id="lastName"
          name="lastName"
          value={formik.values.lastName}
          onChangeHandler={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        />
        <FormInputError>{!disableFields && formik.touched.lastName && formik.errors.lastName}</FormInputError>
      </ClientLastNameWrapper>
      <ClientCompanyWrapper>
        <FormTextLabel>*Company:</FormTextLabel>
        <FormTextInput
          disabled={disableFields}
          placeholder="Enter company"
          id="company"
          name="company"
          value={formik.values.company}
          onChangeHandler={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
        />
        <FormInputError>{!disableFields && formik.touched.company && formik.errors.company}</FormInputError>
      </ClientCompanyWrapper>
      <ClientRoleWrapper>
        <FormTextLabel>*Role:</FormTextLabel>
        <FormTextInput
          disabled={disableFields}
          placeholder="Enter role"
          id="role"
          name="role"
          value={formik.values.role}
          onChangeHandler={formik.handleChange}
          error={formik.touched.role && Boolean(formik.errors.role)}
        />
        <FormInputError>{!disableFields && formik.touched.role && formik.errors.role}</FormInputError>
      </ClientRoleWrapper>
    </ClientFieldsWrapper>
  )
}

const ClientFieldsWrapper = styled.div`
  grid-area: client-fields-wrapper;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 56px;
  grid-template-areas:
    'client-first-name-wrapper client-last-name-wrapper'
    'client-company-wrapper client-role-wrapper'
    'form-bottom-wrapper form-bottom-wrapper';
`

const ClientFirstNameWrapper = styled.div`
  grid-area: client-first-name-wrapper;
`

const ClientLastNameWrapper = styled.div`
  grid-area: client-last-name-wrapper;
`

const ClientCompanyWrapper = styled.div`
  grid-area: client-company-wrapper;
`

const ClientRoleWrapper = styled.div`
  grid-area: client-role-wrapper;
`

export default Client
