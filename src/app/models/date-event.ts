export interface DateEvent {
  id: string;
  allDay?: boolean;
  name: string;
  title: string;
  day: string;
  startTime: Date;
  endTime: Date;
  price: number;
  observations?: string;
  color?: string;
}
