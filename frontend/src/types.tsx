export interface habbit {
  name: string;
  started: Date;
  info: string;
  done: boolean;
  ended?: Date;
  _id: string;
}

export interface day {
    date: string
    habbits?: [habbit]
    _id: string
}

export interface HabbitItemProps {
  type: "todo" | "notDone" | "done" | "info";
  habbit?: habbit;
}