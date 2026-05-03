<template>
  <base-header :title="mainTitle"></base-header>
  <base-main>
    <base-switch
      :mode="colorMode"
      :model-value="isDarkMode"
      :label="setColorSwitchLabel"
      description="Set preferred color scheme on website."
      @update:model-value="handleColorThemeChange"
    >
      <template #icon>
        <font-awesome-icon :icon="setColorSwitchIcon" />
      </template>
    </base-switch>
    <base-form
      v-if="!update"
      :title="form.create"
      variant="create"
      @create-goal="createGoal"
    ></base-form>
    <base-form
      v-else
      :title="form.update"
      variant="update"
      :current-goal="updatedTask"
      @update-goal="handleUpdateTask"
    ></base-form>

    <input type="text" v-model="goalFilter" v-if="goals.length > 0" />
    <ul class="goal-list" v-if="isSearch && goals.length && searchGoal.length">
      <li class="goal-item" v-for="item in searchGoal" :key="item.name">
        <h3 class="goal-title">{{ item.name }}</h3>
      </li>
    </ul>

    <goal-list v-if="goals.length > 0">
      <goal
        v-for="goal in goals"
        :key="goal.id"
        :id="goal.id"
        :name="goal.name"
        :description="goal.description"
        :is-complete="goal.completed"
        :duration="goal.duration"
        @delete-goal="deleteGoal"
        @update-goal="updateGoal($event)"
        @complete-goal="completeGoal"
      >
      </goal>
    </goal-list>
    <p class="no-goals" v-else>No Goals to display!</p>
  </base-main>
  <base-footer :year="copyrightYear"></base-footer>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useMyColorMode } from './composables/useMyColorMode'
import monoTaskData from '@/assets/data/monoTaskData.json'
import { v4 as uuidv4 } from 'uuid'
import BaseHeader from '@/components/BaseHeader.vue'
import BaseMain from '@/components/BaseMain.vue'
import BaseForm from '@/components/BaseForm.vue'
import GoalList from '@/components/GoalList.vue'
import BaseSwitch from '@/components/BaseSwitch.vue'
import Goal from '@/components/Goal.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import { useHead } from '@unhead/vue'

const {
  initializeMediaFeature,
  setMyColorMode,
  colorMode,
  isDarkMode,
  isLightMode,
  setColorSwitchIcon,
  setColorSwitchLabel,
  handleColorThemeChange,
  cleanUpMyColorMode,
} = useMyColorMode()
const { mainTitle, form } = monoTaskData

const goals = ref([])

const updatedTask = ref({})

// const show = ref(false)

// const goalInput = ref('')

const hasGoals = ref(false)

const isSearch = ref(false)

const isGoalComplete = ref(false)

const update = ref(false)

const hasError = ref(false)

const copyrightYear = ref(0)

const goalFilter = ref('')

onMounted(() => {
  initializeMediaFeature(setMyColorMode)
  useHead({
    htmlAttrs: {
      class: {
        dark: () => colorMode.value === 'dark',
        light: () => colorMode.value === 'light',
      },
    },
  })
  const hasTaskData = localStorage.getItem('goals')
  copyrightYear.value = new Date().getFullYear()

  if (hasTaskData && JSON.parse(hasTaskData).length !== 0) {
    hasGoals.value = true
    goals.value = JSON.parse(hasTaskData)
  } else return
})

/* || 'lorem ipsum dolor amorcit.', || this.durationOptions[0].durationOption */

const createGoal = (data) => {
  const goal = {
    id: uuidv4(),
    name: data.name,
    // '' false null undefined NaN 0
    description: data.description || 'lorem ipsum dolor amorcit.',
    creationDate: new Date(),
    completed: isGoalComplete.value,
    duration: data.duration,
  }

  if (data.name === '') {
    hasError.value = true
    return
  } else {
    goals.value.push(goal)
  }
}

const deleteGoal = (goalId: string) => {
  const currentIndex = goals.value.findIndex((goal) => goal.id === goalId)
  goals.value.splice(currentIndex, 1)
}

const updateGoal = (goalId: string) => {
  update.value = true
  const currentGoal = goals.value.find((goal) => goal.id === goalId)
  updatedTask.value = currentGoal
}

const handleUpdateTask = (data) => {
  updatedTask.value.name = data.name
  updatedTask.value.description = data.description
  updatedTask.value.completed = data.completed
  updatedTask.value.duration = data.duration
  update.value = false
}

const completeGoal = (goalId: string) => {
  const foundGoal = goals.value.find((goal) => goal.id === goalId)
  foundGoal.completed = !foundGoal.completed
}

const searchGoal = computed(() => {
  if (goalFilter.value) {
    return [...goals.value].filter((goal) => {
      return goal.name.toLowerCase() === goalFilter.value
    })
  } else {
    return goals.value
  }
})

watch(isSearch, () => {
  if (goalFilter.value && goals.value.length > O && searchGoal.value.length > 0) {
    isSearch.value = true
  } else isSearch.value = false
})

watch(
  goals,
  () => {
    const data = JSON.stringify(goals.value)
    localStorage.setItem('goals', data)
  },
  {
    deep: true,
  },
)

onUnmounted(() => cleanUpMyColorMode())
</script>
