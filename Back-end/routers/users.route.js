import express from "express";
import multer from "multer";
import Users from "../models/user.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/users/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });


router.post("/", async (req, res) => {
  try {
    const email = req.body.email;
    const emailCheck = await Users.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "User already exists" });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/users/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash("admin", saltRounds, async (err, hash) => {
        const newUser = new Users({
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
          password: hash,
          phone: req.body.phone,
          thumb: avatar,
          position: req.body.position,
          address: req.body.address,
        });
        await newUser.save().then((data) => {
          res.json({ message: "User created successfully." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});


router.get("/", async (req, res) => {
  await Users.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No users found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred finding user." });
    });
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Users.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred finding user." });
    });
});


router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.json({ Message: "Failed to update user" });
  }

  if (req.body.oldPassword) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    await Users.findOne({ email: email }).then((admin) => {
      if (admin) {
        bcrypt.compare(oldPassword, admin.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Users.findByIdAndUpdate(
                id,
                { password: hash },
                {
                  useFindAndModify: false,
                }
              )
                .then((data) => {
                  if (!data) {
                    res.json({ message: "Unable to update password." });
                  } else {
                    res.json({ message: "Password updated successfully." });
                  }
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "An error occurred while updatating password." });
                });
            });
          } else {
            res.json({ message: "The passwords do not match" });
          }
        });
      } else {
        res.json({ message: "Something went wrong." });
      }
    });
  } else if (req.body.thumb) {
    await Users.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Unable to update user." });
        } else {
          res.json({ data, message: "User updated successfully." });
        }
      })
      .catch((err) => {
        res.json({ message: "An error occurred while updatating user." });
      });
  } else if (req.file.filename) {

    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/users/${oldThumb}`);

    await Users.findByIdAndUpdate(
      id,
      { ...req.body, thumb: req.file.filename },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.json({ message: "Unable to update user." });
        } else {
          res.json({ message: "User updated successfully." });
        }
      })
      .catch((err) => {
        res.json({ message: "An error occurred while updatating user." });
      });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;


  fs.unlinkSync(`uploads/users/${thumb}`);

  await Users.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "User not found." });
      } else {
        res.status(200).send("User deleted successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred deleting user." });
    });
});

export default router;
