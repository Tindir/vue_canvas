import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state:{
        obj:[]
    },
    getters : {
        
    },
    mutations: {
        objAdd:(state, nObj) => {
            state.obj.push(nObj);         
        }
    },
    actions : {
        new_obj: state => {
            var nObj = {
                id: '00000000-0000-0000-0000-000000000000',
                name: '',
                areaOf: 0.0,
                parentid: '00000000-0000-0000-0000-000000000000',
                comments: '',
                data: ''
            }
            return nObj;
        },

        add_obj: state=>{
            
        }
    }  

})