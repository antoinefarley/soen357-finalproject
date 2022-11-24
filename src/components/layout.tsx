import { FunctionComponent, PropsWithChildren } from "react";
import { Header } from "./header";

export const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => {
  return (
    <div className="w-full h-full flex flex-col bg-gray-50">
      <Header />

      <div className="grow overflow-hidden">
        <div className="h-full overflow-y-scroll max-w-screen-2xl mx-auto">
          {children}
        </div>
      </div>
    </div>
  );
};
