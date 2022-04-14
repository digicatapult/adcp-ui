import React from 'react'
import styled from 'styled-components'

import Header from './components/Header'
import Routing from './router'

function App() {
  return (
    <Wrapper>
      <Header />
      <Routing />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto;
  grid-template-areas:
    'header'
    'main-wrapper';
  height: 100%;
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
`

export default App
