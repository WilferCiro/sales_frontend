"use client";
import UserProfilePage from "@/presentation/components/pages/UserProfilePage";
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
      title="Perfil del usuario"
    >
      <UserProfilePage userId={params.id} />
    </Modal>
  );
}
