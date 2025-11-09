import store from '@/store'
import BasesStoreModule from '../bases/_store'

const TheTabs = () => import(/* webpackChunkName: "Configuration" */ './_components/TheTabs')

export const beforeEnter = (to, from, next = () => {}) => {
  if (!store.state.$_bases) {
    store.registerModule('$_bases', BasesStoreModule)
  }
  next()
}

export default [
  {
    path: 'sso_login',
    name: 'ssoLogin',
    component: TheTabs,
    props: (route) => ({ tab: route.params.tab || 'ssoLoginAdmin' }),
    beforeEnter,
    redirect: { name: 'ssoLoginAdmin' },
    children: [
      {
        path: 'admin',
        name: 'ssoLoginAdmin',
        component: TheTabs,
        props: { tab: 'ssoLoginAdmin' },
        beforeEnter
      },
      {
        path: 'sponsor',
        name: 'ssoLoginSponsor',
        component: TheTabs,
        props: { tab: 'ssoLoginSponsor' },
        beforeEnter
      },
      {
        path: 'status',
        name: 'ssoLoginStatus',
        component: TheTabs,
        props: { tab: 'ssoLoginStatus' },
        beforeEnter
      }
    ]
  }
]
