import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { RadioGroup } from '@mui/material'
import uniqid from 'uniqid'
import * as yup from 'yup'

import SubNavigation from './../SubNavigation'
import {
  dateFormatter,
  floatFormatter,
  getClientsApi,
  getProfilerSubNavigation,
  postProjectApi,
} from '../../util/AppUtil'
import {
  FormButton,
  FormDatePicker,
  FormInputError,
  FormRadioButtonLabel,
  FormSelect,
  FormTextInput,
  FormTextLabel,
  RADIO_BUTTON_ENUMS,
  SELECT_CLIENT_DEFAULT_VALUE,
  validationSchema,
} from '../../util/ComponentUtil'

const AddProject = () => {
  const [clients, setClients] = useState([])
  const [clientsLoaded, setClientsLoaded] = useState(false)
  const [clientRadioButtonValue, setClientRadioButtonValue] = useState('')

  const disableCreateClientFields = clients.length > 0 && clientRadioButtonValue === RADIO_BUTTON_ENUMS.select

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
    validationSchema,
    onSubmit: async (values) => {
      let response = {}

      const startDate = dateFormatter(values.startDate)
      const endDate = dateFormatter(values.endDate)
      const budget = floatFormatter(values.budget)

      if (await yup.string().uuid().isValid(values.clientId)) {
        response = await postProjectApi({
          clientId: values.clientId,
          name: values.name,
          description: values.description,
          startDate,
          endDate,
          budget,
          documentUrl: values.documentUrl,
        })
      } else {
        response = await postProjectApi({
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

        if (statusCode === 409) {
          formik.errors.name = 'Name already exists!'
        } else if (statusCode === 404) {
          formik.errors.clientId = 'Client does not exist!'
        }
      }
    },
  })

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

  useEffect(() => {
    if (!clientsLoaded) {
      getClients()
    }
  }, [clientsLoaded, clients, clientRadioButtonValue])

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

  return (
    <Wrapper>
      <SubNavigation subNavList={getProfilerSubNavigation()} />
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
              disabled={clients.length === 0}
            />
            <FormRadioButtonLabel label="*Create Client" value={RADIO_BUTTON_ENUMS.create} />
          </ClientRadioButtonsWrapper>
          <ClientSelectWrapper>
            <FormSelect
              clients={clients}
              defaultValue={SELECT_CLIENT_DEFAULT_VALUE}
              disabled={!disableCreateClientFields}
              id="clientId"
              name="clientId"
              value={formik.values.clientId}
              onChangeHandler={formik.handleChange}
              error={formik.touched.clientId && Boolean(formik.errors.clientId)}
            />
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
        <ClientFieldsWrapper>
          <ClientFirstNameWrapper>
            <FormTextLabel>*First name:</FormTextLabel>
            <FormTextInput
              disabled={disableCreateClientFields}
              placeholder="Enter first name"
              id="firstName"
              name="firstName"
              value={formik.values.firstName}
              onChangeHandler={formik.handleChange}
              error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            />
            <FormInputError>
              {!disableCreateClientFields && formik.touched.firstName && formik.errors.firstName}
            </FormInputError>
          </ClientFirstNameWrapper>
          <ClientLastNameWrapper>
            <FormTextLabel>*Last name:</FormTextLabel>
            <FormTextInput
              disabled={disableCreateClientFields}
              placeholder="Enter last name"
              id="lastName"
              name="lastName"
              value={formik.values.lastName}
              onChangeHandler={formik.handleChange}
              error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            />
            <FormInputError>
              {!disableCreateClientFields && formik.touched.lastName && formik.errors.lastName}
            </FormInputError>
          </ClientLastNameWrapper>
          <ClientCompanyWrapper>
            <FormTextLabel>*Company:</FormTextLabel>
            <FormTextInput
              disabled={disableCreateClientFields}
              placeholder="Enter company"
              id="company"
              name="company"
              value={formik.values.company}
              onChangeHandler={formik.handleChange}
              error={formik.touched.company && Boolean(formik.errors.company)}
            />
            <FormInputError>
              {!disableCreateClientFields && formik.touched.company && formik.errors.company}
            </FormInputError>
          </ClientCompanyWrapper>
          <ClientRoleWrapper>
            <FormTextLabel>*Role:</FormTextLabel>
            <FormTextInput
              disabled={disableCreateClientFields}
              placeholder="Enter role"
              id="role"
              name="role"
              value={formik.values.role}
              onChangeHandler={formik.handleChange}
              error={formik.touched.role && Boolean(formik.errors.role)}
            />
            <FormInputError>{!disableCreateClientFields && formik.touched.role && formik.errors.role}</FormInputError>
          </ClientRoleWrapper>
        </ClientFieldsWrapper>
        <ProjectDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Project Details:</ProjectDetailsLabelWrapper>
        <ProjectFieldsWrapper>
          <ProjectNameWrapper>
            <FormTextLabel>*Name:</FormTextLabel>
            <FormTextInput
              placeholder="Enter name"
              id="name"
              name="name"
              value={formik.values.name}
              onChangeHandler={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <FormInputError>{formik.touched.name && formik.errors.name}</FormInputError>
          </ProjectNameWrapper>
          <ProjectDescriptionWrapper>
            <FormTextLabel>*Description:</FormTextLabel>
            <FormTextInput
              placeholder="Enter description"
              id="description"
              name="description"
              value={formik.values.description}
              onChangeHandler={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
            />
            <FormInputError>{formik.touched.description && formik.errors.description}</FormInputError>
          </ProjectDescriptionWrapper>
          <ProjectDatesWrapper>
            <ProjectBudgetWrapper>
              <FormTextLabel>Budget:</FormTextLabel>
              <FormTextInput
                placeholder="Enter budget"
                id="budget"
                name="budget"
                value={formik.values.budget}
                onChangeHandler={formik.handleChange}
                error={formik.touched.budget && Boolean(formik.errors.budget)}
                styles={{ width: '220px', margin: '8px 0px' }}
              />
              <FormInputError>{formik.touched.budget && formik.errors.budget}</FormInputError>
            </ProjectBudgetWrapper>
            <ProjectStartDateWrapper>
              <FormTextLabel>Start date:</FormTextLabel>
              <FormDatePicker
                id="startDate"
                name="startDate"
                value={formik.values.startDate}
                onChangeHandler={formik.handleChange}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
              />
              <FormInputError>{formik.touched.startDate && formik.errors.startDate}</FormInputError>
            </ProjectStartDateWrapper>
            <ProjectEndDateWrapper>
              <FormTextLabel>End date:</FormTextLabel>
              <FormDatePicker
                id="endDate"
                name="endDate"
                value={formik.values.endDate}
                onChangeHandler={formik.handleChange}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
              />
              <FormInputError>{formik.touched.endDate && formik.errors.endDate}</FormInputError>
            </ProjectEndDateWrapper>
          </ProjectDatesWrapper>
          <ProjectDocumentUrlWrapper>
            <FormTextLabel>Document url:</FormTextLabel>
            <FormTextInput
              placeholder="Enter document url"
              id="documentUrl"
              name="documentUrl"
              value={formik.values.documentUrl}
              onChangeHandler={formik.handleChange}
              error={formik.touched.documentUrl && Boolean(formik.errors.documentUrl)}
              styles={{ width: '100%', margin: '8px 0px' }}
            />
            <FormInputError>{formik.touched.documentUrl && formik.errors.documentUrl}</FormInputError>
          </ProjectDocumentUrlWrapper>
          <SubmitButtonWrapper>
            <FormButton variant="contained" type="submit">
              Add Project
            </FormButton>
          </SubmitButtonWrapper>
        </ProjectFieldsWrapper>
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
    'project-fields-wrapper';
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

const ClientFieldsWrapper = styled.div`
  grid-area: client-fields-wrapper;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 56px;
  grid-template-areas:
    'client-first-name-wrapper client-last-name-wrapper'
    'client-company-wrapper client-role-wrapper';
  margin-bottom: 16px;
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

const ProjectFieldsWrapper = styled.div`
  grid-area: project-fields-wrapper;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 56px;
  grid-template-areas:
    'project-name-wrapper project-description-wrapper'
    'project-dates-wrapper project-dates-wrapper'
    'project-document-url-wrapper project-document-url-wrapper'
    'submit-button-wrapper submit-button-wrapper';
`

const ProjectDetailsLabelWrapper = styled(FormTextLabel)`
  grid-area: project-details-label-wrapper;
`

const ProjectNameWrapper = styled.div`
  grid-area: project-name-wrapper;
  padding-top: 16px;
`

const ProjectDescriptionWrapper = styled.div`
  grid-area: project-description-wrapper;
  padding-top: 16px;
`

const ProjectDatesWrapper = styled.div`
  grid-area: project-dates-wrapper;
  display: grid;
  justify-content: center;
  grid-column-gap: 56px;
  grid-template-areas: 'project-budget-wrapper project-start-date-wrapper project-end-date-wrapper';
`

const ProjectStartDateWrapper = styled.div`
  grid-area: project-start-date-wrapper;
`

const ProjectEndDateWrapper = styled.div`
  grid-area: project-end-date-wrapper;
`

const ProjectBudgetWrapper = styled.div`
  grid-area: project-budget-wrapper;
`

const ProjectDocumentUrlWrapper = styled.div`
  grid-area: project-document-url-wrapper;
`

const SubmitButtonWrapper = styled.div`
  grid-area: submit-button-wrapper;
  display: grid;
  justify-content: right;
`

export default AddProject
