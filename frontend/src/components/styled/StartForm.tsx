import React from "react";
import styled from "styled-components";
import { motion } from 'framer-motion'

export const StartFormStyled = styled.form`
  display: flex;
  flex-direction: column;
  min-width: 320px;
  padding:20px;
  text-align: left;
  input{
    padding:4px;
  }
  label{
    margin-top:16px;
  }
  h2{
    text-align: center;
  }
`;

export const FormInfo = styled.p.attrs( (props: { variant: 'success' | 'warn'}) => props)`
  color: ${props => props.variant==='success' ? '#62F500' : 'red'};
`

export const StartAsGuestFormStyled = styled(StartFormStyled)`
 width: 100%;
`

export const StartFormsWrapper = styled(motion.div).attrs((props:{ref:HTMLDivElement})=> props)`
    display:flex;
    flex-direction: column;
    justify-content: center;
    flex-wrap: wrap;
    @media (min-width:768px){
      flex-direction: row;
    }
`