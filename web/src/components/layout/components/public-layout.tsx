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
import { ENTERPRISE_SHELL_BG } from '../brand/enterprise-nav-config'
import { EnterpriseHeader } from '../brand/enterprise-header'
import type { TopNavLink } from '../types'
import type { PublicHeaderProps } from './public-header'

type PublicLayoutProps = {
  children: React.ReactNode
  showMainContainer?: boolean
  navContent?: React.ReactNode
  headerProps?: Omit<PublicHeaderProps, 'navContent'>
  navLinks?: TopNavLink[]
  showThemeSwitch?: boolean
  showAuthButtons?: boolean
  showNotifications?: boolean
  logo?: React.ReactNode
  siteName?: string
}

export function PublicLayout(props: PublicLayoutProps) {
  return (
    <div
      className='text-foreground relative min-h-svh overflow-x-clip'
      style={{ backgroundColor: ENTERPRISE_SHELL_BG }}
    >
      <EnterpriseHeader
        variant='public'
        showNotifications={props.showNotifications}
      />

      {props.showMainContainer !== false ? (
        <main className='container px-4 py-6 pt-24 md:px-4'>
          {props.children}
        </main>
      ) : (
        props.children
      )}
    </div>
  )
}
