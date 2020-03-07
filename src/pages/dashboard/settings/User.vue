<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="7">
        <h1><v-icon>fas fa-cog</v-icon>&nbsp;User Settings</h1>
        <br />
        <v-divider style="border-bottom: solid 2px black;"></v-divider>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" style="padding-top: 10px;">
      <v-card width="1200px" :raised="raised" :shaped="shaped">
        <v-card-text>
          <userSettings></userSettings>
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
import userSettings from "@/components/settings/user/userSettings";
export default {
  name: "User",
  components: {
    userSettings
  },
  data: () => ({
    raised: true,
    shaped: true
  })
};
</script>

<style></style>
