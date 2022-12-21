import {assert, fixture, html} from '@open-wc/testing'
import '../src/date-time'

describe('date-time', function () {
  describe('element creation', function () {
    it('creates from document.createElement', function () {
      const el = document.createElement('date-time')
      assert.equal('date-time', el.nodeName)
    })

    it('creates from constructor', function () {
      const el = new window.CustomElementElement()
      assert.equal('date-time', el.nodeName)
    })
  })

  describe('after tree insertion', function () {
    beforeEach(async function () {
      await fixture(html` <date-time></date-time>`)
    })

    it('initiates', function () {
      const ce = document.querySelector('date-time')
      assert.equal(ce?.textContent, ':wave:')
    })
  })
})
