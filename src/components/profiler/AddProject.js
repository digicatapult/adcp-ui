import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import * as yup from 'yup'
import { useFormik } from 'formik'
import {
  Button,
  // FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import uniqid from 'uniqid'

import SubNavigation from './../SubNavigation'
import { getProfilerSubNavigation } from '../../util/AppUtil'

// TODO create reusable components and move into ComponentUtil passing in props
// TODO move constants to util
const RADIO_BUTTON_ENUMS = {
  select: 'SELECT',
  create: 'CREATE',
}

const SELECT_CLIENT_DEFAULT_VALUE = 'Select Client'

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

  const validationSchema = yup.object({
    clientId: yup.number('hi').required('Client is required'),
    firstName: yup
      .string('Enter your first name')
      .min(2, 'First name should be of 2 - 50 characters length')
      .required('First name is required'),
    lastName: yup
      .string('Enter your last name')
      .min(2, 'Last name should be of 2 - 50 characters length')
      .required('Last name is required'),
    company: yup
      .string('Enter your company')
      .min(2, 'Company should be of 2 - 50 characters length')
      .required('Company is required'),
    role: yup
      .string('Enter your role')
      .min(2, 'Role should be of 2 - 50 characters length')
      .required('Role is required'),
    name: yup
      .string('Enter your name')
      .min(2, 'Name should be of 2 - 50 characters length')
      .required('Name is required'),
  })

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
    const value = e.target.value

    setClientRadioButtonValue(
      value === RADIO_BUTTON_ENUMS.select ? RADIO_BUTTON_ENUMS.select : RADIO_BUTTON_ENUMS.create
    )
    setSelectedClient(SELECT_CLIENT_DEFAULT_VALUE)
    formik.setFieldValue('clientId', SELECT_CLIENT_DEFAULT_VALUE)

    setDisableCreateClientFields(value === RADIO_BUTTON_ENUMS.select)
  }

  console.log('clients', clients)
  console.log('clientRadioButtonValue', clientRadioButtonValue)
  console.log('disableCreateClientFields', disableCreateClientFields)

  return (
    <Wrapper>
      <SubNavigation subNavList={getProfilerSubNavigation()} />
      <Content>
        <FormWrapper onSubmit={formik.handleSubmit}>
          <ClientDetailsLabel>Client details:</ClientDetailsLabel>
          <RadioGroupWrapper
            aria-labelledby="client-radio-buttons-group"
            defaultValue={RADIO_BUTTON_ENUMS.select}
            value={clientRadioButtonValue}
            name="client-radio-buttons-group"
            onChange={clientRadioButtonHandler}
          >
            <ClientSelectLabel
              control={<ClientRadioButton />}
              label={`*${SELECT_CLIENT_DEFAULT_VALUE}`}
              value={RADIO_BUTTON_ENUMS.select}
            />
            <ClientSelect
              displayEmpty
              // defaultValue={SELECT_CLIENT_DEFAULT_VALUE}
              // value="hi"
              disabled={!disableCreateClientFields}
              // onChange={selectClientHandler}
              id="clientId"
              name="clientId"
              value={formik.values.clientId}
              onChange={formik.handleChange}
              error={disableCreateClientFields && formik.touched.clientId && Boolean(formik.errors.clientId)}
              // helperText={disableCreateClientFields && formik.touched.clientId && formik.errors.clientId}
            >
              <MenuItem disabled value={SELECT_CLIENT_DEFAULT_VALUE}>
                <em>{SELECT_CLIENT_DEFAULT_VALUE}</em>
              </MenuItem>
              {clients.map((item) => (
                <MenuItem key={uniqid()} value={item.id}>
                  <em>
                    {item.lastName}, {item.firstName} - {item.company}
                  </em>
                </MenuItem>
              ))}
            </ClientSelect>
            {clients.length > 0 ? (
              <ClientSelectError>
                {disableCreateClientFields && formik.touched.clientId && formik.errors.clientId && 'Client is required'}
              </ClientSelectError>
            ) : (
              <ClientSelectError>There are no clients</ClientSelectError>
            )}
            <ClientCreateLabel
              control={<ClientRadioButton />}
              label="*Create Client"
              value={RADIO_BUTTON_ENUMS.create}
            />
            <ClientFieldsWrapper>
              <ClientFirstNameLabel disabled={disableCreateClientFields}>*First name:</ClientFirstNameLabel>
              <ClientFirstNameInput
                hiddenLabel
                placeholder="First name"
                disabled={disableCreateClientFields}
                id="firstName"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                error={!disableCreateClientFields && formik.touched.firstName && Boolean(formik.errors.firstName)}
                helperText={
                  !disableCreateClientFields && formik.touched.firstName && formik.errors.firstName
                    ? formik.errors.firstName
                    : undefined
                }
              />
              <ClientLastNameLabel disabled={disableCreateClientFields}>*Last name:</ClientLastNameLabel>
              <ClientLastNameInput
                hiddenLabel
                placeholder="Last name"
                disabled={disableCreateClientFields}
                id="lastName"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                error={!disableCreateClientFields && formik.touched.lastName && Boolean(formik.errors.lastName)}
                helperText={
                  !disableCreateClientFields && formik.touched.lastName && formik.errors.lastName
                    ? formik.errors.lastName
                    : undefined
                }
              />
              <ClientCompanyLabel disabled={disableCreateClientFields}>*Company:</ClientCompanyLabel>
              <ClientCompanyInput
                hiddenLabel
                placeholder="Company"
                disabled={disableCreateClientFields}
                id="company"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={!disableCreateClientFields && formik.touched.company && Boolean(formik.errors.company)}
                helperText={
                  !disableCreateClientFields && formik.touched.company && formik.errors.company
                    ? formik.errors.company
                    : undefined
                }
              />
              <ClientRoleLabel disabled={disableCreateClientFields}>*Role:</ClientRoleLabel>
              <ClientRoleInput
                hiddenLabel
                placeholder="Role"
                disabled={disableCreateClientFields}
                id="role"
                name="role"
                value={formik.values.role}
                onChange={formik.handleChange}
                error={!disableCreateClientFields && formik.touched.role && Boolean(formik.errors.role)}
                helperText={
                  !disableCreateClientFields && formik.touched.role && formik.errors.role
                    ? formik.errors.role
                    : undefined
                }
              />
            </ClientFieldsWrapper>
          </RadioGroupWrapper>
          <ProjectDetailsLabel>Project details:</ProjectDetailsLabel>
          <ProjectFieldsWrapper>
            <ProjectNameLabel>*Name:</ProjectNameLabel>
            <ProjectNameInput
              hiddenLabel
              placeholder="Name"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name ? formik.errors.name : undefined}
            />
            <ProjectDescriptionLabel>*Description:</ProjectDescriptionLabel>
            <ProjectDescriptionInput
              hiddenLabel
              placeholder="Description"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={formik.touched.description && Boolean(formik.errors.description)}
              helperText={
                formik.touched.description && formik.errors.description ? formik.errors.description : undefined
              }
            />
            <ProjectSubFieldsWrapper>
              <ProjectStartDateLabel>Start date:</ProjectStartDateLabel>
              <ProjectStartDatePicker
                type="date"
                // defaultValue=""
                placeholder="dd/mm/yyyy"
                id="startDate"
                name="startDate"
                value={formik.values.startDate}
                onChange={formik.handleChange}
                error={formik.touched.startDate && Boolean(formik.errors.startDate)}
                helperText={formik.touched.startDate && formik.errors.startDate ? formik.errors.startDate : undefined}
              />
              <ProjectEndDateLabel>End date:</ProjectEndDateLabel>
              <ProjectEndDatePicker
                type="date"
                // defaultValue=""
                placeholder="dd/mm/yyyy"
                id="endDate"
                name="endDate"
                value={formik.values.endDate}
                onChange={formik.handleChange}
                error={formik.touched.endDate && Boolean(formik.errors.endDate)}
                helperText={formik.touched.endDate && formik.errors.endDate ? formik.errors.endDate : undefined}
              />
              <ProjectBudgetLabel>Budget:</ProjectBudgetLabel>
              <ProjectBudgetInput
                hiddenLabel
                placeholder="Budget"
                id="budget"
                name="budget"
                value={formik.values.budget}
                onChange={formik.handleChange}
                error={formik.touched.budget && Boolean(formik.errors.budget)}
                helperText={formik.touched.budget && formik.errors.budget ? formik.errors.budget : undefined}
              />
            </ProjectSubFieldsWrapper>
            <ProjectDocumentUrlLabel>Document url:</ProjectDocumentUrlLabel>
            <ProjectDocumentUrlInput
              hiddenLabel
              placeholder="Document url"
              id="documentUrl"
              name="documentUrl"
              value={formik.values.documentUrl}
              onChange={formik.handleChange}
              error={formik.touched.documentUrl && Boolean(formik.errors.documentUrl)}
              helperText={
                formik.touched.documentUrl && formik.errors.documentUrl ? formik.errors.documentUrl : undefined
              }
            />
          </ProjectFieldsWrapper>
          <SubmitButton variant="contained" type="submit">
            Add Project
          </SubmitButton>
        </FormWrapper>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  grid-area: main-wrapper;
  display: grid;
  grid-template-areas: 'sub-navigation main';
  padding: 48px;
