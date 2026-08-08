/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import assert from 'node:assert/strict'
import { describe, test } from 'node:test'

import {
  getDoohuanRegisterRedirect,
  getDoohuanSignOutRedirect,
  getDoohuanSSORedirect,
} from '../doohuan-auth-redirect'

describe('Doohuan hosted authentication redirects', () => {
  test('routes unauthenticated console visitors through the Doohuan SSO entry', () => {
    assert.equal(
      getDoohuanSSORedirect('api.doohuan.com', '/console?tab=usage'),
      '/sso/continue?return=%2Fconsole%3Ftab%3Dusage'
    )
  })

  test('maps the upstream dashboard default to the public console route', () => {
    assert.equal(
      getDoohuanSSORedirect('api.doohuan.com', '/dashboard'),
      '/sso/continue?return=%2Fconsole'
    )
  })

  test('rejects external return URLs to prevent open redirects', () => {
    assert.equal(
      getDoohuanSSORedirect('api.doohuan.com', 'https://example.com/phish'),
      '/sso/continue?return=%2Fconsole'
    )
  })

  test('keeps upstream and development hosts on their native auth flow', () => {
    assert.equal(getDoohuanSSORedirect('localhost', '/console'), null)
    assert.equal(getDoohuanRegisterRedirect('localhost'), null)
  })

  test('routes hosted registration through the www account system', () => {
    assert.equal(
      getDoohuanRegisterRedirect('api.doohuan.com'),
      'https://www.doohuan.com/register'
    )
  })

  test('routes hosted sign-out through www before clearing the API session', () => {
    assert.equal(
      getDoohuanSignOutRedirect('api.doohuan.com'),
      'https://www.doohuan.com/auth/signout?api=1&next=/login'
    )
    assert.equal(getDoohuanSignOutRedirect('localhost'), null)
  })
})
