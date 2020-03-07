<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <v-text-field
          v-model="username"
          label="ขื่อผู้ใช้ / Username"
          prepend-icon="far fa-user"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <v-text-field
          v-model="fullname"
          label="ชื่อ-นามสกุล / Fullname"
          prepend-icon="fas fa-id-card-alt"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="5">
        <v-text-field
          v-model="password"
          :append-icon="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
          label="รหัสผ่าน (ถ้าไม่ใส่เราจะถือว่าใช้รหัสผ่านเดิม)"
          prepend-icon="fas fa-lock"
          :type="showPassword ? 'text' : 'password'"
          @click:append="(showPassword = !showPassword), editUser"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="2">
        <v-btn large @click="editUser"
          ><v-icon style="padding-right: 20px;">fas fa-pencil-alt</v-icon
          >ยืนยันการแก้ไข</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from "axios";
export default {
  name: "userSettings",
  data: () => ({
    showPassword: false,
    username: "",
    fullname: "",
    password: ""
  }),
  created() {
    axios.get("http://localhost/session").then(response => {
      this.username = response.data.username;
      this.fullname = response.data.fullname;
    });
  },
  methods: {
    editUser() {
      this.password;
    }
  }
};
</script>

<style></style>
