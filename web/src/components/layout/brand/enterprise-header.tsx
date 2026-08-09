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
import {
  EnterpriseNavigation,
  type EnterpriseNavigationLabels,
} from '@doohuan/enterprise-navigation'

import '@doohuan/enterprise-navigation/styles.css'
import { useTranslation } from 'react-i18next'

import { ConfigDrawer } from '@/components/config-drawer'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NotificationPopover } from '@/components/notification-popover'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useNotifications } from '@/hooks/use-notifications'

import {
  ENTERPRISE_ORIGINS,
  ENTERPRISE_SHELL_BG,
} from './enterprise-nav-config'
import { useNewApiNavigationAuthAdapter } from './new-api-navigation-auth-adapter'

import './enterprise-shell.css'

type EnterpriseHeaderProps = {
  /** console = authenticated shell; public = marketing/pricing pages */
  variant?: 'console' | 'public'
  showSearch?: boolean
  showNotifications?: boolean
  showConfigDrawer?: boolean
  showProfileDropdown?: boolean
  showLanguageSwitcher?: boolean
  className?: string
}

/**
 * new-api 宿主只注入控制台工具和 Zustand 认证；菜单及所有导航交互来自共享包。
 */
export function EnterpriseHeader(props: EnterpriseHeaderProps) {
  const {
    variant = 'public',
    showSearch = true,
    showNotifications = true,
    showConfigDrawer = true,
    showProfileDropdown = true,
    showLanguageSwitcher = true,
  } = props
  const { t } = useTranslation()
  const notifications = useNotifications()
  const auth = useNewApiNavigationAuthAdapter(t('Console'))
  const isConsole = variant === 'console'
  const labels: EnterpriseNavigationLabels = {
    about: t('About'),
    aips: t('AIPS'),
    api: t('API'),
    home: t('Home'),
    features: t('Features'),
    pricing: t('Pricing'),
    download: t('Download'),
    apiOverview: t('Overview'),
    apiModels: t('Model Marketplace'),
    apiDocs: t('Docs'),
    signIn: t('Sign in'),
    register: t('Sign up'),
    dashboard: t('Console'),
    navigation: t('Navigation'),
    closeNavigation: t('Close'),
  }

  const consoleTools = isConsole ? (
    <>
      {showSearch && <Search />}
      {showNotifications && (
        <NotificationPopover
          open={notifications.popoverOpen}
          onOpenChange={notifications.setPopoverOpen}
          unreadCount={notifications.unreadCount}
          activeTab={notifications.activeTab}
          onTabChange={notifications.setActiveTab}
          notice={notifications.notice}
          announcements={notifications.announcements}
          loading={notifications.loading}
        />
      )}
      {showLanguageSwitcher && <LanguageSwitcher />}
      {showConfigDrawer && <ConfigDrawer />}
      {showProfileDropdown && <ProfileDropdown />}
    </>
  ) : (
    showLanguageSwitcher && <LanguageSwitcher />
  )

  return (
    <EnterpriseNavigation
      site='api'
      mode={isConsole ? 'console' : 'marketing'}
      origins={ENTERPRISE_ORIGINS}
      labels={labels}
      assets={{
        wordmarkSrc: '/doohuan-wordmark.svg',
        iconSrc: '/doohuan-icon.svg',
        alt: 'Doohuan',
      }}
      auth={auth}
      slots={{
        leading: isConsole ? (
          <SidebarTrigger variant='ghost' className='size-8 shrink-0' />
        ) : undefined,
        desktopActions: consoleTools,
        mobileHeaderActions:
          isConsole && showProfileDropdown ? <ProfileDropdown /> : undefined,
      }}
      className={[
        isConsole ? 'dh-enterprise-console-header' : '',
        props.className,
      ]
        .filter(Boolean)
        .join(' ')}
      backgroundColor={ENTERPRISE_SHELL_BG}
    />
  )
}
