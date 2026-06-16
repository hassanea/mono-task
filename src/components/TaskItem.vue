<template>
  <li
    class="task-item border-primary-dark flex h-auto list-none flex-col flex-nowrap items-center justify-center rounded-[20px] border border-solid drop-shadow-md drop-shadow-gray-500 odd:bg-[#a3a3a3] even:bg-[#d9d1d9]"
    :class="taskItemGridClasses"
  >
    <base-article class="p-6.5 md:p-7.5 lg:p-8">
      <h3
        class="task-title font-sans2 mt-1 mb-2 text-center text-lg leading-normal font-bold tracking-wide italic md:mb-3 md:text-xl"
        :class="taskCompletedClass"
      >
        {{ task.name }}
      </h3>
      <p
        class="font-sans2 mx-0 mt-3.5 mb-3 line-clamp-2 text-center text-base leading-normal font-medium md:my-4 md:text-lg lg:text-left"
      >
        {{ task.description }}
      </p>
      <div class="-mt-0.5 flex flex-row flex-nowrap items-center justify-center gap-2 md:mt-1">
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
          <font-awesome-icon :icon="completeTaskIconBtn" size="lg" />
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

const taskItemGridClasses = computed(() => {
  return {
    "flex-[100%] lg:flex-[48%]": props?.count % 2 === 0,
    "flex-[100%] lg:flex-1/4": props?.count % 4 === 0,
    "flex-[100%] lg:flex-[32%]": props?.count % 3 === 0,
  };
});

const completeTaskBtnLabel = computed(() =>
  props.task.completed ? "Completed Task" : "Incomplete Task",
);
const completeTooltip = computed(() => (props.task.completed ? "Complete" : "Incomplete"));

const completeTaskIconBtn = computed(() =>
  props.task.completed ? "fa-solid fa-check" : "fa-solid fa-xmark",
);
</script>

<style lang="css" scoped></style>
