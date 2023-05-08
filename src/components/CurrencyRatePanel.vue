<template>
<div class="currency-rate-panel">
  <div class="currency-selector-panel">
    <div class="left-panel">
      <select class="curreny-selector" v-model="fromCurrency">
        <option disabled selected value="">Select currency</option>
        <option v-for="currencySymbol in currencySymbolList" :key="currencySymbol" :value="currencySymbol">
          {{ currencySymbol + " (" + supportedCurrency[currencySymbol] + ")" }}
        </option>
      </select>
      <div class="from-currency-filed">
        <label for="from-currency">{{ fromCurrency }}</label>
        <input id="from-currency" type="text" placeholder="Enter amount" v-model="fromAmount"
        :disabled="fromCurrency? false : true">
      </div>
    </div>
    <img src="@/assets/swap.svg" alt="">
    <div class="right-panel">
      <select class="curreny-selector" v-model="toCurrency">
        <option disabled selected value="">Select currency</option>
        <option v-for="currencySymbol in currencySymbolList" :key="currencySymbol" :value="currencySymbol">
          {{ currencySymbol + " (" + supportedCurrency[currencySymbol] + ")" }}
        </option>
      </select>
      <div class="to-currency-filed">
        <label for="to-currency">{{ toCurrency }}</label>
        <input id="to-currency" type="text" placeholder="Enter amount" v-model="toAmount"
        :disabled="toCurrency? false : true">
      </div>
    </div>
  </div>
</div>
</template>

<script>
import supportedCurrency from '@/supportedCurrency.json';
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'CurrencyRatePanel',
  data() {
    return {
      fromCurrency: '',
      toCurrency: '',
      fromAmount: '',
      toAmount: '',
      currencySymbolList: [],
      supportedCurrency,
    }
  },
  created() {
    this.currencySymbolList = Object.keys(this.supportedCurrency);
  },
  mounted() {
    document.getElementById('from-currency').addEventListener('keyup', (event) => {
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'].includes(event.key)) {
        if (this.toCurrency && this.fromAmount) {
          this.getConvertedAmount(this.fromCurrency, this.toCurrency, this.fromAmount)
            .then((response) => {
              this.toAmount = response.data.new_amount;
            });
        } else if (this.toCurrency && this.fromAmount === '') {
          this.toAmount = '';
        }
      }
    });
    document.getElementById('to-currency').addEventListener('keyup', (event) => {
      if (['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'Backspace'].includes(event.key)) {
        if (this.fromCurrency && this.toAmount) {
          this.getConvertedAmount(this.toCurrency, this.fromCurrency, this.toAmount)
            .then((response) => {
              this.fromAmount = response.data.new_amount;
            });
        } else if (this.fromCurrency && this.toAmount === '') {
          this.fromAmount = '';
        }
      }
    });
  },
  methods: {
    ...mapActions(['setFromCurrency', 'setToCurrency']),
    getConvertedAmount(have, want, amount) {
      return axios({
        url: `https://api.api-ninjas.com/v1/convertcurrency?have=${have}&want=${want}&amount=${amount}`,
        headers: {
          'X-Api-Key': import.meta.env.API_KEY,
        },
      });
    }
  },
  watch: {
    fromCurrency() {
      this.setFromCurrency(this.fromCurrency);
      if (this.toCurrency && this.toAmount) {
        this.getConvertedAmount(this.toCurrency, this.fromCurrency, this.toAmount)
          .then((response) => {
            this.fromAmount = response.data.new_amount;
          });
      }
    },
    toCurrency() {
      this.setToCurrency(this.toCurrency);
      if (this.fromCurrency && this.fromAmount) {
        this.getConvertedAmount(this.fromCurrency, this.toCurrency, this.fromAmount)
          .then((response) => {
            this.toAmount = response.data.new_amount;
          });
      }
    }
  },
}
</script>

<style scoped>
.currency-rate-panel {
  padding: 5rem 10rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.currency-selector-panel {
  display: flex;
  justify-content: space-between;
  align-items: start;
}
.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.curreny-selector {
  width: 20rem;
  padding: .5rem;
  border: 2px solid var(--clr-border);
  border-radius: 4px;
}
.curreny-selector:hover {
  border: 2px solid var(--clr-border-hover);
  cursor: pointer;
}
.curreny-selector:focus {
  border: 2px solid var(--clr-border-focus);
}
option {
  background-color: var(--clr-primary-200);
}
label {
  margin-right: .5rem;
}
.from-currency-filed, .to-currency-filed {
  border: 2px solid var(--clr-border);
  border-radius: 4px;
  width: 20rem;
  display: flex;
  padding: 0 .5rem;
}
.from-currency-filed:hover, .to-currency-filed:hover {
  border: 2px solid var(--clr-border-hover);
}
input {
  border: none;
  width: 100%;
}
input:focus {
  outline: none;
}
[disabled] {
  cursor: not-allowed;
}
</style>
