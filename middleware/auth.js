import { routeOption } from '@/auth/auth.utilities'

export default function(ctx) {
  if(routeOption(ctx.route, 'auth', false)) {
    return
  }

  const { login } = ctx.app.$auth.options.redirect

  if(ctx.app.$auth.state.loggedIn) {
    if(login && ctx.route.path === login.split('?')[0]) {
      ctx.app.$auth.redirect('home')
    } else {
      if(ctx.route.meta[0].guard.indexOf(ctx.store.state.auth.user.role) < 0) {
        ctx.app.$auth.redirect('guard')
      }
    }
  } else {
    ctx.app.$auth.redirect('login')
  }
}
