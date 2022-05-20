import React, { useState } from 'react'
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

  // const [expanded] = useState('panel0')
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
      index: 9,
      name: 'Service J',
      solutionServices: [{ index: 0, direction: null, serviceId: null, serviceName: '', status: '', commServices: [] }],
    },
  ])
  const [expanded, setExpanded] = useState(false)

  // useEffect(() => {}, [selectedServices, expanded])

  console.log('RENDER selectedServices', selectedServices)

  const commServiceExcludes = (service, direction) => {
    const solutionServiceIncludes = service.solutionServices.reduce((acc, item) => {
      if (service.id !== item.serviceId && item.serviceId && item.direction && item.direction === direction) {
        acc.push(item.serviceId)
      }
      return acc
    }, [])

    return solutionServiceIncludes
  }

  // need to reduce instead of filter wip...
  const resetServiceComms = (selectedService, solutionServiceId) => {
    const selectedServiceSolutionSerivcesUpdated = selectedService.solutionServices.filter((solutionService) => {
      if (solutionService.serviceId !== solutionServiceId) {
        solutionService.commServices = serviceCommsFilter(selectedService, '')

        return solutionService
      }
    })

    selectedService.solutionServices = selectedServiceSolutionSerivcesUpdated

    const selectedServicesUpdated = selectedServices.filter((item) => {
      if (item.id === selectedService.id) {
        item = selectedService
      }

      return item
    })

    setSelectedServices(selectedServicesUpdated)
  }

  const serviceCommsFilter = (selectedService, direction) => {
    const commServices = commServiceExcludes(selectedService, direction)

    return selectedServices.reduce((acc, item) => {
      if (
        (commServices.length > 0 && !commServices.includes(item.id) && selectedService.id !== item.id) ||
        (selectedService.id !== item.id && !commServices.includes(item.id))
      ) {
        acc.push({ id: item.id, name: item.name, index: item.index })
      }

      return acc
    }, [])
  }

  const directionHandler = (e, serviceId, solutionServiceIndex) => {
    const direction = e.target.value

    // find selected service
    const selectedService = selectedServices.find((item) => {
      if (item.id === serviceId) return item
    })

    let selectedSolutionServicesUpdate = []

    // find selected service's solution templates by index to update with direction...
    selectedSolutionServicesUpdate = selectedService.solutionServices.filter((item) => {
      if (item.index === solutionServiceIndex) {
        item.direction = direction
        item.commServices = serviceCommsFilter(selectedService, direction)
      }
      return item
    })

    selectedService.solutionServices = selectedSolutionServicesUpdate

    // const commServices = commServiceExcludes(selectedService, direction)
    // console.log('****  **** ****  **** directionHandler commServices', commServices)

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

    const selectedServicesUpdate = selectedServices.map((item) => {
      if (item.id === service.id) {
        item.solutionServices = solutionServicesUpdate
      }

      return item
    })

    setSelectedServices(selectedServicesUpdate)
  }

  const addRowHandler = (e, selectedServiceIndex) => {
    const selectedService = selectedServices.find((item) => {
      if (item.index === selectedServiceIndex) {
        return item
      }
    })

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

    selectedService.solutionServices = solutionServicesUpdated

    const selectedServicesUpdated = selectedServices.map((item) => {
      if (item.index === selectedServiceIndex) {
        item.solutionServices = solutionServicesUpdated
      }

      return item
    })

    setSelectedServices(selectedServicesUpdated)
  }

  const removeRowHandler = (e, selectedService, solutionServiceId) => {
    resetServiceComms(selectedService, solutionServiceId)
  }

  const accordionPanelOnChangeHandler = (panel) => (e, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  console.log('selectedServices', selectedServices)

  return (
    <Wrapper>
      <SubNavigation subNavList={subNavList} />
      <Content>
        {selectedServices.map((selectedService, index) => (
          <ServiceAccordion
            key={uniqid()}
            id={`panel${index}`}
            expanded={expanded === `panel${index}`}
            onChangeHandler={accordionPanelOnChangeHandler(`panel${index}`)}
          >
            <ServiceAccordionSummary aria-controls={`panel-${selectedService.index}`}>
              <Typography>{selectedService.name}</Typography>
            </ServiceAccordionSummary>
            <AccordionDetails>
              {selectedService.solutionServices?.map((solutionService, solutionServiceIndex) => (
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
                        onChangeHandler={(event) =>
                          solutionServiceHandler(event, selectedService, solutionService.index)
                        }
                        defaultValue="Select Comm Service"
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
                      onClickHandler={(e) => addRowHandler(e, selectedService.index, solutionService.index)}
                      disabled={!solutionService.serviceId}
                      styles={{ width: '150px', height: '32px' }}
                    >
                      Add Row
                    </SimpleButton>
                    <SimpleButton
                      variant="contained"
                      type="button"
                      onClickHandler={(e) => removeRowHandler(e, selectedService, solutionService.serviceId)}
                      disabled={solutionServiceIndex === 0}
                      styles={{ width: '150px', height: '32px' }}
                    >
                      Remove Row
                    </SimpleButton>
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
