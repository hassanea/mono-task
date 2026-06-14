<template>
  <default-layout>
    <base-section v-if="!update" class="mb-12">
      <div class="grid grid-cols-1">
        <h2
          class="text-2-5xl mb-6 border-t-0 border-r-0 border-b-[6px] border-l-0 border-double border-black text-center font-bold"
        >
          {{ form.create }}
        </h2>

        <base-form :title="form.create" variant="create" @create-task="createGoal"></base-form>
      </div>
    </base-section>

    <base-section v-else>
      <div class="grid grid-cols-1">
        <h2
          class="text-2-5xl mb-6 border-t-0 border-r-0 border-b-[6px] border-l-0 border-double border-black text-center font-bold"
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

    <base-input
      label="Search Tasks"
      :show-label="false"
      node="input"
      placeholder="Search"
      v-model.trim="goalFilter"
    />

    <!--   label: {
    type: String,
    required: true,
  },
  showLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  node: {
    type: String,
    required: false,
    default: "input",
    validator(value: string) {
      return ["input", "textarea"].includes(value);
    },
  },
  isRequired: {
    type: Boolean,
    required: false,
    default: false,
  },
  placeholder: {
    type: String,
    required: false,
    default: "",
  }, -->

    <!-- <ul class="goal-list" v-if="isSearch && goals.length && searchGoal.length">
      <li class="goal-item" v-for="item in searchGoal" :key="item.name">
        <h3 class="goal-title">{{ item.name }}</h3>
      </li>
    </ul> -->

    <base-section aria-labelledby="tasks-head">
      <div class="grid grid-cols-1">
        <h2 id="tasks-head" class="text-2-5xl mb-8 text-center font-bold tracking-wide uppercase">
          Tasks:
        </h2>
        <task-list v-if="tasks.length > 0 && searchTasks.length > 0">
          <task-item
            v-for="task in searchTasks"
            :key="task.id"
            :task="task"
            :count="task.length"
            @delete-goal="deleteGoal($event)"
            @update-goal="updateGoal($event)"
            @complete-goal="completeGoal($event)"
          >
          </task-item>
        </task-list>
        <p
          class="font-sans2 bg-light mx-auto mt-10 max-w-80 min-w-50 rounded-md p-4 text-center text-base leading-normal font-semibold text-purple-800 uppercase not-italic shadow-md shadow-purple-800 md:text-lg"
          v-else
        >
          No Tasks to display!
        </p>
      </div>
    </base-section>
  </default-layout>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from "vue";
import { useAppStore } from "@/stores/useAppStore";
import { storeToRefs } from "pinia";
import { definePage } from "vue-router/dist/experimental/index.js";
import monoTaskData from "@/assets/data/monoTaskData.json";
import { v4 as uuidv4 } from "uuid";
import BaseForm from "@/components/BaseForm.vue";
import BaseInput from "@/components/BaseInput.vue";
import TaskList from "@/components/TaskList.vue";
import TaskItem from "@/components/TaskItem.vue";

definePage({
  meta: {
    name: "Home",
  },
});

defineOptions({
  name: "HomePage",
});

const appStore = useAppStore();

const { tasks } = storeToRefs(appStore);

const { form } = monoTaskData;

const updatedTask = ref({});

// const show = ref(false)

// const goalInput = ref('')

// const hasGoals = ref(false);

const isSearch = ref(false);

const update = ref(false);

const hasError = ref(false);

const goalFilter = ref("");

const createGoal = (data) => {
  const goal = {
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
    tasks.value.push(goal);
  }
};

const handleCancelTaskUpdate = () => {
  update.value = false;
};

const deleteGoal = (taskId: string) => {
  const currentIndex = tasks.value.findIndex((task) => task.id === taskId);
  tasks.value.splice(currentIndex, 1);
};

const updateGoal = (taskId: string) => {
  update.value = true;
  const currentGoal = tasks.value.find((task) => task.id === taskId);
  updatedTask.value = currentGoal;
};

const handleUpdateTask = (data) => {
  updatedTask.value.name = data.name;
  updatedTask.value.description = data.description;
  updatedTask.value.completed = data.completed;
  updatedTask.value.duration = data.duration;
  updatedTask.value.priority = data.priority;
  updatedTask.value.updateDate = new Date();
  update.value = false;
};

const completeGoal = (taskId: string) => {
  updatedTask.value = tasks.value.find((task) => task.id === taskId);
  updatedTask.value.completed = !updatedTask.value.completed;
};

const searchTasks = computed(() => {
  if (goalFilter.value) {
    return [...tasks.value].filter((task) => {
      return task.name.toLowerCase().includes(goalFilter.value.toLowerCase());
      // task.name.toLowerCase() === goalFilter.value.toLowerCase();
    });
  } else {
    return tasks.value;
  }
});

watch(isSearch, () => {
  if (goalFilter.value && tasks.value.length > O && searchGoal.value.length > 0) {
    isSearch.value = true;
  } else isSearch.value = false;
});

watch(
  tasks,
  () => {
    const data = JSON.stringify(tasks.value);
    localStorage.setItem("tasks", data);
  },
  {
    deep: true,
  },
);
</script>
