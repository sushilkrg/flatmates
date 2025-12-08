import FilterButton from "@/components/FilterButton";
import FiltersSidebar from "@/components/FiltersSidebar";

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto flex flex-col md:flex-row md:justify-between m-4 gap-6">
      <div className="block md:hidden">
        <FilterButton />
      </div>
      <div className="md:w-72 hidden md:block sticky top-0 md:pl-4">
        <FiltersSidebar />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
