export default (propsToConvert, value) => propsToConvert.reduce(
  (props, key) => {
    props[key] = value;
    return props;
  },
  {},
);
