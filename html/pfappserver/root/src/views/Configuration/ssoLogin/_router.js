import store from '@/store'
import BasesStoreModule from '../bases/_store'

const SsoLoginView = () => import(/* webpackChunkName: "Configuration" */ './index')
const AdminLoginView = () => import(/* webpackChunkName: "Configuration" */ '../adminLogin/_components/TheView')
const SelfRegLoginView = () => import(/* webpackChunkName: "Configuration" */ '../selfRegLogin/_components/TheView')

export const beforeEnter = (to, from, next = () => {}) => {
  if (!store.state.$_bases) {
    store.registerModule('$_bases', BasesStoreModule)
  }
  next()
}

export default [
  {
    path: 'sso_login',
    name: 'sso_login',
    component: SsoLoginView,
    beforeEnter,
    redirect: { name: 'admin_login' },
    props: (route) => ({ tab: route.name }),
    children: [
      {
        path: 'admin_login',
        name: 'admin_login',
        component: AdminLoginView,
        beforeEnter
      },
      {
        path: 'self_reg_login',
        name: 'self_reg_login',
        component: SelfRegLoginView,
        beforeEnter
      }
    ]
  }
]
