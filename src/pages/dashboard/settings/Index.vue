<template>
  <v-container class="fill-height" fluid>
    <Admin v-if="type == 'super_admin'"></Admin>
    <User v-else-if="type == 'user'"></User>
  </v-container>
</template>

<script>
import Admin from "@/pages/dashboard/settings/Admin";
import User from "@/pages/dashboard/settings/User";
import axios from "axios";

export default {
  name: "IndexSettings",
  data: () => ({
    type: ""
  }),
  components: {
    Admin,
    User
  },
  beforeCreate() {
    axios.get("http://localhost/session").then(response => {
      this.type = response.data.type;
    });
  }
  // created() {
  //   axios.get("http://localhost/session").then(response => {
  //     this.type = response.data.type;
  //   });
  // }
};
</script>

<style></style>
