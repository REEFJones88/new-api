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
import type { EnterpriseNavigationAuth } from '@doohuan/enterprise-navigation'
import { Link } from '@tanstack/react-router'

import { ProfileDropdown } from '@/components/profile-dropdown'
import { useAuthStore } from '@/stores/auth-store'

/**
 * 将 new-api 的 Zustand 会话转换成共享导航协议。
 * 退出、角色菜单和钱包等控制台能力仍由原生 ProfileDropdown 负责。
 */
export function useNewApiNavigationAuthAdapter(
  dashboardLabel: string
): EnterpriseNavigationAuth {
  const auth = useAuthStore((state) => state.auth)

  if (auth.bootstrapState !== 'complete') {
    return { status: 'loading', signInHref: '/login' }
  }
  if (!auth.user) {
    return {
      status: 'anonymous',
      signInHref: '/login',
      registerHref: 'https://www.doohuan.com/register',
    }
  }

  return {
    status: 'authenticated',
    signInHref: '/login',
    dashboardHref: '/dashboard',
    desktopAuthenticated: <ProfileDropdown />,
    mobileHeaderAuthenticated: <ProfileDropdown />,
    mobileAuthenticated: (
      <Link
        to='/dashboard'
        className='inline-flex h-10 w-full items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-medium text-white'
      >
        {dashboardLabel}
      </Link>
    ),
  }
}
