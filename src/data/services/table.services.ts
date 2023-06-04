import { fetchClient } from "../client/fetchClient";

interface PaginatedInterface<T> {
  data: T[];
  total: number;
}

interface Props {
  page: number;
  count: string;
  query: string;
  endpoint: string;
  filters: any; // TODO: change type
  server: string;
}

export const getPaginatedData = async <T>({
  page,
  count,
  query,
  endpoint,
  filters,
  server
}: Props): Promise<PaginatedInterface<T> | null> => {
  const searchParams = new URLSearchParams();
  const params = {
    page: page - 1,
    count,
    search: query,
    ...filters,
  };
  Object.keys(params).forEach(
    (key) => params[key] !== undefined && searchParams.append(key, params[key])
  );

  const data = await fetchClient<null, PaginatedInterface<T> | null>({
    endpoint: `${server}/${endpoint}/paginated?${searchParams.toString()}`,
    method: "GET",
  });

  return data;
};
