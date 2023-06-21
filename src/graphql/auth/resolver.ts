const resolver = {
  Mutation: {
    register: (pararm: any, args: any) => {},
  },
  Query: {
    user: () => {
      return "s";
    },
  },
};

export default resolver;
