import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";

// 437. Improving the Navigation and Root Layout
export default function Header() {
  return (
    <header className="border-b border-primary-900 px-8 py-5">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Logo />
        <Navigation />
      </div>
    </header>
  );
}
