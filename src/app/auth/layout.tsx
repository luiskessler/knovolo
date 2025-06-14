// src/app/auth/layout.tsx
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[80vh] items-center justify-center">{children}</div>
  );
}
