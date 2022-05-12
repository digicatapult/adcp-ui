import React from 'react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'

import SubNavigation from './../SubNavigation'
import { getProfilerSubNavigation, postClientApi, PROFILER_CLIENT_ADD_URI } from '../../util/AppUtil'
import {
  clientValidationSchema,
  FormButton,
  FormInputError,
  FormTextInput,
  FormTextLabel,
} from '../../util/ComponentUtil'

const AddClient = () => {
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      role: '',
    },
    validationSchema: clientValidationSchema,
    onSubmit: async (values) => {
      const response = await postClientApi({
        firstName: values.firstName,
        lastName: values.lastName,
        name: values.name,
        company: values.company,
        role: values.role,
      })

      if (response.ok) {
        window.location.reload()
      } else {
        console.error('An error occurred')
      }
    },
  })

  return (
    <Wrapper>
      <SubNavigation currentPage={PROFILER_CLIENT_ADD_URI} subNavList={getProfilerSubNavigation()} />
      <Content onSubmit={formik.handleSubmit}>
        <ClientDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Client Details:</ClientDetailsLabelWrapper>
        <ClientFieldsWrapper>
          <ClientFirstNameWrapper>
            <FormTextLabel>*First name:</FormTextLabel>
            <FormTextInput
              placeholder="Enter first name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChangeHandler={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            />
            <FormInputError>{formik.touched.firstName && formik.errors.firstName}</FormInputError>
          </ClientFirstNameWrapper>
          <ClientLastNameWrapper>
            <FormTextLabel>*Last name:</FormTextLabel>
            <FormTextInput
              placeholder="Enter last name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChangeHandler={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />
            <FormInputError>{formik.touched.lastName && formik.errors.lastName}</FormInputError>
          </ClientLastNameWrapper>
          <ClientCompanyWrapper>
            <FormTextLabel>*Company:</FormTextLabel>
            <FormTextInput
              placeholder="Enter company"
              id="company"
              name="company"
              value={formik.values.company}
              onChangeHandler={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
            />
            <FormInputError>{formik.touched.company && formik.errors.company}</FormInputError>
          </ClientCompanyWrapper>
          <ClientRoleWrapper>
            <FormTextLabel>*Role:</FormTextLabel>
            <FormTextInput
              placeholder="Enter role"
              id="role"
              name="role"
              value={formik.values.role}
              onChangeHandler={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
            />
            <FormInputError>{formik.touched.role && formik.errors.role}</FormInputError>
          </ClientRoleWrapper>
          <SubmitButtonWrapper>
            <FormButton variant="contained" type="submit">
              Add Client
            </FormButton>
          </SubmitButtonWrapper>
        </ClientFieldsWrapper>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-columns: 330px auto;
  grid-template-areas: 'sub-navigation main';
  height: 100%;
`

const Content = styled.form`
  grid-area: main;
  display: grid;
  grid-row-gap: 24px;
  grid-auto-rows: min-content;
  justify-content: center;
  grid-template-areas:
    'client-details-label-wrapper'
    'client-details-label-wrapper'
    'client-radio-group-wrapper'
    'client-fields-wrapper';
  padding: 64px;
`

const ClientFieldsWrapper = styled.div`
  grid-area: client-fields-wrapper;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 56px;
  grid-template-areas:
    'client-first-name-wrapper client-last-name-wrapper'
    'client-company-wrapper client-role-wrapper'
    'submit-button-wrapper submit-button-wrapper';
`

const ClientDetailsLabelWrapper = styled(FormTextLabel)`
  grid-area: client-details-label-wrapper;
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

const SubmitButtonWrapper = styled.div`
  grid-area: submit-button-wrapper;
  display: grid;
  justify-content: right;
`

export default AddClient
