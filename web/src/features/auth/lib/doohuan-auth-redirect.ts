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

const DOOHUAN_API_HOST = 'api.doohuan.com'
const DOOHUAN_REGISTER_URL = 'https://www.doohuan.com/register'
const DOOHUAN_SIGN_OUT_URL =
  'https://www.doohuan.com/auth/signout?api=1&next=/login'

function sanitizeReturnPath(returnTo?: string): string {
  if (!returnTo) return '/console'

  try {
    const url = new URL(returnTo, `https://${DOOHUAN_API_HOST}`)
    if (url.hostname !== DOOHUAN_API_HOST) return '/console'

    const path = `${url.pathname}${url.search}${url.hash}`
    return path === '/dashboard' ? '/console' : path
  } catch {
    return '/console'
  }
}

/**
 * 多焕托管域名必须统一使用 www 账号体系，禁止显示上游原生登录页。
 */
export function getDoohuanSSORedirect(
  hostname: string,
  returnTo?: string
): string | null {
  if (hostname !== DOOHUAN_API_HOST) return null

  const returnPath = sanitizeReturnPath(returnTo)
  return `/sso/continue?return=${encodeURIComponent(returnPath)}`
}

/**
 * 多焕托管域名禁止使用上游原生注册页。
 */
export function getDoohuanRegisterRedirect(hostname: string): string | null {
  return hostname === DOOHUAN_API_HOST ? DOOHUAN_REGISTER_URL : null
}

/**
 * 多焕托管域名退出时必须先清除 www 的 Supabase 会话，再回到 API 清理
 * new-api 会话；否则下次访问控制台会被仍有效的 www 会话自动登录。
 */
export function getDoohuanSignOutRedirect(hostname: string): string | null {
  return hostname === DOOHUAN_API_HOST ? DOOHUAN_SIGN_OUT_URL : null
}
