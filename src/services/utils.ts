export function deepEqual(object1: any, object2: any) {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    const val1 = object1[key];
    const val2 = object2[key];
    const areObjects = isObject(val1) && isObject(val2);
    if (
      (areObjects && !deepEqual(val1, val2)) ||
      (!areObjects && val1 !== val2)
    ) {
      return false;
    }
  }

  return true;
}

export function isObject(object: any) {
  return object != null && typeof object === "object";
}

export function isArray(object: any) {
  return object != null && typeof object === "object" && Array.isArray(object);
}

export function getSummarizedJsonObjView(
  metaKey: string,
  jsonObj: any,
  isChildOfArray: boolean
): any {
  const isEmpty = Object.keys(jsonObj).length === 0;
  const key = Object.keys(jsonObj)[0];
  const value = jsonObj[key];

  const isValueObj = isObject(value);
  const isArr = isArray(jsonObj);

  let summary = isEmpty
    ? "{}"
    : isValueObj
    ? `{ ${key}: [object], ... }`
    : `{ ${key}: ${value}, ... }`;

  if (isArr) {
    summary = !isEmpty ? `[ ${summary}, ... ]` : "[]";
  }

  if (!isChildOfArray) {
    summary = `{ ${metaKey}: ${summary} }`;
  }

  return summary;
}
