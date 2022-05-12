import React from 'react'
import styled from '@emotion/styled'

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
  grid-template-rows: 80px auto;
  grid-template-areas:
    'header'
    'main-wrapper';
  font-size: 1rem;
  font-family: 'Lato', sans-serif;
  height: 100%;
`

export default App
