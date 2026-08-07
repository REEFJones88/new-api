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

import type { TFunction } from 'i18next'

import { localizeSystemName } from '../system-branding'

function createTranslator(value: string): TFunction {
  return (() => value) as TFunction
}

describe('system brand localization', () => {
  test('renders the Chinese brand for the canonical API value', () => {
    const result = localizeSystemName(
      'Doohuan API',
      createTranslator('多焕 API')
    )

    assert.equal(result, '多焕 API')
  })

  test('renders the English brand for the canonical API value', () => {
    const result = localizeSystemName(
      'Doohuan API',
      createTranslator('Doohuan API')
    )

    assert.equal(result, 'Doohuan API')
  })

  test('preserves a custom configured system name', () => {
    const result = localizeSystemName(
      'Customer Gateway',
      createTranslator('多焕 API')
    )

    assert.equal(result, 'Customer Gateway')
  })
})
