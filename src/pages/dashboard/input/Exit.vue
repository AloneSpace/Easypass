<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center" style="padding-top: 50px;">
      <v-card
        width="900px"
        :raised="raised"
        :shaped="shaped"
        v-if="isReadBarcode"
      >
        <v-card-text>
          <v-card-title>
            <v-row align="center" justify="center">
              <h2><v-icon>fas fa-sign-out-alt</v-icon>&nbsp;จ่ายรถออก</h2>
            </v-row>
          </v-card-title>
          <v-form>
            <v-row>
              <v-col cols="12" sm="6">
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
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="เลขที่ขับรถ / Serial Car Entry"
                  name="vehicle_id"
                  id="vehicle_id"
                  prepend-icon="far
                fa-clock"
                  type="text"
                  disabled
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="ชื่อ-สกุล / Fullname"
                  name="fullname"
                  id="fullname"
                  prepend-icon="far
                fa-user"
                  type="text"
                  disable
                />
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="เลขบัตรประชาชน / Citizen No."
                  name="citizenID"
                  id="citizenID"
                  prepend-icon="far
                fa-address-card"
                  type="text"
                  disable
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6">
                <v-select
                  v-model="selectedCarType"
                  :items="carType"
                  menu-props="auto"
                  label="เลือกประเภทของรถ / Car Type"
                  :prepend-icon="carLogo[selected]"
                  @change="setCarType()"
                  single-line
                  return-object
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="ทะเบียนรถยนต์ / Vehicle registration"
                  name="vehicle_regis"
                  id="vehicle_regi"
                  prepend-icon="far fa-closed-captioning"
                  type="text"
                />
              </v-col>
            </v-row>
            <v-textarea
              auto-grow
              label="ที่อยู่"
              rows="4"
              row-height="10"
              :shape="shaped"
              prepend-icon="fas fa-map-marked-alt"
            ></v-textarea>
            <v-textarea
              auto-grow
              label="หมายเหตุ"
              rows="2"
              row-height="15"
              :shape="shaped"
              prepend-icon="far fa-comment"
            ></v-textarea>
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
        </v-card-text>
        <v-card-actions>
          <v-container>
            <v-row align="center" justify="center">
              <h4>Desktop application develop by racksync</h4>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
      <v-card v-else>
        <barcode
          :value="barcode.value"
          :tag="barcode.tag"
          :options="barcode.options"
        >
          Show this if the rendering fails.
        </barcode>
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
    isReadBarcode: false,
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
    loading4: false,
    barcode: {
      value: "579",
      tag: "svg",
      options: {
        lineColor: "#ff7069",
        fontSize: 32,
        font: "Courier",
        width: 3,
        height: 60,
        marginBottom: 60,
        format: "CODE128",
        background: "#ccffff"
      }
    }
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
