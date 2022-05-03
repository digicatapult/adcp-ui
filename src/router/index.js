import React from 'react'
import { Route, Routes } from 'react-router-dom'

import Registration from '../components/registration/Registration'
import RegisterService from '../components/registration/register-service/RegisterService'
import Catalogue from '../components/catalogue/Catalogue'
import Profiler from '../components/profiler/Profiler'
import Orchestrator from '../components/orchestrator/Orchestrator'
import {
  CATALOGUE_URI,
  HOME_URI,
  ORCHESTRATOR_URI,
  PROFILER_URI,
  REGISTRATION_SERVICE_ADD_URI,
  REGISTRATION_URI,
} from '../util/AppUtil'

const Routing = () => {
  return (
    <Routes>
      <Route path={HOME_URI} element={<Registration />} />
      <Route path={REGISTRATION_URI} element={<Registration />} />
      <Route path={REGISTRATION_SERVICE_ADD_URI} element={<RegisterService />} />
      <Route path={CATALOGUE_URI} element={<Catalogue />} />
      <Route path={PROFILER_URI} element={<Profiler />} />
      <Route path={ORCHESTRATOR_URI} element={<Orchestrator />} />
    </Routes>
  )
}

export default Routing
