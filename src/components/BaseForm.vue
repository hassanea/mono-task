<template>
  <!-- Create -->
  <form
    v-if="variant === 'create'"
    class="goal-form dark:bg-form-dark/50 bg-form-light/50 focus-within:border focus-within:border-solid focus-within:border-[#ffd700] focus-within:outline-0"
    @submit.prevent="addTask"
  >
    <slot>
      <!-- <base-form-control class="goal-form-control-label">
        <span class="required"></span>
        <base-input-label :id="taskNameId" variant="input"> Task Name: </base-input-label>
      </base-form-control>
      <base-form-control>
        <input
          type="text"
          class="goal-input"
          v-model="task.name"
          placeholder="Define Your Goal"
          :id="taskNameId"
        />
      </base-form-control> -->

      <base-input
        v-model="task.name"
        label="Task Name:"
        node="input"
        :is-required="true"
        placeholder="Define Your Task"
      />

      <!-- <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="duration">Task Frequency:</label>
      </base-form-control>
      <base-form-control>
        <select v-model="task.duration" class="goal-input" id="duration">
          <option value="" disabled selected>Choose a frequency:</option>
          <option
            v-for="duration in durations"
            :key="`option-${duration.toLowerCase()}`"
            :value="duration"
          >
            {{ duration }}
          </option>
        </select>
      </base-form-control> -->

      <!-- showLabel: {
    type: Boolean,
    required: false,
    default: true,
  },
  label: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
    default: "",
  },
  choices: {
    type: Array,
    required: false,
    default: () => {
      return ["Alpha", "Beta", "Gamma", "Delta"];
    },
  },
  selectMultiple: {
    type: Boolean,
    required: false,
    default: false,
  },
  isDisabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  isReadOnly: {
    type: Boolean,
    required: false,
    default: false,
  }, -->

      <base-select
        v-model="task.duration"
        label="Task Frequency:"
        description="Lorem Ipsum Dolor Amorcit..."
        :choices="durations"
      />

      <base-form-control>
        <base-radio-button v-model="task.priority" :legend :choices="priorities" />
      </base-form-control>

      <!-- <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="description">Task Description:</label>
      </base-form-control>

      <base-form-control>
        <textarea
          class="goal-input"
          rows="10"
          cols="70"
          id="description"
          v-model="task.description"
          placeholder="Enter your Goal's description"
        ></textarea>
      </base-form-control> -->

      <base-input
        v-model="task.description"
        label="Task Description:"
        node="textarea"
        placeholder="Enter your Task's description"
      />

      <!--

        label: {
    type: String,
    required: true,
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
  },

      -->

      <base-form-control>
        <base-button variant="btn-submit" type="submit" label="Create Task">
          <template #icon> <font-awesome-icon icon="fa-solid fa-circle-plus" /> </template>
          <template #default></template>
        </base-button>
      </base-form-control>
    </slot>
  </form>

  <!-- Update -->
  <form
    v-if="variant === 'update' && Object.values(props.currentGoal).length > 0"
    class="goal-form dark:bg-form-dark/50 bg-form-light/50 focus-within:border focus-within:border-solid focus-within:border-[#ffd700] focus-within:outline-0"
    @submit.prevent="updateTask"
  >
    <slot>
      <base-form-control class="goal-form-control-label">
        <span class="required"></span>
        <label class="goal-form-label" for="name">Task Name:</label>
      </base-form-control>
      <base-form-control>
        <input
          type="text"
          class="goal-input"
          v-model="updatedTask.name"
          placeholder="Define Your Goal"
          id="name"
        />
      </base-form-control>

      <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="duration">Task Frequency:</label>
      </base-form-control>
      <base-form-control>
        <select v-model="updatedTask.duration" class="goal-input" id="duration">
          <option value="" disabled selected>Choose a frequency:</option>
          <option
            v-for="duration in durations"
            :key="`option-${duration.toLowerCase()}`"
            :selected="updatedTask.duration === duration"
            :value="duration"
          >
            {{ duration }}
          </option>
        </select>
      </base-form-control>

      <base-form-control>
        <base-radio-button v-model="updatedTask.priority" :legend :choices="priorities" />
      </base-form-control>

      <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="description">Task Description:</label>
      </base-form-control>

      <base-form-control>
        <base-switch
          :mode="taskStatus"
          :model-value="updatedTask.completed"
          label="Update Task completion Status"
          description="Set Task completion Status."
          @update:model-value="updateTaskComplete"
        >
          <template #icon>
            <font-awesome-icon :icon="setTaskSwitchIcon" />
          </template>
        </base-switch>
      </base-form-control>

      <base-form-control>
        <textarea
          class="goal-input"
          rows="10"
          cols="70"
          id="description"
          v-model="updatedTask.description"
          placeholder="Enter your Task's Description"
        ></textarea>
      </base-form-control>

      <div
        class="flex flex-1/2 flex-col flex-nowrap items-center justify-center gap-2.5 md:flex-row"
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
</template>

<script lang="ts" setup>
import { computed, onMounted, onUnmounted, ref } from "vue";
import monoTaskData from "@/assets/data/monoTaskData.json";
import BaseFormControl from "@/components/BaseFormControl.vue";
import BaseRadioButton from "@/components/BaseRadioButton.vue";
import BaseSwitch from "@/components/BaseSwitch.vue";
// import BaseInputLabel from "@/components/BaseInputLabel.vue";
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
.goal-form {
  display: block;
  width: 100%;
  height: auto;
  min-width: 18.75rem;
  max-width: 37.5rem;
  padding: 3rem;
  /* background: rgba(80, 50, 90, 0.5); */

  /* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* border-radius: 10px; */
  /* border: 1px solid rgba( 255, 255, 255, 0.18 ); */

  color: #000;
  min-height: 300px;
  max-height: 45rem;
  display: flex;
  flex-flow: column nowrap;
  margin: 0 auto;
  border-radius: 8px;
  box-shadow: 2px 2px 0 #aaa;
}

.required {
  color: #f00;
}

.required::after {
  content: "*";
  margin-right: 0.25rem;
  font-size: 1.25rem;
}

.goal-form-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  border-bottom: 6px double #000;
}

.error {
  border: 2px solid #f00;
}

.goal-form-label {
  font-weight: bold;
  font-size: 1.0625em;
  display: block;
  margin-left: 0.25rem;
  text-align: left;
  text-transform: capitalize;
}

.goal-input {
  display: block;
  width: 100%;
  height: 4rem;
  padding: 1rem;
  min-width: 250px;
  max-width: 600px;
  margin: 0.75rem 0 1.25rem;
  font-size: 1.0625rem;
  border-radius: 5px;
  border: 2px solid #494949;
  /* #aaa #626262 */
  caret-color: #07ff22;
}

/* .goal-input-desc {
  width: auto;
  height: auto;
} */

/* .goal-input::before {
  content: '*';
  font-weight: bold;
} */

/* .goal-input.goal-input-desc {
  height: 10rem; */
/* overflow: auto;
} */

.goal-input::placeholder {
  color: #aaa;
  font-weight: bold;
  padding-left: 0.8rem;
}

.goal-input:focus {
  border: 2px solid #ffd700;
  outline: none;
}
</style>
