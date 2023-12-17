import { Event } from "@/types";
import useGlobalContext from "@/context/GlobalContext";
import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
// import { useEffect, useState } from "react";

export default function Day({
  day,
  rowIdx,
  monthIdx,
}: {
  day: Dayjs;
  rowIdx: number;
  monthIdx: number;
}) {
  const [dayEvent, setDayEvent] = useState<null | Event>(null);
  const { allEvents, setDaySelected, setShowEventModal, setSelectedEvent } =
    useGlobalContext();

  // this useEffect will update event on this particular day
  useEffect(() => {
    const events: Event | null = allEvents.find(
      (evt: Event) =>
        dayjs(evt.day).format("DD-MM-YY") === day.format("DD-MM-YY")
    );
    setDayEvent(events);
  }, [allEvents, day]);

  // extra styling if this day is current day
  function getCurrentDayClass() {
    return day.format("DD-MM-YY") === dayjs().format("DD-MM-YY")
      ? "bg-blue-600 text-white rounded-full w-7"
      : "";
  }
  return (
    <div className="border border-gray-200 flex flex-col h-[70px] sm:h-[100px]">
      <div
        className="flex-1 cursor-pointer"
        onClick={() => {
          // this will open modal to add event
          if (day.month() !== monthIdx) return;
          setDaySelected(day);
          setShowEventModal(true);
        }}
      >
        <header className="flex flex-col items-center">
          {/*if first row Calendar then we need to show days like monday, tuesday etc */}
          {rowIdx === 0 && (
            <p className="text-xs sm:text-sm mt-1 font-semibold">
              {day.format("ddd").toUpperCase()}
            </p>
          )}

          {/* this to display date */}
          {day.month() === monthIdx && (
            <p
              className={`text-xs sm:text-sm p-1 my-1 text-center  ${getCurrentDayClass()}`}
            >
              {day.format("DD")}
            </p>
          )}
        </header>

        {/* if some event is already there on this day */}
        {dayEvent && (
          <div
            onClick={() => setSelectedEvent(dayEvent)}
            className={`bg-blue-200 p-1 mr-3 text-gray-600 text-sm rounded mb-1 truncate`}
          >
            {dayEvent.title}
          </div>
        )}
      </div>
    </div>
  );
}
