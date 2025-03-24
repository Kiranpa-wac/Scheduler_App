import React from "react";
import MeetingCalendar from "../Components/MeetingCalendar";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const CalendarPage = () => {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 shadow-sm group"
        >
          <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-[-2px] transition-transform duration-200" />
          <span className="font-medium">Back to Rooms</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <MeetingCalendar />
      </div>
    </div>
  );
};

export default CalendarPage;
