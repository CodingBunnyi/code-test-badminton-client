// 一个round是10个match
// 一个match是21分制的一局（一轮游）
// 单打的情况
// 输入的数据
const round1 = [
  {
    winner: 1, // 感觉可以去掉 用score判断就好了
    players: [
      { playerName: 'name1', score: 12 },
      { playerName: 'name2', score: 21 },
    ]
  },
  {
    winner: 'name3', // 感觉可以去掉 用score判断就好了
    players: [
      { playerName: 'name3', score: 23 },
      { playerName: 'name4', score: 21 },
    ]
  }
]

export {round1}