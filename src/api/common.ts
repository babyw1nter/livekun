const getLevel = (money: number, moneyLevelArray: Array<number>): number => {
  for (let i = 0; i < moneyLevelArray.length; i++) {
    if (money >= moneyLevelArray[moneyLevelArray.length - 1]) return moneyLevelArray.length - 1
    if (money < moneyLevelArray[i]) return i <= 0 ? 0 : i - 1
  }
  return 0
}

const randomNum = (minNum: number, maxNum: number): number => {
  return parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10)
}

const moneyFormat = (number: number, decimals: number, decPoint?: string, thousandsSep?: string): string => {
  number = Number((number + '').replace(/[^0-9+-Ee.]/g, ''))
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s: string | string[] = ''
  const toFixedFix = function(n: number, prec: number) {
    const k = Math.pow(10, prec)
    return '' + Math.ceil(n * k) / k
  }

  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  const re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}

export { getLevel, randomNum, moneyFormat }
