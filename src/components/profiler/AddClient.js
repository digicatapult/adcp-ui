import React, { useState } from 'react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'

import SubNavigation from './../SubNavigation'
import { getProfilerSubNavigation, postClientApi, PROFILER_CLIENT_ADD_URI } from '../../util/AppUtil'
import { clientValidationSchema, FormButton, FormInputError, FormTextLabel } from '../../util/ComponentUtil'
import Client from './Client'

const AddClient = () => {
  const [apiResponseMessage, setApiResponseMessage] = useState('')

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
        const statusCode = response.status

        console.error('An error occurred')
        setApiResponseMessage(`A request ${statusCode} status code error occurred`)
      }
    },
  })

  return (
    <Wrapper>
      <SubNavigation currentPage={PROFILER_CLIENT_ADD_URI} subNavList={getProfilerSubNavigation()} />
      <Content onSubmit={formik.handleSubmit}>
        <ClientDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Client Details:</ClientDetailsLabelWrapper>
        <Client formik={formik} apiResponseMessage={apiResponseMessage} />
        <FormBottomWrapper>
          <ApiResponseMessageWrapper styles={{ padding: '16px 0px 0px 0px', color: '#ff0000', fontWeight: '600' }}>
            {apiResponseMessage}
          </ApiResponseMessageWrapper>
          <SubmitButtonWrapper variant="contained" type="submit">
            Add Client
          </SubmitButtonWrapper>
        </FormBottomWrapper>
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
    'client-fields-wrapper'
    'form-bottom-wrapper';
  padding: 64px;
`

const ClientDetailsLabelWrapper = styled(FormTextLabel)`
  grid-area: client-details-label-wrapper;
`

const FormBottomWrapper = styled.div`
  grid-area: form-bottom-wrapper;
  display: grid;
  grid-template-areas: 'api-response-message-wrapper submit-button-wrapper';
  justify-content: space-between;
`

const ApiResponseMessageWrapper = styled(FormInputError)`
  grid-area: api-response-message-wrapper;
`

const SubmitButtonWrapper = styled(FormButton)`
  grid-area: submit-button-wrapper;
`

export default AddClient
