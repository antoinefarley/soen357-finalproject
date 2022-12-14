import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FunctionComponent, PropsWithChildren } from "react";
import dmoaLogo from "../assets/dmoa-logo.png";
import { SearchBar } from "./searchbar";

export const Header: FunctionComponent = () => {
  const router = useRouter();
  const onSearch = (searchTerm: string) => {
    router.push(`/search/${searchTerm}`);
  };

  return (
    <div
      className={`w-full h-20 min-h-[80px] bg-white border-b-1 border-gray-300 drop-shadow`}
    >
      <div className="h-full flex justify-between items-center p-4 max-w-screen-2xl mx-auto">
        <div className="h-full flex justify-start items-center gap-4">
          <div className="flex items-center">
            <Link href="/">
              <Image
                className="w-10 object-contain"
                src={dmoaLogo}
                alt="Digital Museum of Arts Logo"
              />
            </Link>
          </div>

          <div className="h-full flex items-center gap-4">
            <HeaderLink route="/">Home</HeaderLink>
            <HeaderLink route="/artworks">Artworks</HeaderLink>
            <HeaderLink route="/saved">Saved</HeaderLink>
            <HeaderLink route="/about">About</HeaderLink>
            <HeaderLink route="/exhibition">Exhibition</HeaderLink>
          </div>
        </div>

        <SearchBar onSearch={onSearch} />
      </div>
    </div>
  );
};

const HeaderLink: FunctionComponent<PropsWithChildren<{ route: string }>> = ({
  route,
  children,
}) => {
  const { asPath } = useRouter();

  return (
    <Link className="" href={route}>
      <span
        className={`text-black text-xl  ${asPath !== route && "opacity-50"}`}
      >
        {children}
      </span>
    </Link>
  );
};
