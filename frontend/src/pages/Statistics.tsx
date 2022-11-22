import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import CardHeaderStyled from "../components/styled/CardHeader";
import HabbitItem from "../components/HabbitItem";
import { StyledCalendar } from "../components/styled/Calendar";
import { Card, CardTop } from "../components/styled/Card";
import { HabbitList, NoHabbitsStyled } from "../components/styled/Habbit";

import { Page } from "../components/styled/Pages";
import { useGetUserQuery } from "../features/api/apiSlice";
import { day, habbit } from "../types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Statistics = () => {
  const [currentDayDate, setCurrentDayDate] = useState(new Date(Date.now()));
  const { data, isLoading, isFetching, isError } = useGetUserQuery({});
  const currentDay = data?.days.find(
    (i: day) => i.date === currentDayDate.toLocaleDateString("pl-PL")
  );
  const [listRef] = useAutoAnimate<HTMLUListElement>();

  return (
    <Page>
      <StyledCalendar>
        <CardTop bg="#101f27" />
        <Calendar
          onChange={setCurrentDayDate}
          value={currentDayDate}
          locale="en-EN"
        />
      </StyledCalendar>

      {data?.days.some(
        (i: day) => i.date === currentDayDate.toLocaleDateString("pl-PL")
      ) && (
        <>
          <Card>
            <CardHeaderStyled text="Habbits not done:" bgColor="red" />

            <HabbitList ref={listRef}>
              {currentDay?.habbits.map((habbit: habbit) => {
                if (habbit.done === false) {
                  return (
                    <HabbitItem
                      type="notDone"
                      habbit={habbit}
                      key={habbit._id}
                    />
                  );
                }
              })}
              {!currentDay?.habbits.some((habbit: habbit) => {
                return habbit.done === false;
              }) && <NoHabbitsStyled />}
            </HabbitList>
          </Card>

          <Card>
            <CardHeaderStyled text="Habbits done:" bgColor="green" />

            <HabbitList ref={listRef}>
              {currentDay?.habbits.map((habbit: habbit) => {
                if (habbit.done === true) {
                  return (
                    <HabbitItem type="done" habbit={habbit} key={habbit._id} />
                  );
                }
              })}
              {!currentDay?.habbits.some((habbit: habbit) => {
                return habbit.done === true;
              }) && <NoHabbitsStyled />}
            </HabbitList>
          </Card>
        </>
      )}
    </Page>
  );
};

export default Statistics;
