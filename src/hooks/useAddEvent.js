// useAddEvent.js
import { useState } from "react";
import { toast } from "react-toastify";
import useEventValidation from "./useEventValidation";
import { useAtom } from "jotai";
import { userAtom } from "../atom";

const useAddEvent = (prefillData, onClose, onSubmit, existingEvents = [], roomId) => {
  const [user] = useAtom(userAtom);

  const [title, setTitle] = useState("");
  const [organiser, setOrganiser] = useState(user ? user.displayName : "");
  const [project, setProject] = useState("");
  const [startDate, setStartDate] = useState(prefillData?.startDate || "");
  const [startTime, setStartTime] = useState(prefillData?.startTime || "");
  const [endDate, setEndDate] = useState(prefillData?.endDate || "");
  const [endTime, setEndTime] = useState(prefillData?.endTime || "");

  const todayMin = new Date().toISOString().split("T")[0];

  const fields = { title, organiser, project, startDate, startTime, endDate, endTime };
  const { errors, validate, setErrors } = useEventValidation({ fields, existingEvents });

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (validationErrors.overlap) {
      toast.error(validationErrors.overlap);
      return;
    }
    if (validationErrors.duration) {
      toast.error(validationErrors.duration);
      return;
    }
    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    const newEvent = {
      title,
      organiser,
      project,
      start: new Date(`${startDate}T${startTime}`),
      end: new Date(`${endDate}T${endTime}`),
      createdBy: user ? user.uid : null,
      createdByName: user ? user.displayName : organiser,
    };

    onSubmit(newEvent);

    setTitle("");
    setOrganiser(user ? user.displayName : "");
    setProject("");
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setErrors({});
    onClose();
  };

  return {
    title,
    setTitle,
    organiser,
    setOrganiser,
    project,
    setProject,
    startDate,
    setStartDate,
    startTime,
    setStartTime,
    endDate,
    setEndDate,
    endTime,
    setEndTime,
    todayMin,
    errors,
    handleSubmit,
  };
};

export default useAddEvent;
