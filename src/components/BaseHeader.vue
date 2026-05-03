<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      toggle: false,
      colorTheme: '',
    }
  },
  methods: {},
}
</script>

<template>
  <header class="main-header bg-[#D42758] dark:bg-[#7f1734] text-light">
    <h1 class="main-title text-light">
      <font-awesome-icon icon="fa-solid fa-bullseye" /> {{ title }}
    </h1>
  </header>
</template>

<style lang="css" scoped>
@import '../assets/css/main.css';
.main-header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  padding: 2rem 1rem;
  border-radius: 3px;
  margin-bottom: 4rem;
  box-shadow: 0 2px 0 #ccc;
}

.main-header .main-title {
  font-size: 2.5rem;
  font-family: 'Bebas Neue', sans-serif;
  letter-spacing: 0.25rem;
}

.main-header .main-title::first-letter {
  font-size: 200%;
}
</style>
