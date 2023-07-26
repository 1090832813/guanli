import router from './index'
import cookie from 'js-cookies'
import store from '@/store/store'
import user from '../api/user.js'
router.beforeEach((to, from, next) => {
    let token = cookie.getItem('SESSDATA')
    
    if (token) {
        user.verify().then(res => {
            if (res.data.username) {
                store.commit('setToken', token)
                store.dispatch('getMsg')
                store.dispatch('getId')
                if (to.path != '/login') {
                    next()
                } else {
                    next('/home/chart')
                }
            } else {
                next('/login')
            }
        })

    } else {
        if (to.path == '/login') {
            next();
        } else {
            next('/login')
        }
    }
})
export default router;