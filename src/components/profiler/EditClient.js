import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import styled from '@emotion/styled'
import { useFormik } from 'formik'

import SubNavigation from './../SubNavigation'
import { getClientByIdApi, getProfilerSubNavigation, PROFILER_CLIENT_EDIT_URI, putClientApi } from '../../util/AppUtil'
import { clientValidationSchema, FormButton, FormInputError, FormTextLabel } from '../../util/ComponentUtil'
import Client from './Client'

const EditClient = () => {
  const { id: clientId } = useParams()

  const [clientLoaded, setClientLoaded] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] = useState('')
  const [disableFields, setDisableFields] = useState(false)

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      company: '',
      role: '',
    },
    enableReinitialize: false,
    validationSchema: clientValidationSchema,
    onSubmit: async (values) => {
      const response = await putClientApi(clientId, {
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

  const getClientById = async () => {
    const response = await getClientByIdApi(clientId)

    if (response.ok) {
      setClientLoaded(true)

      const result = await response.json()

      await formik.setFieldValue('firstName', result.firstName)
      await formik.setFieldValue('lastName', result.lastName)
      await formik.setFieldValue('company', result.company)
      await formik.setFieldValue('role', result.role)
    } else {
      setDisableFields(true)

      const statusCode = response.status

      switch (statusCode) {
        case 404:
          setApiResponseMessage('Client does not exist!')
          break
        default:
          setApiResponseMessage(`A request ${statusCode} status code error occurred`)
          break
      }
    }
  }

  useEffect(() => {
    if (!clientLoaded) {
      getClientById()
    }
  })

  return (
    <Wrapper>
      <SubNavigation currentPage={PROFILER_CLIENT_EDIT_URI} subNavList={getProfilerSubNavigation()} />
      <Content onSubmit={formik.handleSubmit}>
        <ClientDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Client Details:</ClientDetailsLabelWrapper>
        <Client formik={formik} apiResponseMessage={apiResponseMessage} disableFields={disableFields} />
        <FormBottomWrapper>
          <ApiResponseMessageWrapper styles={{ padding: '16px 0px 0px 0px', color: '#ff0000', fontWeight: '600' }}>
            {apiResponseMessage}
          </ApiResponseMessageWrapper>
          <SubmitButtonWrapper variant="contained" type="submit" disabled={disableFields}>
            Edit Client
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

export default EditClient
