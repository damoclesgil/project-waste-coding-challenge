
import { formatDate } from "./format-date";
import camelize from "./camelize";
import formatPrice from './format-price'

describe('camelize()', () => {
  it('should be return a text in a camelCase format', () => {
    let text = 'Available units'
    let camelCase = camelize(text)
    expect(camelCase).toStrictEqual("availableUnits")
  })
})


describe('formatPrice()', () => {
  it('should be return a money with symbol', () => {
    let value = '363.60'
    let formatValue = formatPrice(value)
    expect(formatValue).toStrictEqual("$363.60")
  })
})

describe('formatDate()', () => {
  it('should be return a date format us', () => {
    const date = formatDate('2021-02-18T11:28:32.115Z')
    // const date = formatDate(new Date())
    // const date = formatDate('2021-02-18T06:07:05.088')
    // lastUpdated: "2021-02-05 08:28:32",
    expect(date).toStrictEqual("2021-02-18 08:28:32")
  })
})
