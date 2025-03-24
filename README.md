# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

<!-- <Container className="mt-4">
      <h2 className="mb-4">Meeting Scheduler</h2>
      <MeetingCalendar />
    </Container> -->

   client id = 555374145314-6ot6l97bnjjegib9g8gb70n62o6q4kc0.apps.googleusercontent.com


// import React, { useState, useCallback } from "react";
// import useSWR, { mutate } from "swr";
// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import AddEventModal from "./AddEventModal";
// import EventDetailModal from "./EventDetailModal";
// import EditEventModal from "./EditEventModal";
// import { useSearchParams } from "react-router-dom";
// import { Plus, RefreshCw, Loader, AlertCircle } from "lucide-react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./calendar-custom.css";

// const localizer = momentLocalizer(moment);

// const fetcher = async (url) => {
//   const res = await fetch(url);
//   if (!res.ok) {
//     throw new Error("Error fetching meetings");
//   }
//   const data = await res.json();
//   if (!data || data.length === 0) {
//     throw new Error("No meetings found. Please add new data.");
//   }
//   return data;
// };



// const MeetingCalendar = () => {
//   const [modalOpen, setModalOpen] = useState(false);
//   const [view, setView] = useState("month");
//   const [currentDate, setCurrentDate] = useState(new Date());
//   const onView = useCallback((newView) => setView(newView), []);
//   const onNavigate = useCallback((newDate) => setCurrentDate(newDate), []);

//   const [searchParams] = useSearchParams();
//   const roomId = searchParams.get("roomId");

//   const endpoint = roomId
//     ? `http://localhost:5000/api/meetings/room/${roomId}`
//     : "http://localhost:5000/api/meetings";

//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [showEventDetails, setShowEventDetails] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [addEventPrefill, setAddEventPrefill] = useState(null);

//   // Default meetings to empty array in case of error or no data.
//   const { data: meetings = [], error, isValidating } = useSWR(endpoint, fetcher);

//   const handleRefresh = () => {
//     setIsRefreshing(true);
//     mutate(endpoint).then(() => {
//       setTimeout(() => setIsRefreshing(false), 500);
//     });
//   };

//   const handleAddEvent = async (newEvent) => {
//     try {
//       mutate(
//         endpoint,
//         async (currentData) => {
//           const postEndpoint = roomId
//             ? `http://localhost:5000/api/meetings/room/${roomId}`
//             : "http://localhost:5000/api/meetings";

//           const response = await fetch(postEndpoint, {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify(newEvent),
//           });
//           if (!response.ok) throw new Error("Failed to add event");
//           const createdEvent = await response.json();
//           return [...currentData, createdEvent];
//         },
//         {
//           optimisticData: [...(meetings || []), newEvent],
//           rollbackOnError: true,
//         }
//       );
//       setAddEventPrefill(null);
//     } catch (err) {
//       console.error("Error adding event:", err);
//     }
//   };

//   const handleUpdateEvent = async (updatedEvent) => {
//     try {
//       mutate(
//         endpoint,
//         async (currentData) => {
//           const response = await fetch(
//             `http://localhost:5000/api/meetings/${updatedEvent.id}`,
//             {
//               method: "PUT",
//               headers: { "Content-Type": "application/json" },
//               body: JSON.stringify(updatedEvent),
//             }
//           );
//           if (!response.ok) throw new Error("Failed to update event");
//           const updatedEventData = await response.json();
//           return currentData.map((event) =>
//             event._id === updatedEvent.id ? updatedEventData : event
//           );
//         },
//         {
//           optimisticData: meetings.map((event) =>
//             event._id === updatedEvent.id ? updatedEvent : event
//           ),
//           rollbackOnError: true,
//         }
//       );
//       setShowEditModal(false);
//     } catch (err) {
//       console.error("Error updating event:", err);
//     }
//   };

//   const handleDelete = async () => {
//     if (!selectedEvent) return;
//     const eventId = selectedEvent.id;
//     if (!eventId) {
//       console.error("Event ID is missing:", selectedEvent);
//       return;
//     }
//     try {
//       mutate(
//         endpoint,
//         async (currentData) => {
//           const response = await fetch(
//             `http://localhost:5000/api/meetings/${eventId}`,
//             { method: "DELETE" }
//           );
//           if (!response.ok) {
//             const errorData = await response.text();
//             console.error("Backend error:", errorData);
//             throw new Error("Failed to delete event");
//           }
//           return currentData.filter((event) => event._id !== eventId);
//         },
//         {
//           optimisticData: meetings.filter((event) => event._id !== eventId),
//           rollbackOnError: true,
//         }
//       );
//       setShowEventDetails(false);
//     } catch (err) {
//       console.error("Error deleting event:", err);
//     }
//   };

//   const handleCloseEventDetailModal = () => {
//     setShowEventDetails(false);
//     setSelectedEvent(null);
//   };

//   // Ensure meetings is an array
//   const events = meetings.map((meeting) => ({
//     ...meeting,
//     id: meeting._id,
//     title: meeting.title,
//     organiser: meeting.organiser,
//     project: meeting.project,
//     start: new Date(meeting.start),
//     end: new Date(meeting.end),
//   }));

