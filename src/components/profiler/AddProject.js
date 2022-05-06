import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import { useFormik } from 'formik'
import { RadioGroup } from '@mui/material'

import SubNavigation from './../SubNavigation'
import { getProfilerSubNavigation } from '../../util/AppUtil'
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
  // TODO replace with API call: GET /v1/profiler/project/client
  const clients = [{ id: '1', firstName: 'First name 1', lastName: 'Last name 1', company: 'Company 1' }]

  const [selectedClient, setSelectedClient] = useState(SELECT_CLIENT_DEFAULT_VALUE)
  const [clientRadioButtonValue, setClientRadioButtonValue] = useState(
    clients.length > 0 ? RADIO_BUTTON_ENUMS.select : RADIO_BUTTON_ENUMS.create
  )
  const [disableCreateClientFields, setDisableCreateClientFields] = useState(
    clientRadioButtonValue === RADIO_BUTTON_ENUMS.select
  )

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
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2))
    },
  })

  useEffect(() => {}, [clientRadioButtonValue, disableCreateClientFields, selectedClient])

  const clientRadioButtonHandler = (e) => {
    const { value } = e.target

    setClientRadioButtonValue(
      value === RADIO_BUTTON_ENUMS.select ? RADIO_BUTTON_ENUMS.select : RADIO_BUTTON_ENUMS.create
    )
    setSelectedClient(SELECT_CLIENT_DEFAULT_VALUE)
    formik.setFieldValue('clientId', SELECT_CLIENT_DEFAULT_VALUE)

    setDisableCreateClientFields(value === RADIO_BUTTON_ENUMS.select)
  }

  return (
    <Wrapper>
      <SubNavigation subNavList={getProfilerSubNavigation()} />
      <Content onSubmit={formik.handleSubmit}>
        {/*<FormWrapper onSubmit={formik.handleSubmit}>*/}
        <ClientDetailsLabelWrapper styles={{ fontSize: '1.5rem' }}>Client Details:</ClientDetailsLabelWrapper>
        <ClientRadioGroupWrapper
          aria-labelledby="client-radio-buttons-group"
          defaultValue={RADIO_BUTTON_ENUMS.select}
          value={clientRadioButtonValue}
          name="client-radio-buttons-group"
          onChange={clientRadioButtonHandler}
        >
          <ClientRadioButtonsWrapper>
            <FormRadioButtonLabel label={`*${SELECT_CLIENT_DEFAULT_VALUE}`} value={RADIO_BUTTON_ENUMS.select} />
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
              <FormInputError styles={{ padding: '18px' }}>
                {disableCreateClientFields && formik.touched.clientId && formik.errors.clientId && 'Client is required'}
              </FormInputError>
            ) : (
              <FormInputError styles={{ padding: '18px' }}>There are no clients</FormInputError>
            )}
          </ClientSelectWrapper>
        </ClientRadioGroupWrapper>
        <ClientFieldsWrapper>
          <ClientFirstNameWrapper>
            <FormTextLabel>*First name:</FormTextLabel>
            <FormTextInput
              disabled={disableCreateClientFields}
              placeholder="First name"
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
              placeholder="Last name"
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
              placeholder="Company"
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
              placeholder="Role"
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
              placeholder="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChangeHandler={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
            />
            <FormInputError>{formik.touched.name && formik.errors.name}</FormInputError>
          </ProjectNameWrapper>
          <ProjectDescriptionWrapper>
            <FormTextLabel>Description:</FormTextLabel>
            <FormTextInput
              placeholder="Description"
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
                placeholder="Budget"
                id="budget"
                name="budget"
                value={formik.values.budget}
                onChangeHandler={formik.handleChange}
                error={formik.touched.budget && Boolean(formik.errors.budget)}
                styles={{ width: '150px', margin: '8px 0px' }}
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
              placeholder="Document url"
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
  grid-row-gap: 32px;
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
  grid-template-columns: 170px 340px;
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
  grid-template-columns: 300px 200px;
`

const ClientFieldsWrapper = styled.div`
  grid-area: client-fields-wrapper;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 64px;
  grid-template-columns: repeat(2, 300px);
  grid-template-areas:
    'client-first-name-wrapper client-last-name-wrapper'
    'client-company-wrapper client-role-wrapper';
  padding-bottom: 32px;
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
  grid-column-gap: 64px;
  grid-template-columns: repeat(2, 300px);
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
`

const ProjectDescriptionWrapper = styled.div`
  grid-area: project-description-wrapper;
`

const ProjectDatesWrapper = styled.div`
  grid-area: project-dates-wrapper;
  display: grid;
  justify-content: center;
  grid-column-gap: 64px;
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
