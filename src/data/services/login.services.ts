import { fetchClient } from "../client/fetchClient";

const endpoint = `${process.env.API_DASHBOARD_URL}/auth/login`;

export interface LoginServiceProps {
  email: string;
  password: string;
}

export async function loginService({
  email,
  password,
}: LoginServiceProps): Promise<{ token: string } | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    noToken: true,
    body: { email, password },
  });
}
