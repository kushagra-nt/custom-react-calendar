import { Dayjs } from "dayjs";

export type Event = {
  day: Dayjs;
  title: string;
  description?: string;
  id: string;
};
