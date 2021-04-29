//
// interface User {
//   id: number;
//   username: string;
//   name: string;
//   myTweets: Tweet[];
//   favoriteTweets: number[];
// }
//

import { tweets } from './tweets';

export const users = [
  {
    id: 0,
    username: "mell",
    name: "Mellina Yonashiro",
    myTweets: [tweets[0], tweets[1]],
    favoriteTweets: [0, 1, 2]
  },
  {
    id: 1,
    username: "jess",
    name: "Jessica Chan",
    myTweets: [tweets[2], tweets[3]],
    favoriteTweets: []
  },
  {
    id: 2,
    username: "clau",
    name: "Claudia Homes",
    myTweets: [tweets[4], tweets[5]],
    favoriteTweets: []
  }
]

