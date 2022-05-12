import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RegistrationWrapper from '../components/registration/RegistrationWrapper'
import CatalogueWrapper from '../components/catalogue/CatalogueWrapper'
import Profiler from '../components/profiler/Profiler'
import AddProject from '../components/profiler/AddProject'
import OrchestratorWrapper from '../components/orchestrator/OrchestratorWrapper'
import {
  CATALOGUE_URI,
  HOME_URI,
  ORCHESTRATOR_URI,
  PROFILER_CLIENT_ADD_URI,
  PROFILER_PROJECT_ADD_URI,
  PROFILER_URI,
  REGISTRATION_URI,
} from '../util/AppUtil'
import AddClient from '../components/profiler/AddClient'

const Routing = () => {
  return (
    <Routes>
      <Route path={HOME_URI} element={<RegistrationWrapper />} />
      <Route path={REGISTRATION_URI} element={<RegistrationWrapper />} />
      <Route path={CATALOGUE_URI} element={<CatalogueWrapper />} />
      <Route path={PROFILER_URI} element={<Profiler />} />
      <Route path={PROFILER_CLIENT_ADD_URI} element={<AddClient />} />
      <Route path={PROFILER_PROJECT_ADD_URI} element={<AddProject />} />
      <Route path={ORCHESTRATOR_URI} element={<OrchestratorWrapper />} />
    </Routes>
  )
}

export default Routing
