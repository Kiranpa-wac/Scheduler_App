import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import AddEventModal from "./AddEventModal";
import EventDetailModal from "./EventDetailModal";
import EditEventModal from "./EditEventModal";
import { useSearchParams } from "react-router-dom";
import { Plus, RefreshCw, Loader, AlertCircle } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./calendar-custom.css";
import { useMeetings } from "../hooks/useMeetings";
import { useCalendar } from "../hooks/useCalendar";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import useMeetingCalendar from "../hooks/useMeetingCalendar";

const localizer = momentLocalizer(moment);

const MeetingCalendar = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [user] = useAtom(userAtom);
  const endpoint = roomId
    ? `https://scheduler-app-backend-1.onrender.com/api/meetings/room/${roomId}`
    : "https://scheduler-app-backend-1.onrender.com/api/meetings";

  const {
    meetings,
    error,
    isValidating,
    refresh,
    addMeeting,
    updateMeeting,
    deleteMeeting,
  } = useMeetings(endpoint);

  const {
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
  } = useCalendar();
  const { handleAddEvent, handleDelete, handleRefresh, handleUpdateEvent } =
    useMeetingCalendar({ refresh, addMeeting, updateMeeting, deleteMeeting, roomId, meetings, selectedEvent });

  const events = meetings.map((meeting) => ({
    ...meeting,
    id: meeting._id,
    title: meeting.title,
    organiser: meeting.organiser,
    project: meeting.project,
    start: new Date(meeting.start),
    end: new Date(meeting.end),
    createdBy: user ? user.uid : null,
    createdByName: user ? user.displayName : organiser,
  }));

  const eventPropGetter = (event) => {
    const getColorFromString = (str) => {
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
      }
      const hue = hash % 360;
      return `hsl(${hue}, 70%, 65%)`;
    };

    const backgroundColor = getColorFromString(event.project);
    const borderColor = getColorFromString(event.project);

    return {
      style: {
        backgroundColor,
        borderColor,
        borderRadius: "4px",
        opacity: 0.9,
        color: "#333",
        border: "0",
        display: "block",
        fontWeight: "500",
      },
    };
  };

  const formats = {
    eventTimeRangeFormat: () => null,
  };

  const roomTitles = {
    1: "Conference Room",
    2: "Meeting Room",
    3: "Boardroom",
  };

  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
      <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {roomId
              ? `${roomTitles[roomId] || "Room " + roomId} Calendar`
              : "All Meetings"}
          </h2>
          <p className="text-sm text-gray-500">
            {view === "month"
              ? "Monthly Overview"
              : view === "week"
              ? "Weekly Schedule"
              : view === "day"
              ? "Daily Agenda"
              : "Upcoming Meetings"}
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          >
            <RefreshCw className="h-5 w-5 text-gray-600" />
          </button>
          <button
            onClick={() => openAddEventModal(null)}
            className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Event
          </button>
        </div>
      </div>

      {isValidating && (
        <div className="p-10 flex justify-center items-center">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-3 text-lg text-gray-600">Loading events...</span>
        </div>
      )}

      {error && (
        <div className="p-6 bg-red-50 flex items-center justify-center">
          <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
          <span className="text-red-600">{error.message}</span>
        </div>
      )}

      {!isValidating && !error && meetings.length > 0 && (
        <div className="h-[calc(100vh-12rem)] p-4">
          <Calendar
            localizer={localizer}
            events={events}
            views={["month", "week", "day", "agenda"]}
            view={view}
            defaultView="month"
            onView={onView}
            date={currentDate}
            onNavigate={onNavigate}
            startAccessor="start"
            endAccessor="end"
            formats={formats}
            eventPropGetter={eventPropGetter}
            selectable
            onSelectSlot={(slotInfo) => {
              const startDate = moment(slotInfo.start)
                .local()
                .format("YYYY-MM-DD");
              const startTime = moment(slotInfo.start).local().format("HH:mm");
              const endDate = moment(slotInfo.end).local().format("YYYY-MM-DD");
              const endTime = moment(slotInfo.end).local().format("HH:mm");
              openAddEventModal({ startDate, startTime, endDate, endTime });
            }}
            onSelectEvent={(event) => openEventDetails(event)}
            dayPropGetter={(date) => ({
              style: {
                backgroundColor: moment(date).isSame(moment(), "day")
                  ? "rgba(59, 130, 246, 0.05)"
                  : "inherit",
              },
            })}
            popup
            className="rounded-lg"
          />
        </div>
      )}
      <AddEventModal
        key={addEventPrefill ? JSON.stringify(addEventPrefill) : "empty"}
        open={modalOpen}
        onClose={closeAddEventModal}
        onSubmit={handleAddEvent}
        prefillData={addEventPrefill}
        roomIdFromUrl={roomId}
        existingEvents={events}
      />
      <EventDetailModal
        open={showEventDetails}
        onClose={closeEventDetails}
        event={selectedEvent}
        onDelete={handleDelete}
        onEditClick={openEditModal}
      />
      <EditEventModal
        open={showEditModal}
        onClose={closeEditModal}
        event={selectedEvent}
        onUpdate={handleUpdateEvent}
        existingEvents={events}
      />
      <ToastContainer />
    </div>
  );
};

export default MeetingCalendar;
