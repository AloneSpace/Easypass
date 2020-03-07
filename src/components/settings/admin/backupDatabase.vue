<template>
  <v-container>
    <v-row align="center" justify="center">
      <v-col cols="6"
        ><v-file-input
          v-model="Folder"
          color="deep-purple accent-4"
          label="กรุณาเลือก Folder"
          multiple
          prepend-icon="mdi-paperclip"
          outlined
          :show-size="1000"
          webkitdirectory
          mozdirectory
          msdirectory
          odirectory
          directory
        >
          <template v-slot:selection="{ index }">
            <v-chip
              v-if="index < 2"
              color="deep-purple accent-4"
              dark
              label
              small
              >{{ Folder[0].path }}</v-chip
            >
          </template>
        </v-file-input>
      </v-col>
    </v-row>
    <v-row align="center" justify="center">
      <v-btn large @click="exportToCSV"
        ><v-icon style="padding-right: 10px;">fas fa-save</v-icon>BACKUP
        ข้อมูล</v-btn
      >
    </v-row>
  </v-container>
</template>

<script>
const csv = require("@fast-csv/format");
import path from "path";
import sweetalert from "sweetalert2";
import moment from "moment";
import axios from "axios";
export default {
  name: "backupDatabase",
  data: () => ({
    Folder: []
  }),
  methods: {
    replaceAll(str, find, replace) {
      return str.replace(new RegExp(find, "g"), replace);
    },
    exportToCSV() {
      if (!this.Folder[0]) {
        sweetalert.fire({
          icon: "error",
          title: "กรุณาเลือก Folder",
          text: "ก่อนทำการ BACKUP ข้อมูล"
        });
      } else {
        var pathFolder = this.Folder[0].path.replace(/\\/g, "\\\\") + "\\\\";
        var result = [["id", "username", "password", "fullname", "type"]];
        axios.get("http://localhost/api/v1/users/").then(response => {
          response.data.users.forEach(data => {
            result.push({
              id: data.id,
              username: data.username,
              password: data.password,
              fullname: data.fullname,
              type: data.type
            });
          });
        });
        csv
          .writeToPath(
            path.resolve(
              pathFolder,
              "backup_" + moment().format("YYYY_MM_DD_HHmmss") + ".csv"
            ),
            result
          )
          .on("error", err => console.error(err))
          .on("finish", () => {
            sweetalert.fire({
              icon: "success",
              title: "ทำการ BACKUP ข้อมูลคุณตามที่",
              text: pathFolder.replace(/\\\\/g, "\\")
            });
          });
      }
    }
  }
};
</script>

<style></style>
