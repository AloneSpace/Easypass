<template>
  <v-container class="fill-height" fluid>
    <v-row>
      <v-col cols="2"></v-col>
      <v-col cols="7">
        <h1>
          <v-icon>fas fa-pencil-alt</v-icon>หน้ากรอก Form ข้อมูลลงในระบบ
        </h1>
        <br />
        <v-divider style="border-bottom: solid 2px black;"></v-divider>
        <v-row align="center" justify="center">
          <v-col style="padding-left: 200px;">
            <v-tabs v-model="tab" fixed-tabs background-color="indigo" dark>
              <v-tab
                v-for="item in items"
                :key="item.tab"
                @click="changeComponents(item.content)"
              >{{ item.tab }}</v-tab>
            </v-tabs>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-content v-if="Page == 'Entry'">
      <Entry></Entry>
    </v-content>
    <v-content v-else>
      <Exit></Exit>
    </v-content>
  </v-container>
</template>

<script>
import Entry from "@/pages/dashboard/input/Entry";
import Exit from "@/pages/dashboard/input/Exit";
export default {
  name: "Input",
  components: {
    Entry,
    Exit
  },
  data: () => ({
    tab: null,
    Page: "Entry",
    items: [
      { tab: "รับรถเข้า", content: "Entry" },
      { tab: "จ่ายรถออก", content: "Exit" }
    ]
  }),
  methods: {
    changeComponents(components) {
      this.Page = components;
    }
  }
};
</script>

<style></style>
