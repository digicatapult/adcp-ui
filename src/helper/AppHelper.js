export const categories = [
  { name: '1' },
  { name: '2' },
  { name: '3' },
  { name: '4' },
  { name: '5' },
  { name: '6' },
  { name: '7' },
  { name: '8' },
  { name: '9' },
  { name: '10' },
]

export const serviceColumns = [{ field: 'id', headerName: 'Id', width: 10 }]

export const serviceRows = [
  { id: 1, name: 'Service A' },
  { id: 2, name: 'Service B' },
  { id: 3, name: 'Service C' },
  { id: 4, name: 'Service D' },
  { id: 5, name: 'Service E' },
  { id: 6, name: 'Service F' },
  { id: 7, name: 'Service G' },
  { id: 8, name: 'Service H' },
  { id: 9, name: 'Service I' },
  { id: 10, name: 'Service J' },
]

export const getServiceRowsWithIndex = () => {
  return serviceRows.map(({ id, name }, index) => {
    return { id, name, index }
  })
}

export const serviceConnColumns = [
  { field: 'id', headerName: 'Id', width: 10 },
  { field: 'to', headerName: 'To', width: 30 },
  { field: 'from', headerName: 'From', width: 30 },
]

export const toServicesValid = (id, destId) => {
  console.log('toServicesValid id, destId', id, destId)

  const result = toServices.find(({ serviceId, toService }) => serviceId === id && toService === destId)
  console.log('toServicesValid result', result)

  return result
}

export const incompatibilityMatrix = [
  { serviceId: 1, commServiceId: 2, direction: 'TO', status: 'Unsupported' },
  { serviceId: 1, commServiceId: 10, direction: 'TO', status: 'Unsupported' },
  { serviceId: 3, commServiceId: 5, direction: 'TO', status: 'Unsupported' },
  { serviceId: 5, commServiceId: 2, direction: 'TO', status: 'Unsupported' },
  { serviceId: 7, commServiceId: 1, direction: 'TO', status: 'Unsupported' },
  { serviceId: 9, commServiceId: 2, direction: 'TO', status: 'Unsupported' },
  { serviceId: 2, commServiceId: 1, direction: 'FROM', status: 'Unsupported' },
  { serviceId: 5, commServiceId: 3, direction: 'FROM', status: 'Unsupported' },
  { serviceId: 2, commServiceId: 5, direction: 'FROM', status: 'Unsupported' },
  { serviceId: 1, commServiceId: 7, direction: 'FROM', status: 'Unsupported' },
  { serviceId: 2, commServiceId: 9, direction: 'FROM', status: 'Unsupported' },
]

export const toServices = [
  { serviceId: 1, toService: 2 },
  { serviceId: 1, toService: 10 },
  { serviceId: 3, toService: 5 },
  { serviceId: 5, toService: 2 },
  { serviceId: 7, toService: 1 },
  { serviceId: 9, toService: 2 },
]

export const fromServices = [
  { serviceId: 2, fromService: 1 },
  { serviceId: 5, fromService: 3 },
  { serviceId: 2, fromService: 5 },
  { serviceId: 1, fromService: 7 },
  { serviceId: 2, fromService: 9 },
]

export const createSolutionTemplate = ({ id, service, toServices, fromServices }) => {
  return {
    id,
    configuration: {
      environment: service.environment,
      network: service.network,
    },
    toServices,
    fromServices,
  }
}

export const solutionTemplateRows = []
