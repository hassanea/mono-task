<template>
  <default-layout>
    <base-section v-if="!update" class="mb-10 md:mb-11 lg:mb-12">
      <div class="grid grid-cols-1">
        <h2
          class="text-2-5xl font-sans2 mb-5 border-t-0 border-r-0 border-b-[6px] border-l-0 border-double border-black text-center leading-normal font-bold not-italic md:mb-5.5 lg:mb-6 xl:mb-7"
        >
          {{ form.create }}
        </h2>

        <base-form :title="form.create" variant="create" @create-task="createTask"></base-form>
      </div>
    </base-section>

    <base-section v-else class="mb-10 md:mb-11 lg:mb-12">
      <div class="grid grid-cols-1">
        <h2
          class="text-2-5xl font-sans2 mb-5 border-t-0 border-r-0 border-b-[6px] border-l-0 border-double border-black text-center leading-normal font-bold not-italic md:mb-5.5 lg:mb-6 xl:mb-7"
        >
          {{ form.update }}
        </h2>

        <base-form
          :title="form.update"
          variant="update"
          :current-goal="updatedTask"
          @update-task="handleUpdateTask"
          @cancel="handleCancelTaskUpdate"
        ></base-form>
      </div>
    </base-section>

    <!-- <base-input
      label="Search Tasks"
      :show-label="false"
      node="input"
      placeholder="Search"
      v-model.trim="taskFilter"
    /> -->

    <base-section aria-labelledby="tasks-head">
      <div class="grid grid-cols-1">
        <h2
          id="tasks-head"
          class="text-2-5xl mb-5 text-center leading-normal font-bold tracking-wide uppercase not-italic md:mb-6.5 lg:mb-8"
        >
          Tasks:
        </h2>
        <task-list v-if="tasks.length > 0 && searchTasks.length > 0">
          <task-item
            v-for="task in searchTasks"
            :key="task.id"
            :task="task"
            :count="task.length"
            @delete-goal="deleteTask($event)"
            @update-goal="updateTask($event)"
            @complete-goal="completeTask($event)"
          >
          </task-item>
        </task-list>
        <p
          class="font-sans2 bg-light mx-auto mt-5 max-w-80 min-w-50 rounded-md p-3 text-center text-base leading-normal font-semibold text-purple-800 uppercase not-italic shadow-md shadow-purple-800 md:mt-7.5 md:p-3.5 md:text-lg lg:mt-8 lg:p-4"
          v-else
        >
          No Tasks to display!
        </p>
      </div>
    </base-section>
  </default-layout>
</template>

<script lang="ts" setup>
import { defineAsyncComponent, onUnmounted } from "vue";
import { useAppStore } from "@/stores/useAppStore";
import { storeToRefs } from "pinia";
import { definePage } from "vue-router/dist/experimental/index.js";
import monoTaskData from "@/assets/data/monoTaskData.json";
import BaseForm from "@/components/BaseForm.vue";
// import BaseInput from "@/components/BaseInput.vue";

const TaskList = defineAsyncComponent(async () => await import("@/components/TaskList.vue"));

const TaskItem = defineAsyncComponent(async () => await import("@/components/TaskItem.vue"));

/*
  const hasError = ref(false);
*/

definePage({
  meta: {
    name: "Home",
  },
});

defineOptions({
  name: "HomePage",
});

const appStore = useAppStore();

const {
  createTask,
  completeTask,
  updateTask,
  deleteTask,
  handleCancelTaskUpdate,
  handleUpdateTask,
  cleanUpTasks,
} = appStore;

const { tasks, update, updatedTask, searchTasks } = storeToRefs(appStore);

const { form } = monoTaskData;

onUnmounted(() => cleanUpTasks());
</script>
