import { NavLink } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(NavLink)`
  text-decoration: none;
  &.active {
    color: white;
  }`;

export const StyledLinkLast = styled(StyledLink)`
  margin-top: auto;
  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
