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
header{
  margin-top: 1rem;
}
.brand {
  text-decoration: none;
  display: flex;
  gap: .75rem;
  width: fit-content;
}
.brand-text {
  color: var(--clr-brand-text);
  font-size: 3rem;
  font-weight: var(--fw-bold);
}
.brand-logo {
  width: 3.5rem;
}
.hero-header {
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  gap: 1rem;
}
.hero-header-text {
  text-align: center;
  font-size: 1.25rem;
}
.hero-header img {
  width: 20rem;
}
@media (min-width: 768px) {
  .hero-header {
    flex-direction: row;
  }
  .hero-header-text {
    text-align: left;
  }
}
@media (min-width: 1024px) {
  .hero-header img {
    width: 27.5rem;
  }
}
</style>
