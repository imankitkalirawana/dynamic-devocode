"use client";
import React, { useState } from "react";
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
  currentSelection?: string;
}

const DropdownDetailed: React.FC<Props> = ({
  className,
  items,
  button,
  currentSelection,
}) => {
  const isLabelString = typeof button.label === "string";
  const [selectedKeys, setSelectedKeys] = React.useState(
    new Set([currentSelection || "ascending"])
  );

  const handleSelectionChange = (keys: any) => {
    setSelectedKeys(new Set(keys));
  };

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
      <DropdownMenu
        aria-label="Dynamic Actions"
        items={items}
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        variant="flat"
        disallowEmptySelection
      >
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
