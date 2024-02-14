import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarContentItem {
  name: string;
  href: string;
}

interface SidebarProps {
  sidebarContent: SidebarContentItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarContent = [] }) => {
  const location = usePathname();
  return (
    <aside className="md:px-5 py-8 col-span-4 md:col-span-2 lg:col-span-3 mx-auto md:mx-0">
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] p-2 rounded-box flex md:flex-col"
      >
        {sidebarContent.map((item, i) => {
          return (
            <li key={i}>
              <Link
                href={item.href}
                className={`flex items-center justify-start btn-sm sm:btn-md btn btn-${
                  location?.includes(item.href) ? "primary" : "ghost"
                } md:px-6 w-full`}
              >
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
