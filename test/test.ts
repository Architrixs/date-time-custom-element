import { assert } from '@open-wc/testing'
import { DateTimeElement } from '../src/date-time'

// TODO: Add tests for your element
describe('date-time', () => {
  describe('is defined', () => {
    const el = document.createElement('date-time')
    assert.instanceOf(el, DateTimeElement)
  })
})