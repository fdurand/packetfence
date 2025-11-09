import { computed } from '@vue/composition-api'
import i18n from '@/utils/locale'

export const useTitle = () => i18n.t('Sponsor Login')

export const useStore = $store => {
  return {
    isLoading: computed(() => $store.getters['$_bases/isLoading']),
    getItem: () => $store.dispatch('$_bases/getSponsorLogin'),
    getItemOptions: () => $store.dispatch('$_bases/optionsSponsorLogin'),
    updateItem: params => $store.dispatch('$_bases/updateSponsorLogin', params)
  }
}

export const useServices = () => computed(() => {
  return {
    message: i18n.t('Modifying the sponsor login configuration requires to restart the captive portal service.'),
    services: ['haproxy-portal'],
    k8s_services: ['haproxy-portal']
  }
})
