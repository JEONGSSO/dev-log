function solution(array, commands) {
  const result = commands.map(([start, end, pick]) => {
    return array.slice(start - 1, end).sort((a, b) => a - b)[pick - 1];
  });
  return result;
}
