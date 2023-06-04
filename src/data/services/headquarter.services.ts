import { fetchClient } from "../client/fetchClient";
import { HeadquarterSchema } from "@/domain/schemas/HeadquarterSchema";

const endpoint = `${process.env.API_DASHBOARD_URL}/headquarters`;

export async function addHeadquarterService(
  data: HeadquarterSchema
): Promise<HeadquarterSchema | null> {
  return await fetchClient({
    endpoint: endpoint,
    method: "POST",
    body: { ...data, owner: 10 },
  });
}

export async function editHeadquarterService(
  data: Partial<HeadquarterSchema>
): Promise<HeadquarterSchema | null> {
  return await fetchClient({
    endpoint: `${endpoint}/${data.id}`,
    method: "PATCH",
    body: { ...data, id: undefined },
  });
}

export async function exportHeadquarterService(): Promise<null> {
  return await fetchClient({
    endpoint: `${endpoint}/export`,
    method: "POST",
    isFile: true,
    fileName: "headquarters.xlsx",
  });
}
