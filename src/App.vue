<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import InputText from 'primevue/inputtext'
import { getCryptoCoinsList } from '@/service/api'
import { CoinSummary } from '@/types'

const coinSearch = ref('')
const coinList = ref<CoinSummary[]>([])
const filteredCoinList = computed(() => {
  if (coinSearch.value.length < 2) {
    return []
  }

  return coinList.value.filter((coin) =>
    // coin.id.toLowerCase().includes(coinSearch.value.toLowerCase()) ||
    coin.symbol.toLowerCase().includes(coinSearch.value.toLowerCase())
  )
})

onMounted(async () => {
  try {
    const coins = await getCryptoCoinsList()
    coinList.value = coins
  } catch (error) {
    console.error('Error fetching coins:', error)
  }
})
</script>

<template>
  <main class="main">
    <header>
      <h1>BraveMoney</h1>
      <h3>An app to track your modern investing life</h3>
      <div class="search">
        <InputText v-model="coinSearch" type="text" placeholder="Search Coins" />
      </div>
    </header>

    <section v-if="filteredCoinList.length > 0">
      <ul class="coin-list">
        <li v-for="coin in filteredCoinList" :key="coin.id">{{ coin.name }} ({{ coin.symbol }})</li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
.main {
  padding: 20px;
}

.search {
  margin-top: 20px;
}

.coin-list {
  list-style: none;
  padding: 0;
  margin: 20px 0;
  max-height: 300px; /* Adjust height to fit 10 coins before scrolling */
  overflow-y: auto;
}

.coin-list li {
  margin: 5px 0;
}
</style>
