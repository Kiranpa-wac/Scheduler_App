import { useState } from "react";

const useEventValidation = ({ fields, existingEvents = [], editingEventId = null }) => {

    const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    const { title, organiser, project, startDate, startTime, endDate, endTime,  } = fields;
    
    if (!title.trim()) newErrors.title = "Event title is required.";
    if (!organiser.trim()) newErrors.organiser = "Organiser is required.";
    if (!project.trim()) newErrors.project = "Project is required.";
    if (!startDate) newErrors.startDate = "Start date is required.";
    if (!startTime) newErrors.startTime = "Start time is required.";
    if (!endDate) newErrors.endDate = "End date is required.";
    if (!endTime) newErrors.endTime = "End time is required.";

    const start = new Date(`${startDate}T${startTime}`);
    const end = new Date(`${endDate}T${endTime}`);
    const now = new Date();
    
    if (start < now) {
      newErrors.startDate = "Cannot schedule an event in the past.";
    }
    if (end <= start) {
      newErrors.endDate = "End time must be after start time.";
    }

    const oneDay = 24 * 60 * 60 * 1000
    if(end - start >= oneDay){
        newErrors.duration = "Event duration cannot exceed 1 day"
    }

    const isOverlapping = existingEvents.some((event) => {
      if (editingEventId && event.id === editingEventId) return false;
      const existingStart = new Date(event.start);
      const existingEnd = new Date(event.end);
     
      return start < existingEnd && end > existingStart;
    });
    if (isOverlapping) newErrors.overlap = "This event overlaps with an existing event.";

    setErrors(newErrors);
    return newErrors;
  };



  return { errors, validate, setErrors };
};

export default useEventValidation;