//   const eventPropGetter = (event) => {
//     const getColorFromString = (str) => {
//       let hash = 0;
//       for (let i = 0; i < str.length; i++) {
//         hash = str.charCodeAt(i) + ((hash << 5) - hash);
//       }
//       const hue = hash % 360;
//       return `hsl(${hue}, 70%, 65%)`;
//     };

//     const backgroundColor = getColorFromString(event.project);
//     const borderColor = getColorFromString(event.project);

//     return {
//       style: {
//         backgroundColor,
//         borderColor,
//         borderRadius: "4px",
//         opacity: 0.9,
//         color: "#333",
//         border: "0",
//         display: "block",
//         fontWeight: "500",
//       },
//     };
//   };

//   const formats = {
//     eventTimeRangeFormat: () => null,
//   };
//   const roomTitles = {
//     1: "Conference Room",
//     2: "Meeting Room",
//     3: "Boardroom",
//   };

//   return (
//     <div className="flex flex-col bg-white rounded-xl shadow-md overflow-hidden">
//       <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-bold text-gray-800">
//             {roomId
//               ? `${roomTitles[roomId] || "Room " + roomId} Calendar`
//               : "All Meetings"}
//           </h2>
//           <p className="text-sm text-gray-500">
//             {view === "month"
//               ? "Monthly Overview"
//               : view === "week"
//               ? "Weekly Schedule"
//               : view === "day"
//               ? "Daily Agenda"
//               : "Upcoming Meetings"}
//           </p>
//         </div>

//         <div className="flex space-x-3">
//           <button
//             onClick={handleRefresh}
//             className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
//             disabled={isRefreshing}
//           >
//             {isRefreshing ? (
//               <Loader className="h-5 w-5 text-gray-600 animate-spin" />
//             ) : (
//               <RefreshCw className="h-5 w-5 text-gray-600" />
//             )}
//           </button>

//           <button
//             onClick={() => {
//               setAddEventPrefill(null);
//               setModalOpen(true);
//             }}
//             className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
//           >
//             <Plus className="h-4 w-4 mr-1" />
//             Add Event
//           </button>
//         </div>
//       </div>

//       {!meetings.length && !error && (
//         <div className="p-10 flex justify-center items-center">
//           <Loader className="h-8 w-8 text-blue-500 animate-spin" />
//           <span className="ml-3 text-lg text-gray-600">Loading events...</span>
//         </div>
//       )}

//       {error && (
//         <div className="p-6 bg-red-50 flex items-center justify-center">
//           <AlertCircle className="h-6 w-6 text-red-500 mr-2" />
//           <span className="text-red-600">
//             Error loading meetings. Please try again.
//           </span>
//         </div>
//       )}

//       {meetings.length > 0 && !error && (
//         <div className="h-[calc(100vh-12rem)] p-4">
//           <Calendar
//             localizer={localizer}
//             events={events}
//             views={["month", "week", "day", "agenda"]}
//             view={view}
//             defaultView="month"
//             onView={onView}
//             date={currentDate}
//             onNavigate={onNavigate}
//             startAccessor="start"
//             endAccessor="end"
//             formats={formats}
//             eventPropGetter={eventPropGetter}
//             selectable
//             onSelectSlot={(slotInfo) => {
//               const startDate = moment(slotInfo.start)
//                 .local()
//                 .format("YYYY-MM-DD");
//               const startTime = moment(slotInfo.start).local().format("HH:mm");
//               const endDate = moment(slotInfo.end).local().format("YYYY-MM-DD");
//               const endTime = moment(slotInfo.end).local().format("HH:mm");

//               setAddEventPrefill({
//                 startDate,
//                 startTime,
//                 endDate,
//                 endTime,
//               });
//               setModalOpen(true);
//             }}
//             onSelectEvent={(event) => {
//               setSelectedEvent(event);
//               setShowEventDetails(true);
//             }}
//             dayPropGetter={(date) => ({
//               style: {
//                 backgroundColor: moment(date).isSame(moment(), "day")
//                   ? "rgba(59, 130, 246, 0.05)"
//                   : "inherit",
//               },
//             })}
//             popup
//             className="rounded-lg"
//           />
//         </div>
//       )}

//       <AddEventModal
//         key={addEventPrefill ? JSON.stringify(addEventPrefill) : "empty"}
//         open={modalOpen}
//         onClose={() => setModalOpen(false)}
//         onSubmit={handleAddEvent}
//         prefillData={addEventPrefill}
//         roomIdFromUrl={roomId}
//         existingEvents={events} // pass existing events for overlap check
//       />

//       <EventDetailModal
//         open={showEventDetails}
//         onClose={() => {
//           setShowEventDetails(false);
//           setSelectedEvent(null);
//         }}
//         event={selectedEvent}
//         onDelete={handleDelete}
//         onEditClick={() => {
//           setShowEventDetails(false);
//           setShowEditModal(true);
//         }}
//       />
//       <EditEventModal
//         open={showEditModal}
//         onClose={() => setShowEditModal(false)}
//         event={selectedEvent}
//         onUpdate={handleUpdateEvent}
//         existingEvents={events} // pass existing events for overlap check
//       />
//       <ToastContainer />
//     </div>
//   );
// };

// export default MeetingCalendar;
# Scheduler_App
