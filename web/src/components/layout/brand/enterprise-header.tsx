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
import { Link } from '@tanstack/react-router'
import { ChevronDown, Menu } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { ConfigDrawer } from '@/components/config-drawer'
import { LanguageSwitcher } from '@/components/language-switcher'
import { NotificationPopover } from '@/components/notification-popover'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { useNotifications } from '@/hooks/use-notifications'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'

import {
  ENTERPRISE_ORIGINS,
  ENTERPRISE_SHELL_BG,
  getAboutHref,
  getAipsProductLinks,
  getApiProductLinks,
} from './enterprise-nav-config'
import './enterprise-shell.css'

const FLOAT_AFTER = 120

type OpenDropdown = null | 'aips' | 'api'

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

function DropdownPanel(props: {
  open: boolean
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'absolute top-full left-0 pt-2 transition-all duration-150',
        props.open
          ? 'visible opacity-100'
          : 'pointer-events-none invisible opacity-0'
      )}
    >
      <div className='min-w-[200px] rounded-lg border border-[#d5dae2] bg-white py-2 shadow-lg'>
        {props.children}
      </div>
    </div>
  )
}

function DropdownLink(props: { href: string; label: string }) {
  return (
    <a
      href={props.href}
      className='block px-4 py-2 text-[14px] text-[#5c6673] transition-colors hover:bg-[#eef1f4] hover:text-[#1a1f26]'
    >
      {props.label}
    </a>
  )
}

