export interface Root {
  users: User[];
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  friends: number[];
  events?: Event[];
}

export interface Event {
  eventId: number;
  eventName: string;
  eventColor: string;
  eventDescription: string;
  eventLocation: EventLocation;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventIsAllDay: boolean;
  invited: number[];
}

export interface EventLocation {
  address: string;
  city: string;
  coordinates: Coordinates;
  postalCode: string;
  state: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
