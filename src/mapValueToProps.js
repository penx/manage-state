export default (propsToConvert, value) => {
  return propsToConvert.reduce(
    (props, key) => {
      props[key] = value;
      return props;
    },
    {}
  );
}
