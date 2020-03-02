<template>
  <v-container class="fill-height" fluid>
    <!-- <v-row align="left" justify="left">
      <v-icon>fas fa-pencil-alt</v-icon> หน้ากรอก Form ข้อมูลลงในระบบ
    </v-row> -->
    <!-- <v-row>
      <v-col cols="2"> </v-col>
      <v-col cols="7">
        <h1><v-icon>fas fa-pencil-alt</v-icon> หน้ากรอก Form ข้อมูลลงในระบบ</h1>
        <br />
        <v-divider style="border-bottom: solid 2px black;"></v-divider>
        <v-row align="center" justify="center">
          <v-col>
            <Tab style="padding-top: 150px;"></Tab>
          </v-col>
        </v-row>
      </v-col>
    </v-row> -->

    <v-row align="center" justify="center" style="padding-top: 50px;">
      <v-card width="900px" :raised="raised" :shaped="shaped">
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col>
              <v-row align="center" justify="center">
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/19/22/29/pig-896747_960_720.png"
                  width="240px;"
                />
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-card-title>
                <v-row align="center" justify="center">
                  <h2><v-icon>fas fa-pencil-alt</v-icon>&nbsp;จ่ายรถออก</h2>
                </v-row>
              </v-card-title>
              <v-form>
                <v-text-field
                  label="วัน-เดือน-ปี เวลา / Date"
                  name="vehicle_regis"
                  id="vehicle_regi"
                  prepend-icon="far
                fa-clock"
                  type="text"
                  disabled
                  :value="datenow"
                />
                <v-select
                  v-model="selectedCarType"
                  :items="carType"
                  menu-props="auto"
                  label="เลือกประเภทของรถ / Car Type"
                  :prepend-icon="carLogo[selected]"
                  @change="setCarType()"
                  single-line
                ></v-select>
                <v-text-field
                  label="ทะเบียนรถยนต์ / Vehicle registration"
                  name="vehicle_regis"
                  id="vehicle_regi"
                  prepend-icon="far fa-closed-captioning"
                  type="text"
                />
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <v-btn
                      class="ma-2"
                      :loading="loading4"
                      :disabled="loading4"
                      color="info"
                      @click="loader = 'loading4'"
                      x-large
                    >
                      <v-icon left>fas fa-paper-plane</v-icon>ส่งข้อมูล
                      <template v-slot:loader>
                        <span class="custom-loader">
                          <v-icon light>cached</v-icon>
                        </span>
                      </template>
                    </v-btn>
                  </v-row>
                </v-card-actions>
              </v-form>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row align="center" justify="center">
              <h4>Desktop application develop by racksync</h4>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import sweetalert from "sweetalert2";
import moment from "moment";

export default {
  name: "Exit",
  data: () => ({
    datenow: "",
    carLogo: [
      "fas fa-truck-pickup",
      "fas fa-car",
      "fas fa-shuttle-van",
      "fas fa-truck",
      "far fa-question-circle"
    ],
    selected: 4,
    selectedCarType: null,
    carType: ["รถกระบะ", "รถเก๋ง", "รถตู้", "รถบรรทุก"],
    shaped: true,
    raised: true,
    show1: false,
    usernameVal: "",
    passwordVal: "",
    rules: {
      required: value => !!value || "กรุณากรอก Text นี้",
      min: v => v.length >= 8 || "ต้องการ 8 ตัวอักษรขึ้นไป"
    },
    loader: null,
    loading4: false
  }),
  mounted() {
    this.interval = setInterval(this.time, 1000);
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  methods: {
    setCarType() {
      switch (this.selectedCarType) {
        case "รถกระบะ":
          this.selected = 0;
          break;
        case "รถเก๋ง":
          this.selected = 1;
          break;
        case "รถตู้":
          this.selected = 2;
          break;
        case "รถบรรทุก":
          this.selected = 3;
          break;
      }
    },
    time() {
      this.datenow = moment().format("DD/MM/YYYY HH:mm:ss");
    },
    sendData: () => {
      var username = document.querySelector("input[name=username]").value;
      var password = document.querySelector("input[name=password]").value;
      sweetalert
        .fire({
          icon: "success",
          title: "ขอแสดงความยินดี",
          text: username + " " + password
        })
        .then(() => {
          console.log("Hello");
        });
    }
  },
  watch: {
    loader() {
      const l = this.loader;
      this[l] = !this[l];
      setTimeout(() => {
        this[l] = false;
        this.sendLogin();
      }, 3000);
      this.loader = null;
    }
  }
};
</script>

<style>
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
