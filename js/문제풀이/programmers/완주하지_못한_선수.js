function solution(participant, completion) {
  const completionObj = completion.reduce((acc, name) => {
    acc[name] = acc[name] ? acc[name] + 1 : 1;
    return acc;
  }, {});

  const result = participant.find((name) => {
    if (completionObj[name]) {
      completionObj[name] -= 1;
    } else {
      return true;
    }
  });

  return result;
}

// https://im-developer.tistory.com/127
