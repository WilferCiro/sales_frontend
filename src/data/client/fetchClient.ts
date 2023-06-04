import { notifications } from "@mantine/notifications";
import persistentStorage from "../persistentStorage";

interface FetchClientProps<T> {
  endpoint: string;
  method: "POST" | "GET" | "PATCH" | "DELETE";
  body?: T;
  noToken?: boolean;
  isFile?: boolean;
  fileName?: string;
}

export const fetchClient = async <T, U>({
  endpoint,
  method,
  body,
  noToken,
  isFile,
  fileName,
}: FetchClientProps<T>): Promise<U | null> => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };
  if (!noToken) {
    const token = persistentStorage.token.get();
    headers["authorization"] = "Bearer " + token;
  }
  try {
    const response = await fetch(`${endpoint}`, {
      method,
      body: JSON.stringify(body),
      headers,
    });
    if (!response.ok) {
      const json = await response.json();
      throw new Error(json.message);
    }
    if (isFile) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(new Blob([blob]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName || "file");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return null;
    }
    const json = await response.json();
    return json;
  } catch (e) {
    notifications.show({
      message: `${e}`,
      color: "red",
    });
    return null;
  }
};
