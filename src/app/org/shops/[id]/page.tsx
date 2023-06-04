import ShopProfilePage from "@/presentation/components/pages/ShopProfilePage";

export const metadata = {
  title: "Perfil de tienda",
};

interface Props {
  params: { id: number };
}

const Page = ({ params }: Props) => {
  return <ShopProfilePage shopId={params.id} />;
};

export default Page;
