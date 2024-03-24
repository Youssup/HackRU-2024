import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as MyFetch from "./myfetch";
import { type User, type Event, getUserFriends, getUserEvents } from "./users"

const session = reactive({
    user: null as User | null,
    token: null as string | null,
    loading: 0,
    messages: [] as {
      type: string,
      text: string
    }[],
    friends: null as User[] | null,
    events: null as Event[] | null
})

export function api(action: string, body?: unknown, method?: string, headers?: any) {
  session.loading++;
  
  if (session.token){
    headers = headers ?? {};
    headers['Authorization'] = `Bearer ${session.token}`;
  }
  
  return MyFetch.api(`${action}`, body, method, headers)
    .catch(err=> showError(err))
    .finally(()=> session.loading--);
}

export function showError(err: any) {
  console.error(err);
  session.messages.push({ type: "error", text: err.message ?? err});
}

export function useLogin() {
  const router = useRouter();

  return {
    async login(email: string, password: string): Promise<User | null> {
      const response = await api("users/login", { email, password });

      session.user = response?.user;
      session.token = response.token;
      session.friends = await getUserFriends(response?.user) || [];
      session.events = await getUserEvents(response?.user) || [];

      router.push("/home");

      return session.user;
    },
    logout() {
      session.user = null;
      
      router.push("/login");
    },
    async refresh() {
      if (session.user) {
        try {
          const friends = await getUserFriends(session.user) || [];
          const events = await getUserEvents(session.user) || [];
    
          session.friends = friends;
          session.events = events;
        } catch (error) {
          showError(error);
        }
      }
    }
  }
}

export function getSession() {
  return session;
}


