if (process.env.NODE_ENV === 'production') {
  const noop = () => {};
  
  console.log = noop;
  console.info = noop;
  console.warn = noop;
  console.error = noop;
  console.debug = noop;
}

export default null;