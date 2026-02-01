<template>
  <div class="sdd-page">
    <header class="sdd-header">
      <p class="sdd-earned">
        <span class="sdd-earned-value">{{ formattedEarned }}</span>
      </p>
      <p class="sdd-subtitle">Money earned so far today</p>
    </header>

    <section class="sdd-settings">
      <form class="sdd-form" @submit.prevent>
        <div class="sdd-form-row">
          <label class="sdd-label">
            Daily pay
            <input
              v-model.number="dailyPay"
              type="number"
              min="0"
              step="0.01"
              class="sdd-input"
            />
          </label>
          <label class="sdd-label">
            Currency
            <select v-model="currency" class="sdd-input">
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
              <option value="CNY">CNY</option>
              <option value="CHF">CHF</option>
              <option value="AUD">AUD</option>
              <option value="CAD">CAD</option>
              <option value="BRL">BRL</option>
              <option value="KRW">KRW</option>
              <option value="TWD">TWD</option>
            </select>
          </label>
        </div>
        <div class="sdd-form-row">
          <label class="sdd-label">
            Start
            <input
              v-model="startTime"
              type="time"
              class="sdd-input"
            />
          </label>
          <label class="sdd-label">
            End
            <input
              v-model="endTime"
              type="time"
              class="sdd-input"
            />
          </label>
        </div>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
const { currency, dailyPay, startTime, endTime } = useSddSettings()
const { formattedEarned } = useEarnedToday(dailyPay, startTime, endTime, currency)
</script>

<style scoped>
.sdd-page {
  max-width: 32rem;
  margin: 0 auto;
  padding: 2rem 1rem;
  font-family: system-ui, -apple-system, sans-serif;
  min-height: 100vh;
  background: #0f0f12;
  color: #e4e4e7;
}

.sdd-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.sdd-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #e4e4e7;
}

.sdd-subtitle {
  font-size: 0.875rem;
  color: #a1a1aa;
  margin: 0 0 10rem 0;
}

.sdd-earned {
  font-size: 4rem;
  font-weight: 700;
  margin: 10rem 0 1rem 0;
  letter-spacing: -0.02em;
  color: #4ade80;
  min-height: 1.2em;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sdd-earned-value {
  display: inline-block;
  font-variant-numeric: tabular-nums;
}

.sdd-refresh {
  font-size: 0.75rem;
  color: #71717a;
  margin: 0;
}

.sdd-settings h2 {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: #e4e4e7;
}

.sdd-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sdd-form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

@media (max-width: 480px) {
  .sdd-form-row {
    grid-template-columns: 1fr;
  }
}

.sdd-label {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e4e4e7;
}

.sdd-input {
  padding: 0.5rem 0.75rem;
  border: 1px solid #3f3f46;
  border-radius: 0.375rem;
  font-size: 1rem;
  background: #18181b;
  color: #e4e4e7;
}

.sdd-input:focus {
  outline: none;
  border-color: #4ade80;
  box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
}

.sdd-input[type="number"]::-webkit-inner-spin-button,
.sdd-input[type="number"]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.sdd-input[type="number"] {
  -moz-appearance: textfield;
}
</style>
