function MyLogFunction() {
  return (str: string) => {
    console.log(str);
  };
}

const logger = MyLogFunction();
logger("Your String");

function createLoggerClass() {
  return class MyLoggerClass {
    private completeLog: string = "";
    log(str: string) {
      console.log(str);
      this.completeLog += str + "\n";
    }
    dumpLog() {
      return this.completeLog;
    }
  };
}

const MyLogger = createLoggerClass();
const logger2 = new MyLogger();

logger2.log("foo");
console.log(logger2.dumpLog());

function CreateSimpleMemoryDatabase<T>() {
  return class SimplememoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T) {
      this.db[id] = value;
    }
    get(id: string): T {
      return this.db[id];
    }
    getObject(): object {
      return this.db;
    }
  };
}

const stringDatabase = CreateSimpleMemoryDatabase<string>();

const sbd1 = new stringDatabase();
sbd1.set("a", "hello");

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<T extends Constructor<{ getObject(): object }>>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(stringDatabase);
const sbd2 = new DumpableStringDatabase();
sbd2.set("jack", "hello jack");
sbd2.dump();
