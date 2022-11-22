import React, { FC, useEffect, useRef, useState } from "react";
import Habbit, {
  HabbitInfo,
  HabbitList,
  HabbitOption,
  HabbitOptionsStyled,
} from "./styled/Habbit";
import {
  HabbitAdditionalInfo,
  HabbitAdditionalInfoInput,
} from "./styled/HabbitAdditionalInfo";
import { HabbitHeader, HabbitHeaderInput } from "./styled/HabbitHeader";
import { MdMoreHoriz, MdOutlineClose } from "react-icons/md";
import {
  useChangeDefaultHabbitInfoMutation,
  useChangeHabbitNameMutation,
  useChangeTodayHabbitInfoMutation,
  useDeleteHabbitMutation,
} from "../features/api/apiSlice";
import { useClickAway } from "react-use";
import { habbit, HabbitItemProps } from "../types";
import HabbitItemCheckbox from "./HabbitItemCheckbox";
import { toast } from "react-toastify";

const HabbitItem: FC<HabbitItemProps> = ({ type, habbit }) => {
  const [changeDefaultHabbitInfo, changeDefaultHabbitInfoResult] =
    useChangeDefaultHabbitInfoMutation();
  const [changeTodayHabbitInfo, changeTodayHabbitInfoResult] =
    useChangeTodayHabbitInfoMutation();
  const [changeHabbitName, changeHabbitNameResult] =
    useChangeHabbitNameMutation();
  const [deleteHabbit, deleteHabbitResult] = useDeleteHabbitMutation();

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHabbitTitleEdditing, setIsHabbitTitleEdditing] = useState(false);
  const [isHabbitInfoEdditing, setIsHabbitInfoEdditing] = useState(false);
  const [HabbitTitleText, setHabbitTitleText] = useState(habbit?.name);
  const [HabbitInfoText, setHabbitInfoText] = useState(habbit?.info);

  const handleSettingsOpen = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const habbitTitleInputRef = useRef<HTMLInputElement>(null);
  const habbitInfoInputRef = useRef<HTMLInputElement>(null);

  const handleTitleEdit = async () => {
    setIsHabbitTitleEdditing(!isHabbitTitleEdditing);
    if (isHabbitTitleEdditing) {
      await changeHabbitName({
        _id: habbit?._id,
        name: HabbitTitleText,
      }).unwrap().then(payload=>{
          toast.success(payload.data)
        }).catch(err=>{
          toast.error(err.data)
          setHabbitTitleText(habbit?.name)
        });
    }
  };

  const handleInfoEdit = async () => {
    setIsHabbitInfoEdditing(!isHabbitInfoEdditing);
    if (isHabbitInfoEdditing) {
      if (type === "info") {
        await changeDefaultHabbitInfo({
          _id: habbit?._id,
          info: HabbitInfoText,
        }).unwrap().then(payload=>{
          toast.success(payload.data)
        }).catch(err=>{
          toast.error(err.data)
          setHabbitInfoText(habbit?.name)
        });
      } else if (type === "todo") {
        await changeTodayHabbitInfo({
          _id: habbit?._id,
          info: HabbitInfoText,
        }).unwrap().then(payload=>{
          toast.success(payload.data)
        }).catch(err=>{
          toast.error(err.data)
          setHabbitTitleText(habbit?.name)
        });
      }
    }
  };

  const handleEditBlur = (
    e: React.FocusEvent<HTMLInputElement>,
    sectionType: "title" | "info"
  ) => {
    if (sectionType === "title") {
      handleTitleEdit();
    } else if (sectionType === "info") {
      handleInfoEdit();
    }
  };

  const handleEditEnterKey = (
    e: React.KeyboardEvent<HTMLInputElement>,
    sectionType: "title" | "info"
  ) => {
    if (e.key === "Enter") {
      if (sectionType === "title") {
        handleTitleEdit();
      } else if (sectionType === "info") {
        handleInfoEdit();
      }
    }
  };

  const handleHabbitTitleTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHabbitTitleText(e.target.value);
  };
  const handleHabbitInfoTextChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHabbitInfoText(e.target.value);
  };

  const handleDeleteHabbit = async () => {
    await deleteHabbit(habbit?._id).unwrap().then(payload=>{
          toast.success(payload.data)
        });
  };

  useEffect(() => {
    habbitTitleInputRef.current?.focus();
    habbitInfoInputRef.current?.focus();
  }, [isHabbitTitleEdditing, isHabbitInfoEdditing]);

  const ref = useRef<null | HTMLDivElement>(null);
  useClickAway(ref, () => {
    handleSettingsOpen();
  });

  return (
    <Habbit>
      <HabbitItemCheckbox type={type} habbit={habbit} />
      <HabbitInfo>
        {!isHabbitTitleEdditing && <HabbitHeader>{habbit?.name}</HabbitHeader>}
        {isHabbitTitleEdditing && (
          <HabbitHeaderInput
            value={HabbitTitleText}
            onChange={handleHabbitTitleTextChange}
            ref={habbitTitleInputRef}
            onBlur={(e) => {
              handleEditBlur(e, "title");
            }}
            onKeyDown={(e) => {
              handleEditEnterKey(e, "title");
            }}
          />
        )}

        {!isHabbitInfoEdditing && (
          <HabbitAdditionalInfo>{habbit?.info}</HabbitAdditionalInfo>
        )}

        {isHabbitInfoEdditing && (
          <HabbitAdditionalInfoInput
            value={HabbitInfoText}
            onChange={handleHabbitInfoTextChange}
            ref={habbitInfoInputRef}
            onBlur={(e) => {
              handleEditBlur(e, "info");
            }}
            onKeyDown={(e) => {
              handleEditEnterKey(e, "info");
            }}
          />
        )}
      </HabbitInfo>

      <span
        onClick={handleSettingsOpen}
        style={{ cursor: "pointer", position: "relative" }}
      >
        {isSettingsOpen && (
          <HabbitOptionsStyled ref={ref}>
            <HabbitOption>
              <MdOutlineClose onClick={handleSettingsOpen} />
            </HabbitOption>
            {type === "info" && (
              <>
                <HabbitOption onClick={handleTitleEdit}>
                  Edit habbit title
                </HabbitOption>
                <HabbitOption onClick={handleInfoEdit}>
                  Edit habbit default info
                </HabbitOption>
                <HabbitOption onClick={handleDeleteHabbit}>
                  Delete habbit
                </HabbitOption>
              </>
            )}
            {type === "todo" && (
              <HabbitOption onClick={handleInfoEdit}>
                Edit habbit today info
              </HabbitOption>
            )}
          </HabbitOptionsStyled>
        )}
        <MdMoreHoriz fontSize="32px" />
      </span>
    </Habbit>
  );
};

export default HabbitItem;
