<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="7">
        <h1><v-icon>fas fa-cog</v-icon> Admin Settings</h1>
        <br />
        <v-divider style="border-bottom: solid 2px black;"></v-divider>
        <v-row align="center" justify="center">
          <v-col style="padding-left: 200px;">
            <v-tabs v-model="tab" fixed-tabs background-color="indigo" dark>
              <v-tab
                v-for="item in items"
                :key="item.tab"
                @click="changeComponents(item.content)"
                >{{ item.tab }}</v-tab
              >
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row align="center" justify="center" style="padding-top: 10px;">
      <v-card width="1200px" :raised="raised" :shaped="shaped">
        <v-card-text>
          <adminDatatable v-if="Page == 'Users'"></adminDatatable>
          <backupDatabase v-else></backupDatabase>
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
import adminDatatable from "@/components/settings/admin/adminDatatable";
import backupDatabase from "@/components/settings/admin/backupDatabase";
export default {
  name: "Admin",
  components: {
    adminDatatable,
    backupDatabase
  },
  data: () => ({
    tab: null,
    Page: "",
    raised: true,
    shaped: true,
    items: [
      { tab: "ผู้ใช้งาน", content: "Users" },
      { tab: "Backup ข้อมูล", content: "backup" }
    ]
  }),
  created() {
    this.Page = "Users";
  },
  methods: {
    changeComponents(components) {
      this.Page = components;
    }
  }
};
</script>

<style></style>
