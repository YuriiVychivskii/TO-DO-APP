export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 items-start justify-center py-24">
        {children}
      </main>
    </div>
  );
}
