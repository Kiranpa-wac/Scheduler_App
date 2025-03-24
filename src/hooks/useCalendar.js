import { useState, useCallback } from "react";

export const useCalendar = () => {
  const [view, setView] = useState("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const onView = useCallback((newView) => {
    setView(newView);
  }, []);

  const onNavigate = useCallback((newDate) => {
    setCurrentDate(newDate);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showEventDetails, setShowEventDetails] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [addEventPrefill, setAddEventPrefill] = useState(null);

  const openAddEventModal = (prefillData = null) => {
    setAddEventPrefill(prefillData);
    setModalOpen(true);
  };

  const closeAddEventModal = () => {
    setModalOpen(false);
    setAddEventPrefill(null);
  };

  const openEventDetails = (event) => {
    setSelectedEvent(event);
    setShowEventDetails(true);
  };

  const closeEventDetails = () => {
    setShowEventDetails(false);
    setSelectedEvent(null);
  };

  const openEditModal = () => {
    setShowEventDetails(false);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  return {
    view,
    currentDate,
    onView,
    onNavigate,
    modalOpen,
    selectedEvent,
    showEventDetails,
    showEditModal,
    addEventPrefill,
    openAddEventModal,
    closeAddEventModal,
    openEventDetails,
    closeEventDetails,
    openEditModal,
    closeEditModal,
  };
};
