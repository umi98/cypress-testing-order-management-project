export const cartesian = (arrays) => {
  return arrays.reduce(
    (acc, curr) =>
      acc.flatMap((a) => curr.map((b) => [...a, b])),
    [[]]
  );
};

export const flattenMatrix3D = (matrix) => {
  const flat = [];
  matrix.forEach(level1 => {
    level1.forEach(level2 => {
      level2.forEach(item => {
        flat.push(item);
      });
    });
  });
  return flat;
}