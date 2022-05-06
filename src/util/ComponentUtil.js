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

export const validationSchema = yup.object({
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
  role: yup.string('Enter your role').min(2, 'Role should be of 2 - 50 characters length').required('Role is required'),
  name: yup.string('Enter your name').min(2, 'Name should be of 2 - 50 characters length').required('Name is required'),
})

export const FormRadioButtonLabel = ({ label, value }) => (
  <FormRadioButtonLabelStyles control={<FormRadioButtonStyles />} label={label} value={value} />
)

export const FormSelect = ({ clients, defaultValue, disabled, id, name, value, onChangeHandler, error }) => (
  <FormSelectStyles
    displayEmpty
    disabled={disabled}
    id={id}
    name={name}
    value={value}
    onChange={onChangeHandler}
    error={error}
  >
    <MenuItem disabled value={defaultValue}>
      <em>{defaultValue}</em>
    </MenuItem>
    {clients.map((item) => (
      <MenuItem key={uniqid()} value={item.id}>
        <em>
          {item.lastName}, {item.firstName} - {item.company}
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
    placeholder="dd/mm/yyyy"
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

const FormRadioButtonStyles = styled(Radio)`
  font-size: 40px;
`

const FormRadioButtonLabelStyles = styled(FormControlLabel)`
  font-size: 40px;
`

const FormTextLabelStyles = styled.div`
  height: 16px;
  font-size: ${({ styles }) => (styles ? styles.fontSize : '1.1rem')};
  font-weight: ${({ styles }) => (styles ? styles.fontWeight : '0')};
  color: ${({ styles }) => (styles ? styles.color : '#333')};
`

const FormInputStyles = styled(TextField)`
  width: ${({ styles }) => (styles ? styles.width : '300px')};
  height: 56px;
  margin: ${({ styles }) => (styles ? styles.margin : '8px 0px')};
  font-size: 1rem;
`

const FormInputErrorStyles = styled.div`
  height: 16px;
  padding: ${({ styles }) => (styles ? styles.padding : '0px')};
  font-size: 0.9rem;
  color: #ff0000;
`

const FormDatePickerStyles = styled(TextField)`
  height: ${({ styles }) => (styles ? styles.height : '56px')};
  margin: ${({ styles }) => (styles ? styles.margin : '8px 0px')};
  font-size: 1rem;
  color: #000;
`

const FormButtonStyles = styled(Button)`
  width: ${({ styles }) => (styles ? styles.width : '180px')};
  height: ${({ styles }) => (styles ? styles.height : '48px')};
`
