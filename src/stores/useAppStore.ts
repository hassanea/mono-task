import { defineStore, acceptHMRUpdate } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";
export const useAppStore = defineStore("useAppStore", () => {
  const tasks = ref([]);
  const currentYear = ref(0);
  const hasError = ref(false);
  const update = ref(false);
  const updatedTask = ref({});

  function createTask(data: object) {
    const goal = {
      id: uuidv4(),
      name: data.name,
      description: data.description || "lorem ipsum dolor amorcit.",
      creationDate: new Date(),
      updateDate: null,
      completed: false,
      duration: data.duration,
    };

    if (data.name === "") {
      hasError.value = true;
      return;
    } else {
      tasks.value.push(goal);
    }
  }

  function deleteTask(taskId: string) {
    const currentIndex = tasks.value.findIndex((task) => task.id === taskId);
    tasks.value.splice(currentIndex, 1);
  }

  function updateTask(taskId: string) {
    update.value = true;
    const currentGoal = tasks.value.find((task) => task.id === taskId);
    updatedTask.value = currentGoal;
  }

  function handleUpdateTask(data: object) {
    updatedTask.value.name = data.name;
    updatedTask.value.description = data.description;
    updatedTask.value.completed = data.completed;
    updatedTask.value.duration = data.duration;
    updatedTask.value.updateDate = new Date();
    update.value = false;
  }

  function completeTask(taskId: string) {
    updatedTask.value = tasks.value.find((task) => task.id === taskId);
    updatedTask.value.completed = !updatedTask.value.completed;
  }

  return {
    tasks,
    currentYear,
    createTask,
    deleteTask,
    updateTask,
    handleUpdateTask,
    completeTask,
  };
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAppStore, import.meta.hot));
}
