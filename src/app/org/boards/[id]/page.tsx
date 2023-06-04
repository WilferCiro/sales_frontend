import BoardTimeline from "@/presentation/components/organisms/BoardTimeline/BoardTimeline";

interface Props {
  params: {
    id: string;
  };
}
const BoardIdPage = ({ params }: Props) => {
  return (
    <>
      <h2>Board {params.id}</h2>
      <BoardTimeline />
    </>
  );
};

export default BoardIdPage;
