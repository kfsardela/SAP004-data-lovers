export const filtro = {
  filterByType(data, args) {
    return data.filter((poke) => {
      return poke.type[0] === args || poke.type[1] === args;
    });

  },
  filterByEgg(data, args) {
    return data.filter((poke) => {
      return poke.egg === args;
    });
  },
  filterByName(data, args) {
    return data.filter((poke) => {
      return args.test(poke.name)
    });
  }
};

export const sortData = (data, sortBy, sortOrder) => {
  data.sort(function (a, b) {
    if (a[sortBy] > b[sortBy]) {
      return 1;
    }
    if (a[sortBy] < b[sortBy]) {
      return -1;
    }

  });

      if (sortOrder === "desc") {
        data.reverse()
      }

  return data
}
