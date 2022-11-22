import React, { FC } from "react";
import styled from "styled-components";
import { useDoneHabbitMutation } from "../features/api/apiSlice";
import { habbit, HabbitItemProps } from "../types";
import { toast } from "react-toastify";

const HabbitItemCheckbox: FC<HabbitItemProps> = ({ type, habbit }) => {
  const [doneHabbit, addDoneHabbit] = useDoneHabbitMutation({});

  return (
    <>
      {type === "todo" && (
        <input
          type="checkbox"
          onChange={() => {
            doneHabbit(habbit?._id).unwrap().then(payload => toast.success(payload.data));
          }}
          style={{ cursor: "pointer" }}
        />
      )}
      {type === "done" && <input type="checkbox" disabled checked />}
      {type === "notDone" && <input type="checkbox" disabled />}
      {type === "info" && <input type="checkbox" style={{ visibility:"hidden" }} />}
    </>
  );
};

export default HabbitItemCheckbox;
