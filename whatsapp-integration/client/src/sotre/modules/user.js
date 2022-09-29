// import axios from 'axios';
import SocketioService from '../../services/socketio.service';

export default {
    state: () => ({
        name: 'meii',
        phoneNumber: '5493886856816',
        messages: []
    }),
    getters:{},
    mutations: {
        SET_NAME(state, payload){
            state.name = payload;
        },
        SET_PHONE_NUMBER(state, payload){
            state.phoneNumber = payload;
        },
        SET_MESSAGES(state, payload){
            state.messages.push(payload);
            console.log(state.messages);
        }
    },
    actions:{
        saveName({ commit }, name){
            commit('SET_NAME', name);
        },
        savePhoneNumber({ commit }, number){
            commit('SET_PHONE_NUMBER', number);
        },
        sendMessage({ commit }, message){
            commit('SET_MESSAGES', message);
            SocketioService.sendMessage(message);
            // axios.post('http://localhost:3000/message', message);
        },
        receiveMessage ({ commit }, data) {
            commit('SET_MESSAGES', data);
        },
    },
}