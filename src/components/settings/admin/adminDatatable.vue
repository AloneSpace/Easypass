<template>
  <v-data-table
    :headers="headers"
    :items="users"
    class="elevation-1"
    :search="search"
  >
    <template v-slot:top>
      <v-toolbar flat color="white">
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="primary" dark class="mb-2" v-on="on"
              ><v-icon style="padding-right: 10px;">fas fa-user-plus sm</v-icon
              >เพิ่มผู้ใช้งาน</v-btn
            >
          </template>
          <v-card>
            <v-card-title>
              <span>{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row align="center" justify="center">
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="ชื่อผู้ใช้ / Username"
                      prepend-icon="fas fa-user"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.fullname"
                      label="ชื่อ-นามสกุล / Fullnamee"
                      prepend-icon="fas fa-id-card-alt"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row align="center" justify="center">
                  <v-text-field
                    v-model="editedItem.password"
                    :append-icon="
                      showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'
                    "
                    :label="
                      formTitle == 'เพิ่มผู้ใช้งาน'
                        ? 'รหัสผ่าน / Password (กรุณาใส่ด้วยนะครับ)'
                        : 'รหัสผ่าน (ถ้าไม่ใส่เราจะถือว่าใช้รหัสผ่านเดิม)'
                    "
                    prepend-icon="fas fa-lock"
                    :type="showPassword ? 'text' : 'password'"
                    @click:append="showPassword = !showPassword"
                  ></v-text-field>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="fas fa-search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-toolbar>
    </template>
    <template v-slot:item.action="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">mdi-pencil</v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
        v-show="item.type != 'super_admin'"
        >mdi-delete</v-icon
      >
    </template>
    <template v-slot:no-data>
      <v-btn color="danger" x-large>ไม่มีฐานข้อมูลอยู่ในระบบ</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
import sweetalert from "sweetalert2";

export default {
  name: "adminDatatable",
  data: () => ({
    dialog: false,
    search: "",
    showPassword: false,
    hidden: true,
    headers: [
      {
        text: "#",
        align: "start",
        sortable: false,
        value: "count"
      },
      { text: "ชื่อผู้ใช้", value: "username" },
      { text: "ชื่อ-นามสกุล", value: "fullname" },
      { text: "ประเภทผู้ใช้", value: "type" },
      { text: "ตั้งค่า", value: "action", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      username: "",
      password: "",
      fullname: "",
      type: "user"
    },
    defaultItem: {
      id: 0,
      username: "",
      password: "",
      fullname: "",
      type: "user"
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "เพิ่มผู้ใช้งาน" : "แก้ไขผู้ใช้งาน";
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    }
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios.get("http://localhost/api/v1/users/").then(response => {
        var json = response.data.users;
        for (var i = 0; i < json.length; i++) {
          this.users.push({
            count: i + 1,
            id: Number(json[i].id),
            username: json[i].username,
            fullname: json[i].fullname,
            type: json[i].type
          });
        }
      });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      const index = this.users.indexOf(item);
      sweetalert
        .fire({
          title: "คุณแน่ใจหรือว่าจะลบผู้ใช้ " + this.users[index].username,
          text: "คุณจะไม่สามารถกู้คืนได้อีก",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "ใช่ ฉันจะลบ",
          cancelButtonText: "ยกเลิก"
        })
        .then(result => {
          if (result.value) {
            axios
              .post("http://localhost/api/v1/users/delete", {
                username: this.users[index].username
              })
              .then(response => {
                this.users.splice(index, 1);
                if (response.data.message == "success") {
                  sweetalert.fire(
                    "ขอแสดงความยินดี",
                    "คุณได้ทำการลบผู้ใช้งานสำเร็จ",
                    "success"
                  );
                }
              });
          }
        });
    },

    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },

    save() {
      if (this.editedIndex > -1) {
        axios
          .post("http://localhost/api/v1/users/edit", {
            id: this.editedItem.id,
            username: this.editedItem.username,
            password: this.editedItem.password,
            fullname: this.editedItem.fullname
          })
          .then(response => {
            if (response.data.message === "exist") {
              //! มีชื่อผู้ใช้ในระบบ
              sweetalert.fire({
                icon: "error",
                title: "ขออภัยชื่อผู้ใช้ชื่อนี้มีอยู่แล้วในระบบ",
                text: "กรุณาลองใหม่ด้วยชื่ออื่น"
              });
            } else if (
              response.data.message === "notupdate" ||
              response.data.message === "updatedwithnewPassword" ||
              response.data.message === "updatedwithsamePassword"
            ) {
              //* ทำงานเสร็จสิ้น
              sweetalert.fire({
                icon: "success",
                title: "ขอแสดงความยินดี",
                text: "คุณได้ทำการแก้ไขผู้ใช้คนนี้สำเร็จ"
              });
              Object.assign(this.users[this.editedIndex], this.editedItem);
            } else {
              sweetalert.fire({
                icon: "error",
                title: "ขออภัยเกิดข้อผิดพลาดในระบบ",
                text: "กรุณาลองใหม่อีกครั้งนึง"
              });
            }
          });
      } else {
        //Add
        axios
          .post("http://localhost/api/v1/users/add/", {
            username: this.editedItem.username,
            password: this.editedItem.password,
            fullname: this.editedItem.fullname
          })
          .then(response => {
            console.log(response);
            if (response.data.message == "success") {
              //* ไม่พบ User
              sweetalert.fire({
                icon: "success",
                title: "ขอแสดงความยินดี",
                text: "เราได้ทำการเพิ่มผู้ใช้คนนี้ลงไปในระบบ"
              });
              this.users.push(this.editedItem);
            } else {
              //! พบ User
              sweetalert.fire({
                icon: "error",
                title: "ขออภัยเราพบผู้ใช้งานคนนี้",
                text: "กรุณาลองใส่ผู้ใช้งานอื่น"
              });
            }
          });
      }
      this.close();
    }
  }
};
</script>

<style></style>
