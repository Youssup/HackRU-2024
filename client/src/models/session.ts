import { reactive } from "vue";
import { useRouter } from "vue-router";
import * as MyFetch from "./myfetch";
import { type User } from "./users"

const session = reactive({
    user: null as User | null,
    token: null as string | null,
    loading: 0,
    messages: [] as {
      type: string,
      text: string
    }[],
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

      session.user = response.user;
      session.token = response.token;

      router.push("/");

      return session.user;
    },
    logout() {
      session.user = null;
      
      router.push("/login");
    }
  }
}

export function getSession() {
  return session;
}