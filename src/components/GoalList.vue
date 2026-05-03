<template>
   <ul class="goal-list">
     <slot></slot>
   </ul>
</template>


<script>
export default {
name: 'GoalList',
};
</script>


<style scoped>
.goal-list {
  margin: 4rem auto;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

</style>