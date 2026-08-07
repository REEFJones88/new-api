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
import type { TFunction } from 'i18next'

export const DOOHUAN_SYSTEM_NAME = 'Doohuan API'

const DOOHUAN_SYSTEM_NAME_ALIASES = new Set([
  DOOHUAN_SYSTEM_NAME,
  '多焕 API',
])

/**
 * Localize the configured Doohuan brand while preserving custom system names.
 * The API and persisted option keep the stable canonical value `Doohuan API`;
 * only the presentation layer translates it.
 */
export function localizeSystemName(
  systemName: string | undefined,
  t: TFunction
): string {
  const normalizedName = systemName?.trim() || DOOHUAN_SYSTEM_NAME
  if (DOOHUAN_SYSTEM_NAME_ALIASES.has(normalizedName)) {
    return t(DOOHUAN_SYSTEM_NAME)
  }
  return normalizedName
}
