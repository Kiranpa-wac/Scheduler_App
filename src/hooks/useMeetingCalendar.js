import React from 'react'

const useMeetingCalendar = ({ refresh, addMeeting, updateMeeting, deleteMeeting }) => {
    const handleRefresh = () => {
        refresh();
      };
    
      const handleAddEvent = async (newEvent) => {
        try {
          await addMeeting(newEvent, roomId, meetings);
        } catch (err) {
          console.error("Error adding event:", err);
        }
      };
    
      const handleUpdateEvent = async (updatedEvent) => {
        try {
          await updateMeeting(updatedEvent, meetings);
        } catch (err) {
          console.error("Error updating event:", err);
        }
      };
    
      const handleDelete = async () => {
        if (!selectedEvent) return;
        const eventId = selectedEvent.id;
        if (!eventId) {
          console.error("Event ID is missing:", selectedEvent);
          return;
        }
        try {
          await deleteMeeting(eventId, meetings);
        } catch (err) {
          console.error("Error deleting event:", err);
        }
      };
    
  return {handleRefresh, handleAddEvent, handleDelete, handleUpdateEvent}
}

export default useMeetingCalendar
