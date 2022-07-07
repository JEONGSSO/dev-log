function validAnagram(string1, string2) {
  const string1Obj = {};
  const string2Obj = {};
  // add whatever parameters you deem necessary - good luck!
  for (const val of string1) {
    string1Obj[val] = (string1Obj[val] || 0) + 1;
  }

  for (const val of string2) {
    string2Obj[val] = (string2Obj[val] || 0) + 1;
  }

  let answer = true;
  for (const str in string1Obj) {
    console.log(string1Obj[str], string2Obj[str]);
    if (string1Obj[str] !== string2Obj[str]) answer = false;
  }
  console.log(answer);
}

validAnagram("dksk", "skdk");
validAnagram("good", "gods");
validAnagram("bad", "dab");

// 문제 낸 사람이 낸 솔루션 O(n)두개로 끝냄
function validAnagramz(string1, string2) {
  if (string1.length !== string2.length) return false;

  const string1Obj = {};
  for (const val of string1) {
    string1Obj[val] = (string1Obj[val] || 0) + 1;
  }

  for (const str of string2) {
    if (!string1Obj[str]) {
      return false;
    } else {
      string1Obj[str] -= 1;
    }
  }
  return true;
}

console.log(validAnagramz("dksk", "skdk"));
console.log(validAnagramz("good", "gods"));
console.log(validAnagramz("bad", "dab"));
