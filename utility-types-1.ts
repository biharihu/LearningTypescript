interface MyUser {
  name: string;
  id: string;
  email?: string;
}

type MyUserOptionals = Partial<MyUser>;

// interface MyUserOptionals {
//   name?: string;
//   id?: string;
//   email?: string;
// }

const merge = (user: MyUser, overrides: MyUserOptionals): MyUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    { name: "Akash", id: "foo", email: "bablu630@gmail.com" },
    { email: "akash@kurage.in" }
  )
);

type RequiredMyUser = Required<MyUser>;

type JustEmailAndName = Pick<MyUser, "email" | "name">;
type UserWithoutID = Omit<MyUser, "id">;

const mapById = (users: MyUser[]): Record<string, UserWithoutID> => {
  return users.reduce((a, v) => {
    const { id, ...other } = v;
    return {
      ...a,
      [id]: other,
    };
  }, {});
};

console.log(
  mapById([
    { id: "foo", name: "Mr. Foo" },
    { id: "baz", name: "Mrs. Baz" },
  ])
);
