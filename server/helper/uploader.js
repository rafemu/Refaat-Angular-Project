const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "./images",
  filename: function (_req, file, cb) {
    cb(
      null,
      _req.body.destination + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
var upload = multer({
  storage: storage,
  limits: {
    fields: 10,
    fieldNameSize: 50, // TODO: Check if this size is enough
    fieldSize: 20000, //TODO: Check if this size is enough
    fileSize: 15000000, // 150 KB for a 1080x1080 JPG 90
  },
  fileFilter: async function (_req, file, cb) {
    const { destination, description, startAt, endAt, price } = _req.body;
    if (!destination || !description || !startAt || !endAt || !price) {
      cb(`Error:  not found`);
    } else {
      checkFileType(file, cb);
    }
  },
}).single("file");
function checkFileType(file, cb) {
  // Allowed ext
  const filetypes = /jpeg|jpg|png|gif/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb("Error: Images Only!");
  }
}

module.exports = upload;
