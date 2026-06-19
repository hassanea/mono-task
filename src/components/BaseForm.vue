<template>
  <!-- Create -->
  <keep-alive>
    <form
      v-if="variant === 'create'"
      class="text-dark dark:bg-form-dark/50 form-shadow bg-form-light/50 focus-within:border-highlight mx-auto my-0 flex h-auto max-w-150 min-w-75 flex-col flex-nowrap rounded-lg px-8 py-10 backdrop-blur-[5px] focus-within:border focus-within:border-solid focus-within:outline-0 md:p-10 lg:p-12"
      @submit.prevent="addTask"
    >
      <slot>
        <base-input
          v-model="task.name"
          label="Task Name:"
          node="input"
          :is-required="true"
          placeholder="Define Your Task"
        />

        <base-select
          v-model="task.duration"
          label="Task Frequency:"
          description="Lorem Ipsum Dolor Amorcit..."
          :choices="durations"
        />

        <base-form-control>
          <base-radio-button v-model="task.priority" :legend :choices="priorities" />
        </base-form-control>

        <base-input
          v-model="task.description"
          label="Task Description:"
          node="textarea"
          placeholder="Enter your Task's description"
        />

        <base-form-control>
          <base-button
            variant="btn-submit"
            type="submit"
            label="Create Task"
            class="mt-2.5 md:mt-3"
          >
            <template #icon> <font-awesome-icon icon="fa-solid fa-circle-plus" /> </template>
            <template #default></template>
          </base-button>
        </base-form-control>
      </slot>
    </form>
  </keep-alive>

  <!-- Update -->
  <keep-alive>
    <form
      v-if="variant === 'update' && Object.values(currentGoal).length > 0"
      class="text-dark dark:bg-form-dark/50 form-shadow bg-form-light/50 focus-within:border-highlight mx-auto my-0 flex h-auto max-w-150 min-w-75 flex-col flex-nowrap rounded-lg px-8 py-10 backdrop-blur-[5px] focus-within:border focus-within:border-solid focus-within:outline-0 md:p-10 lg:p-12"
      @submit.prevent="updateTask"
    >
      <slot>
        <base-input
          v-model="updatedTask.name"
          label="Task Name:"
          node="input"
          :is-required="true"
          placeholder="Define Your Task"
        />

        <base-select
          v-model="updatedTask.duration"
          label="Task Frequency:"
          description="Lorem Ipsum Dolor Amorcit..."
          :choices="durations"
        />

        <base-form-control>
          <base-radio-button v-model="updatedTask.priority" :legend :choices="priorities" />
        </base-form-control>

        <base-form-control>
          <base-switch
            :mode="taskStatus"
            :model-value="updatedTask.completed"
            :show-label="true"
            label="Task Status:"
            description="Set Task completion Status."
            @update:model-value="updateTaskComplete"
          >
            <template #icon>
              <font-awesome-icon :icon="setTaskSwitchIcon" />
            </template>
          </base-switch>
        </base-form-control>

        <base-input
          v-model="updatedTask.description"
          label="Task Description:"
          node="textarea"
          placeholder="Enter your Task's Description"
        />

        <div
          class="mt-2.5 flex flex-[100%] flex-col flex-nowrap items-center justify-center gap-2.5 md:mt-3 md:flex-1/2 md:flex-row"
        >
          <base-button variant="btn-submit edit" type="submit" label="Edit Task">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-pen" />
            </template>
            <template #default></template>
          </base-button>

          <base-button
            variant="btn-submit cancel"
            type="button"
            label="Cancel"
            @click="handleCancelUpdateTask"
            @keydown.enter="handleCancelUpdateTask"
          >
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-xmark" />
            </template>
            <template #default></template>
          </base-button>
        </div>
      </slot>
    </form>
  </keep-alive>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import monoTaskData from "@/assets/data/monoTaskData.json";
import BaseFormControl from "@/components/BaseFormControl.vue";
import BaseRadioButton from "@/components/BaseRadioButton.vue";
import BaseSwitch from "@/components/BaseSwitch.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseSelect from "@/components/BaseSelect.vue";

defineOptions({
  name: "BaseForm",
});

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator(value: string) {
      return ["create", "update"].includes(value);
    },
  },
  currentGoal: {
    type: Object,
    required: false,
    default: () => {
      return {};
    },
  },
  title: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["create-task", "update-task", "cancel"]);

const task = ref({
  name: "",
  description: "",
  duration: "",
  priority: "Low",
});

const updatedTask = ref({
  name: "",
  description: "",
  duration: "",
  priority: "Low",
  completed: false,
});

onMounted(() => {
  if (props.variant === "update" && Object.values(props.currentGoal).length > 0) {
    updatedTask.value.name = props.currentGoal.name;
    updatedTask.value.description = props.currentGoal.description;
    updatedTask.value.duration = props.currentGoal.duration;
    updatedTask.value.priority = props.currentGoal.priority;
    updatedTask.value.completed = props.currentGoal.completed;
  } else return;
});

const {
  form: {
    durations,
    priorities: { legend, priorities },
  },
} = monoTaskData;

const taskStatus = computed(() => {
  if (!updatedTask.value.completed || Object.values(updatedTask.value).length === 0)
    return "incomplete";
  return updatedTask.value.completed ? "complete" : "incomplete";
});

const resetTaskCreationData = () => {
  task.value.name = "";
  task.value.description = "";
  task.value.duration = "";
  task.value.priority = "Low";
};

const resetUpdateTaskData = () => {
  updatedTask.value.name = "";
  updatedTask.value.description = "";
  updatedTask.value.duration = "";
  updatedTask.value.priority = "Low";
  updatedTask.value.completed = false;
};

const addTask = () => {
  const data = {
    name: task.value.name,
    duration: task.value.duration,
    description: task.value.description,
    priority: task.value.priority,
  };
  emit("create-task", data);
  resetTaskCreationData();
};

const updateTask = () => {
  emit("update-task", updatedTask.value);
  resetUpdateTaskData();
};

const updateTaskComplete = () => (updatedTask.value.completed = !updatedTask.value.completed);

const setTaskSwitchIcon = computed(() =>
  updatedTask.value.completed ? "fa-solid fa-check" : "fa-solid fa-close",
);

const resetFormData = () => {
  resetTaskCreationData();
  resetUpdateTaskData();
};

const handleCancelUpdateTask = () => {
  resetUpdateTaskData();
  emit("cancel");
};

onUnmounted(() => {
  resetFormData();
});
</script>

<style lang="css" scoped>
@import "../assets/css/main.css";

.form-shadow {
  box-shadow: 2px 2px 0 #aaa;
}
</style>
