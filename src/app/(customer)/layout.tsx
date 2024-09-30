import { Footer, Header, Title } from "@/app/(customer)/components";
export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Header />
      <Title />
      {children}
      <Footer />
    </div>
  );
}
