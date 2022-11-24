import { FunctionComponent, ReactElement } from "react";

export const HeaderContentFlexLayout: FunctionComponent<{
  children: [ReactElement, ReactElement];
  className?: string;
}> = ({ children, className = "" }) => (
  <div className={`${className} w-full h-full flex flex-col gap-4`}>
    <div className="">{children[0]}</div>
    <div className="relative grow overflow-y-scroll">{children[1]}</div>
  </div>
);
