<template>
  <b-card no-body>
    <b-card-header>
      <h4 class="mb-0" v-t="'SSO Login Configuration'"></h4>
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
import AdminLoginView from '../adminLogin/_components/TheView'
import SelfRegLoginView from '../selfRegLogin/_components/TheView'

const tabs = {
  admin_login: {
    title: 'Admin Login', // i18n defer
    component: AdminLoginView
  },
  self_reg_login: {
    title: 'Self Reg Login', // i18n defer
    component: SelfRegLoginView
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
  name: 'sso-login-tabs',
  props,
  setup
}
</script>
