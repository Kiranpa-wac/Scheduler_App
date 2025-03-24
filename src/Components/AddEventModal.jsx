import React from "react";
import useAddEvent from "../hooks/useAddEvent";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,  
  CardFooter,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Calendar, Clock, Users, Briefcase } from "lucide-react";

const AddEventModal = ({
  open,
  onClose,
  onSubmit,
  prefillData,
  existingEvents = [],
}) => {
  const {
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
  } = useAddEvent(prefillData, onClose, onSubmit, existingEvents);

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white p-0 rounded-xl shadow-xl border-0">
        <DialogHeader>
          <VisuallyHidden>
            <DialogTitle>Add Event</DialogTitle>
            <DialogDescription>Modal for adding a new event.</DialogDescription>
          </VisuallyHidden>
        </DialogHeader>
        <Card className="border-0 shadow-none">
          <CardHeader className="bg-blue-50 rounded-t-xl pb-4 pt-6 mt-3">
            <CardTitle className="text-2xl font-bold text-blue-800">New Event</CardTitle>
            <CardDescription className="text-blue-600">
              Schedule a new meeting or event on your calendar.
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-5 pt-6">
              {/* Event Title */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="title" className="text-sm font-medium text-gray-700">
                  Event Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="border border-gray-300 rounded-md px-2 py-1 w-full"
                />
                {errors.title && <span className="text-red-500 text-xs">{errors.title}</span>}
              </div>
              {/* Organiser */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="organiser" className="text-sm font-medium text-gray-700">
                  Organiser
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Users className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="organiser"
                    type="text"
                    placeholder="Enter Organiser Name"
                    value={organiser}
                    onChange={(e) => setOrganiser(e.target.value)}
                    className="border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 w-full"
                    disabled={true} // disabled if a user is logged in
                  />
                </div>
                {errors.organiser && <span className="text-red-500 text-xs">{errors.organiser}</span>}
              </div>
              {/* Project */}
              <div className="flex flex-col space-y-2">
                <label htmlFor="project" className="text-sm font-medium text-gray-700">
                  Project
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Briefcase className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="project"
                    type="text"
                    placeholder="Enter Project"
                    value={project}
                    onChange={(e) => setProject(e.target.value)}
                    className="border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 w-full"
                  />
                </div>
                {errors.project && <span className="text-red-500 text-xs">{errors.project}</span>}
              </div>
              {/* Date & Time */}
              <div className="pt-2 pb-1">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                  Date & Time
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      required
                      min={todayMin}
                      className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                    />
                    {errors.startDate && <span className="text-red-500 text-xs">{errors.startDate}</span>}
                  </div>
                  <div className="relative">
                    <input
                      id="startTime"
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                    />
                    {errors.startTime && <span className="text-red-500 text-xs">{errors.startTime}</span>}
                  </div>
                  <div className="relative">
                    <input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      required
                      min={todayMin}
                      className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                    />
                    {errors.endDate && <span className="text-red-500 text-xs">{errors.endDate}</span>}
                  </div>
                  <div className="relative">
                    <input
                      id="endTime"
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="border border-gray-300 rounded-lg px-2 py-1 w-full"
                    />
                    {errors.endTime && <span className="text-red-500 text-xs">{errors.endTime}</span>}
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-3 pt-2 pb-6">
              <Button type="submit" className="bg-blue-600 text-white px-5 py-2 rounded">
                Add Event
              </Button>
              <Button type="button" onClick={onClose} className="border px-5 py-2">
                Cancel
              </Button>
            </CardFooter>
          </form>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AddEventModal;
