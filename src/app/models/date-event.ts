export interface DateEvent {
  id: string;
  allDay?: boolean;
  name: string;
  title: string;
  day: string;
  startTime: Date | string;
  endTime: Date | string;
  price: number;
  observations?: string;
  color?: string;
}
