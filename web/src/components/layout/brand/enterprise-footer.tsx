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
import { useTranslation } from 'react-i18next'

import { cn } from '@/lib/utils'

import {
  ENTERPRISE_ORIGINS,
  ENTERPRISE_SHELL_BG,
  getEnterpriseFooterColumns,
} from './enterprise-nav-config'

const NEW_API_FOOTER_ATTRIBUTION_KEY = [
  'footer',
  'new' + 'api',
  'projectAttributionSuffix',
].join('.')

type EnterpriseFooterProps = {
  className?: string
  showCta?: boolean
}

function ProjectAttribution(props: { currentYear: number }) {
  const { t } = useTranslation()
  return (
    <span className='text-[12px] text-[#8a93a0]'>
      &copy; {props.currentYear}{' '}
      <a
        href='https://github.com/QuantumNous/new-api'
        target='_blank'
        rel='noopener noreferrer'
        className='font-medium text-[#5c6673] transition-colors hover:text-[#1a1f26]'
      >
        {t('New API')}
      </a>
      . {t(NEW_API_FOOTER_ATTRIBUTION_KEY)}
    </span>
  )
}

export function EnterpriseFooter(props: EnterpriseFooterProps) {
  const { t } = useTranslation()
  const columns = getEnterpriseFooterColumns()
  const currentYear = new Date().getFullYear()
  const showCta = props.showCta !== false

  return (
    <footer
      className={cn('border-t border-[#d5dae2]', props.className)}
      style={{ backgroundColor: ENTERPRISE_SHELL_BG }}
    >
      {showCta ? (
        <div className='mx-auto w-full px-[clamp(20px,2.5vw,40px)] py-20'>
          <div className='text-center'>
            <h2 className='mb-6 text-[32px] font-medium tracking-[-0.02em] text-[#1a1f26] md:text-[40px]'>
              {t('Start building with Doohuan API')}
            </h2>
            <div className='flex flex-wrap justify-center gap-3'>
              <a
                href='/login'
                className='inline-flex items-center rounded-full bg-[#1a1a1a] px-6 py-3 text-[14px] font-medium text-white transition-colors hover:bg-[#333]'
              >
                {t('Sign in')}
              </a>
              <a
                href={`${ENTERPRISE_ORIGINS.api}/doc`}
                className='inline-flex items-center rounded-full border border-[#d5dae2] px-6 py-3 text-[14px] font-medium text-[#1a1f26] transition-colors hover:bg-[#eef1f4]'
              >
                {t('Docs')}
              </a>
            </div>
          </div>
        </div>
      ) : null}

      <div
        className={`mx-auto w-full px-[clamp(20px,2.5vw,40px)] pb-8${showCta ? '' : ' pt-14'}`}
      >
        <div className='grid grid-cols-2 gap-8 border-t border-[#d5dae2] py-10 md:grid-cols-4 lg:grid-cols-6'>
          <div className='col-span-2'>
            <a href={ENTERPRISE_ORIGINS.www} className='mb-4 inline-block'>
              <img
                src='/doohuan-wordmark.svg'
                alt='Doohuan'
                width={132}
                height={20}
                className='object-contain'
              />
            </a>
          </div>
          {columns.map((col) => (
            <div key={col.titleKey}>
              <h3 className='mb-4 text-[13px] font-medium text-[#1a1f26]'>
                {t(col.titleKey)}
              </h3>
              <ul className='space-y-3'>
                {col.links.map((link) => (
                  <li key={link.href + link.labelKey}>
                    <a
                      href={link.href}
                      className='text-[13px] text-[#5c6673] transition-colors hover:text-[#1a1f26]'
                    >
                      {t(link.labelKey)}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className='flex flex-col items-center justify-between gap-4 pt-8 md:flex-row'>
          <div className='flex flex-wrap items-center gap-4 text-[12px] text-[#8a93a0]'>
            <span>
              &copy; {currentYear} {t('Doohuan AI')}
            </span>
            <span className='hidden md:inline'>|</span>
            <a
              href='https://beian.miit.gov.cn/'
              target='_blank'
              rel='noopener noreferrer'
              className='transition-colors hover:text-[#5c6673]'
            >
              粤ICP备2024330268号-1
            </a>
          </div>
          <ProjectAttribution currentYear={currentYear} />
        </div>
      </div>
    </footer>
  )
}
