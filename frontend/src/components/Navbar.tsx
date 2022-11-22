import React, { FC } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  MdOutlineListAlt,
  MdOutlineChecklistRtl,
  MdOutlineInsertChartOutlined,
  MdLogout,
} from "react-icons/md";
import { colors } from "./styled/Colors";
import { useLogoutUserMutation } from "../features/api/apiSlice";
import { StyledLink, StyledLinkLast } from "./styled/Links";

interface NavbarProps {
  className?: string;
}

const NavbarList = styled.ul`
  list-style-type: none;
  display: flex;
  height: calc(100%);
  justify-content: space-around;
  align-items: center;
  @media (min-width: 768px) {
    justify-content: flex-start;
    align-items: flex-start;
    height: calc(100% - 40px);
    flex-direction: column;
    margin: 20px 0;
  }
`;

const NavbarListItem = styled.li`
  gap: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  @media (min-width: 768px) {
    padding: 20px;
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const NavbarListItemText = styled.h4`
  font-size: 1.1rem;
  @media (max-width: 768px) {
    font-weight: 400;
    font-size: 1rem;
  }
`;

const Navbar: FC<NavbarProps> = ({ className }) => {
  const [logoutUser, logoutUserResult] = useLogoutUserMutation();

  return (
    <nav className={className}>
      <NavbarList>
        <StyledLink to="/app/today">
          <NavbarListItem>
            <MdOutlineChecklistRtl fontSize={"22px"} />

            <NavbarListItemText>Today</NavbarListItemText>
          </NavbarListItem>
        </StyledLink>

        <StyledLink to="/app/habbits">
          <NavbarListItem>
            <MdOutlineListAlt fontSize={"22px"} />
            <NavbarListItemText>Habbits</NavbarListItemText>
          </NavbarListItem>
        </StyledLink>

        <StyledLink to="/app/statistics">
          <NavbarListItem>
            <MdOutlineInsertChartOutlined fontSize={"22px"} />
            <NavbarListItemText>Calendar</NavbarListItemText>
          </NavbarListItem>
        </StyledLink>

        <StyledLinkLast
          to="/start"
          onClick={() => {
            logoutUser({});
          }}
        >
          <NavbarListItem>
            <MdLogout fontSize={"22px"} />
            <NavbarListItemText>Logout</NavbarListItemText>
          </NavbarListItem>
        </StyledLinkLast>
      </NavbarList>
    </nav>
  );
};

const StyledNavbar = styled(Navbar)`
  background: ${colors.gray.dark};
  color: white;
  position: fixed;
  bottom: 0px;
  left: 0px;
  height: 10vh;
  width: 100vw;
  z-index: 3;
  @media (min-width: 768px) {
    min-width: 16vw;
    width: 16vw;
    top: 0px;
    left: 0px;
    height: 100vh;
    min-height:100vh;
    position: sticky;
  }
`;

export default StyledNavbar;
