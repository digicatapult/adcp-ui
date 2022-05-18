import React from 'react'
import styled from '@emotion/styled'

import { FormDatePicker, FormInputError, FormTextInput, FormTextLabel } from '../../util/ComponentUtil'

const Project = ({ formik, disableProjectFields }) => {
  return (
    <ProjectFieldsWrapper>
      <ProjectNameWrapper>
        <FormTextLabel>*Name:</FormTextLabel>
        <FormTextInput
          disabled={disableProjectFields}
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
          disabled={disableProjectFields}
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
            disabled={disableProjectFields}
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
            disabled={disableProjectFields}
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
          disabled={disableProjectFields}
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
    </ProjectFieldsWrapper>
  )
}

const ProjectFieldsWrapper = styled.div`
  grid-area: project-fields-wrapper;
  display: grid;
  grid-row-gap: 24px;
  grid-column-gap: 56px;
  grid-template-areas:
    'project-name-wrapper project-description-wrapper'
    'project-dates-wrapper project-dates-wrapper'
    'project-document-url-wrapper project-document-url-wrapper';
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

export default Project
