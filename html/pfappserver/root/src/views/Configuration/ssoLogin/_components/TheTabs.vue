<template>
  <b-card no-body>
    <b-card-header>
      <h4 class="mb-0" v-t="'SSO Login'"></h4>
    </b-card-header>
    <b-tabs ref="tabs" v-model="tabIndex" card lazy>
      <b-tab v-for="(tab, index) in tabs" :key="index"
        :title="$t(tab.title)" @click="tabIndex = index">
        <component :is="tab.component" />
      </b-tab>
    </b-tabs>
  </b-card>
</template>

<script>
import AdminLoginView from '../admin/_components/TheView'
import SponsorLoginView from '../sponsor/_components/TheView'
import StatusLoginView from '../status/_components/TheView'

const tabs = {
  ssoLoginAdmin: {
    title: 'Admin Login', // i18n defer
    component: AdminLoginView
  },
  ssoLoginSponsor: {
    title: 'Sponsor Login', // i18n defer
    component: SponsorLoginView
  },
  ssoLoginStatus: {
    title: 'Status Login', // i18n defer
    component: StatusLoginView
  }
}

const props = {
  tab: {
    type: String,
    default: Object.keys(tabs)[0]
  }
}

import { customRef, toRefs } from '@vue/composition-api'

const setup = (props, context) => {

  const {
    tab
  } = toRefs(props)

  const { root: { $router } = {} } = context

  const tabIndex = customRef((track, trigger) => ({
    get() {
      track()
      return Object.keys(tabs).indexOf(tab.value)
    },
    set(newValue) {
      $router.push({ name: Object.keys(tabs)[newValue] })
        .catch(e => { if (e.name !== "NavigationDuplicated") throw e })
      trigger()
    }
  }))

  return {
    tabs,
    tabIndex
  }
}

// @vue/component
export default {
  name: 'the-tabs-sso-login',
  props,
  setup
}
</script>
