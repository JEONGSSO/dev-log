https://leetcode.com/problems/two-sum

Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Output: Because nums[0] + nums[1] == 9, we return [0, 1].

감이 잘 잡히지 않아서 솔루션을 참고하면서 문제를 풀었다. 반성;

```ts
function twoSum(nums: number[], target: number): number[] | null {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] === target - nums[j]) return [i, j];
    }
  }
  return null;
}
```

https://milooy.wordpress.com/2019/11/20/two-sum/
다른 분의 솔루션 방법이 정말 신기했다.

```js
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length; i++) {
    const foundIdx = nums.indexOf(target - nums[i]);
    if (foundIdx >= 0 && foundIdx !== i) {
      return [i, foundIdx];
    }
  }
};
```

다른 개발자분들의 코드를 보면서 이렇게도 구현할 수 있구나 생각되었고 코드를 참조 해서 새로운 방법으로 해결 할 수 있는 코딩테스트 실력을 늘려놔야겠다.
