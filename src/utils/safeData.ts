const safeData = (fn: Function) => {
  try {
    return fn();
  } catch (e) {
    return undefined;
  }
};

export default safeData;
