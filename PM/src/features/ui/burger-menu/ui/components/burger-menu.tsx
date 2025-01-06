import { EditingSlide } from "../../../../../shared/ui/components/design-button";
import { IconBurgerMenu } from "../../../../../shared/ui/icons/burger-menu";
import { BurgerMenuContent } from "../../../../../entities/ui/components/burger-menu-content/ui";
import { useState } from "react";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <EditingSlide
        onClick={() => setIsOpen(!isOpen)}
        icon={IconBurgerMenu}
        description={"Меню"}
      />
      {isOpen && <BurgerMenuContent setIsOpen={setIsOpen} />}
    </>
  );
};
