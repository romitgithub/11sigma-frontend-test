import React from "react";
import styles from "./NestedHeader.module.css";

interface NestedHeaderProps {
  header: string;
  level: number;
}

const NestedHeader = ({ header, level }: NestedHeaderProps) => {
  return (
    <div className={`${styles.header} level-${level}`} data-level={level}>
      {header}
    </div>
  );
};

export default NestedHeader;
