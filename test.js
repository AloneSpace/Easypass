const {
  ThaiCardReader,
  EVENTS,
  MODE
} = require("@privageapp/thai-national-id-reader");

const reader = new ThaiCardReader();
reader.readMode = MODE.PERSONAL_PHOTO;
reader.autoRecreate = true;
reader.startListener();

reader.on(EVENTS.READING_COMPLETE, obj => {
  console.log(obj);
});
