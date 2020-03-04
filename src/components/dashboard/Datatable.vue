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
    <v-data-table
      :headers="headers"
      :items="desserts"
      :search="search"
    ></v-data-table>
  </v-card>
</template>

<script>
export default {
  name: "Datatable",
  data() {
    return {
      search: "",
      headers: [
        {
          text: "วัน/เวลา เข้า",
          align: "start",
          sortable: true,
          value: "entry"
        },
        { text: "ชื่อ-นามสกุล", value: "fullname" },
        { text: "เลขทะเบียนรถ", value: "vehicleRegistration" },
        { text: "ประเภทรถ", value: "vehicleType" },
        { text: "รายละเอียด", value: "detail" }
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          fullname: "นาย กรัณย์ภัทร พรหมวิสุทธิ์"
        }
      ]
    };
  }
};
</script>

<style></style>
