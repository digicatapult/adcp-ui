import React, { useCallback, useRef, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from '@emotion/styled'
import { MdCloudUpload } from 'react-icons/md'
import LoadingButton from '@mui/lab/LoadingButton'
import Button from '@mui/material/Button'

const ReactDropzone = () => {
  const dropzoneRef = useRef()
  const [formReady, setFormReady] = useState(false)
  const [formValidated, setFormValidated] = useState(false)
  const [validServiceFile, setValidServiceFile] = useState(false)
  const [loading, setLoading] = React.useState(false)

  const uploadFile = async (file) => {
    const formData = new FormData()

    formData.append('uploadedTemplate', file)

    // TODO
    //  REACT_APP_REGISTRATION_URL
    //  TOKEN
    await fetch(`${null}`, {
      method: 'POST',
      headers: {
        Authorization: `Token ${null}`,
        'Content-Disposition': `attachment; uploadedTemplate=${file}`,
        'Content-Type': 'application/x-yaml',
      },
      body: formData,
      mode: 'no-cors',
    })
  }

  const onDrop = useCallback(
    (acceptedFiles) => {
      console.log('acceptedFiles', acceptedFiles)

      const file = acceptedFiles[0]
      const filename = file.name
      const fileType = filename.split('.').slice(-1)[0]
      const validFileTypes = ['yml', 'yaml']
      const validateFileType = validFileTypes.includes(fileType)

      console.log('filename', filename)
      console.log('fileType', fileType)
      console.log('validateFileType', validateFileType)
      console.log('validFileTypes.includes(fileType)', validFileTypes.includes(fileType))

      setValidServiceFile(validateFileType)

      if (validateFileType) {
        setFormReady(true)
      } else {
        setFormReady(false)
      }

      setFormValidated(true)

      return uploadFile(file)
    },
    [formReady, formValidated, validServiceFile]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    onDrop,
  })

  const onSubmitHandler = () => {
    setLoading(true)
  }

  const onCancelHandler = () => {
    setValidServiceFile(false)
    setFormValidated(false)
    setFormReady(false)
    setLoading(false)
  }

  console.log('getRootProps()', getRootProps())
  console.log('getInputProps()', getInputProps())
  console.log('isDragActive()', isDragActive)

  console.log('formReady', formReady)
  console.log('validServiceFile', validServiceFile)

  return (
    <Wrapper>
      <DropzoneWrapper ref={dropzoneRef} {...getRootProps()}>
        <DropzoneIcon />
        <DropzoneInput {...getInputProps()} />
        {isDragActive ? <p>Drop the file here ...</p> : <p>Click or drag the yml/yaml file to this area to upload.</p>}
      </DropzoneWrapper>
      {formValidated ? (
        <DropzoneMessage validateFile={validServiceFile}>
          {validServiceFile ? 'Valid Service File' : 'Invalid Service File'}
        </DropzoneMessage>
      ) : (
        <DropzoneMessage />
      )}
      <DropzoneControlWrapper>
        <SubmitButton onClick={onSubmitHandler} disabled={!formReady} loading={loading} variant="outlined">
          Upload
        </SubmitButton>
        <CancelButton onClick={onCancelHandler} variant="outlined">
          Cancel
        </CancelButton>
      </DropzoneControlWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-areas:
    'dropzone-wrapper'
    'dropzone-message'
    'dropzone-control-wrapper';
  grid-template-rows: auto 48px auto;
  width: 600px;
  height: 420px;
`

const DropzoneWrapper = styled.div`
  grid-area: dropzone-wrapper;
  display: grid;
  grid-template-areas:
    'dropzone-icon'
    'dropzone-input';
  justify-content: center;
  padding: 32px 48px 32px 48px;
  background-color: #efebeb;
  border: 1px solid #ccc;
`

const DropzoneInput = styled.input`
  grid-area: dropzone-input;
  justify-content: center;
  border: 1px solid #000;
`

const DropzoneIcon = styled(MdCloudUpload)`
  grid-area: dropzone-icon;
  width: 100%;
  justify-content: center;
  color: #666;
  font-size: 9rem;
`

const DropzoneMessage = styled.div`
  grid-area: dropzone-message;
  color: ${(props) => (props.validateFile ? '#008000' : '#ff0000')};
  padding: 8px 0px;
`

const DropzoneControlWrapper = styled.div`
  grid-area: dropzone-control-wrapper;
  display: grid;
  grid-template-rows: 48px;
  grid-auto-columns: 160px;
  justify-content: space-between;
  grid-template-areas: 'dropzone-submit-button dropzone-cancel-button';
`

const SubmitButton = styled(LoadingButton)`
  grid-area: dropzone-submit-button;
  border: 1px solid #333;
  color: #333;
  &:hover {
    background-color: #ccc;
    border: 1px solid #666;
  }
`

const CancelButton = styled(Button)`
  grid-area: dropzone-cancel-button;
  border: 1px solid #333;
  color: #333;
  &:hover {
    background-color: #ccc;
    border: 1px solid #666;
  }
`

export default ReactDropzone
