<template>
  <footer class="main-footer bg-[#D42758] dark:bg-[#7f1734] text-light">
    <p class="main-footer-copyright">{{ copyrightInfo }}</p>
  </footer>
</template>

<script>
export default {
  name: 'BaseFooter',
  props: {
    year: {
      type: Number,
      required: true,
    },
  },
  computed: {
    copyrightInfo() {
      return `© ${this.year} All Right Reserved.`
    },
  },
}
</script>

<style scoped>
.main-footer {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: auto;
  padding: 1.75rem 2rem;
  font-weight: bolder;
  font-size: 1.25rem;
}
/* .main-footer .main-footer-copyright {
  padding-bottom: 1rem;
} */
</style>
