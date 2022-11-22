import React, { FormEventHandler, useState } from "react";
import CardHeaderStyled from "../components/styled/CardHeader";
import HabbitItem from "../components/HabbitItem";
import { Card } from "../components/styled/Card";
import { HabbitList, NoHabbitsStyled } from "../components/styled/Habbit";
import {
  AddFormField,
  AddHabbitForm,
  Submit,
  Input,
} from "../components/styled/HabbitAddForm";
import { Page } from "../components/styled/Pages";
import {
  useAddHabbitMutation,
  useGetUserQuery,
} from "../features/api/apiSlice";
import { habbit } from "../types";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Habbits = () => {
  const { data } = useGetUserQuery({});
  const [addHabbit, addHabbitResult] = useAddHabbitMutation({});

const notify = (msg:string) => toast(msg);

  const handleAddHabbit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      addHabbitName: { value: string };
      addHabbitInfo: { value: string };
    };
    const addHabbitName = target.addHabbitName.value;
    const addHabbitInfo = target.addHabbitInfo.value;
    await addHabbit({ name: addHabbitName, info: addHabbitInfo })
      .unwrap()
      .then((payload) => {
          toast.success(payload.data)
      })
      .catch((error:any) => toast.error(error.data.data));
  };

  const [listRef] = useAutoAnimate<HTMLUListElement>();

  return (
    <Page>
      <Card>
        <CardHeaderStyled text="Add new" bgColor="gray" />
        <AddHabbitForm onSubmit={handleAddHabbit}>
          <AddFormField>
            <label htmlFor="addHabbitName">
              <b>Habbit name:</b>
            </label>
            <Input
              type="text"
              name="addHabbitName"
              id="addHabbitName"
              required
            />
          </AddFormField>
          <AddFormField>
            <label htmlFor="addHabbitInfo">
              <b>Habbit info:</b>
            </label>
            <Input
              type="text"
              name="addHabbitInfo"
              id="addHabbitInfo"
              required
            />
          </AddFormField>
          <Submit type="submit" variant="habbit">
            Add new!
          </Submit>
        </AddHabbitForm>
      </Card>

      <Card>
        <CardHeaderStyled text="Habbits list:" bgColor="blue" />

        <HabbitList ref={listRef}>
          {data &&
            data.habbits?.map((habbit: habbit) => {
              if (!habbit?.ended) {
                return (
                  <HabbitItem type="info" habbit={habbit} key={habbit._id} />
                );
              }
            })}
          {data && !data.habbits?.some((habbit: habbit) => !habbit.ended) && (
            <NoHabbitsStyled />
          )}
        </HabbitList>
      </Card>
      <ToastContainer/>
    </Page>
  );
};


export default Habbits;
