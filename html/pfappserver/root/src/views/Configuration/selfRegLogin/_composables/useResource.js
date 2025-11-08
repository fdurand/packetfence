import { computed } from '@vue/composition-api'
import i18n from '@/utils/locale'

export const useTitle = () => i18n.t('Self Reg Login')

export const useStore = $store => {
  return {
    isLoading: computed(() => $store.getters['$_bases/isLoading']),
    getItem: () => $store.dispatch('$_bases/getSelfRegLogin'),
    getItemOptions: () => $store.dispatch('$_bases/optionsSelfRegLogin'),
    updateItem: params => $store.dispatch('$_bases/updateSelfRegLogin', params)
  }
}

export const useServices = () => computed(() => {
  return {
    message: i18n.t('Modifying the self reg login configuration requires to restart the httpd.portal service.'),
    services: ['httpd.portal'],
    k8s_services: ['httpd-portal']
  }
})
