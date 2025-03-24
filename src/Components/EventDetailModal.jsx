import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { Edit3, Trash2 } from "lucide-react";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useAtom } from "jotai";
import { userAtom } from "../atom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/ui/card";

const EventDetailsModal = ({ open, onClose, event, onEditClick, onDelete }) => {
  if (!open || !event) return null;
  const [user] = useAtom(userAtom);
  const isCreator = user && event.createdBy === user.uid;

  return (
    <Dialog open={open} onOpenChange={(value) => !value && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white p-0 rounded-xl shadow-xl border-0">
        <VisuallyHidden>
          <DialogTitle>Event Details</DialogTitle>
          <DialogDescription>Details for the selected event.</DialogDescription>
        </VisuallyHidden>
        <Card className="border-0 shadow-none">
          <CardHeader className="bg-blue-50 rounded-t-xl pb-4 pt-6 mt-3">
            <CardTitle className="text-2xl font-bold text-blue-800">
              Event Details
            </CardTitle>
            <CardDescription className="text-blue-600">
              Details for the selected event
            </CardDescription>
          </CardHeader>
          <CardContent className="px-6 pt-4 space-y-4">
            <p>
              <strong>Organiser:</strong> {event?.organiser}
            </p>
            <p>
              <strong>Project:</strong> {event?.project}
            </p>
            <p>
              <strong>Start:</strong> {new Date(event?.start).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(event?.end).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500">
              Created by: {event.createdByName || event.organiser}
            </p>
          </CardContent>
          {isCreator && (
            <CardFooter className="flex justify-end space-x-3 pt-2 pb-6 px-6 bg-gray-50 rounded-b-xl">
              <Button
                variant="outline"
                onClick={onEditClick}
                className="inline-flex items-center"
              >
                <Edit3 className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <Button
                variant="destructive"
                onClick={() => onDelete()}
                className="inline-flex items-center bg-red-500"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </CardFooter>
          )}
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default EventDetailsModal;
