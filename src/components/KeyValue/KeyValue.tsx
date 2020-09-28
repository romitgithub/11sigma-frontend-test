import React from "react";
import styles from "./keyValue.module.css";

interface Props {
  label: string | number;
  value: string | number | boolean;
  level: number;
  selected?: boolean;
}

export default function KeyValue({ label, value, level, selected }: Props) {
  return (
    <div
      className={`${styles.keyValue} ${
        selected ? styles.selectedKeyValue : ""
      } level-${level}`}
      data-level={level}
    >
      <span className={styles.label}>{label}</span>:{" "}
      <span className={styles.value}>{value === null ? "null" : value}</span>
    </div>
  );
}
