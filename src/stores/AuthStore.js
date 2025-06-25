import {create} from 'zustand'
import {persist} from "zustand/middleware";

const useAuthStore = create()(
    persist(
        (set) => ({
          isLoggedIn: false,
          username: "",
          roles: [],
          accessToken: "",

          login: (claims, token) => set({
            isLoggedIn: true,
            username: claims.sub, roles: claims.roles.split(","), accessToken: token
          }),

          logout:() => set({
            isLoggedIn: false,
            username: "", roles: [], accessToken: ""
          }),
        }),
        {name: 'auth-storage'},
    ),
)

export default useAuthStore