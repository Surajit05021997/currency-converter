<template>
  <header>
    <a href="#" class="brand">
      <img class="brand-logo" src="@/assets/brand-logo.svg" alt="">
      <p class="brand-text">CurrenSee</p>
    </a>
    <div class="hero-header">
      <p class="hero-header-text"> Stay up-to-date with the latest currency rates with CurrenSee. Our real-time rates provide you with accurate and reliable information, so you can make informed decisions when it comes to currency exchange.</p>
      <img src="@/assets/hero-image.jpg" alt="">
    </div>
  </header>
</template>

<script>
export default {
  name: 'AppHeader',
}
</script>

<style scoped>
.brand {
  text-decoration: none;
  display: flex;
  gap: .75rem;
  width: fit-content;
}
.brand-text {
  color: var(--clr-text);
  font-size: 3.5rem;
  font-weight: var(--fw-bold);
}
.brand-logo {
  width: 3.5rem;
}
.hero-header {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  gap: 1rem;
}
.hero-header-text {
  font-size: 1.5rem;
}
</style>
