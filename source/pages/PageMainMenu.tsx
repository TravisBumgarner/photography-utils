import React from "react";
import Menu from "../shared/Menu.js";
import { AppPage, BasePageProps } from "../types.js";

type MenuItem = { label: string, value: AppPage }

type PageProps = {

}

const MainMenu = ({ navigatePage }: PageProps & BasePageProps) => {
  const handleSelect = (activePage: MenuItem['value']) => {
    navigatePage(activePage)
  }

  const items: MenuItem[] = [
    {
      label: "Check Files",
      value: AppPage.ComputeMissingSetup
    },
    {
      label: "Exit",
      value: AppPage.Exit
    },
  ];

  return (<Menu options={items} callback={handleSelect} />);
}

export default MainMenu;