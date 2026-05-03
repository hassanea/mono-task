<template>
  <div class="goal-form-control">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'BaseFormControl',
}
</script>

<style scoped>
.goal-form-control {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
}

.goal-form-control.goal-form-control-label {
  justify-content: flex-start;
}

</style>