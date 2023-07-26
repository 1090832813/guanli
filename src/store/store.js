import Vue from 'vue'
import Vuex from 'vuex'
import course from '@/api/course'
import user from '@/api/user'
import chapter from '@/api/chapter'
import videos from '@/api/videos'
import model from '@/api/model'
import vip from '@/api/vip'
import chart from '@/api/chart'
import login from '@/api/login'
Vue.use(Vuex)


export default new Vuex.Store({
    state: {
        token: '',
        msg: {},
        course: [],
    },
    mutations: {
        setToken(state, token) {
            state.token = token
        },
        setMsg(state, msg) {
            state.msg={}
            state.msg.username = msg.username;
            state.msg.avator = msg.avator;
            state.msg.gender = msg.gender;
            state.msg.id = msg.id;
            state.msg.phone = msg.phone;
            state.msg.email = msg.email
        },
        setId(state, payload) {
            state.course = null
            state.course = payload

        },
        setNewName(state, payload) {
            state.course.forEach((item) => {
                if (item.id == payload.id) {
                    item.name = payload.name;
                    return;
                }
            })
        },
        setNewCourse(state, payload) {
            state.course.push(payload)
        },
        delCourse(state, payload) {
            console.log(payload)
            state.course.forEach((item,i) => {
                if (item.id == payload) {
                    state.course.splice(i, 1)
                }
            })
            
        }
    },
    actions: {
        getMsg({ commit }) {
            user.verify().then(res => {

                commit('setMsg', res.data)
            })
        },
        getId({ commit }) {
            course.mainCourse().then(res => {
                commit('setId', res.data.data)
            })
        },
        changeCourse({ commit }, payload) {
            return course.changeCourse(payload.id, payload.name)
        },
        addCourse({ commit }, payload) {
            return course.addCourse(payload)
        },
        getNewCourse({ commit }) {
            course.mainCourse().then(res => {
                commit('setNewCourse', res.data.data[res.data.data.length - 1])
            })
        },
        deleteCourse({ commit }, payload) {
            
            return course.deleteCourse(payload)
        },
        getChapter({ commit }, payload) {
            return chapter.getChapter(payload)
        },
        addChapter({ commit }, payload) {
            return chapter.addChapter(payload)
        },
        deleteChapter({ commit }, payload) {
            return chapter.deleteChapter(payload)
        },
        changeChapter({ commit }, payload) {
            return chapter.changeChapter(payload)
        },
        getVideo({commit},payload){
            return videos.getVideo(payload)
        },
        getModel({commit},payload){
            return model.getModel(payload)
        },
        addModel({commit},payload){
            return model.addModel(payload)
        },
        changeModel({commit},payload){
            return model.changeModel(payload)
        },
        delModel({commit},payload){
            return model.delModel(payload)
        },
        getVip({commit}){
            return vip.getVip()
        },
        addVip({commit},payload){
            return vip.addVip(payload)
        },
        changeVip({commit},payload){
            return vip.changeVip(payload)
        },
        delVip({commit},payload){
            return vip.deleteVip(payload)
        },
        getLog({commit},payload){
            return user.loginLog(payload)
        },
        changePhoto({commit},payload){
            return user.changePhoto(payload)
        },
        getRiseUser({commit}){
            return chart.getRiseUser();
        },
        getAllMoney({commit}){
            return chart.getAllMoney();
        },
        getRiseMoney({commit}){
            return chart.getRiseMoney();
        },
        getRiseVip({commit}){
            return chart.getRiseVip();
        },
        oldEmail({commit},payload){
            return user.oldEmail(payload)
        },
        oldCode({commit}){
            return user.oldCode()
        },
        changeEmail({commit},payload){
            return user.changeEmail(payload)
        },
        newCode({commit},payload){
            return user.newCode(payload)
        },
        superUser({commit}){
            return user.superUser()
        },
        addSuperUser({commit},payload){
            return user.addSuperUser(payload)
        },
        delSuperUser({commit},payload){
            return user.delSuperUser(payload)
        },
        changePwd({commit},payload){
            return user.changePwd(payload)
        },
        pwdCode({commit}){
            return user.pwdCode()
        },
        budCode({commit},payload){
            return user.budCode(payload)
        },
        budEmail({commit},payload){
            return user.budEmail(payload)
        }
    }
});