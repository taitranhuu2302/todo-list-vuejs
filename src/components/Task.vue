<template>
  <div class="container">
    <div class="task">
      <!-- title -->
      <div class="title">
        <h1>To Do List</h1>
      </div>
      <!-- form -->
      <form class="form" @submit.prevent="addTask">
        <input type="text" v-model.trim="task" placeholder="New Task"/>
        <button><i class="fas fa-plus"></i></button>
      </form>
      <!-- task lists -->
      <div class="taskItems">
        <ul>
          <li v-for="task in getTaskList" :key="task.id">
            <button
                @click="toggleCompleted(task.id)"
                class="taskItemsTitle toggle"
                :class="{ 'toggle-completed': task.completed }"
            >
              <i class="far fa-circle"></i> {{ task.title }}
            </button>
            <button @click="deleteTask(task.id)"><i class="far fa-trash-alt"></i></button>
          </li>
        </ul>
      </div>
      <!-- buttons -->
      <div class="clearBtns">
        <button @click="clearAll('completed')">Clear completed</button>
        <button @click="clearAll('all')">Clear all</button>
      </div>
      <!-- pending task -->
      <div class="pendingTasks">
        <span>Pending Tasks: {{ getTaskList?.filter((item) => !item.completed).length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
import {ADD_TASK, CHANGE_STATUS, CLEAR_TASKS, REMOVE_TASK} from "@/store/type";

export default {
  name: "Task",
  data() {
    return {
      task: "",
    };
  },
  computed: {
    ...mapGetters(['getTaskList']),
  },
  mounted() {
    console.log(this.getTaskList)
  },
  methods: {
    clearAll(type) {
      this.$store.commit(CLEAR_TASKS, type)
    },
    addTask() {
      const newTask = {
        id: Math.random(),
        title: this.task,
        completed: false,
      }

      this.$store.commit(ADD_TASK, newTask)
    },
    deleteTask(id) {
      this.$store.commit(REMOVE_TASK, id)
    },
    toggleCompleted(id) {
      this.$store.commit(CHANGE_STATUS, id)
    },
  },
};
</script>
