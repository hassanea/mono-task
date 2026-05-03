<template>
  <li class="goal-item" :class="{ complete: isComplete }">
    <h3 class="goal-title">{{ name }}</h3>
    <button type="button" @click="removeGoal">DELETE</button>
    <button type="button" @click="editGoal">UPDATE</button>
    <button type="button" @click="handleCompleteGoal" :title="completeTooltip">
      {{ isComplete ? '✔' : '❌' }}
    </button>
  </li>
</template>

<script>
export default {
  name: 'Goal',
  emits: ['delete-goal', 'update-goal', 'complete-goal'],
  props: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    createDate: {
      type: Date,
      required: false,
    },
    isComplete: {
      type: Boolean,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
  },
  methods: {
    removeGoal() {
      this.$emit('delete-goal', this.id)
    },
    editGoal() {
      this.$emit('update-goal', this.id)
    },
    handleCompleteGoal() {
      this.$emit('complete-goal', this.id)
    },
  },
  computed: {
    completeTooltip() {
      return this.isComplete ? 'Complete' : 'Incomplete'
    },
  },
}
</script>

<style scoped>
.goal-item {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  width: 31.25rem;
  height: auto;
  list-style: none;
  padding: 2rem;
  margin: 0.75rem 0;
  border-radius: 20px;
}

/* .goal-title + button {
  margin-left: 0.25rem;
} */

.goal-item:nth-child(odd) {
  background: #ccc;
}

.goal-item:nth-child(even) {
  background: #eee;
}
</style>
