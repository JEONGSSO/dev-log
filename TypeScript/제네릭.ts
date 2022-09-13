// Type의 약자로 다른 언어에서도 제네릭을 선언할 때 관용적으로 많이 사용된다.

// 제네릭 만들기
const test1 = <T, U>(objA: T, objB: U) => {
  return Object.assign(objA, objB);
};

function test2<T, U>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

class Test<T, U> {
  assign(objA: T, objB: U) {
    return Object.assign(objA, objB);
  }
}

const objAA = { a: 1 };
const objBB = { b: 2 };

const test1Result = test1(objAA, objBB);
test1Result.a;
const test2Result = test2(objAA, objBB);
test2Result.a;

const classTest = new Test<typeof objAA, typeof objBB>();
const classTestResult = classTest.assign(objAA, objBB);
classTestResult.a;

///////////////////////////////////////////////////////////////

interface Lengthy {
  length: number;
}

const countAndDescribe = <T extends Lengthy>(elem: T) => {
  let text = "음슴";

  // length에서 타입 에러가 나는데 T에서 length가 있는지 확신할 수 없기 때문
  // 그래서 Lengthy를 상속받아 에러를 없앰
  if (elem.length === 1) {
    text = "1개 있음";
  }

  return text;
};

///////////////////////////////////////////////////////////////

const keyofTestObj = { name: "kim" };
const keyofTest = <T, U extends keyof T>(obj: T, key: U) => {
  return `value is ${obj[key]}`;
};

console.log(keyofTest({ name: "kim" }, "name"));
// 여기서 빈객체를 넣으면 key가 아무것도 없으므로 무엇을 넣어도 에러남

console.log(keyofTest(keyofTestObj, "name"));

////////////////////////////////////////////////

// 함수의 타입을 정의하고 싶을때
interface GenericLogTextFn {
  <T>(text: T): T;
}

// 함수를 만들때 타입을 T로 적용하는 애들을 만들때 유용
function logText<T>(text: T) {
  return text;
}
const myString: GenericLogTextFn = logText; // Okay
myString("sa").toLocaleLowerCase();

// 해당 인터페이스를 적용 할 함수에서 제네릭으로 상속하게되면 안됨
function logTextt<T>(text: T) {
  return text;
}
const myStringg: GenericLogTextFn = logTextt<string>("z");

// 제네릭을 인터페이스에 선언
interface GenericLogTextFn2<T> {
  (text: T): T;
}

function logTexttt<T>(text: T): T {
  return text;
}

const stringGeneric: GenericLogTextFn2<string> = logText; // Okay
stringGeneric("13");

/////////////////////////////////////////////

class DataStorage<T> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    const removeIndex = ~this.data.indexOf(item);
    if (!removeIndex) return; // removeIndex === -1
    this.data.splice(removeIndex, 1);
  }

  getItems() {
    return [...this.data]; // 배열 복사본 리턴
  }
}

const kimObj = { name: "kim" }; // 같은 객체 같은 주소를 넣어주어야 의도한대로 동작함
const objStorage = new DataStorage<object>();

// objStorage.addItem('123');
objStorage.addItem({ name: "kim" }); // objStorage.addItem(kimObj)
objStorage.addItem({ name: "good" });
objStorage.removeItem({ name: "kim" }); // objStorage.removeItem(kimObj)

/////////////////////////////////////////

interface CourseGoal {
  title: string;
  description: string;
  completeUntil: Date;
}

const createCourseGoal = ({
  title,
  description,
  completeUntil,
}: CourseGoal) => {
  // const courseGoal: CourseGoal = {};
  const courseGoal: Partial<CourseGoal> = {}; // 파티셜을 사용하면 optional value로 바뀐다.
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.completeUntil = completeUntil;

  // return courseGoal;
  return courseGoal as CourseGoal; // 파티션이 아닌 필수값으로 만들기 위해 CourseGoal사용하여 어설션
};

const courseValues: CourseGoal = {
  title: "good",
  description: "설명",
  completeUntil: new Date(),
};

const course = createCourseGoal(courseValues);

console.log(createCourseGoal(courseValues).completeUntil);

///////////////////////////////////

const namess: Readonly<string[]> = ["kim", "lee"]; // readonly 제네릭으로 문자열 배열 선언
namess.push("asd"); // error
namess[3] = "park"; // error
namess.pop(); // error

//////////////////////////////////////////////////////////

// 쌩 유니온으로 작업하면 일일이 쳐주어야 하고 번거롭다
// 제네릭에서 유니온을 설정하여 사용할 타입들만 받아서 유연하게 처리할 수 있다.

class DataStorage2 {
  private data: (string | number | boolean)[] = [];

  // 배열 공통된 메서드만 사용 가능함
  addItem(item: string | number | boolean) {
    this.data.push(item);
  }

  removeItem(item: string | number | boolean) {
    const itemIndex = ~this.data.indexOf(item);

    if (itemIndex) return; // this.data.indexOf(item) === -1

    this.data.splice(itemIndex, 1); // -1을 제거하니까 맨 뒤 인덱스가 삭제됨
  }

  getItems() {
    return [...this.data]; // 배열 복사본 리턴
  }
}

const unionTest = (union: string | number | boolean) => {
  if (typeof union === "string") {
    // union.
  } else if (typeof union === "number") {
    // union.
  } else {
    // union
  }

  return union;
};
const zzzzz = unionTest(1);
// zzzzz.
// 메서드 사용안됨

/**
 * @deprecated
 */
const genericTest = <T>(union: T) => union;

const zzzz = genericTest("abc");
zzzz.charAt;
// string 메서드 사용
