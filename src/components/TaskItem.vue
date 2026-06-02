<template>
  <li
    class="goal-item border border-solid border-[#7f1734]"
    :class="{
      'flex-[100%] lg:flex-[48%]': count % 2 === 0,
      'flex-[100%] lg:flex-1/4': count % 4 === 0,
      'flex-[100%] lg:flex-[32%]': count % 3 === 0,
    }"
  >
    <base-article>
      <h3
        class="goal-title font-sans2 text-center text-lg leading-normal font-bold tracking-wide italic md:text-xl"
        :class="taskCompletedClass"
      >
        {{ task.name }}
      </h3>
      <p
        class="font-sans2 text-center text-base leading-normal font-medium md:text-lg lg:text-left"
      >
        {{ task.description }}
      </p>
      <div class="flex flex-row flex-nowrap items-center justify-center gap-2">
        <base-button
          type="button"
          label="Delete Task"
          class="cursor-pointer"
          @click="removeGoal"
          @keydown.enter="removeGoal"
          v-tooltip.left="'Delete Task'"
        >
          <font-awesome-icon icon="fa-solid fa-trash" size="lg" />
        </base-button>
        <base-button
          type="button"
          label="Update Task"
          class="cursor-pointer"
          @click="editGoal"
          @keydown.enter="editGoal"
          v-tooltip.bottom="'Update Task'"
        >
          <font-awesome-icon icon="fa-solid fa-pen-to-square" size="lg" />
        </base-button>
        <base-button
          type="button"
          class="cursor-pointer"
          @click="handleCompleteGoal"
          @keydown.enter="handleCompleteGoal"
          :label="completeTaskBtnLabel"
          v-tooltip.right="completeTooltip"
        >
          <font-awesome-icon :icon="completeTaskIconBtn" />
        </base-button>
      </div>
    </base-article>
  </li>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import BaseArticle from "@/components/BaseArticle.vue";
import BaseButton from "@/components/BaseButton.vue";

defineOptions({
  name: "TaskItem",
});

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
  count: {
    type: Number,
    required: false,
  },
});

const { task } = props;

const emit = defineEmits(["delete-goal", "update-goal", "complete-goal"]);

const removeGoal = () => emit("delete-goal", task.id);

const editGoal = () => emit("update-goal", task.id);

const handleCompleteGoal = () => {
  emit("complete-goal", task.id);
};

const taskCompletedClass = computed(() => {
  return { "line-through": props.task.completed };
});

const completeTaskBtnLabel = computed(() =>
  props.task.completed ? "Completed Task" : "Incomplete Task",
);
const completeTooltip = computed(() => (props.task.completed ? "Complete" : "Incomplete"));

const completeTaskIconBtn = computed(() =>
  props.task.completed ? "fa-solid fa-check" : "fa-solid fa-xmark",
);
</script>

<style lang="css" scoped>
.goal-item {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  /* width: 31.25rem; */
  height: auto;
  list-style: none;
  padding: 2rem;
  margin: 0.75rem 0;
  border-radius: 20px;
}

.goal-title + button {
  margin-left: 0.25rem;
}

.goal-item:nth-child(odd) {
  background: #a3a3a3;
}

.goal-item:nth-child(even) {
  background: #d9d1d9;
}
</style>
