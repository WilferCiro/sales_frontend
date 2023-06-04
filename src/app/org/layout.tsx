import AuthLayout from "@/presentation/components/organisms/AuthLayout/AuthLayout";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthLayout>
        {children}
      </AuthLayout>
    </>
  );
}
