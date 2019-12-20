const classNames = (...classNames: Array<string | undefined>) => {
  return classNames.filter(Boolean).join(" ");
};

export default classNames;
