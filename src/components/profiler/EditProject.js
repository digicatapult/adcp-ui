import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { MenuItem, RadioGroup } from '@mui/material'
import uniqid from 'uniqid'
import * as yup from 'yup'
import { useParams } from 'react-router-dom'

import SubNavigation from './../SubNavigation'
import {
  floatFormatter,
  getClientsApi,
  getProfilerSubNavigation,
  getProjectByIdApi,
  isoDateFormatter,
  PROFILER_PROJECT_EDIT_URI,
  putProjectApi,
} from '../../util/AppUtil'
import {
  FormButton,
  FormInputError,
  FormRadioButtonLabel,
  FormSelect,
  FormTextLabel,
  RADIO_BUTTON_ENUMS,
  SELECT_CLIENT_DEFAULT_VALUE,
  projectValidationSchema,
  datePickerFormatter,
} from '../../util/ComponentUtil'
import Project from './Project'
import Client from './Client'

const AddProject = () => {
  const { id: projectId } = useParams()

  const [clients, setClients] = useState([])
  const [clientsLoaded, setClientsLoaded] = useState(false)
  const [clientRadioButtonValue, setClientRadioButtonValue] = useState('')
  const [projectLoaded, setProjectLoaded] = useState(false)
  const [apiResponseMessage, setApiResponseMessage] = useState('')

  const disableCreateClientFields = clients.length > 0 && clientRadioButtonValue === RADIO_BUTTON_ENUMS.select
  const disableProjectFields = !!apiResponseMessage

  const formik = useFormik({
    initialValues: {
      clientId: SELECT_CLIENT_DEFAULT_VALUE,
      firstName: '',
      lastName: '',
      company: '',
      role: '',
      name: '',
      description: '',
      startDate: '',
      endDate: '',
      budget: '',
      documentUrl: '',
    },
    validationSchema: projectValidationSchema,
    onSubmit: async (values) => {
      let response = {}

      const startDate = isoDateFormatter(values.startDate)
      const endDate = isoDateFormatter(values.endDate)
      const budget = floatFormatter(values.budget)

      if (await yup.string().uuid().isValid(values.clientId)) {
        response = await putProjectApi(projectId, {
          clientId: values.clientId,
          name: values.name,
          description: values.description,
          startDate,
          endDate,
          budget,
          documentUrl: values.documentUrl,
        })
      } else {
        response = await putProjectApi(projectId, {
          firstName: values.firstName,
          lastName: values.lastName,
          name: values.name,
          company: values.company,
          role: values.role,
          description: values.description,
          budget,
          startDate,
          endDate,
          documentUrl: values.documentUrl,
        })
      }

      if (response.ok) {
        window.location.reload()
      } else {
        const statusCode = response.status

        switch (statusCode) {
          case 404:
            formik.errors.clientId = 'Client does not exist!'
            break
          case 409:
            formik.errors.name = 'Name already exists!'
            break
          default:
            setApiResponseMessage(`A request ${statusCode} status code error occurred`)
            break
        }
      }
    },
  })

  const clientRadioButtonHandler = (e) => {
    const { value } = e.target

    if (value === RADIO_BUTTON_ENUMS.select) {
      setClientRadioButtonValue(RADIO_BUTTON_ENUMS.select)
    } else {
      setClientRadioButtonValue(RADIO_BUTTON_ENUMS.create)
    }

    formik.setFieldValue('clientId', SELECT_CLIENT_DEFAULT_VALUE)
    formik.setFieldValue('firstName', '')
    formik.setFieldValue('lastName', '')
    formik.setFieldValue('company', '')
    formik.setFieldValue('role', '')
  }

  const getClients = async () => {
    const result = await getClientsApi()

    const response = await result.json()

    if (response) {
      setClientsLoaded(true)

      if (response.length === 0) {
        setClientRadioButtonValue(RADIO_BUTTON_ENUMS.create)
      } else {
        setClientRadioButtonValue(RADIO_BUTTON_ENUMS.select)
      }

      setClients(response)
    }
  }

  const getProjectById = async () => {
    const response = await getProjectByIdApi(projectId)

    if (response.ok) {
      setProjectLoaded(true)

      const result = await response.json()

      await formik.setFieldValue('clientId', result.clientId)
      await formik.setFieldValue('name', result.name)
      await formik.setFieldValue('description', result.description)
      await formik.setFieldValue('budget', result.budget ? result.budget : '')
      await formik.setFieldValue('startDate', datePickerFormatter(result.startDate))
      await formik.setFieldValue('endDate', datePickerFormatter(result.endDate))
      await formik.setFieldValue('documentUrl', result.documentUrl ? result.documentUrl : '')
    } else {
      const statusCode = response.status

      switch (statusCode) {
        case 404:
          setApiResponseMessage('Project does not exist!')
          break
        case 409:
          formik.errors.name = 'Name already exists!'
          break
        default:
          setApiResponseMessage(`A request ${statusCode} status code error occurred`)
          break
      }
    }
  }

  useEffect(() => {
    if (!clientsLoaded) {
      getClients()
    }
    if (!projectLoaded) {
      getProjectById()
    }
  })

  return (
    <Wrapper>
      <SubNavigation currentPage={PROFILER_PROJECT_EDIT_URI} subNavList={getProfilerSubNavigation()} />
      <Content onSubmit={formik.handleSubmit}>
        <ClientDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Client Details:</ClientDetailsLabelWrapper>
        <ClientRadioGroupWrapper
          aria-labelledby="client-radio-buttons-group"
          defaultValue={RADIO_BUTTON_ENUMS.select}
          value={clientRadioButtonValue}
          name="client-radio-buttons-group"
          onChange={clientRadioButtonHandler}
        >
          <ClientRadioButtonsWrapper>
            <FormRadioButtonLabel
              label={`*${SELECT_CLIENT_DEFAULT_VALUE}`}
              value={RADIO_BUTTON_ENUMS.select}
              disabled={disableProjectFields || clients.length === 0}
            />
            <FormRadioButtonLabel
              label="*Create Client"
              value={RADIO_BUTTON_ENUMS.create}
              disabled={disableProjectFields}
            />
          </ClientRadioButtonsWrapper>
          <ClientSelectWrapper>
            <FormSelect
              disabled={disableProjectFields || !disableCreateClientFields}
              id="clientId"
              name="clientId"
              value={formik.values.clientId}
              onChangeHandler={formik.handleChange}
              error={formik.touched.clientId && Boolean(formik.errors.clientId)}
            >
              <MenuItem disabled value={SELECT_CLIENT_DEFAULT_VALUE}>
                <em>{SELECT_CLIENT_DEFAULT_VALUE}</em>
              </MenuItem>
              {clients.map((item) => (
                <MenuItem key={uniqid()} value={item.id}>
                  <em>
                    <strong>{`${item.company}`}</strong>
                    {` - ${item.lastName}, ${item.firstName}`}
                  </em>
                </MenuItem>
              ))}
            </FormSelect>
            {clients.length > 0 ? (
              <FormInputError key={uniqid()} styles={{ padding: '24px 18px 0px 0px', color: '#ff0000' }}>
                {clientsLoaded && disableCreateClientFields && formik.touched.clientId && formik.errors.clientId}
              </FormInputError>
            ) : (
              <FormInputError key={uniqid()} styles={{ padding: '24px 18px 0px 0px', color: '#000' }}>
                {clientsLoaded && 'There are no clients, please create one.'}
              </FormInputError>
            )}
          </ClientSelectWrapper>
        </ClientRadioGroupWrapper>
        <Client formik={formik} apiResponseMessage={apiResponseMessage} disableFields={disableCreateClientFields} />
        <ProjectDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Project Details:</ProjectDetailsLabelWrapper>
        <Project formik={formik} apiResponseMessage={apiResponseMessage} disableProjectFields={disableProjectFields} />
        <FormBottomWrapper>
          <ApiResponseMessageWrapper styles={{ padding: '16px 0px 0px 0px', color: '#ff0000', fontWeight: '600' }}>
            {apiResponseMessage}
          </ApiResponseMessageWrapper>
          <SubmitButtonWrapper variant="contained" type="submit" disabled={disableProjectFields}>
            Edit Project
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
    'client-radio-group-wrapper'
    'client-fields-wrapper'
    'project-details-label-wrapper'
    'project-fields-wrapper'
    'form-bottom-wrapper';
  padding: 64px;
`

const ClientRadioGroupWrapper = styled(RadioGroup)`
  grid-area: client-radio-group-wrapper;
  display: grid;
  grid-column-gap: 16px;
  grid-template-columns: 170px auto;
  grid-template-areas: 'client-radio-buttons-wrapper client-select-wrapper';
`

const ClientRadioButtonsWrapper = styled.div`
  grid-area: client-radio-buttons-wrapper;
  display: grid;
  grid-row-gap: 40px;
  padding-top: 8px;
`

const ClientSelectWrapper = styled.div`
  grid-area: client-select-wrapper;
  display: grid;
  grid-template-rows: 40px 16px;
`

const ClientDetailsLabelWrapper = styled(FormTextLabel)`
  grid-area: client-details-label-wrapper;
`

const ProjectDetailsLabelWrapper = styled(FormTextLabel)`
  grid-area: project-details-label-wrapper;
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

export default AddProject
