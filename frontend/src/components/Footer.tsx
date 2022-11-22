import React from 'react'
import StyledFooter from './styled/Footer'
import { BsGithub } from 'react-icons/bs'

const Footer = () => {
  return (
    <StyledFooter>
            <a href="https://github.com/mwozniak1161/HabbitTracker" target="_blank" rel="noreferrer"><BsGithub size="32px"/><p>Go to Github</p></a>
    </StyledFooter>
  )
}

export default Footer