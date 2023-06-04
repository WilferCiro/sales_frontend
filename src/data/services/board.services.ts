import BoardInterface from "@/domain/schemas/BoardSchema";
import { fetchServer } from "../server/fetchServer";

const endpoint = `${process.env.API_DASHBOARD_URL}/boards`;

export const getAllBoards = async (): Promise<BoardInterface[] | null> => {
  const boards = await fetchServer<null, BoardInterface[]>({
    endpoint: endpoint,
    method: "GET",
  });

  return boards;
};
