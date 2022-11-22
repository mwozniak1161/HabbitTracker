import React, { useEffect } from "react";
import CardHeaderStyled from "../components/styled/CardHeader";
import HabbitItem from "../components/HabbitItem";
import { Card } from "../components/styled/Card";
import { HabbitList, NoHabbitsStyled } from "../components/styled/Habbit";
import { Page } from "../components/styled/Pages";
import { useAddTodayMutation, useGetUserQuery } from "../features/api/apiSlice";
import {day, habbit} from "../types"
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Today = () => {
  const {data, isSuccess} = useGetUserQuery({})
  const [addToday] = useAddTodayMutation({})

  const today = data?.days.find((i:day)=> {return i.date === new Date(Date.now()).toLocaleDateString("pl-PL")})
  const [listRef] = useAutoAnimate<HTMLUListElement>()

  useEffect(() => {
    if(isSuccess && (!data.days.some((i:day)=>i.date === new Date(Date.now()).toLocaleDateString("pl-PL")))){
      addToday({})
    }
  }, [isSuccess]);

  useEffect(() => {
    if(data && today && ( today?.habbits.some((habbit:habbit)=>habbit.done===true )) && !today?.habbits.some((habbit:habbit)=>habbit.done===false)){
      toast.success('Done all for today!')
    }
  }, [data])
  

  return (
    <Page>
    <Card>
        <CardHeaderStyled text="Habbits to do:" bgColor="red" />
        <HabbitList ref={listRef}>
          {data && today?.habbits
          .map((habbit: habbit)=>{
            if(!habbit?.done && !habbit?.ended){
              return <HabbitItem type="todo" habbit={habbit} key={habbit._id}/>
            }
          }
          )}
            { data && !today?.habbits.some((habbit:habbit)=>habbit.done===false) && <NoHabbitsStyled/>}
        
        </HabbitList>
      </Card>

      <Card>
        <CardHeaderStyled text="Habbits done:" bgColor="green" />

        <HabbitList ref={listRef}>
          {data && today?.habbits.map((habbit: habbit)=>{
            if(habbit?.done && !habbit?.ended){
              return <HabbitItem type="done" habbit={habbit} key={habbit._id}/>
            }
          })}
            { data && !today?.habbits.some((habbit:habbit)=>habbit.done===true) && <NoHabbitsStyled/>}
        </HabbitList>
      </Card>
          <ToastContainer/>
    </Page>
  );
};

export default Today;
