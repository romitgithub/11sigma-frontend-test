import React from "react";
import styles from "./SearchBox.module.css";

interface Props {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

export default function SearchBox({ handleInputChange, disabled }: Props) {
  return (
    <input
      className={`${styles.inputField} ${styles.queryField}`}
      type="text"
      placeholder="Enter JSONPath expression here"
      onChange={handleInputChange}
      disabled={disabled}
    />
  );
}
