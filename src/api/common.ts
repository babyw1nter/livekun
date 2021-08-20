const getLevel = (money: number, moneyLevelArray: Array<number>): number => {
  for (let i = 0; i < moneyLevelArray.length; i++) {
    if (money >= moneyLevelArray[moneyLevelArray.length - 1]) return moneyLevelArray.length - 1
    if (money < moneyLevelArray[i]) return i - 1
  }
  return 0
}

export { getLevel }