`

const Content = styled.div`
  grid-area: main;
  justify-content: center;
`

const FormWrapper = styled.form`
  grid-area: form-wrapper;
`

const ClientDetailsLabel = styled(FormLabel)`
  font-size: 1.4rem;
  color: #000;
  margin-bottom: 16px;
`

const RadioGroupWrapper = styled(RadioGroup)`
  display: grid;
  grid-template-columns: 150px 450px auto;
  grid-row-gap: 16px;
  grid-template-areas:
    'client-select-label client-select client-select-error'
    'client-create-label client-create-label client-create-label'
    'client-fields-wrapper client-fields-wrapper client-fields-wrapper'
    'project-details-label project-details-label project-details-label'
    'project-fields-wrapper project-fields-wrapper project-fields-wrapper';
`

const ClientSelectLabel = styled(FormControlLabel)`
  grid-area: client-select-label;
`

const ClientRadioButton = styled(Radio)`
  grid-area: client-radio-button;
`

const ClientSelect = styled(Select)`
  grid-area: client-select;
  display: grid;
`

const ClientSelectError = styled.div`
  grid-area: client-select-error;
  display: grid;
  padding: 20px;
  //font-weight: 600;
  color: #ff0000;
`

const ClientCreateLabel = styled(FormControlLabel)`
  grid-area: client-create-label;
