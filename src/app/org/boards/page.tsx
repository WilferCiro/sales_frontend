import { getAllBoards } from "@/data/services/board.services";
import BoardsList from "@/presentation/components/organisms/BoardsList/BoardsList";

const BoardsPage = async () => {
  const boards = await getAllBoards();

  return (
    <>
      <h2>Mis tableros</h2>
      <BoardsList boards={boards || []} />
    </>
  );
};

export default BoardsPage;
