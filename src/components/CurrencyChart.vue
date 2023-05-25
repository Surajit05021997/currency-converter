<template>
  <div class="chart-panel">
    <app-spinner :isLoading="isLoading" />
    <div v-if="this.fromCurrency && this.toCurrency" class="char-title">
      <p class="fw-700">1 {{ fromCurrency }} to {{ toCurrency }}</p>
    </div>
    <div v-else>
      <p >Please select currency!</p>
    </div>
    <app-notification v-if="showWarningNotification" class="my-1" type="warning">
      <p>Rate graph is available only for USD to INR!</p>
    </app-notification>
    <canvas ref="currencyChart" id="currency-chart"></canvas>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from 'chart.js/auto'
import { getCurrencyRate } from '../service/service';
import AppNotification from './AppNotification.vue';
import AppSpinner from './AppSpinner.vue';

export default {
  name: 'CurrencyChart',
  components: {
    AppNotification,
    AppSpinner,
  },
  data() {
    return {
      currencyChartObj: null,
      isLoading: false,
      showWarningNotification: false,
    }
  },
  created() {
    
  },
  computed: {
    ...mapState(['fromCurrency', 'toCurrency']),
  },
  mounted() {
    this.createChart();
  },
  methods: {
    async createChart() {
      let rateArray = [];
      let dateArray = [];
      if(!this.fromCurrency || !this.toCurrency) {
        this.currencyChartObj ? this.currencyChartObj.destroy() : '';
        this.currencyChartObj = new Chart(
          this.$refs.currencyChart,
          {
            type: 'line',
            data: {
              labels: [],
              datasets: [
                {
                  label: 'Rate',
                  data: [],
                },
              ],
            },
          },
        );
        return;
      }
      this.isLoading = true;
      const currencyRateObj = await getCurrencyRate(this.fromCurrency, this.toCurrency);
      
      if(!currencyRateObj) {
        this.showWarningNotification = true;
      } else {
        this.showWarningNotification = false;
      }

      currencyRateObj?.rateList.forEach((rateObj) => {
        rateArray.push(rateObj.rate);
        dateArray.push(rateObj.date);
      });
      this.currencyChartObj ? this.currencyChartObj.destroy() : '';
      this.isLoading = false;
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
  padding: 1rem 1rem;
  border-radius: 8px;
  background-color: var(--clr-section-background);
  position: relative;
}

@media (min-width: 768px) {
  .chart-panel {
    padding: 2rem 4rem;
  }
}

@media (min-width: 1024px) {
  .chart-panel {
    padding: 2rem 8rem;
  }
}
</style>
