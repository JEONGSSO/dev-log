// X에서 Y까지 D의 속도로 최소 몇번 움직여야 하는지 구하는 문제

/**
 *
 * @param {number} X 개구리의 현재 위치
 * @param {number} Y 목적지
 * @param {number} D 속도
 * @return {number} 최소 카운팅 수
 */

// 올림((목적지 - 현재 위치) / 속도) = 횟수나옴
const solution = (X, Y, D) => Math.ceil((Y - X) / D);

const X = 10;
const Y = 86;
const D = 30;

console.log(solution(X, Y, D));

// 이번문제 복잡도 : O(1) (한 단계를 거치는 시간 복잡도)
