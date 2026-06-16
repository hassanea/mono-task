import { defineStore, acceptHMRUpdate } from "pinia";
import { ref, computed, watch } from "vue";
import { v4 as uuidv4 } from "uuid";
export const useAppStore = defineStore("useAppStore", () => {
  const tasks = ref([]);
  const taskFilter = ref("");
  const currentYear = ref(0);
  const hasError = ref(false);
  const update = ref(false);
  const updatedTask = ref({});

  function createTask(data: object) {
    const task = {
      id: uuidv4(),
      name: data.name,
      description: data.description || "lorem ipsum dolor amorcit.",
      creationDate: new Date(),
      updateDate: null,
      completed: false,
      duration: data.duration,
      priority: data.priority,
    };

    if (data.name === "") {
      hasError.value = true;
      return;
    } else {
      tasks.value.push(task);
    }
  }

  function deleteTask(taskId: string) {
    const currentIndex = tasks.value.findIndex((task) => task.id === taskId);
    tasks.value.splice(currentIndex, 1);
  }

  function updateTask(taskId: string) {
    update.value = true;
    const currentTask = tasks.value.find((task) => task.id === taskId);
    updatedTask.value = currentTask;
  }

  function handleUpdateTask(data: object) {
    updatedTask.value.name = data.name;
    updatedTask.value.description = data.description;
    updatedTask.value.completed = data.completed;
    updatedTask.value.duration = data.duration;
    updatedTask.value.updateDate = new Date();
    update.value = false;
  }

  function handleCancelTaskUpdate() {
    update.value = false;
  }

  function completeTask(taskId: string) {
    updatedTask.value = tasks.value.find((task) => task.id === taskId);
    updatedTask.value.completed = !updatedTask.value.completed;
  }

  const searchTasks = computed(() => {
    if (taskFilter.value) {
      return [...tasks.value].filter((task) => {
        return task.name.toLowerCase().includes(taskFilter.value.toLowerCase());
        // task.name.toLowerCase() === taskFilter.value.toLowerCase();
      });
    } else {
      return tasks.value;
    }
  });

  const cleanUpTasks = watch(
    tasks,
    () => {
      const data = JSON.stringify(tasks.value);
      localStorage.setItem("tasks", data);
    },
    {
      deep: true,
    },
  );

  return {
    tasks,
    taskFilter,
    currentYear,
    update,
    updatedTask,
    createTask,
    deleteTask,
    updateTask,
    handleUpdateTask,
    handleCancelTaskUpdate,
    completeTask,
    searchTasks,
    cleanUpTasks,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
