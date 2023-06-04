import UserProfilePage from "@/presentation/components/pages/UserProfilePage";

export const metadata = {
  title: "Página de usuarios",
};

interface Props {
  params: { id: number };
}

const UserPage = ({ params }: Props) => {
  return <UserProfilePage userId={params.id} />;
};

export default UserPage;
