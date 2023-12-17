/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useReducer, useContext } from "react";
import dayjs, { Dayjs } from "dayjs";
import { Event } from "../types";

type ContextType = {
  daySelected: null | Dayjs;
  setDaySelected: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  showEventModal: boolean;
  setShowEventModal: React.Dispatch<React.SetStateAction<boolean>>;
  dispatchCalEvent: ({ type, payload }) => void;
  allEvents: Event[];
  selectedEvent: null | Event;
  setSelectedEvent: React.Dispatch<React.SetStateAction<Event>>;
};

const GlobalContext = React.createContext<ContextType>({
  daySelected: null,
  setDaySelected: (day) => {},
  showEventModal: false,
  setShowEventModal: (val) => {},
  dispatchCalEvent: ({ type, payload }) => {},
  allEvents: [],
  selectedEvent: null,
  setSelectedEvent: (event: Event) => {},
});

function savedEventsReducer(state, { type, payload }) {
  switch (type) {
    case "push":
      return [...state, payload];
    case "update":
      return state.map((evt) => (evt.id === payload.id ? payload : evt));
    case "delete":
      return state.filter((evt) => evt.id !== payload.id);
    default:
      throw new Error();
  }
}
function initEvents() {
  const storageEvents = localStorage.getItem("savedEvents");
  const parsedEvents = storageEvents ? JSON.parse(storageEvents) : [];
  return parsedEvents;
}

export function ContextWrapper(props) {
  const [daySelected, setDaySelected] = useState(dayjs());
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<null | Event>(null);
  const [savedEvents, dispatchCalEvent] = useReducer(
    savedEventsReducer,
    [],
    initEvents
  );

  useEffect(() => {
    localStorage.setItem("savedEvents", JSON.stringify(savedEvents));
  }, [savedEvents]);

  useEffect(() => {
    if (!showEventModal) {
      setSelectedEvent(null);
    }
  }, [showEventModal]);

  return (
    <GlobalContext.Provider
      value={{
        daySelected,
        setDaySelected,
        showEventModal,
        setShowEventModal,
        dispatchCalEvent,
        selectedEvent,
        setSelectedEvent,
        allEvents: savedEvents,
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
}

const useGlobalContext = () => useContext(GlobalContext);
export default useGlobalContext;
