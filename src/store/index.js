import {createLogger, createStore} from "vuex";
import TodoModule from "@/store/todo.module";

const debug = process.env.NODE_ENV !== 'production';

const store = createStore({
  modules: {
    todoModule: TodoModule
  },
  plugins: debug ? [createLogger()] : []
})

export default store;