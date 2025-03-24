import React from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Users, DoorOpen } from "lucide-react";
import LogoutButton from "./LogoutButton";

const Rooms = () => {
  const navigate = useNavigate();

  const rooms = [
    {
      id: 1,
      name: "Conference Room",
      capacity: 12,
      features: "Video conferencing",
    },
    { id: 2, name: "Meeting Room", capacity: 8, features: "Whiteboard" },
    { id: 3, name: "Boardroom", capacity: 20, features: "Presentation setup" },
  ];

  const handleRoomClick = (roomId) => {
    navigate(`/calendar?roomId=${roomId}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header with logout button on the right */}
      <div className="mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Meeting Rooms</h1>
          <p className="text-gray-600 mt-2">
            Select a room to view availability and schedule meetings
          </p>
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rooms.map((room) => (
          <div
            key={room.id}
            onClick={() => handleRoomClick(room.id)}
            className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer border border-gray-100"
          >
            <div className="h-32 bg-gradient-to-r from-blue-400 to-blue-600 relative">
              <div className="absolute top-4 left-4 bg-white/90 rounded-lg px-3 py-1.5 text-sm font-medium text-blue-800">
                Room {room.id}
              </div>
              <DoorOpen className="absolute bottom-4 right-4 text-white/70 h-8 w-8" />
            </div>

            {/* Room details */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-gray-800">{room.name}</h3>
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>Capacity: {room.capacity} people</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{room.features}</span>
                </div>
              </div>
              <button
                className="mt-5 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 font-medium py-2 rounded-lg transition-colors duration-200 flex items-center justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRoomClick(room.id);
                }}
              >
                <Calendar className="h-4 w-4 mr-2" />
                View Calendar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Rooms;
