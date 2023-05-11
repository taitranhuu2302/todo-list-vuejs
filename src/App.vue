<template>
  <div id="app">
    <task
      :tasks="tasks"
      @clear-all-tasks="clearAllTasks"
      @add-new-task="addNewTask"
      @remove-task="removeTask"
      @change-status-task="changeStatusTask"
    ></task>
  </div>
</template>

<script>
import Task from "./components/Task.vue";

export default {
  name: "App",
  components: {
    Task,
  },
  data() {
    return {
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
    };
  },
  mounted() {
    const tasksLocal = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];
    if (tasksLocal.length <= 0) return;

    this.tasks = tasksLocal;
  },
  methods: {
    clearAllTasks(type) {
      if (!this.tasks && this.tasks.length <= 0) return;
      if (type === "completed") {
        this.tasks = this.tasks.filter((item) => !item.completed);
        return;
      }

      this.tasks = [];
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    addNewTask(task) {
      if (!task || !task.title) return;
      this.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    removeTask(id) {
      this.tasks = this.tasks.filter((item) => item.id !== id);
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
    changeStatusTask(id) {
      const index = this.tasks.findIndex((item) => item.id === id);
      if (index === -1) return;
      this.tasks[index].completed = !this.tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(this.tasks));
    },
  },
};
</script>
