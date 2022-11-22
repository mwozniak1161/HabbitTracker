import styled from "styled-components";
import { motion } from 'framer-motion'

export const WelcomeStyled = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap:12px;
    margin-top:12vh;
`


export const WelcomeTryHeader = styled(motion.h1)`
    margin-top: 16vh;
`