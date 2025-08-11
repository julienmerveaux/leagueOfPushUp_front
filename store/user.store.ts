import { create } from 'zustand'
import apiUser from "../axios/user/user.axios"

type User = {
    username?: string
    email?: string
    [key: string]: any
} | null

interface UserStore {
    user: User
    setUser: (user: User) => void
    login: (credentials: { username: string; password: string }) => Promise<User>
    signUp: (data: { username: string; passwordHash: string, tagLine:string, region:string }) => Promise<User>
}

const useStore = create<UserStore>((set) => ({
    user: null,

    setUser: (user) => set({ user }),

    login: async (credentials) => {
        try {
            const response = await apiUser.login(credentials)
            const userData = response.data
            set({ user: userData })
            return userData
        } catch (error) {
            console.error("Erreur login :", error)
            throw error
        }
    },
    signUp: async (data) => {
        try {
            const response = await apiUser.signUp(data)
            const userData = response.data
            set({ user: userData })
            return userData
        } catch (error) {
            console.error("Erreur login :", error)
            throw error
        }
    },
}))

export default useStore
