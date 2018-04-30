import '@/middleware/auth'
import Auth from '@/auth/auth.class'

export default function (ctx, inject) {
  const $auth = new Auth(ctx)

  inject('auth', $auth)

  return $auth.init().catch(error => {
    if (process.browser) {
      console.error('[ERROR] [AUTH]', error)
    }
  })
}
