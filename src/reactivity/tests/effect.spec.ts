import { effect } from "../effect";
import { reactive } from "../reactive";

describe("effect", () => {
  it("happy path", () => {
    const user = reactive({
      age: 10,
    });

    let nextAge;
    effect(() => {
      nextAge = user.age + 1;
    });

    expect(nextAge).toBe(11);

    user.age++;
    expect(nextAge).toBe(12);
  });

  it("effect return a runner", () => {
    // effect(fn)会返回一个runner函数并执行runner，当执行runner的时候会调用fn，并返回fn的值
    let foo = 1;
    const runner = effect(() => {
      foo++;
      return "foo";
    });

    expect(foo).toBe(2);
    const r = runner();
    expect(foo).toBe(3);
    expect(r).toBe("foo");
  });
});
