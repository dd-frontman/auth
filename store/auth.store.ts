import { defineStore } from 'pinia'
import { ref, computed, Ref } from 'vue'
import userData from '@/interfaces/userData'

export const useAuthStore = defineStore('auth', () => {
    const user: Ref<userData | {}> = ref({})
    const isLoggedIn = computed(() => 'token' in user.value && user.value.token !== '')

    function setUserData(data: userData) {
        user.value = data
    }

    return { user, isLoggedIn, setUserData }
})
