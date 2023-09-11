const { User } = require("../../models/user");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  const imageName = `${_id}_${originalname}`;
  try {
    const image = await Jimp.read(tempUpload);
    image.resize(250, 250);
    await image.writeAsync(tempUpload);
    const resultUpload = path.join(avatarsDir, imageName);
    await fs.rename(tempUpload, resultUpload);
    const urlAvatar = path.join("avatars", imageName);
    await User.findByIdAndUpdate(_id, { urlAvatar });
    res.json({ urlAvatar });
  } catch (error) {
    await fs.unlink();
    throw error;
  }
};

module.exports = avatar;