`

const ClientFieldsWrapper = styled.div`
  grid-area: client-fields-wrapper;
  display: grid;
  grid-row-gap: 56px;
  grid-template-rows: 56px;
  grid-template-columns: 160px 300px 150px 300px;
  grid-template-areas:
    'client-first-name-label client-first-name-input client-last-name-label client-last-name-input'
    'client-company-label client-company-input client-role-label client-role-input';
`

const ClientFirstNameLabel = styled.div`
  grid-area: client-first-name-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#999' : '#000')};
`

const ClientFirstNameInput = styled(TextField)`
  grid-area: client-first-name-input;
  display: grid;
`

const ClientLastNameLabel = styled.div`
  grid-area: client-last-name-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#999' : '#000')};
`

const ClientLastNameInput = styled(TextField)`
  grid-area: client-last-name-input;
  display: grid;
  border-color: ${({ disabled }) => (disabled ? '#999' : '#000')};
`

const ClientCompanyLabel = styled.div`
  grid-area: client-company-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#999' : '#000')};
`

const ClientCompanyInput = styled(TextField)`
  grid-area: client-company-input;
  display: grid;
`

const ClientRoleLabel = styled.div`
  grid-area: client-role-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#999' : '#000')};
`

const ClientRoleInput = styled(TextField)`
  grid-area: client-role-input;
  display: grid;
`

const ProjectDetailsLabel = styled.div`
  grid-area: project-details-label;
  font-size: 1.4rem;
  justify-content: right;
  color: #000;
  margin: 32px 0px;
`

const ProjectFieldsWrapper = styled.div`
  grid-area: project-fields-wrapper;
  display: grid;
  grid-row-gap: 56px;
  grid-template-rows: 56px;
  grid-template-columns: 160px 300px 150px 300px;
  grid-template-areas:
    'project-name-label project-name-input project-description-label project-description-input'
    'project-sub-fields-wrapper project-sub-fields-wrapper project-sub-fields-wrapper project-sub-fields-wrapper'
    'project-document-url-label project-document-url-input project-document-url-input project-document-url-input';
`

const ProjectNameLabel = styled.div`
  grid-area: project-name-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  color: #000;
  font-size: 1.1rem;
`

const ProjectNameInput = styled(TextField)`
  grid-area: project-name-input;
  display: grid;
  font-size: 2.4rem;
`

const ProjectDescriptionLabel = styled.div`
  grid-area: project-description-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  color: #000;
  font-size: 1.1rem;
`

const ProjectDescriptionInput = styled(TextField)`
  grid-area: project-description-input;
  display: grid;
`

const ProjectSubFieldsWrapper = styled.div`
  grid-area: project-sub-fields-wrapper;
  display: grid;
  grid-template-columns: 160px 150px 150px 150px 150px 150px;
  grid-template-areas: 'project-start-date-label project-start-date-picker project-end-date-label project-end-date-picker project-budget-label project-budget-input';
`

const ProjectStartDateLabel = styled.div`
  grid-area: project-start-date-label;
  display: grid;
  margin: 0px 16px 0px 32px;
  justify-content: right;
  color: #000;
  font-size: 1.1rem;
`

const ProjectStartDatePicker = styled(TextField)`
  grid-area: project-start-date-picker;
  display: grid;
`

const ProjectEndDateLabel = styled.div`
  grid-area: project-end-date-label;
  display: grid;
  margin: 0px 16px 0px 32px;
  justify-content: right;
  color: #000;
  font-size: 1.1rem;
`

const ProjectEndDatePicker = styled(TextField)`
  grid-area: project-end-date-picker;
  display: grid;
`

const ProjectBudgetLabel = styled.div`
  grid-area: project-budget-label;
  display: grid;
  margin: 0px 16px 0px 32px;
  justify-content: right;
  color: #000;
  font-size: 1.1rem;
`

const ProjectBudgetInput = styled(TextField)`
  grid-area: project-budget-input;
`

const ProjectDocumentUrlLabel = styled.div`
  grid-area: project-document-url-label;
  display: grid;
  margin: 0px 16px 0px 32px;
  justify-content: right;
  color: #000;
  font-size: 1.1rem;
`

const ProjectDocumentUrlInput = styled(TextField)`
  grid-area: project-document-url-input;
  display: grid;
`

const SubmitButton = styled(Button)`
  width: 200px;
  height: 48px;
  margin-top: 56px;
`

export default AddProject
