import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

interface Props {
  className?: string;
  items: {
    key: string;
    label: string;
    icon?: React.ReactNode;
    description?: string;
    onclick?: () => void;
  }[];
  button: {
    label?: any;
    variant?:
      | "shadow"
      | "solid"
      | "bordered"
      | "light"
      | "flat"
      | "faded"
      | "ghost";
  };
}

const DropdownDetailed: React.FC<Props> = ({ className, items, button }) => {
  const isLabelString = typeof button.label === "string";

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          className={className}
          isIconOnly={!isLabelString}
          radius={isLabelString ? "none" : "full"}
          variant={button.variant}
        >
          {button.label}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Dynamic Actions" items={items}>
        {(item) => (
          <DropdownItem
            key={item.key}
            color={item.key === "delete" ? "danger" : "default"}
            className={item.key === "delete" ? "text-danger" : ""}
            description={item.description}
            startContent={item.icon}
            onAction={item.onclick}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default DropdownDetailed;
