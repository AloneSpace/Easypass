<template>
  <v-tabs v-model="tab" fixed-tabs background-color="indigo" dark>
    <v-tab v-for="item in items" :key="item.tab">
      {{ item.tab }}
    </v-tab>
  </v-tabs>
</template>

<script>
export default {
  name: "Tab",
  data() {
    return {
      tab: null,
      items: [
        { tab: "รับรถเข้า", content: "Tab 1 Content" },
        { tab: "จ่ายรถออก", content: "Tab 3 Content" }
      ]
    };
  }
};
</script>

<style></style>
