<template>
  <v-card>
    <v-card-title>
      <v-icon>fas fa-clock</v-icon>
      <h3 style="padding-left: 10px;">ตารางรถเข้า-ออก</h3>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="fas fa-search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table :headers="headers" :items="mainDB" :search="search">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span>รายละเอียดเพิ่มเติม</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="11">
                      <v-text-field
                        v-model="moreDetail.exitDate"
                        :disabled="disable"
                        label="วัน-เดือน-ปี รถออก"
                        prepend-icon="far fa-clock"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="11">
                      <v-text-field
                        v-model="moreDetail.citizenID"
                        :disabled="disable"
                        label="บัตรประชาชน 13 หลัก"
                        prepend-icon="far fa-id-card"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="11">
                      <v-textarea
                        :value="moreDetail.address"
                        :disabled="disable"
                        label="ที่อยู่"
                        prepend-icon="fas fa-map-marked-alt"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="11">
                      <v-textarea
                        :value="moreDetail.comment"
                        :disabled="disable"
                        label="หมายเหตุ"
                        prepend-icon="fas fa-comments"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close"
                  >ออกจากหน้าต่าง</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.detail="{ item }">
        <v-icon @click="getMoreDetail(item)">fas fa-info-circle</v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="danger" x-large>ไม่มีฐานข้อมูลอยู่ในระบบ</v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  name: "Datatable",
  data() {
    return {
      search: "",
      dialog: false,
      disable: true,
      headers: [
        {
          text: "วัน/เวลา เข้า",
          align: "start",
          sortable: true,
          value: "entryDate"
        },
        { text: "ชื่อ-นามสกุล", value: "fullname" },
        { text: "เลขทะเบียนรถ", value: "vehicleRegistration" },
        { text: "ประเภทรถ", value: "vehicleType" },
        { text: "รายละเอียด", value: "detail" }
      ],
      mainDB: [
        {
          entryDate: "6 มีนาคม 2563 เวลา 20.00 น.",
          fullname: "นาย กรัณย์ภัทร พรหมวิสุทธิ์",
          vehicleType: "รถเก๋ง",
          vehicleRegistration: "7895",
          exitDate: "6 มีนาคม 2563 เวลา 20.10 น.",
          citizenID: "1-2345-67890-12-3",
          address: "ปทุมธานี",
          comment: "Hello World"
        }
      ],
      moreDetail: [],
      defaultItem: []
    };
  },
  methods: {
    initialize() {
      axios
        .get("http://localhost/api/v1/database/getHistory")
        .then(response => {
          for (var i = 0; i < response.data.length; i++) {
            this.mainDB.push({
              entryDate: response.data.entryDate,
              exitDate: response.data.exitDate,
              fullname: response.data.fullname,
              vehicleRegistration: response.data.vehicleRegistration,
              vehicleType: response.data.vehicleType,
              address: response.data.address,
              comment: response.data.comment,
              citizenID: response.data.citizenID
            });
          }
        });
    },
    getMoreDetail(item) {
      this.moreDetail = Object.assign({}, item);
      this.dialog = true;
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
      }, 300);
    }
  },
  created() {
    // this.initialize();
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  }
};
</script>

<style></style>
