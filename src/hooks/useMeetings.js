// src/hooks/useMeetings.js
import useSWR, { mutate } from "swr";

const defaultFetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("Error fetching meetings");
  }
  const data = await res.json();
  if (!data || data.length === 0) {
    throw new Error("No meetings found. Please add new data.");
  }
  return data || [];
};

export const useMeetings = (endpoint, fetcher = defaultFetcher) => {
  const { data, error, isValidating } = useSWR(endpoint, fetcher);

  const refresh = () => {
    mutate(endpoint);
  };

  const addMeeting = async (newMeeting, roomId, currentData) => {
    const postEndpoint = roomId
      ? `https://scheduler-app-backend-1.onrender.com/api/meetings/room/${roomId}`
      : "https://scheduler-app-backend-1.onrender.com/api/meetings";
    await mutate(
      endpoint,
      async (currentData) => {
        const response = await fetch(postEndpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMeeting),
        });
        if (!response.ok) throw new Error("Failed to add event");
        const createdMeeting = await response.json();
        return [...currentData, createdMeeting];
      },
      {
        optimisticData: [...(currentData || []), newMeeting],
        rollbackOnError: true,
      }
    );
  };

  const updateMeeting = async (updatedMeeting, currentData) => {
    await mutate(
      endpoint,
      async (currentData) => {
        const response = await fetch(
          `https://scheduler-app-backend-1.onrender.com/api/meetings/${updatedMeeting.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedMeeting),
          }
        );
        if (!response.ok) throw new Error("Failed to update event");
        const updatedMeetingData = await response.json();
        return currentData.map((meeting) =>
          meeting._id === updatedMeeting.id ? updatedMeetingData : meeting
        );
      },
      {
        optimisticData: currentData.map((meeting) =>
          meeting._id === updatedMeeting.id ? updatedMeeting : meeting
        ),
        rollbackOnError: true,
      }
    );
  };

  const deleteMeeting = async (meetingId, currentData) => {
    await mutate(
      endpoint,
      async (currentData) => {
        const response = await fetch(
          `https://scheduler-app-backend-1.onrender.com/api/meetings/${meetingId}`,
          { method: "DELETE" }
        );
        if (!response.ok) throw new Error("Failed to delete event");
        return currentData.filter((meeting) => meeting._id !== meetingId);
      },
      {
        optimisticData: currentData.filter((meeting) => meeting._id !== meetingId),
        rollbackOnError: true,
      }
    );
  };

  return {
    meetings: data || [],
    error,
    isValidating,
    refresh,
    addMeeting,
    updateMeeting,
    deleteMeeting,
  };
};
