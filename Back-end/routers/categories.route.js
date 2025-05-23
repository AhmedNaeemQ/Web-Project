import express from "express";
import multer from "multer";
import Categories from "../models/category.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/categories/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });


router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    const newCategory = new Categories({
      title: req.body.title,
      thumb: req.file.filename,
      featured: req.body.featured,
      active: req.body.active,
    });
    await newCategory.save().then((data) => {
      res.send("Category added successfully.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});

// ALL CATEGORY
router.get("/", async (req, res) => {
  await Categories.find()
    .sort({ _id: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "No category found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching categories." });
    });
});

// SINGLE CATEGORY
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Categories.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Category not found." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching the category." });
    });
});

// UPDATE CATEGORY
router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ message: "Unable to update the category" });
  }

  try {
    // Case 1: No new thumbnail uploaded
    if (!req.file) {
      await Categories.findByIdAndUpdate(
        id, 
        req.body, 
        { useFindAndModify: false, new: true }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Unable to update the category" });
          } else {
            res.status(200).send({
              message: "Category updated successfully.",
              data
            });
          }
        });
    } 
    // Case 2: New thumbnail uploaded
    else {
      // Try to delete old thumbnail if it exists
      var url_parts = url.parse(req.url, true).query;
      var oldThumb = url_parts.cthumb;
      
      if (oldThumb) {
        try {
          fs.unlinkSync(`uploads/categories/${oldThumb}`);
        } catch (fileError) {
          console.log("Error deleting old image:", fileError);
          // Continue even if delete fails
        }
      }

      await Categories.findByIdAndUpdate(
        id,
        { ...req.body, thumb: req.file.filename },
        { useFindAndModify: false, new: true }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Unable to update the category" });
          } else {
            res.status(200).send({
              message: "Category updated successfully.",
              thumb: req.file.filename, // Include the new filename
              data
            });
          }
        });
    }
  } catch (error) {
    res.status(500).send({ 
      message: "An error occurred updating the category.", 
      error: error.message 
    });
  }
});

// DELETE CATEGORY
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/categories/${thumb}`);

  await Categories.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Unable to delete the category." });
      } else {
        res.status(200).send("Category deleted successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred deleting the category." });
    });
});

export default router;
