import Link from "next/link";
import Logo from "./Logo";
import SearchBar from "./SearchBar";

interface ItemProps {
  to: string;
}

function NavItem(props: ItemProps) {
  return (
    <Link href={"/" + props.to}>
      <div className="capitalize text-xl text-dark-grey mx-4 my-3">
        {props.to}
      </div>
    </Link>
  );
}

function NavLinks() {
  const navItems = ["countries", "schools", "about"];
  return (
    <div className="flex flex-row mr-12">
      {navItems.map((x) => (
        <NavItem to={x} />
      ))}
    </div>
  );
}

export default function NavBar() {
  return (
    <div className="w-full h-32 flex flex-row items-center justify-between">
      <Logo />
      <div className="flex flex-row">
        <SearchBar />
        <NavLinks />
      </div>
    </div>
  );
}
