import { api } from "./session";

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  friends: number[];
  token?: string;
  events?: Event[];
}

export interface Event {
  eventId: number;
  eventName: string;
  eventColor: string;
  eventDescription: string;
  eventLocation: Address;
  eventStartDate: string;
  eventEndDate: string;
  eventStartTime: string;
  eventEndTime: string;
  eventIsAllDay: boolean;
  invited: number[];
}

export interface Address {
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

export function getUsers(): Promise<User[]> {
  return api("users"); 
}

export async function getUserByEmail(email: string): Promise<User | undefined> {
  const users = await getUsers();

  return users.find(us => us.email === email);
}