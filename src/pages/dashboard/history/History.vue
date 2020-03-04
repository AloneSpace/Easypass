<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="2"> </v-col>
      <v-col cols="7">
        <h1><v-icon>far fa-clock</v-icon> ตารางเวลารถเข้าออก</h1>
        <br />
        <v-divider style="border-bottom: solid 2px black;"></v-divider>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" style="padding-top: 50px;">
      <v-card width="1200px" :raised="raised" :shaped="shaped">
        <v-card-text>
          <Datatable></Datatable>
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
import Datatable from "@/components/dashboard/Datatable";

export default {
  name: "History",
  components: {
    Datatable
  },
  data: () => ({
    shaped: true,
    raised: true,
    show1: false
  })
};
</script>
