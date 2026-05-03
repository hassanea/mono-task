<template>
  <button type="submit" class="btn" aria-label="Create Goal">
    <slot> Add Task </slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',
}
</script>

<style scoped>
.btn {
  font: normal bold 1.125rem / 1.5 sans-serif;
  width: 80%;
  padding: 1.25rem 1rem;
  height: 3.75rem;
  border: 0;
  cursor: pointer;
  border-radius: 6px;
  margin: 1rem 0;
}

.btn:hover {
  filter: invert(1);
  transition: var(--transition);
}

/* .btn:active {

}

.btn:focus {

} */
</style>
