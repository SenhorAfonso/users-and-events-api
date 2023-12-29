const resultIsEmpty = (target: any[] | any) => {
  if (Array.isArray(target)) {
    return target.length === 0;
  } else {
    return target === undefined;
  }
}

export default resultIsEmpty;