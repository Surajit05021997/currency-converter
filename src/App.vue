
<template>
  <app-header />
  <main>
    <currency-rate-panel />
    <currency-chart />
  </main>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import CurrencyRatePanel from '@/components/CurrencyRatePanel.vue';
import CurrencyChart from '@/components/CurrencyChart.vue';

export default {
  name: 'App',
  components: {
    AppHeader,
    CurrencyRatePanel,
    CurrencyChart,
  }
}
</script>

<style scoped>

</style>
