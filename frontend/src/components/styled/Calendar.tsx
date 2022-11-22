import styled from "styled-components";

export const StyledCalendar = styled.div`
display: flex;
flex-direction: column;
width: min-content;
border-radius: 12px;
box-shadow: 0px 0px 6px 1px #666;
margin:10px;
zoom:200%;
width:auto;
@media(max-width: 768px){
  margin:5px auto;
  zoom:100%;
  width: calc(100% - 20px);
}
`