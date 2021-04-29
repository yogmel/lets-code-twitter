//
// interface Tweet {
//   id: number;
//   message: string;
//   date: Date;
//   author: number;
//   usersFavorited: number;
//   comments: number[];
// }
//

export const tweets = [
  {
    id: 0,
    message: "mensagem de até 300 caracteres",
    date: new Date('December 17, 2020'),
    author: 0,
    usersFavorited: [],
    comments: [0, 1, 2]
  },
  {
    id: 1,
    message: "mensagem de até 301 caracteres",
    date: new Date('December 17, 2020'),
    author: 0,
    usersFavorited: [0],
    comments: []
  },
  {
    id: 2,
    message: "mensagem de até 302 caracteres",
    date: new Date('December 17, 2020'),
    author: 1,
    usersFavorited: [],
    comments: [2]
  },
  {
    id: 3,
    message: "mensagem de até 303 caracteres",
    date: new Date('December 17, 2020'),
    author: 1,
    usersFavorited: [],
    comments: [3]
  },
  {
    id: 4,
    message: "mensagem de até 304 caracteres",
    date: new Date('December 17, 2020'),
    author: 2,
    usersFavorited: [],
    comments: [4]
  },
  {
    id: 5,
    message: "mensagem de até 305 caracteres",
    date: new Date('December 17, 2020'),
    author: 2,
    usersFavorited: [],
    comments: [5]
  }
]
