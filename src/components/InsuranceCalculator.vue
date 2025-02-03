<template>
  <div>
    <form @submit.prevent="calculateInsurance">
      <!-- Insurance Type -->
      <div class="input-field">
        <label for="insuranceType">Insurance Type</label>
        <select id="insuranceType" v-model="insuranceType" required>
          <option value="short_term">Short Term Insurance</option>
          <option value="annual">Annual Insurance</option>
        </select>
      </div>

      <!-- Period Start -->
      <div class="input-field">
        <label for="periodStart">Period Start</label>
        <DatePicker
          id="periodStart"
          v-model="periodStart"
          :attributes="dateAttributes"
          format="YYYY-MM-DD"
          required
        />
      </div>

      <!-- Period End (only for short term insurance) -->
      <div v-if="insuranceType === 'short_term'" class="input-field">
        <label for="periodEnd">Period End</label>
        <DatePicker
          id="periodEnd"
          v-model="periodEnd"
          :attributes="dateAttributes"
          format="YYYY-MM-DD"
          required
        />
      </div>

      <!-- Package -->
      <div class="input-field">
        <label for="package">Package</label>
        <select id="package" v-model="package" required>
          <option value="basic">Basic</option>
          <option value="extended">Extended</option>
          <option value="extra">Extra</option>
        </select>
      </div>

      <!-- Additional Charges -->
      <div class="input-field">
        <label for="additionalCharges">Additional Charges</label>
        <select id="additionalCharges" v-model="additionalCharges">
          <option value="cancellation">Cancellation</option>
          <option value="sport_activities">Sport Activities</option>
        </select>
      </div>

      <!-- No. of Persons -->
      <div class="input-field">
        <label for="noOfPersons">No. of Persons</label>
        <input
          id="noOfPersons"
          type="number"
          v-model="noOfPersons"
          min="1"
          max="3"
          required
        />
      </div>

      <button type="submit">Calculate Insurance</button>
    </form>

    <div v-if="insuranceAmount !== null">
      <p>Your insurance amount: {{ insuranceAmount }} EUR</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { DatePicker } from "v-calendar";
import "v-calendar/dist/style.css";

export default defineComponent({
  components: {
    DatePicker,
  },
  data() {
    return {
      insuranceType: "short_term", // default
      periodStart: "",
      periodEnd: "",
      package: "basic",
      additionalCharges: "",
      noOfPersons: 1,
      insuranceAmount: null as number | null,
      dateAttributes: {
        disabledDates: { to: new Date() }, // Disable past dates
      },
    };
  },
  watch: {
    insuranceType(newValue) {
      if (newValue === "annual") {
        // Automatically set Period End for annual insurance
        const startDate = new Date(this.periodStart);
        const endDate = new Date(
          startDate.setFullYear(startDate.getFullYear() + 1)
        );
        this.periodEnd = endDate.toISOString().split("T")[0]; // format as yyyy-MM-dd
      }
    },
  },
  methods: {
    calculateInsurance() {
      let dailyRate = 0;
      let additionalRate = 0;

      if (this.package === "basic") {
        dailyRate = this.insuranceType === "short_term" ? 1.2 : 39;
      } else if (this.package === "extended") {
        dailyRate = this.insuranceType === "short_term" ? 1.8 : 49;
      } else if (this.package === "extra") {
        dailyRate = this.insuranceType === "short_term" ? 2.4 : 59;
      }

      if (this.additionalCharges === "cancellation") {
        additionalRate = this.insuranceType === "short_term" ? 0.5 : 0;
      } else if (this.additionalCharges === "sport_activities") {
        additionalRate = this.insuranceType === "short_term" ? 0.3 : 0;
      }

      const days =
        this.insuranceType === "short_term"
          ? Math.ceil(
              (new Date(this.periodEnd).getTime() -
                new Date(this.periodStart).getTime()) /
                (1000 * 3600 * 24)
            )
          : 365;

      this.insuranceAmount =
        this.insuranceType === "short_term"
          ? dailyRate * days * this.noOfPersons * (1 + additionalRate)
          : dailyRate * this.noOfPersons * (1 + additionalRate);
    },
  },
});
</script>

<style scoped>
.input-field {
  margin-bottom: 1rem;
}
</style>
