import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'

import SubNavigation from './../SubNavigation'
import { getProfilerSubNavigation } from '../../util/AppUtil'
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from '@mui/material'
import uniqid from 'uniqid'

// TODO remove default mui behvaiour/styling on radio button change
// TODO create reusable components and move into ComponentUtil passing in props
// TODO move constants to util
// TODO formik integration https://formik.org/docs/examples/with-material-ui
const RADIO_BUTTON_ENUMS = {
  select: 'SELECT',
  create: 'CREATE',
}

const SELECT_CLIENT_DEFAULT_VALUE = 'Select Client'

const AddProject = () => {
  // TODO replace with API call: GET /v1/profiler/project/client
  const clients = [{ id: '1', firstName: 'First name 1', lastName: 'Last name 1', company: 'Company 1' }]

  // const [formReady, setFormReady] = useState(false)
  const [selectedClient, setSelectedClient] = useState(SELECT_CLIENT_DEFAULT_VALUE)
  const [clientRadioButtonValue, setClientRadioButtonValue] = useState(
    clients.length > 0 ? RADIO_BUTTON_ENUMS.select : RADIO_BUTTON_ENUMS.create
  )
  const [disableCreateClientFields, setDisableCreateClientFields] = useState(
    clientRadioButtonValue === RADIO_BUTTON_ENUMS.select
  )

  useEffect(() => {}, [clientRadioButtonValue, disableCreateClientFields, selectedClient])

  const clientRadioButtonHandler = (e) => {
    const value = e.target.value

    setClientRadioButtonValue(
      value === RADIO_BUTTON_ENUMS.select ? RADIO_BUTTON_ENUMS.select : RADIO_BUTTON_ENUMS.create
    )
    setSelectedClient(SELECT_CLIENT_DEFAULT_VALUE)

    setDisableCreateClientFields(value === RADIO_BUTTON_ENUMS.select)
  }

  const selectClientHandler = (e) => {
    setSelectedClient(e.target.value)
    setClientRadioButtonValue(RADIO_BUTTON_ENUMS.select)
  }

  console.log('clients', clients)
  console.log('clientRadioButtonValue', clientRadioButtonValue)
  console.log('disableCreateClientFields', disableCreateClientFields)

  return (
    <Wrapper>
      <SubNavigation subNavList={getProfilerSubNavigation()} />
      <Content>
        <FormWrapper>
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
              defaultValue={SELECT_CLIENT_DEFAULT_VALUE}
              value={selectedClient}
              disabled={!disableCreateClientFields}
              onChange={selectClientHandler}
            >
              <MenuItem disabled value={SELECT_CLIENT_DEFAULT_VALUE}>
                <em>Select Client</em>
              </MenuItem>
              {clients.map((item) => (
                <MenuItem key={uniqid()} value={item.id}>
                  <em>
                    {item.lastName}, {item.firstName} - {item.company}
                  </em>
                </MenuItem>
              ))}
            </ClientSelect>
            {clients.length > 0 ? <ClientSelectError /> : <ClientSelectError>There are no clients</ClientSelectError>}
            <ClientCreateLabel
              control={<ClientRadioButton />}
              label="*Create Client"
              value={RADIO_BUTTON_ENUMS.create}
            />
            <ClientFieldsWrapper>
              <ClientFirstNameLabel disabled={disableCreateClientFields}>*First name:</ClientFirstNameLabel>
              <ClientFirstNameInput hiddenLabel label="First name" disabled={disableCreateClientFields} />
              <ClientLastNameLabel disabled={disableCreateClientFields}>*Last name:</ClientLastNameLabel>
              <ClientLastNameInput hiddenLabel label="Last name" disabled={disableCreateClientFields} />
              <ClientCompanyLabel disabled={disableCreateClientFields}>*Company:</ClientCompanyLabel>
              <ClientCompanyInput hiddenLabel label="Company" disabled={disableCreateClientFields} />
              <ClientRoleLabel disabled={disableCreateClientFields}>*Role:</ClientRoleLabel>
              <ClientRoleInput hiddenLabel label="Role" disabled={disableCreateClientFields} />
            </ClientFieldsWrapper>
          </RadioGroupWrapper>
          <ProjectDetailsLabel>Project details:</ProjectDetailsLabel>
          <ProjectFieldsWrapper>
            <ProjectNameLabel>*Name:</ProjectNameLabel>
            <ProjectNameInput hiddenLabel label="Name" />
            <ProjectDescriptionLabel>*Description:</ProjectDescriptionLabel>
            <ProjectDescriptionInput hiddenLabel label="Description" />
            <ProjectSubFieldsWrapper>
              <ProjectStartDateLabel>Start date:</ProjectStartDateLabel>
              <ProjectStartDatePicker type="date" defaultValue="" placeholder="dd/mm/yyyy" />
              <ProjectEndDateLabel>End date:</ProjectEndDateLabel>
              <ProjectEndDatePicker type="date" defaultValue="" placeholder="dd/mm/yyyy" />
              <ProjectBudgetLabel>Budget:</ProjectBudgetLabel>
              <ProjectBudgetInput hiddenLabel label="Budget" />
            </ProjectSubFieldsWrapper>
            <ProjectDocumentUrlLabel>Document url:</ProjectDocumentUrlLabel>
            <ProjectDocumentUrlInput hiddenLabel label="Document url" />
          </ProjectFieldsWrapper>
          <SubmitButton variant="contained" disabled>
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

const FormWrapper = styled(FormControl)`
  grid-area: form-wrapper;
`

const ClientDetailsLabel = styled(FormLabel)`
  font-size: 1.4rem;
  color: #000;
  margin-bottom: 16px;
`

const RadioGroupWrapper = styled(RadioGroup)`
  display: grid;
  grid-template-columns: 150px 300px auto;
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
  font-weight: 600;
  color: #ff0000;
`

const ClientCreateLabel = styled(FormControlLabel)`
  grid-area: client-create-label;
`

const ClientFieldsWrapper = styled.div`
  grid-area: client-fields-wrapper;
  display: grid;
  grid-row-gap: 48px;
  grid-template-columns: 160px 300px 150px 300px;
  grid-template-areas:
    'client-first-name-label client-first-name-input client-last-name-label client-last-name-input'
    'client-company-label client-company-input client-role-label client-role-input';
`

const ClientFirstNameLabel = styled(FormLabel)`
  grid-area: client-first-name-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#333' : '#000')};
`

const ClientFirstNameInput = styled(TextField)`
  grid-area: client-first-name-input;
  display: grid;
`

const ClientLastNameLabel = styled(FormLabel)`
  grid-area: client-last-name-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#333' : '#000')};
`

const ClientLastNameInput = styled(TextField)`
  grid-area: client-last-name-input;
  display: grid;
`

const ClientCompanyLabel = styled(FormLabel)`
  grid-area: client-company-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#333' : '#000')};
`

const ClientCompanyInput = styled(TextField)`
  grid-area: client-company-input;
  display: grid;
`

const ClientRoleLabel = styled(FormLabel)`
  grid-area: client-role-label;
  display: grid;
  justify-content: right;
  margin: 0px 16px 0px 32px;
  font-size: 1.1rem;
  color: ${({ disabled }) => (disabled ? '#333' : '#000')};
`

const ClientRoleInput = styled(TextField)`
  grid-area: client-role-input;
  display: grid;
`

const ProjectDetailsLabel = styled(FormLabel)`
  grid-area: project-details-label;
  font-size: 1.4rem;
  justify-content: right;
  color: #000;
  margin: 32px 0px;
`

const ProjectFieldsWrapper = styled.div`
  grid-area: project-fields-wrapper;
  display: grid;
  grid-row-gap: 48px;
  grid-template-columns: 160px 300px 150px 300px;
  grid-template-areas:
    'project-name-label project-name-input project-description-label project-description-input'
    'project-sub-fields-wrapper project-sub-fields-wrapper project-sub-fields-wrapper project-sub-fields-wrapper'
    'project-document-url-label  project-document-url-input  project-document-url-input  project-document-url-input';
`

const ProjectNameLabel = styled(FormLabel)`
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
`

const ProjectDescriptionLabel = styled(FormLabel)`
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

const ProjectStartDateLabel = styled(FormLabel)`
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

const ProjectEndDateLabel = styled(FormLabel)`
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

const ProjectBudgetLabel = styled(FormLabel)`
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

const ProjectDocumentUrlLabel = styled(FormLabel)`
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
  margin-top: 48px;
`

export default AddProject
