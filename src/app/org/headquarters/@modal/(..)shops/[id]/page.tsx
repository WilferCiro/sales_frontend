"use client";
import ShopProfilePage from "@/presentation/components/pages/ShopProfilePage/ShopProfilePage";
import { Modal } from "@mantine/core";
import { useRouter } from "next/navigation";

interface Props {
  params: { id: number };
}

export default async function ModalUserProfile({ params }: Props) {
  const router = useRouter();
  return (
    <Modal
      opened={true}
      onClose={() => router.back()}
      title="Perfil de tienda"
      size="45%"
    >
      <ShopProfilePage shopId={params.id} />
    </Modal>
  );
}
