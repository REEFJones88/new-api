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

/** Enterprise shell origins (Doohuan product matrix). */
export const ENTERPRISE_ORIGINS = {
  www: 'https://www.doohuan.com',
  aips: 'https://aips.doohuan.com',
  api: 'https://api.doohuan.com',
} as const

export const ENTERPRISE_SHELL_BG = '#f7f7f4'

export type EnterpriseNavItem = {
  /** i18n key (English source string) */
  labelKey: string
  href: string
}

export function getAboutHref(wwwOrigin = ENTERPRISE_ORIGINS.www): string {
  return `${wwwOrigin}/about`
}

export function getAipsProductLinks(
  aipsOrigin = ENTERPRISE_ORIGINS.aips
): EnterpriseNavItem[] {
  return [
    { labelKey: 'Home', href: aipsOrigin },
    { labelKey: 'Features', href: `${aipsOrigin}/features` },
    { labelKey: 'Pricing', href: `${aipsOrigin}/pricing` },
    { labelKey: 'Download', href: `${aipsOrigin}/download` },
  ]
}

export function getApiProductLinks(
  apiOrigin = ENTERPRISE_ORIGINS.api
): EnterpriseNavItem[] {
  return [
    { labelKey: 'Overview', href: `${apiOrigin}/` },
    { labelKey: 'Model Marketplace', href: `${apiOrigin}/pricing` },
    { labelKey: 'Docs', href: `${apiOrigin}/doc` },
  ]
}

export type EnterpriseFooterColumn = {
  titleKey: string
  links: EnterpriseNavItem[]
}

export function getEnterpriseFooterColumns(
  origins = ENTERPRISE_ORIGINS
): EnterpriseFooterColumn[] {
  return [
    {
      titleKey: 'Product',
      links: [
        { labelKey: 'AIPS', href: origins.aips },
        { labelKey: 'Features', href: `${origins.aips}/features` },
        { labelKey: 'Pricing', href: `${origins.aips}/pricing` },
        { labelKey: 'Download', href: `${origins.aips}/download` },
        { labelKey: 'API', href: `${origins.api}/` },
        { labelKey: 'Model Marketplace', href: `${origins.api}/pricing` },
        { labelKey: 'Docs', href: `${origins.api}/doc` },
      ],
    },
    {
      titleKey: 'Company',
      links: [
        { labelKey: 'About', href: `${origins.www}/about` },
        { labelKey: 'Support', href: `${origins.www}/support` },
      ],
    },
    {
      titleKey: 'Legal',
      links: [
        { labelKey: 'Privacy Policy', href: `${origins.www}/legal/privacy` },
        { labelKey: 'Terms of Service', href: `${origins.www}/legal/terms` },
      ],
    },
  ]
}
