import { api } from "./session";
import dayjs from "dayjs";

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

  return users.find((us) => us.email === email);
}

export async function doesUsernameExist(userName: string): Promise<boolean> {
  const users = await getUsers();

  return users.some((user) => user.userName === userName);
}

export async function getUserEvents(
  email: string
): Promise<Event[] | undefined> {
  const users = await getUsers();

  const newUser = users.find((us) => us.email === email);

  return newUser?.events;
}

export async function getUpcomingEvents(
  email: string,
  events: number
): Promise<Event[] | undefined> {
  const users = await getUsers();

  const newUser = users.find((us) => us.email === email);

  if (!newUser) return [];

  const now = new Date();

  const futureEvents = newUser.events?.filter(
    (event) => new Date(event.eventStartDate) > now
  );

  futureEvents?.sort(
    (a, b) =>
      new Date(a.eventStartDate).getTime() -
      new Date(b.eventStartDate).getTime()
  );

  return futureEvents?.slice(0, events);
}

export async function getUserByID(id: number): Promise<User | undefined> {
  const users = await getUsers();

  return users.find((us) => us.id === id);
}
