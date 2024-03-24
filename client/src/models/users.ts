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

/*
    eventId: 0,
    title: "",
    eventColor: "",
    description: "",
    location: Address,
    start: dayjs(),
    end: dayjs(),
    invited: []
*/

export interface Event {
  eventId: number;
  title: string;
  eventColor: string;
  description: string;
  location: Address;
  start: string;
  end: string;
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

export async function getUserEvents(user: User): Promise<Event[] | undefined> {
  if (!user) {
    return [];
  }

  return user?.events;
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
    (event) => new Date(event.start) > now
  );

  futureEvents?.sort(
    (a, b) =>
      new Date(a.start).getTime() -
      new Date(b.start).getTime()
  );

  return futureEvents?.slice(0, events);
}

export async function getUserByID(id: number): Promise<User | undefined> {
  const users = await getUsers();

  return users.find((us) => us.id === id);
}

export async function getUserFriends(
  passedUser: User
): Promise<User[] | undefined> {
  const user = passedUser;

  if (!user) return undefined; // Return undefined if the user doesn't exist

  const users = await getUsers();

  const friendsIds: number[] = user.friends ?? [];

  const friends: User[] = users.filter((u) => friendsIds.includes(u.id ?? -1)); // Filter users based on friend IDs

  return friends;
}

export async function createUser(userData: any): Promise<any> {
  try {
    const response = await api("users/register", userData, "POST");
    return response;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
}

export async function createEvent(eventData: any): Promise<any> {
  try {
    const response = await api("users/event", eventData, "POST");

    return response;
  } catch (error) {
    console.error("Error creating event:", error);
    throw error;
  }
}
