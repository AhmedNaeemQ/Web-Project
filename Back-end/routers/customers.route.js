import express from "express";
import multer from "multer";
import Customers from "../models/customer.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";
import bcrypt from "bcrypt";
const saltRounds = 10;


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/customers/");
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
    const emailCheck = await Customers.findOne({ email: email });
    if (emailCheck) {
      res.json({ message: "User already exists." });
    } else {
      const filePath = "uploads/default/avatar.png";
      const avatar = Date.now() + "-avatar.png";
      const copyPath = "uploads/customers/" + avatar;
      fs.copyFile(filePath, copyPath, (error) => {
        if (error) {
          throw error;
        }
      });

      bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
        const newCustomer = new Customers({
          name: req.body.name,
          email: req.body.email,
          password: hash,
          thumb: avatar,
          phone: req.body.phone,
          address: req.body.address,
        });
        await newCustomer.save().then((data) => {
          res.json({ data, message: "User created successfully." });
        });
      });
    }
  } catch (error) {
    throw new Error(error);
  }
});


router.get("/", async (req, res) => {
  await Customers.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Customers not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching customers." });
    });
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Customers.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Customer not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching the customer." });
    });
});


router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res.json({ Message: "Unable to update the customer." });
  }

  if (req.body.oldPassword) {
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    const email = req.body.email;

    await Customers.findOne({ email: email }).then((customer) => {
      if (customer) {
        bcrypt.compare(oldPassword, customer.password, (err, result) => {
          if (result === true) {
            bcrypt.hash(newPassword, saltRounds, async (err, hash) => {
              await Customers.findByIdAndUpdate(
                id,
                { password: hash },
                {
                  useFindAndModify: false,
                }
              )
                .then((data) => {
                  if (!data) {
                    res.json({ message: "Unable to update the customer." });
                  } else {
                    res.json({ message: "User updated successfully." });
                  }
                })
                .catch((err) => {
                  res
                    .status(500)
                    .send({ message: "Error updatating customer." });
                });
            });
          } else {
            res.json({ message: "Passwords do not match." });
          }
        });
      } else {
        res.json({ message: "An error occurred updatating the customer." });
      }
    });
  } else if (req.body.thumb) {
    await Customers.findByIdAndUpdate(id, req.body, {
      useFindAndModify: false,
    })
      .then((data) => {
        if (!data) {
          res.json({ message: "Unable to update the customer." });
        } else {
          res.json({ data, message: "User updated successfully." });
        }
      })
      .catch((err) => {
        res.json({ message: "An error occurred updatating the customer." });
      });
  } else if (req.file.filename) {

    var url_parts = url.parse(req.url, true).query;
    var oldThumb = url_parts.cthumb;
    fs.unlinkSync(`uploads/customers/${oldThumb}`);

    await Customers.findByIdAndUpdate(
      id,
      { ...req.body, thumb: req.file.filename },
      {
        useFindAndModify: false,
      }
    )
      .then((data) => {
        if (!data) {
          res.json({ message: "Unable to update the customer." });
        } else {
          res.json({ message: "User updated successfully." });
        }
      })
      .catch((err) => {
        res.json({ message: "An error occurred updatating the customer." });
      });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/customers/${thumb}`);

  await Customers.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Unable to delete the customer" });
      } else {
        res.status(200).send("Customer deleted successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred deleting the customer." });
    });
});

export default router;
