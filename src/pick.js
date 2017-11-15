export default (obj, props) => {
  const filtered = props.map(prop => ({ [prop]: obj[prop] }));
  return Object.assign({}, ...filtered);
};
