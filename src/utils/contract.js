const can = (object, method) => {
  return typeof object[method] == "function";
};

const checkContract = (object, methods) => {
  for (const method of methods) {
    if (!can(object, method)) {
      return false;
    }
  }

  return true;
};

export default checkContract;
