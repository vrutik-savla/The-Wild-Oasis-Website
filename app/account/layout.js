import SideNavigation from "@/app/_components/SideNavigation";

// 442. Adding a Nested Layout
export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-full gap-12">
      <SideNavigation />
      <div>{children}</div>
    </div>
  );
}
