interface Coordiante {
  x: number;
  y: number;
}

function parseCoordinateFromObject(obj: Coordiante): Coordiante {
  return {
    ...obj,
  };
}

function parseCoordinateFromNumbers(x: number, y: number): Coordiante {
  return {
    x,
    y,
  };
}

function parseCoordinate(str: string): Coordiante;
function parseCoordinate(obj: Coordiante): Coordiante;
function parseCoordinate(x: number, y: number): Coordiante;
function parseCoordinate(arg1: unknown, arg2?: unknown): Coordiante {
  let coord: Coordiante = {
    x: 0,
    y: 0,
  };

  if (typeof arg1 === "string") {
    (arg1 as string).split(",").forEach((str) => {
      const [key, value] = str.split(":");
      coord[key as "x" | "y"] = parseInt(value, 10);
    });
  } else if (typeof arg1 === "object") {
    coord = {
      ...(arg1 as Coordiante),
    };
  } else {
    coord = {
      x: arg1 as number,
      y: arg2 as number,
    };
  }

  return coord;
}

console.log(parseCoordinate(10, 20));
console.log(parseCoordinate({ x: 52, y: 35 }));
console.log(parseCoordinate("x:52,y:35"));
