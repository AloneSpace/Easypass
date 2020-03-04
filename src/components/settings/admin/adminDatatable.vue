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
                <v-row>
                  <v-text-field
                    v-model="editedItem.id"
                    type="hidden"
                    :hidden="hidden"
                  ></v-text-field>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.username"
                      label="ชื่อผู้ใช้"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field
                      v-model="editedItem.fullname"
                      label="ชื่อ-นามสกุล"
                    ></v-text-field>
                  </v-col>
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
      <v-icon small @click="deleteItem(item)">mdi-delete</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  name: "adminDatatable",
  data: () => ({
    dialog: false,
    search: "",
    hidden: true,
    headers: [
      {
        text: "#",
        align: "start",
        sortable: false,
        value: "id"
      },
      { text: "ชื่อผู้ใช้", value: "username" },
      { text: "ชื่อ-นามสกุล", value: "fullname" },
      { text: "ประเภทผู้ใช้", value: "type" },
      { text: "ตั้งค่า", value: "action", sortable: false }
    ],
    users: [],
    editedIndex: -1,
    editedItem: {
      id: "",
      username: "",
      fullname: ""
    },
    defaultItem: {
      username: "",
      fullname: ""
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
            id: i + 1,
            username: json[i].username,
            fullname: json[i].name,
            type: json[i].type
          });
        }
        console.log(this.users);
      });
    },

    editItem(item) {
      this.editedIndex = this.users.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      console.log(item);
      // const index = this.users.indexOf(item);
      // confirm("Are you sure you want to delete this item? " + item) &&
      //   this.users.splice(index, 1);
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
        //Edit
        Object.assign(this.users[this.editedIndex], this.editedItem);
      } else {
        this.users.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>

<style></style>
