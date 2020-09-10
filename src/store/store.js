import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        planing: {}
    },
    getters: {
        getPlaningAll: state => {
            return state.planing;
        }
    },
    actions: {
        preload(context) {
            context.commit('preload');
        }
    },
    mutations: {
        preload(state) {
            var p = [
                {    id: 1,
                        name: 'mall house',

                        floors: [
                            {
                                id: 101,
                                name: 'floor 1',
                                img: '../public/unnamed.jpg',
                                obj: []

                            },
                            {
                                id: 102,
                                name: 'floor 2',
                                img: '../public/floor_2.jpg',
                                obj: []

                            }

                        ]
                    
                },
                {    id: 2,
                    name: 'ware house',

                    floors: [
                        {
                            id: 201,
                            name: 'ware 1',
                            img: '../public/unnamed.jpg',
                            obj: []

                        },
                        {
                            id: 202,
                            name: 'ware 2',
                            img: '../public/floor_2.jpg',
                            obj: []

                        }

                    ]
                
            }
            ];
            state.planing = p;


        }
    }

})