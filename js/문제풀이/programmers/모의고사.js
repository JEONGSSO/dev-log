function solution(answers) {
  const pattern1 = [1, 2, 3, 4, 5];
  const pattern2 = [2, 1, 2, 3, 2, 4, 2, 5];
  const pattern3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];

  const answer = answers.reduce((acc, val, idx) => {
    if (val === pattern1[idx % pattern1.length]) {
      acc[1] = acc[1] ? (acc[1] += 1) : 1;
    }

    if (val === pattern2[idx % pattern2.length]) {
      acc[2] = acc[2] ? (acc[2] += 1) : 1;
    }

    if (val === pattern3[idx % pattern3.length]) {
      acc[3] = acc[3] ? (acc[3] += 1) : 1;
    }

    return acc;
  }, {});

  const max = Math.max(...Object.values(answer));

  const result = [];

  for (let i = 1; i <= 3; i++) {
    if (answer[i] === max) {
      result.push(i);
    }
  }

  return result;
}
