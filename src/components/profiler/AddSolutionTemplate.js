import React, { useEffect, useState } from 'react'
import styled from '@emotion/styled'
import uniqid from 'uniqid'
// import PropTypes from 'prop-types'

import { Typography, FormControl, MenuItem, AccordionDetails } from '@mui/material'
import { incompatibilityMatrix } from '../../helper/AppHelper'
import SubNavigation from '../SubNavigation'
import { getRegistrationSubNavigation } from '../../util/AppUtil'
import { FormSelect, ServiceAccordion, ServiceAccordionSummary, Text, SimpleButton } from '../../util/ComponentUtil'

const AddSolutionTemplate = () => {
  const subNavList = getRegistrationSubNavigation()

  const [expanded] = useState('panel0')
  // TODO replace with profiler API get projects to obtain these selected services...
  const [selectedServices, setSelectedServices] = useState([
    {
      id: 1,
      index: 0,
      name: 'Service A',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 2,
      index: 1,
      name: 'Service B',

      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 3,
      index: 2,
      name: 'Service C',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 4,
      index: 3,
      name: 'Service D',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 5,
      index: 4,
      name: 'Service E',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 6,
      index: 5,
      name: 'Service F',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 7,
      index: 6,
      name: 'Service G',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 8,
      index: 7,
      name: 'Service H',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 9,
      index: 8,
      name: 'Service I',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
    {
      id: 10,
      index: 8,
      name: 'Service J',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
  ])

  useEffect(() => {}, [expanded, selectedServices])

  console.log('RENDER selectedServices', selectedServices)

  const commServiceExcludes = (service, direction) => {
    const solutionServiceIncludes = service.solutionServices.reduce((acc, item) => {
      console.log('**** commServicesAllowed item', item)
      console.log('**** commServicesAllowed service.id, item.serviceId', service.id, item.serviceId)
      console.log('**** commServicesAllowed direction, item.direction', direction, item.direction)

      if (service.id !== item.serviceId && item.serviceId && item.direction && item.direction === direction) {
        acc.push(item.serviceId)
      }
      return acc
    }, [])

    console.log('**** commServicesAllowed solutionServiceIncludes', solutionServiceIncludes)

    return solutionServiceIncludes
  }

  const directionHandler = (e, serviceId, solutionServiceIndex) => {
    const direction = e.target.value

    // find selected service
    const selectedService = selectedServices.find((item) => {
      if (item.id === serviceId) return item
    })
    console.log('directionHandler selectedService', selectedService)

    let selectedSolutionServicesUpdate = []

    // find selected service's solution templates by index to update with direction...
    selectedSolutionServicesUpdate = selectedService.solutionServices.filter((item) => {
      if (item.index === solutionServiceIndex) {
        item.direction = direction

        console.log('directionHandler item', item)

        // TODO this function call should return solution services already excluded
        //  if no solution services have been excluded, then it's a first run and should return all except selectedService.id
        const commServices = commServiceExcludes(selectedService, direction)
        console.log('****  **** directionHandler commServices', commServices)

        // TODO cleanup...
        item.commServices =
          commServices && commServices.length > 0
            ? selectedServices.reduce((acc, item3) => {
                if (serviceId !== item3.id && !commServices.includes(item3.id)) {
                  acc.push({ id: item3.id, name: item3.name, index: item3.index })
                }

                return acc
              }, [])
            : selectedServices.reduce((acc, item3) => {
                if (serviceId !== item3.id) {
                  acc.push({ id: item3.id, name: item3.name, index: item3.index })
                }

                return acc
              }, [])
      }
      return item
    })
    console.log('directionHandler selectedSolutionServicesUpdate', selectedSolutionServicesUpdate)

    selectedService.solutionServices = selectedSolutionServicesUpdate

    const commServices = commServiceExcludes(selectedService, direction)
    console.log('****  **** ****  **** directionHandler commServices', commServices)

    // update state
    const selectedServicesUpdate = selectedServices.filter((item) => {
      if (item.id === selectedService.id) {
        item = selectedService
      }

      return item
    })

    setSelectedServices(selectedServicesUpdate)
  }

  const solutionServiceHandler = (e, service, solutionServiceIndex) => {
    const { value: solutionServiceId } = e.target

    const serviceByIdLookup = selectedServices.find((item) => item.id === solutionServiceId)

    const solutionServicesUpdate = service.solutionServices.map((item) => {
      if (item.index === solutionServiceIndex) {
        item.serviceId = solutionServiceId
        item.serviceName = serviceByIdLookup.name

        const matrixResult = incompatibilityMatrix.find((matrixItem) => {
          if (
            matrixItem.serviceId === service.id &&
            matrixItem.commServiceId === solutionServiceId &&
            item.direction === matrixItem.direction
          ) {
            return matrixItem
          }
        })

        if (matrixResult) {
          item.status = matrixResult.status
        } else {
          item.status = 'Supported'
        }
      }

      return item
    })
    // console.log('solutionServicesUpdate', solutionServicesUpdate)

    const selectedServicesUpdate = selectedServices.map((item) => {
      if (item.id === service.id) {
        item.solutionServices = solutionServicesUpdate
      }

      return item
    })
    // console.log('selectedServicesUpdate', selectedServicesUpdate)

    setSelectedServices(selectedServicesUpdate)

    // console.log('incompatibilityMatrix', incompatibilityMatrix)
  }

  const addRowHandler = (e) => {
    // console.log('addRowHandler e.target.name', e.target.name)
    // console.log('addRowHandler e.target.value', e.target.value)

    const { name } = e.target

    if (name === '0') {
      console.log('ADD ONLY')

      const selectedService = selectedServices.find((item) => {
        if (item.index === parseInt(name, 10)) {
          return item
        }
      })
      // console.log('addRowHandler selectedService', selectedService)

      const solutionServicesUpdated = selectedService.solutionServices.concat([
        {
          index: selectedService.solutionServices.length,
          direction: null,
          serviceId: null,
          serviceName: '',
          status: '',
          commServices: [],
        },
      ])
      // console.log('addRowHandler solutionServicesUpdated', solutionServicesUpdated)

      selectedService.solutionServices = solutionServicesUpdated

      const selectedServicesUpdated = selectedServices.map((item) => {
        if (item.index === selectedService.index) {
          item.solutionServices = solutionServicesUpdated
        }

        return item
      })
      // console.log('addRowHandler selectedServicesUpdated', selectedServicesUpdated)

      setSelectedServices(selectedServicesUpdated)
    } else {
      console.log('ADD OR REMOVE')
    }
  }

  const removeRowHandler = (e) => {
    // console.log('removeRowHandler e.target.name', e.target.name)
    // console.log('removeRowHandler e.target.value', e.target.value)

    const { name: selectedServiceIndex, value: solutionServiceIndex } = e.target

    if (solutionServiceIndex !== '0') {
      console.log('REMOVE ONLY')

      const selectedService = selectedServices.find((item) => {
        if (item.index === parseInt(selectedServiceIndex, 10)) {
          return item
        }
      })
      // console.log('addRowHandler selectedService', selectedService)

      const solutionServicesUpdated = selectedService.solutionServices.filter((item) => {
        if (item.index !== solutionServiceIndex) {
          return item
        }
      })
      // console.log('addRowHandler solutionServicesUpdated', solutionServicesUpdated)

      selectedService.solutionServices = solutionServicesUpdated

      const selectedServicesUpdated = selectedServices.map((item) => {
        if (item.id === selectedService.id) {
          item = solutionServicesUpdated
        }

        return item
      })

      setSelectedServices(selectedServicesUpdated)
    } else {
      console.log('REMOVE EQUAL TO 1')
    }
  }

  console.log('selectedServices', selectedServices)

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Content>
        {selectedServices.map((selectedService) => (
          <ServiceAccordion key={uniqid()} expanded={true}>
            <ServiceAccordionSummary
              aria-controls={`panel-${selectedService.index}`}
              id={`panel-${selectedService.index}`}
            >
              <Typography>{selectedService.name}</Typography>
            </ServiceAccordionSummary>
            <AccordionDetails>
              {selectedService.solutionServices.map((solutionService) => (
                <ServiceDependencyRowWrapper key={uniqid()}>
                  <ServiceDirectionColumn>
                    <FormControl>
                      <FormSelect
                        onChangeHandler={(event) => directionHandler(event, selectedService.id, solutionService.index)}
                        defaultValue="Select Direction"
                        value={solutionService.direction || 'Select Direction'}
                      >
                        <MenuItem value="Select Direction">
                          <em>Select Direction</em>
                        </MenuItem>
                        <MenuItem value="TO">
                          <em>To</em>
                        </MenuItem>
                        <MenuItem value="FROM">
                          <em>From</em>
                        </MenuItem>
                      </FormSelect>
                    </FormControl>
                  </ServiceDirectionColumn>
                  <ServiceDependencyColumn>
                    <FormControl>
                      <FormSelect
                        // name={`commService-${solutionService.index}`}
                        onChangeHandler={(event) =>
                          solutionServiceHandler(event, selectedService, solutionService.index)
                        }
                        defaultValue="Select Comm Service"
                        // value="Select Comm Service"
                        value={solutionService.serviceId || 'Select Comm Service'}
                        // disabled={!solutionService.serviceId}
                      >
                        <MenuItem value="Select Comm Service">
                          <em>Select Comm Service</em>
                        </MenuItem>
                        {solutionService.commServices.map((item) => (
                          <MenuItem key={uniqid()} value={item.id}>
                            <em>{item.name}</em>
                          </MenuItem>
                        ))}
                      </FormSelect>
                    </FormControl>
                  </ServiceDependencyColumn>
                  <Text
                    styles={{
                      padding: '16px',
                      fontSize: '0.9rem',
                      color: solutionService.status === 'Supported' ? '#008000' : '#ff0000',
                    }}
                  >
                    {solutionService.status}
                  </Text>
                  <ServiceDependencyRowControl>
                    <SimpleButton
                      variant="contained"
                      type="button"
                      name={selectedService.index}
                      value={solutionService.index}
                      onClickHandler={addRowHandler}
                      disabled={!solutionService.serviceId}
                      styles={{ width: '150px', height: '32px' }}
                    >
                      Add Row
                    </SimpleButton>
                    {solutionService.index > 0 && (
                      <SimpleButton
                        variant="contained"
                        type="button"
                        name={selectedService.index}
                        value={solutionService.index}
                        onClickHandler={removeRowHandler}
                        styles={{ width: '150px', height: '32px' }}
                      >
                        Remove Row
                      </SimpleButton>
                    )}
                  </ServiceDependencyRowControl>
                </ServiceDependencyRowWrapper>
              ))}
            </AccordionDetails>
          </ServiceAccordion>
        ))}
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

const Content = styled.div`
  grid-area: main;
  display: grid;
  justify-content: center;
  padding: 64px;
`

const ServiceDependencyRowWrapper = styled.div`
  grid-area: service-dependency-wrapper;
  display: grid;
  grid-template-columns: 200px 250px 100px auto;
  grid-column-gap: 32px;
  grid-template-areas: 'service-direction-column service-dependency-column service-status-column service-dependency-row-control';
  height: 84px;
`

const ServiceDirectionColumn = styled.div`
  grid-area: service-direction-column;
  display: grid;
`

const ServiceDependencyColumn = styled.div`
  grid-area: service-dependency-column;
  display: grid;
`

const ServiceDependencyRowControl = styled.div`
  grid-area: service-dependency-row-control;
  display: grid;
  grid-template-columns: 180px 180px;
`

export default AddSolutionTemplate
