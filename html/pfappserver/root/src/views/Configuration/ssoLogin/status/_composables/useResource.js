import { computed } from '@vue/composition-api'
import i18n from '@/utils/locale'

export const useTitle = () => i18n.t('Status Login')

export const useStore = $store => {
  return {
    isLoading: computed(() => $store.getters['$_bases/isLoading']),
    getItem: () => $store.dispatch('$_bases/getStatusLogin'),
    getItemOptions: () => $store.dispatch('$_bases/optionsStatusLogin'),
    updateItem: params => $store.dispatch('$_bases/updateStatusLogin', params)
  }
}

export const useServices = () => computed(() => {
  return {
    message: i18n.t('Modifying the status login configuration requires to restart the captive portal service.'),
    services: ['haproxy-portal'],
    k8s_services: ['haproxy-portal']
  }
})
