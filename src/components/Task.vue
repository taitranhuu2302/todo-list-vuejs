<template>
  <div class="container">
    <div class="task">
      <!-- title -->
      <div class="title">
        <h1>To Do List</h1>
      </div>
      <!-- form -->
      <form class="form" @submit.prevent="addTask">
        <input type="text" v-model.trim="task" placeholder="New Task" />
        <button><i class="fas fa-plus"></i></button>
      </form>
      <!-- task lists -->
      <div class="taskItems">
        <ul>
          <li v-for="task in tasks" :key="task.id">
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
        <span>Pending Tasks: {{ tasks?.filter((item) => !item.completed).length }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["tasks"],
  data() {
    return {
      task: "",
    };
  },
  methods: {
    clearAll(type) {
      this.$emit("clearAllTasks", type);
    },
    addTask() {
      this.$emit("addNewTask", {
        id: Math.random(),
        title: this.task,
        completed: false,
      });
      this.task = "";
    },
    deleteTask(id) {
      this.$emit("removeTask", id);
    },
    toggleCompleted(id) {
      this.$emit("changeStatusTask", id);
    },
  },
};
</script>
