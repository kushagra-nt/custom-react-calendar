import React from "react";
import Day from "./Day";
import { type Dayjs } from "dayjs";

const MonthLabel = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function Month({
  month,
  monthIndex,
  year,
}: {
  month: Dayjs[][];
  monthIndex: number;
  year: number;
}) {
  return (
    <div>
      {/* month label */}
      <h1 className="text-lg font-semibold text-center mb-3">{`${MonthLabel[monthIndex]} ${year}`}</h1>

      {/* 7*5 table for month */}
      <div className="flex-1 grid grid-cols-7 grid-rows-5">
        {month.map((row, i) => {
          if (row[0].month() !== monthIndex && row[6].month() !== monthIndex)
            return <></>;
          return (
            <React.Fragment key={i}>
              {row.map((day, idx) => (
                <Day day={day} key={idx} rowIdx={i} monthIdx={monthIndex} />
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}
