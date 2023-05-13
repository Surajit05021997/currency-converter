<template>
  <div class="chart-panel">
    <div v-if="this.fromCurrency && this.toCurrency" class="char-title">
      <p>{{ fromCurrency }} to {{ toCurrency }} chart</p>
    </div>
    <div v-else>
      <p>Please select currency!</p>
    </div>
    <canvas ref="currencyChart" id="currency-chart"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from 'chart.js/auto'
import { getCurrencyRate } from '../service/service';

export default {
  name: 'CurrencyChart',
  data() {
    return {
      currencyChartObj: null,
    }
  },
  created() {
    
  },
  computed: {
    ...mapState(['fromCurrency', 'toCurrency']),
  },
  mounted() {
    
  },
  methods: {
    async createChart() {
      let rateArray = [];
      let dateArray = [];
      const currencyRateObj = await getCurrencyRate(this.fromCurrency, this.toCurrency);
      currencyRateObj.rateList.forEach((rateObj) => {
        rateArray.push(rateObj.rate);
        dateArray.push(rateObj.date);
      });
      this.currencyChartObj ? this.currencyChartObj.destroy() : '';
      if (this.fromCurrency === 'USD' && this.toCurrency === 'INR') {
        this.currencyChartObj = new Chart(
          this.$refs.currencyChart,
          {
            type: 'line',
            data: {
              labels: dateArray,
              datasets: [
                {
                  label: 'Rate',
                  data: rateArray,
                },
              ],
            },
          },
        );
      }
    },
  },
  watch: {
    fromCurrency() {
      this.createChart();
    },
    toCurrency() {
      this.createChart();
    },
  }
}
</script>

<style scoped>
.chart-panel {
  padding: 0 10rem;
}
</style>
