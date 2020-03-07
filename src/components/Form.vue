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
                    <v-icon>fas fa-sign-in-alt</v-icon
                    >&nbsp;ล็อคอินเพื่อเข้าสู่<br />ระบบบันทึกเวลาเข้าออก
                  </h2>
                </v-row>
              </v-card-title>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="username"
                  :rules="usernameRules"
                  label="ชื่อผู้ใช้งาน / Username"
                  prepend-icon="far fa-user"
                  required
                ></v-text-field>

                <v-text-field
                  v-model="password"
                  :rules="passwordRules"
                  :append-icon="
                    showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                  "
                  label="รหัสผ่าน / Password"
                  prepend-icon="fas fa-lock"
                  :type="showPassword ? 'text' : 'password'"
                  @click:append="showPassword = !showPassword"
                  required
                ></v-text-field>
                <v-checkbox
                  v-model="rememberme"
                  label="จดจำฉัน (ออกโปรแกรมโดยไม่ต้องล็อคอินใหม่)"
                ></v-checkbox>
                <v-card-actions>
                  <v-row align="center" justify="center">
                    <v-btn
                      :disabled="!valid"
                      color="success"
                      class="mr-4"
                      @click="sendLogin"
                      x-large
                    >
                      <v-icon left>fas fa-paper-plane</v-icon>เข้าสู่ระบบ
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
import axios from "axios";
import sweetalert from "sweetalert2";
import router from "@/router";

export default {
  name: "Form",
  data: () => ({
    valid: true,
    rememberme: false,
    showPassword: false,
    shaped: true,
    raised: true,
    username: "",
    usernameRules: [
      v => !!v || "กรุณากรอก ชื่อผู้ใช้งาน",
      v => v != "/[^a-z][0-9]/" || "กรุณากรอกให้อยู่ในรูปแบบตัวอักษรภาษาอังกฤษ"
    ],
    password: "",
    passwordRules: [v => !!v || "กรุณากรอก รหัสผ่าน"]
  }),
  created() {
    axios.get("http://localhost/session").then(response => {
      if (response.data.rememberme) router.push({ name: "Dashboard" });
    });
  },
  methods: {
    sendLogin() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost/api/v1/signin/", {
            username: this.username,
            password: this.password,
            rememberme: this.rememberme
          })
          .then(response => {
            if (response.data.message == "failed") {
              sweetalert.fire({
                icon: "error",
                title: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง",
                text: "กรุณาใส่ให้ถูกต้อง"
              });
            }
            if (response.data.message == "success") {
              sweetalert
                .fire({
                  icon: "success",
                  title: "ขอแสดงความยินดี",
                  text: "เราจะพาคุณไปยังหน้าจัดการระบบ"
                })
                .then(() => {
                  axios
                    .get("http://localhost/session")
                    .then(function(response) {
                      if (response.data) {
                        router.push({ name: "Dashboard" });
                      }
                    })
                    .catch(function(error) {
                      console.log(error);
                    })
                    .then(function() {
                      // always executed
                    });
                  // router.push({ name: "Dashboard" });
                });
            }
          });
      }
    }
  }
};
</script>
