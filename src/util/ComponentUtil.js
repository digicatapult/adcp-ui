import React from 'react'
import styled from '@emotion/styled'
import { Button, FormControlLabel, MenuItem, Radio, Select, TextField } from '@mui/material'
import uniqid from 'uniqid'
import * as yup from 'yup'

export const SELECT_CLIENT_DEFAULT_VALUE = 'Select Client'

export const RADIO_BUTTON_ENUMS = {
  select: 'SELECT',
  create: 'CREATE',
}

export const validationSchema = yup.object().shape(
  {
    clientId: yup.string().when('firstName', {
      is: (firstName) => !firstName,
      then: yup.string().uuid('Client is Required').required('Client is required'),
      otherwise: yup.string(),
    }),
    firstName: yup.string().when('clientId', {
      is: (clientId) => clientId !== SELECT_CLIENT_DEFAULT_VALUE,
      then: yup.string().min(2, 'First name should be of 2 - 50 characters length'),
      otherwise: yup
        .string()
        .min(2, 'First name should be of 2 - 50 characters length')
        .required('First name is required'),
    }),
    lastName: yup.string().when('clientId', {
      is: (clientId) => clientId !== SELECT_CLIENT_DEFAULT_VALUE,
      then: yup.string().min(2, 'Last name should be of 2 - 50 characters length'),
      otherwise: yup
        .string()
        .min(2, 'Last name should be of 2 - 50 characters length')
        .required('Last name is required'),
    }),
    company: yup.string().when('clientId', {
      is: (clientId) => clientId !== SELECT_CLIENT_DEFAULT_VALUE,
      then: yup.string().min(2, 'Company should be of 2 - 50 characters length'),
      otherwise: yup.string().min(2, 'Company should be of 2 - 50 characters length').required(),
    }),
    role: yup.string().when('clientId', {
      is: (clientId) => clientId !== SELECT_CLIENT_DEFAULT_VALUE,
      then: yup.string().min(2, 'Role should be of 2 - 50 characters length'),
      otherwise: yup.string().min(2, 'Role should be of 2 - 50 characters length').required('Role is required'),
    }),
    name: yup.string().min(2, 'Name should be of 2 - 50 characters length').required('Name is required'),
    description: yup
      .string()
      .min(2, 'Description should be of 2 - 50 characters length')
      .required('Description is required'),
    budget: yup.number().nullable(),
    startDate: yup.date().nullable(),
    endDate: yup.date().nullable(),
    documentUrl: yup.string().nullable(),
  },
  [
    ['firstName', 'clientId'],
    ['clientId', 'firstName'],
    ['clientId', 'lastName'],
    ['clientId', 'company'],
    ['clientId', 'role'],
  ]
)

export const FormRadioButtonLabel = ({ label, value, disabled }) => (
  <FormRadioButtonLabelStyles
    control={<Radio />}
    label={<FormTextLabelStyles styles={{ fontSize: '1.2rem', lineHeight: '1rem' }}>{label}</FormTextLabelStyles>}
    value={value}
    disabled={disabled}
  />
)

export const FormSelect = ({ clients, defaultValue, disabled, id, name, value, onChangeHandler, error }) => (
  <FormSelectStyles disabled={disabled} id={id} name={name} value={value} onChange={onChangeHandler} error={error}>
    <MenuItem disabled value={defaultValue}>
      <em>{defaultValue}</em>
    </MenuItem>
    {clients.map((item) => (
      <MenuItem key={uniqid()} value={item.id}>
        <em>
          {item.lastName}, {item.firstName} | {item.company}
        </em>
      </MenuItem>
    ))}
  </FormSelectStyles>
)

export const FormTextLabel = ({ styles, children }) => {
  return <FormTextLabelStyles styles={styles}>{children}</FormTextLabelStyles>
}

export const FormTextInput = ({ disabled, placeholder, id, name, value, onChangeHandler, error, styles }) => (
  <FormInputStyles
    hiddenLabel
    disabled={disabled}
    placeholder={placeholder}
    id={id}
    name={name}
    value={value}
    onChange={onChangeHandler}
    error={error}
    styles={styles}
  />
)

export const FormInputError = ({ children, styles }) => (
  <FormInputErrorStyles styles={styles}>{children}</FormInputErrorStyles>
)

export const FormDatePicker = ({ id, name, value, onChangeHandler, error, styles }) => (
  <FormDatePickerStyles
    type="date"
    id={id}
    name={name}
    value={value}
    onChange={onChangeHandler}
    error={error}
    styles={styles}
  />
)

export const FormButton = ({ variant, type, styles, children }) => (
  <FormButtonStyles variant={variant} type={type} styles={styles}>
    {children}
  </FormButtonStyles>
)

const FormSelectStyles = styled(Select)`
  height: 56px;
`

const FormRadioButtonLabelStyles = styled(FormControlLabel)`
  font-size: 1.4rem;
`

const FormTextLabelStyles = styled.div`
  height: 16px;
  font-size: ${({ styles }) => (styles ? styles.fontSize : '1.1rem')};
  font-weight: ${({ styles }) => (styles ? styles.fontWeight : '0')};
  line-height: ${({ styles }) => (styles ? styles.lineHeight : '0rem')};
  color: ${({ styles }) => (styles ? styles.color : '#333')};
`

const FormInputStyles = styled(TextField)`
  width: ${({ styles }) => (styles ? styles.width : '310px')};
  height: 56px;
  margin: ${({ styles }) => (styles ? styles.margin : '8px 0px')};
  font-size: 1rem;
`

const FormInputErrorStyles = styled.div`
  height: 16px;
  padding: ${({ styles }) => (styles ? styles.padding : '0px')};
  font-size: 0.9rem;
  color: ${({ styles }) => (styles ? styles.color : '#ff0000')};
`

const FormDatePickerStyles = styled(TextField)`
  height: ${({ styles }) => (styles ? styles.height : '56px')};
  margin: ${({ styles }) => (styles ? styles.margin : '8px 0px')};
  font-size: 1rem;
`

const FormButtonStyles = styled(Button)`
  width: ${({ styles }) => (styles ? styles.width : '180px')};
  height: ${({ styles }) => (styles ? styles.height : '48px')};
`
