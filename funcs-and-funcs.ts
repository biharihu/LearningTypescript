export function printToFile(text: string, callback: () => void): void {
  console.log(text);
  callback();
}

export type MutationFuncation = (v: number) => number;

export function arrayMutate(
  numbers: number[],
  mutate: MutationFuncation
): number[] {
  return numbers.map(mutate);
}

const myNewMutateFunc: MutationFuncation = (v: number) => v * 100;

console.log(arrayMutate([1, 20, 3], (v) => v * 10));

export type AdderFuncation = (val: number) => number;

export function createAdder(num: number): AdderFuncation {
  return (val: number) => num + val;
}

const addOne = createAdder(1);
console.log(addOne(55));
