<template>
  <div :class="'notification ' + this.type">
    <img v-if="this.type === 'success'" src="../assets/success-icon.svg" alt="">
    <img v-if="this.type === 'warning'" src="../assets/warning-icon.svg" alt="">
    <img v-if="this.type === 'error'" src="../assets/error-icon.svg" alt="">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AppNotification',
  props: ['type'],
}
</script>

<style scoped>
.notification {
  padding: 1rem 3rem;
  display: flex;
  gap: 1rem;
  align-items: center;
}
.notification img {
  width: 2rem;
}
.notification.success {
  background-color: var(--clr-success);
  border: 2px solid var(--clr-success-border);
  border-radius: 8px;
}
.notification.warning {
  background-color: var(--clr-warning);
  border: 2px solid var(--clr-warning-border);
  border-radius: 8px;
}
.notification.error {
  background-color: var(--clr-error);
  border: 2px solid var(--clr-error-border);
  border-radius: 8px;
}
</style>