function SiteLogo(props: { floated: boolean; href?: string }) {
  const href = props.href ?? ENTERPRISE_ORIGINS.api + '/'
  const img = props.floated ? (
    <img
      src='/doohuan-icon.svg'
      alt='Doohuan'
      width={26}
      height={26}
      className='object-contain'
    />
  ) : (
    <img
      src='/doohuan-wordmark.svg'
      alt='Doohuan'
      width={104}
      height={16}
      className='object-contain'
    />
  )
  return (
    <a href={href} className='inline-flex w-fit shrink-0' aria-label='Doohuan'>
      {img}
    </a>
  )
}

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
  const { auth } = useAuthStore()
  const notifications = useNotifications()
  const navRef = useRef<HTMLElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const isAuthenticated = !!auth.user
  const isConsole = variant === 'console'
  const aboutHref = getAboutHref()
  const aipsLinks = getAipsProductLinks()
  const apiLinks = getApiProductLinks()

  useEffect(() => {
    let ticking = false
    const apply = () => {
      ticking = false
      setIsScrolled(window.scrollY > FLOAT_AFTER)
    }
    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(apply)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    apply()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!openDropdown) return
    const onPointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenDropdown(null)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenDropdown(null)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [openDropdown])

  const toggleDropdown = (id: Exclude<OpenDropdown, null>) => {
    setOpenDropdown((prev) => (prev === id ? null : id))
  }

  const productLinkClass =
    'flex cursor-pointer items-center gap-1 rounded-full border-0 bg-transparent px-3 py-1.5 text-[14px] font-normal tracking-[-0.01em] transition-colors duration-200'
  const productLinkIdle = 'text-[#6b7280] hover:text-[#1a1f26]'
  const productLinkActive = 'text-[#1a1f26]'

  const desktopNav = (
    <>
      <a
        href={aboutHref}
        className='rounded-full px-3 py-1.5 text-[14px] font-normal tracking-[-0.01em] text-[#6b7280] transition-colors duration-200 hover:text-[#1a1f26]'
      >
        {t('About')}
      </a>
      <div className='relative'>
        <button
          type='button'
          className={cn(productLinkClass, productLinkIdle)}
          aria-expanded={openDropdown === 'aips'}
          aria-haspopup='menu'
          onClick={() => toggleDropdown('aips')}
        >
          {t('AIPS')}
          <ChevronDown className='size-3 stroke-[1.75] opacity-45' />
        </button>
        <DropdownPanel open={openDropdown === 'aips'}>
          {aipsLinks.map((item) => (
            <DropdownLink
              key={item.href}
              href={item.href}
              label={t(item.labelKey)}
            />
          ))}
        </DropdownPanel>
      </div>
      <div className='relative'>
        <button
          type='button'
          className={cn(productLinkClass, productLinkActive)}
          aria-expanded={openDropdown === 'api'}
          aria-haspopup='menu'
          aria-current='page'
          onClick={() => toggleDropdown('api')}
        >
          {t('API')}
          <ChevronDown className='size-3 stroke-[1.75] opacity-45' />
        </button>
        <DropdownPanel open={openDropdown === 'api'}>
          {apiLinks.map((item) => (
            <DropdownLink
              key={item.href}
              href={item.href}
              label={t(item.labelKey)}
            />
          ))}
        </DropdownPanel>
      </div>
    </>
  )

  const mobileNav = (
    <div className='flex flex-col gap-1'>
      <a
        href={aboutHref}
        className='rounded-lg px-3 py-2.5 text-[15px] text-[#5c6673] hover:bg-[#e8ecf1]'
        onClick={() => setMobileOpen(false)}
      >
        {t('About')}
      </a>
      <div className='mt-2 px-3 py-2 text-[12px] font-medium tracking-wider text-[#8a93a0] uppercase'>
        {t('AIPS')}
      </div>
      {aipsLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className='rounded-lg py-2.5 pr-3 pl-6 text-[15px] text-[#5c6673] hover:bg-[#e8ecf1]'
          onClick={() => setMobileOpen(false)}
        >
          {t(item.labelKey)}
        </a>
      ))}
      <div className='mt-2 px-3 py-2 text-[12px] font-medium tracking-wider text-[#8a93a0] uppercase'>
        {t('API')}
      </div>
      {apiLinks.map((item) => (
        <a
          key={item.href}
          href={item.href}
          className='rounded-lg py-2.5 pr-3 pl-6 text-[15px] text-[#5c6673] hover:bg-[#e8ecf1]'
          onClick={() => setMobileOpen(false)}
        >
          {t(item.labelKey)}
        </a>
      ))}
    </div>
  )

  const consoleTools = (
    <div className='ms-auto flex items-center gap-1 sm:gap-2'>
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
    </div>
  )

  const publicAuth = (
    <div className='hidden items-center gap-1 md:flex'>
      {showLanguageSwitcher && <LanguageSwitcher />}
      {isAuthenticated ? (
        <ProfileDropdown />
      ) : (
        <a
          href='/login'
          className='rounded-full border border-[#d5dae2] px-3.5 py-1.5 text-[13px] font-medium text-[#1a1f26] transition-colors hover:bg-[#eef1f4]'
        >
          {t('Sign in')}
        </a>
      )}
    </div>
  )

  const shellInner = (
    <div
      className={cn(
        'pointer-events-auto mx-auto transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
        isScrolled
          ? 'max-w-[56rem] px-3 pt-3.5'
          : 'max-w-[1600px] px-4 pt-0 sm:px-9'
      )}
    >
      <div
        className={cn(
          'flex w-full items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]',
          isScrolled
            ? 'h-12 rounded-full bg-white/70 px-3 pl-5 shadow-[0_8px_28px_-12px_rgba(26,31,38,0.18)] ring-1 ring-[#d5dae2]/65 backdrop-blur-[18px] backdrop-saturate-150'
            : 'h-16 bg-transparent px-0'
        )}
      >
        <div className='flex min-w-0 flex-1 items-center justify-start gap-1'>
          {isConsole && (
            <SidebarTrigger variant='ghost' className='size-8 shrink-0' />
          )}
          <SiteLogo floated={isScrolled} />
        </div>

        <nav
          ref={navRef}
          className='hidden shrink-0 items-center justify-center gap-1 whitespace-nowrap md:flex'
        >
          {desktopNav}
        </nav>

        <div className='flex min-w-0 flex-1 items-center justify-end gap-1'>
          {isConsole ? consoleTools : publicAuth}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              render={
                <Button
                  type='button'
                  variant='ghost'
                  size='icon'
                  className='size-9 md:hidden'
                  aria-label={t('Toggle navigation menu')}
                />
              }
            >
              <Menu className='size-5' />
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[300px] border-l border-[#d5dae2] p-0'
              style={{ backgroundColor: ENTERPRISE_SHELL_BG }}
            >
              <SheetHeader className='border-b border-[#d5dae2] p-4'>
                <SheetTitle className='sr-only'>{t('Navigation')}</SheetTitle>
                <img
                  src='/doohuan-wordmark.svg'
                  alt='Doohuan'
                  width={120}
                  height={18}
                  className='object-contain'
                />
              </SheetHeader>
              <div className='flex h-full flex-col overflow-y-auto p-4'>
                {mobileNav}
                {!isConsole && !isAuthenticated && (
                  <a
                    href='/login'
                    className='mt-auto inline-flex h-10 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-medium text-white'
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('Sign in')}
                  </a>
                )}
                {!isConsole && isAuthenticated && (
                  <Link
                    to='/dashboard'
                    className='mt-auto inline-flex h-10 items-center justify-center rounded-full bg-[#1a1a1a] text-sm font-medium text-white'
                    onClick={() => setMobileOpen(false)}
                  >
                    {t('Console')}
                  </Link>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  )

  if (isConsole) {
    return (
      <header
        className={cn(
          'dh-enterprise-console-header sticky top-0 z-40 w-full shrink-0',
          props.className
        )}
        style={{ backgroundColor: ENTERPRISE_SHELL_BG }}
      >
        {shellInner}
      </header>
    )
  }

  return (
    <header
      className={cn(
        'pointer-events-none fixed inset-x-0 top-0 z-50',
        props.className
      )}
    >
      {shellInner}
    </header>
  )
}
