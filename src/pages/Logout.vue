<template>
  <v-app>
    <v-text-field label="Thanos"> </v-text-field>
  </v-app>
</template>

<script>
import axios from "axios";
import router from "@/router";
export default {
  name: "logout",
  created() {
    axios.get("http://localhost/api/v1/signout/").then(() => {});
    router.push({ name: "Login" });
  }
};
</script>

<style></style>
