<template>
  <v-row>
    <v-col cols="2"></v-col>
    <v-col cols="7">
      <h1><v-icon>fas fa-pencil-alt</v-icon>&nbsp;User Settings</h1>
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
  <!-- <v-content v-if="Page == 'Entry'">
    <Entry></Entry>
  </v-content>
  <v-content v-else>
    <Exit></Exit>
  </v-content> -->
</template>

<script>
export default {
  name: "User",
  data: () => ({
    tab: null,
    Page: "Entry",
    items: [
      { tab: "ผู้ใช้งาน", content: "Users" },
      { tab: "ทั่วไป", content: "General" }
    ]
  })
};
</script>

<style></style>
