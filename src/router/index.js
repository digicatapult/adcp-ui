import React from 'react'
import { Route, Routes } from 'react-router-dom'

import RegistrationWrapper from '../components/RegistrationWrapper'
import CatalogueWrapper from '../components/CatalogueWrapper'
import ProfilerWrapper from '../components/ProfilerWrapper'
import OrchestratorWrapper from '../components/OrchestratorWrapper'
import { CATALOGUE_URI, HOME_URI, ORCHESTRATOR_URI, PROFILER_URI, REGISTRATION_URI } from '../util/AppUtil'

const Routing = () => {
  return (
    <Routes>
      <Route path={HOME_URI} element={<RegistrationWrapper />} />
      <Route path={REGISTRATION_URI} element={<RegistrationWrapper />} />
      <Route path={CATALOGUE_URI} element={<CatalogueWrapper />} />
      <Route path={PROFILER_URI} element={<ProfilerWrapper />} />
      <Route path={ORCHESTRATOR_URI} element={<OrchestratorWrapper />} />
    </Routes>
  )
}

export default Routing
