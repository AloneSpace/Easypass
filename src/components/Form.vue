<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card width="1280px" :raised="raised" :shaped="shaped">
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col>
              <v-row align="center" justify="center">
                <img
                  src="https://cdn.pixabay.com/photo/2015/08/19/22/29/pig-896747_960_720.png"
                  width="500px;"
                />
              </v-row>
            </v-col>
            <v-col cols="5">
              <v-card-title>
                <v-row align="center" justify="center">
                  <h2>
                    <v-icon>fas fa-sign-in-alt</v-icon>&nbsp;เข้าสู่ระบบ Easy
                    Management
                  </h2>
                </v-row>
              </v-card-title>
              <v-form>
                <v-text-field
                  v-model="usernameVal"
                  label="ผู้ใช้ / Username"
                  name="username"
                  id="username"
                  prepend-icon="fas fa-user"
                  type="text"
                />
                <v-text-field
                  v-model="passwordVal"
                  :append-icon="show1 ? 'fas fa-eye-slash' : 'fas fa-eye'"
                  :rules="[rules.required, rules.min]"
                  :type="show1 ? 'text' : 'password'"
                  name="password"
                  id="password"
                  label="รหัสผ่าน / Password"
                  hint="อย่างน้อย 8 ตัวอักษร"
                  counter
                  @click:append="show1 = !show1"
                  prepend-icon="fas fa-lock"
                ></v-text-field>
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
                      <v-icon left>fas fa-paper-plane</v-icon>เข้าสู่ระบบ
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
              <h4>
                Desktop application develop by racksync
              </h4>
            </v-row>
          </v-container>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import sweetalert from "sweetalert2";
import router from "@/router";
import axios from "axios";

export default {
  name: "Form",
  data: () => ({
    time: null,
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
  methods: {
    sendLogin: () => {
      var username = document.querySelector("input[name=username]").value;
      var password = document.querySelector("input[name=password]").value;
      axios
        .post("http://localhost/api/v1/signin/", {
          username: username,
          password: password
        })
        .then(response => {
          if (response.data.status == "failed") {
            sweetalert.fire({
              icon: "error",
              title: "เกิดข้อผิพลาดในระบบ",
              text: username + " " + password
            });
          }
          if (response.data.status == "success") {
            sweetalert
              .fire({
                icon: "success",
                title: "ขอแสดงความยินดี",
                text: username + " " + password
              })
              .then(() => {
                router.push({ name: "Dashboard" });
              });
          }
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
