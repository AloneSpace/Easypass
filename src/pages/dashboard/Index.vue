<template>
  <v-app>
    <v-layout>
      <v-flex lg12>
        <Drawer></Drawer>
        <v-content style="padding-left: 100px;">
          <v-container>
            <v-row align="center" justify="center">
              <router-view />
            </v-row>
          </v-container>
        </v-content>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import Drawer from "@/components/dashboard/Drawer";
// import Entry from "@/pages/dashboard/entry/Entry";
export default {
  name: "DashBoardIndex",
  components: {
    Drawer
  }
};
</script>

<style></style>
