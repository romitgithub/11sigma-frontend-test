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

export function getSummarizedJsonObjView(jsonObj: any) {
  const isArr = isArray(jsonObj);
  const isObj = isObject(jsonObj) && !isArr;

  if (isObj) {
    const keys = Object.keys(jsonObj);
    return `{ ${keys[0]}: ${jsonObj[keys[0]]}, ... }`;
  }

  if (isArr) {
    const keys = Object.keys(jsonObj[0]);
    return `[ {${keys[0]}: ${jsonObj[0][keys[0]]}, ... }, ...]`;
  }

  return "aa";
}
