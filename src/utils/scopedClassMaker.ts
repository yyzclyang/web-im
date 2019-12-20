const scopedClassMaker = (prefix: string) => {
  return (suffix?: string) => {
    return [prefix.trim(), suffix !== undefined ? suffix.trim() : suffix]
      .filter(Boolean)
      .join("-");
  };
};

export default scopedClassMaker;
