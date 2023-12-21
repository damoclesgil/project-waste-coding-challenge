
import { formatDateAndTime } from "./format-date";
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

describe('formatDateAndTime()', () => {
  it('should be return a date format us', () => {
    const date = formatDateAndTime('2021-02-18T11:28:32.115Z')
    expect(date).toStrictEqual("02/18/2021 03:28:32")
  })

  it('check if a date string is in ISO and UTC format', () => {
    const date = formatDateAndTime('05-54-201 date-invalid')
    expect(date).toStrictEqual("Invalid Date")
  })
})
