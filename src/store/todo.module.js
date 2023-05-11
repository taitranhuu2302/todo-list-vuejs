import {ADD_TASK, CHANGE_STATUS, CLEAR_TASKS, REMOVE_TASK} from "@/store/type";

const todoModule = {
  state: {
    tasks: [
      {
        id: 1,
        title: "Learn Vue JS",
        completed: true,
      },
      {
        id: 2,
        title: "Watch netflix",
        completed: true,
      },
      {
        id: 3,
        title: "Go shopping",
        completed: false,
      },
      {
        id: 4,
        title: "Learn guitar",
        completed: false,
      },
      {
        id: 5,
        title: "Send email",
        completed: false,
      },
    ],
  },
  getters: {
    getTaskList: (state) => {
      return state.tasks
    }
  },
  mutations: {
    [ADD_TASK](state, payload) {
      if (!payload || !payload.title) return;
      state.tasks.push(payload)
    },
    [REMOVE_TASK](state, payload) {
      if (!payload) return;
      state.tasks = state.tasks.filter(item => item.id !== payload)
    },
    [CHANGE_STATUS](state, payload) {
      if (!payload) return;
      const index = state.tasks.findIndex(item => item.id === payload)
      if (index === -1) return;
      state.tasks[index].completed = !state.tasks[index].completed
    },
    [CLEAR_TASKS](state, payload) {
      if (payload === 'completed') {
        state.tasks = state.tasks.filter(item => !item.completed)
        return;
      }

      state.tasks = []
    }
  },
}

export default todoModule;