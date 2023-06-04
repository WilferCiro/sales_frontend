import { Button } from "@mantine/core";
import { ReactElement, useState } from "react";

interface Props {
  label: string;
  onClick: () => Promise<boolean | void>;
  leftIcon?: ReactElement;
  disabled?: boolean;
  color?: string;
}

const AsyncButton = ({ label, onClick, leftIcon, disabled, color }: Props) => {
  const [loading, setLoading] = useState<boolean>(false);
  const buttonClick = async () => {
    setLoading(true);
    await onClick();
    setLoading(false);
  };

  return (
    <Button
      onClick={buttonClick}
      leftIcon={leftIcon}
      loading={loading}
      disabled={disabled}
      color={color}
    >
      {label}
    </Button>
  );
};

export default AsyncButton;
