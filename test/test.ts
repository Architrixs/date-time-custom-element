import {assert} from '@open-wc/testing'
import DateTimeElement from '../src/date-time'

describe('date-time', () => {
  describe('element creation', () => {
    it('creates an instance of the element from document.createElement', () => {
      const el = document.createElement('date-time')
      assert.instanceOf(el, DateTimeElement)
    })

    it('creates an instance of the element from constructor', () => {
      const el = new DateTimeElement()
      assert.instanceOf(el, DateTimeElement)
    })
  })
})
