import styled from "styled-components";

interface CardBgProps{
    bg?: string
}

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  margin:20px;
  border-radius: 12px;
  box-shadow: 0px 0px 6px 1px #666;
  min-height:100px;
  @media(max-width: 768px){
    margin:10px;
  }
`;

export const CardHeader = styled.h2<CardBgProps>`
    padding:20px 12px;
    color:white;
    text-align: left;
    background: ${props => props.bg};
`
export const CardTop = styled.div<CardBgProps>`
    width:100%;
    height: 12px;
    border-radius: 25px 25px 0 0;
    background: ${props => props.bg};
`