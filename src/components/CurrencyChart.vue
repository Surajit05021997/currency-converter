<template>
  <div class="chart-panel">
    <div class="overlay">
      <div class="loading-spinner" v-if="isLoading"></div>
    </div>
    <div v-if="this.fromCurrency && this.toCurrency" class="char-title">
      <p>{{ fromCurrency }} to {{ toCurrency }} chart</p>
    </div>
    <div v-else>
      <p >Please select currency!</p>
    </div>
    <app-notification class="my-1" type="warning">
      <p>Currenct rate graph is available only for USD to INR!</p>
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
  background-color: var(--clr-neutral-900);
  /* opacity: .2; */
}
.loading-spinner {
  position: absolute;
  top: 250px;
  bottom: 250px;
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
