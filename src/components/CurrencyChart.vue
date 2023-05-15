<template>
  <div class="chart-panel">
    <div class="overlay" v-if="isLoading">
      <div class="loading-spinner"></div>
    </div>
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

export default {
  name: 'CurrencyChart',
  components: {
    AppNotification,
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
  padding: 2rem 10rem;
  border-radius: 8px;
  background-color: var(--clr-section-background);
  position: relative;
}
.overlay {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, .5);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.loading-spinner {
  width: 4rem;
  height: 4rem;
  border-radius: .5rem;
  border-radius: 50%;
  border: .5rem solid white;
  border-top-color: purple;
  animation: loading 0.7s ease infinite;
}

@keyframes loading {
  from { transform : rotate(0turn) }
  to { transform : rotate(1turn) }
}
</style>
