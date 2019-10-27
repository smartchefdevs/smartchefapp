export const uniqueId = () => {
  const first = Math.random()
    .toString(36)
    .substr(2, 10);
  const second = Date.now().toString(12);
  return first.concat(second);
};
