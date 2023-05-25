<template>
<div class="currency-rate-panel">
  <div class="currency-selector-panel">
    <div class="left-panel">
      <select class="currency-selector" v-model="fromCurrency">
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
      <select class="currency-selector" v-model="toCurrency">
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
  padding: 1rem 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-radius: 8px;
  background-color: var(--clr-section-background);
}
.currency-selector-panel {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  flex-direction: column;
}
.left-panel, .right-panel {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.currency-selector-panel img {
  width: 32px;
  align-self: center;
  transform: rotate(90deg);
}
.currency-selector {
  padding: .5rem;
  border: 2px solid var(--clr-border);
  border-radius: 4px;
}
.currency-selector:hover {
  border: 2px solid var(--clr-border-hover);
  cursor: pointer;
}
.currency-selector:focus {
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
@media (min-width: 768px) {
  .currency-rate-panel {
    padding: 2rem 4rem;
    margin-top: 0;
  }
  .currency-selector-panel {
    align-items: center;
    gap: 2rem;
  }
  .currency-selector {
    width: 30rem;
  }
  .from-currency-filed, .to-currency-filed {
    width: 30rem;
  }
}
@media (min-width: 1024px) {
  .currency-rate-panel {
    padding: 4rem 8rem;
  }
  .currency-selector-panel {
    flex-direction: row;
    gap: 0rem;
  }
  .currency-selector-panel img {
    transform: rotate(0deg);
  }
  .currency-selector {
    width: 20rem;
  }
  .from-currency-filed, .to-currency-filed {
    width: 20rem;
  }
}
</style>
