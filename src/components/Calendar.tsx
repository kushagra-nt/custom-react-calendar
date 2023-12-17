import dayjs from "dayjs";
import { useEffect, useRef } from "react";
import Month from "./Month";
import { getMonth } from "@/utils";

export default function Calendar() {
  const currentMonthIndex = dayjs().month();
  const currentYear = dayjs().year();

  // will use this ref to scroll to current month on initial loading
  const currentMonthRef = useRef(null);

  useEffect(() => {
    // Use the ref to scroll to the focused month
    if (currentMonthRef.current) {
      currentMonthRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="flex flex-col gap-y-10 px-2 sm:mx-10 m-auto w-full sm:w-[90%] md:w-[80%]">
      {/* previous 6 months */}
      {Array.from({ length: 6 }, (_, index) => {
        let monthIdx = currentMonthIndex - 6 + index;
        let yearIdx = currentYear;
        if (monthIdx < 0) {
          monthIdx = 11 - monthIdx;
          yearIdx = yearIdx - 1;
        }
        return (
          <Month
            month={getMonth(monthIdx)}
            monthIndex={monthIdx}
            year={yearIdx}
          />
        );
      })}

      {/* current month */}
      <div ref={currentMonthRef}>
        <Month
          month={getMonth()}
          monthIndex={currentMonthIndex}
          year={currentYear}
        />
      </div>

      {/* next 6 months */}
      {Array.from({ length: 6 }, (_, index) => {
        let monthIdx = currentMonthIndex + index + 1;
        let yearIdx = currentYear;
        if (monthIdx > 11) {
          monthIdx = monthIdx - 12;
          yearIdx = yearIdx + 1;
        }
        return (
          <Month
            month={getMonth(monthIdx)}
            monthIndex={monthIdx}
            year={yearIdx}
          />
        );
      })}
    </div>
  );
}
