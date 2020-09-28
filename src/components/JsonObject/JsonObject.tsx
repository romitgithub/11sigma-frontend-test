import React from "react";
import {
  deepEqual,
  isObject,
  isArray,
  getSummarizedJsonObjView,
} from "services/utils";
import KeyValue from "components/KeyValue";
import Expandable from "components/Expandable";

import styles from "./JsonObject.module.css";

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

interface Props {
  jsonObj: any;
  level?: number;
  filteredData: any;
}

export default function JsonObject({
  jsonObj,
  level = 0,
  filteredData,
}: Props) {
  const isFiltered =
    filteredData &&
    filteredData.filter((item: any) => deepEqual(item, jsonObj)).length !== 0;

  const nonObjectFilteredValues = filteredData.filter(
    (item: any) => !isObject(item)
  );

  return (
    <div
      className={`${styles.jsonObj} ${
        isFiltered ? styles.jsonObjSelected : ""
      } level-${level}`}
    >
      {Object.keys(jsonObj).map((key, index) => (
        <div className={styles.objContainer}>
          {!isObject(jsonObj[key]) ? (
            <KeyValue
              label={key}
              value={jsonObj[key]}
              level={level + 1}
              selected={
                nonObjectFilteredValues &&
                nonObjectFilteredValues.filter(
                  (item: string) => jsonObj[key] === item
                ).length !== 0
              }
            />
          ) : (
            <Expandable
              expanded={true}
              title={getSummarizedJsonObjView(key, jsonObj[key])}
            >
              <div>
                {!isArray(jsonObj) && (
                  <NestedHeader header={key} level={level + 1} />
                )}
                <JsonObject
                  jsonObj={jsonObj[key]}
                  level={level + 1}
                  filteredData={filteredData}
                />
              </div>
            </Expandable>
          )}
        </div>
      ))}
    </div>
  );
}
