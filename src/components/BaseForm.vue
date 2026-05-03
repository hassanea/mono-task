<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import BaseFormControl from '@/components/BaseFormControl.vue'
import BaseButton from '@/components/BaseButton.vue'

const props = defineProps({
  variant: {
    type: String,
    required: true,
    validator(value: string) {
      return ['create', 'update'].includes(value)
    },
  },
  currentGoal: {
    type: Object,
    required: false,
    default: () => {
      return {}
    },
  },
  title: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['createGoal', 'updateGoal'])

// const buttonInfo = { type: 'submit', buttonCaption: 'Add Goal', buttonLabel: 'Create Goal' }
const goalName = ref('')

const goalDuration = ref('')
const goalDescription = ref('')

const updatedTask = ref({
  name: '',
  description: '',
  duration: '',
  completed: false,
})

onMounted(() => {
  if (props.variant === 'update' && Object.values(props.currentGoal).length > 0) {
    updatedTask.value.name = props.currentGoal.name
    updatedTask.value.description = props.currentGoal.description
    updatedTask.value.duration = props.currentGoal.duration
    updatedTask.value.completed = props.currentGoal.completed
  } else return
})

const durationOptions = [
  { id: 1, durationOption: 'Short term' },
  { id: 2, durationOption: 'Long term' },
  { id: 3, durationOption: 'Daily' },
  { id: 4, durationOption: 'Every Other Day' },
  { id: 5, durationOption: 'Weekly' },
  { id: 6, durationOption: 'Monthly' },
  { id: 7, durationOption: 'Quarterly' },
  { id: 8, durationOption: 'Yearly' },
]

const addTask = () => {
  const data = {
    name: goalName.value,
    duration: goalDuration.value,
    description: goalDescription.value,
  }
  emit('createGoal', data)
  goalName.value = ''
  goalDuration.value = ''
  goalDescription.value = ''
}

const updateTask = () => {
  emit('updateGoal', updatedTask.value)
  updatedTask.value.name = ''
  updatedTask.value.description = ''
  updatedTask.value.duration = ''
  updatedTask.value.completed = false
}
</script>

<template>
  <form v-if="variant === 'create'" class="goal-form" @submit.prevent="addTask">
    <h2 class="goal-form-title">{{ title }}</h2>
    <slot>
      <base-form-control class="goal-form-control-label">
        <span class="required"></span>
        <label class="goal-form-label" for="name">Task Name:</label>
      </base-form-control>
      <base-form-control>
        <input
          type="text"
          class="goal-input"
          v-model="goalName"
          placeholder="Define Your Goal"
          id="name"
        />
      </base-form-control>

      <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="duration">Task Duration:</label>
      </base-form-control>
      <base-form-control>
        <select v-model="goalDuration" class="goal-input" id="duration">
          <option value="" disabled selected>Choose a duration:</option>
          <option v-for="option in durationOptions" :key="option.id" :value="option.durationOption">
            {{ option.durationOption }}
          </option>
        </select>
      </base-form-control>

      <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="description">Goal Description:</label>
      </base-form-control>
      <base-form-control>
        <textarea
          class="goal-input"
          rows="10"
          cols="70"
          id="description"
          v-model="goalDescription"
          placeholder="Enter your Goal's description"
        ></textarea>
      </base-form-control>

      <base-form-control>
        <base-button> Create Task </base-button>
      </base-form-control>
    </slot>
  </form>

  <form
    v-if="variant === 'update' && Object.values(props.currentGoal).length > 0"
    class="goal-form"
    @submit.prevent="updateTask"
  >
    <h2 class="goal-form-title">{{ title }}</h2>
    <slot>
      <base-form-control class="goal-form-control-label">
        <span class="required"></span>
        <label class="goal-form-label" for="name">Goal Name:</label>
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
        <label class="goal-form-label" for="duration">Goal Duration:</label>
      </base-form-control>
      <base-form-control>
        <select v-model="updatedTask.duration" class="goal-input" id="duration">
          <option value="" disabled selected>Choose a duration:</option>
          <option v-for="option in durationOptions" :key="option.id" :value="option.durationOption">
            {{ option.durationOption }}
          </option>
        </select>
      </base-form-control>

      <base-form-control class="goal-form-control-label">
        <label class="goal-form-label" for="description">Goal Description:</label>
      </base-form-control>
      <base-form-control>
        <textarea
          class="goal-input"
          rows="10"
          cols="70"
          id="description"
          v-model="updatedTask.description"
          placeholder="Enter your Goal's description"
        ></textarea>
      </base-form-control>

      <base-form-control>
        <base-button> Edit Task </base-button>
      </base-form-control>
    </slot>
  </form>
</template>

<style scoped>
.goal-form {
  display: block;
  width: 100%;
  height: auto;
  min-width: 18.75rem;
  max-width: 37.5rem;
  padding: 3rem;
  background: rgba(80, 50, 90, 0.5);

  /* box-shadow: 0 8px 32px 0 rgba( 31, 38, 135, 0.37 ); */
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  /* border-radius: 10px; */
  /* border: 1px solid rgba( 255, 255, 255, 0.18 ); */

  color: #000;
  min-height: 300px;
  max-height: 37.5rem;
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
  content: '*';
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
  border: 2px solid #aaa;
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
  border: 2px solid gold;
  outline: none;
}
</style>
