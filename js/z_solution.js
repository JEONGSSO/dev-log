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
