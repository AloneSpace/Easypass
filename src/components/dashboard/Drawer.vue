<template>
  <v-navigation-drawer
    v-model="drawer"
    :color="color"
    :expand-on-hover="expandOnHover"
    :mini-variant="miniVariant"
    :src="bg"
    absolute
  >
    <v-list dense nav class="py-0">
      <v-list-item two-line :class="miniVariant && 'px-0'" color="white">
        <v-list-item-content>
          <v-list-item-title
            ><font style="color: white;"
              >Easypass Management</font
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-divider style="padding-bottom: 200px"></v-divider>

      <v-list-item
        v-for="item in items"
        :key="item.title"
        link
        :to="item.path == '#' ? '' : item.path"
        active-class="border-left: solid 1px red"
      >
        <v-list-item-icon style="margin-right: 20px;">
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            ><font style="color: white">
              {{ item.title }}</font
            ></v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import router from "@/router";
export default {
  name: "Drawer",
  data() {
    return {
      drawer: true,
      items: [
        {
          name: "record",
          title: "บันทึกรถเข้า-ออก",
          path: "/dashboard",
          icon: "fas fa-home"
        },
        {
          name: "history",
          title: "ตารางเข้าออกย้อนหลัง",
          path: "/history",
          icon: "fas fa-clock"
        },
        {
          name: "admin",
          title: "ผู้ดูแลระบบ",
          path: "/admin",
          icon: "fas fa-user"
        },
        {
          name: "signout",
          title: "ออกจากระบบ",
          path: "/signout",
          icon: "fas fa-sign-out-alt"
        }
      ],
      color: "primary",
      colors: ["primary", "blue", "success", "red", "teal"],
      miniVariant: false,
      expandOnHover: false,
      background: true
    };
  },
  methods: {
    setActive: function(name) {
      console.log(name);
      console.log(router.path);
    }
  },
  computed: {
    bg() {
      return this.background
        ? "https://cdn.vuetifyjs.com/images/backgrounds/bg-2.jpg"
        : undefined;
    }
  }
};
</script>

<style>
.active {
  border-left: solid, 2px #f66;
}
</style>
