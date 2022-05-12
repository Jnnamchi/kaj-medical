<template>
  <div>
    <!-- <div>Landing Page</div>
    <div style="margin-bottom: 25px;"></div> -->
    <div class="skyline-background">
      <div class="site-title">eKYC REGISTRATION</div>
    </div>
    <div style="margin-bottom: 90px;"></div>
    <div>
      <div v-for="questionObj of rules.stages[2].questions" v-bind:key="questionObj.question" class="survey-container">
        <div class="question-grid">
          <div class="question-container">
            {{questionObj.question}}
          </div>
          <div class="answer-container">
            <div v-if="questionObj.type == 'text'">
              <input style="width: 250px !important;">
              <div v-if="'domainCheck' in questionObj" style="color: green">
                Domain check successful
              </div>
            </div>
            <div v-if="questionObj.type == 'textarea'">
              <textarea id="w3review" name="w3review" rows="4" cols="50">
              </textarea>
            </div>
            <div v-if="questionObj.type == 'date'">
              <input type="date" value="1980-01-22">
            </div>
            <div v-if="questionObj.type == 'dropdown'">
              <select style="width: 320px !important;">
                <option disabled value="">Please select one</option>
                <option v-for="option of questionObj.options" v-bind:key="option">{{option}}</option>
              </select>
            </div>
            <div v-if="questionObj.type == 'upload'">
              <div v-if="!('documentTypes' in questionObj)">
                <input type="file" id="myFile" name="filename">
              </div>
              <div v-else>
                <select v-model="questionObj.selectedType" style="width: 320px !important;">
                  <option v-for="documentType of questionObj.documentTypes" v-bind:key="documentType">{{documentType}}</option>
                </select>
                <div v-if="questionObj.selectedType != ''">
                  <input type="file" id="myFile" name="filename">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="margin-bottom: 45px;"></div>
      </div>
    </div>
    <div>
      <div style="font-weight: bold">
        Supplier Max Section Score: 10 / 10
      </div>
      <div style="font-size: 11px">
        Must complete all fields
      </div>
      <!-- <div style="font-size: 11px">
        (Max 8/10 if domain check fails)
      </div> -->
    </div>
    <div style="margin-bottom: 45px;"></div>
    <div class="continue">
      Finish
    </div>
    <div style="margin-bottom: 90px;"></div>
    <div class="skyline-background-2">
    </div>
  </div>
</template>

<script>
import { eKycRules } from './kycRules'
// import vSelect from "vue-select";
// import "vue-select/dist/vue-select.css";

export default {
  name: "LandingPage",
  components: {
  },
  data () {
    return {
      userData: false,
      rules: eKycRules,
      books: [
        { title: "Old Man's War" },
        { title: "The Lock Artist" },
        { title: "HTML5" },
        { title: "Right Ho Jeeves" },
        { title: "The Code of the Wooster" },
        { title: "Thank You Jeeves" }
      ]
    }
  },
  mounted() {
    this.userLoggedIn = false
  },
  methods: {
    test () {
      return true
    },
  }
};
</script>

<style>

.skyline-background {
  width: 100%;
  height: 300px;
  background: url('../assets/skyline.png');
  background-position: 50% 10%;
}

.skyline-background-2 {
  width: 100%;
  height: 500px;
  background: url('../assets/skyline.png');
  background-position: 50% 55%;
}

.site-title {
  color: white;
  font-size: 45px;
  padding-top: 125px;
}

.site-subtitle {
  color: white;
  font-size: 20px;
  margin-top: 30px;
}

.survey-container {
  width: 60%;
  margin: 0 0 0 230px;
}

.question-grid {
  display: grid;
  grid-template-columns: calc(50% - 15px) auto;
  gap: 35px;
}

.question-container {
  text-align: right;
}

.answer-container {
  text-align: left;
}

.continue {
  border: solid 1px;
  padding: 10px 25px;
  border-radius: 5px;
  width: fit-content;
  margin: 0 auto;
}

.continue:hover {
  cursor: pointer;
  background-color: #2c3e50;
  color: white;
}

</style>
