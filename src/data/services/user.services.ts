import { UserSchema } from "@/domain/schemas/UserSchema";
import { fetchClient } from "../client/fetchClient";

const endpoint = `${process.env.API_DASHBOARD_URL}/users`;

export async function addUserService(
  data: UserSchema
): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: data,
  });
}

export async function editUserService(
  data: Partial<UserSchema>
): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data.id}`,
    method: "PATCH",
    body: { ...data, id: undefined },
  });
}

export async function exportUserService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "users.xlsx",
  });
}

export async function getUserById(userId: number): Promise<UserSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${userId}`,
    method: "GET",
  });
}
