import express from "express";
import multer from "multer";
import Foods from "../models/food.model.js";
const router = express.Router();
import fs from "fs";
import url from "url";


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/foods/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});
const upload = multer({ storage: storage });


router.post("/", upload.single("thumb"), async (req, res) => {
  try {
    const newFood = new Foods({
      title: req.body.title,
      thumb: req.file.filename,
      price: Number(req.body.price),
      featured: req.body.featured,
      active: req.body.active,
      category: req.body.category,
      description: req.body.description,
    });
    await newFood.save().then((data) => {
      res.send("Food item added successfully.");
    });
  } catch (error) {
    res.send({
      message: `Error: ${error}`,
    });
  }
});


router.get("/", async (req, res) => {
  const { q } = req.query;
  if (q) {
    await Foods.find()
      .sort({ _id: -1 })
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: "Food items not found." });
        } else {
          const keys = ["title"];
          const search = (data) => {
            return data.filter((item) =>
              keys.some((key) => item[key].toLowerCase().includes(q))
            );
          };
          res.json(search(data).splice(0, 10));
        }
      })
      .catch((err) => {
        res.status(500).send({ message: "An error occurred fetching food items." });
      });
  } else {
    await Foods.find()
      .sort({ _id: -1 })
      .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Food items not found." });
      } else {
        res.status(200).send(data);
      }
      })
      .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching food items." });
      });
  }
});


router.get("/recommended", async (req, res) => {
  await Foods.find()
    .sort({ rating: -1, totalReviews: -1 })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Unable to fetch food recommendations." });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "Unable to fetch food recommendations." });
    });
});


router.get("/:id", async (req, res) => {
  const id = req.params.id;
  await Foods.findById(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Food item not found" });
      } else {
        res.status(200).send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred fetching food item" });
    });
});


router.put("/:id", upload.single("thumb"), async (req, res) => {
  const id = req.params.id;

  if (!req.body) {
    return res
      .status(400)
      .send({ Message: "Unable to update food item." });
  }

  try {
    // Case 1: No new image, just updating text fields
    if (!req.file) {
      await Foods.findByIdAndUpdate(id, req.body, {
        useFindAndModify: false,
        new: true // Return updated document
      })
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Unable to update food item." });
          } else {
            res.status(200).send({
              message: "Food item updated successfully.",
              data
            });
          }
        });
    } 
    // Case 2: New image uploaded
    else {
      // If we have an old thumb parameter, delete the old image
      var url_parts = url.parse(req.url, true).query;
      var oldThumb = url_parts.cthumb;
      
      if (oldThumb) {
        try {
          fs.unlinkSync(`uploads/foods/${oldThumb}`);
        } catch (fileError) {
          console.log("Error deleting old image:", fileError);
          // Continue even if delete fails
        }
      }

      // Update with new image
      await Foods.findByIdAndUpdate(
        id,
        { ...req.body, thumb: req.file.filename },
        {
          useFindAndModify: false,
          new: true // Return updated document
        }
      )
        .then((data) => {
          if (!data) {
            res.status(404).send({ message: "Unable to update food item." });
          } else {
            res.status(200).send({
              message: "Food item updated successfully.",
              data
            });
          }
        });
    }
  } catch (error) {
    res.status(500).send({ 
      message: "An error occurred updating food item.",
      error: error.message
    });
  }
});


router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  var url_parts = url.parse(req.url, true).query;
  var thumb = url_parts.thumb;
  fs.unlinkSync(`uploads/foods/${thumb}`);

  await Foods.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: "Unable to delete the food item." });
      } else {
        res.status(200).send("Food item deleted successfully.");
      }
    })
    .catch((err) => {
      res.status(500).send({ message: "An error occurred while deleting food item." });
    });
});


router.post("/:id/review", async (req, res) => {
  const id = req.params.id;
  try {
    const { name, rating, comment, customer_id } = req.body;
    const food = await Foods.findById(id);
    if (food) {
      const review = {
        name,
        rating: Number(rating),
        comment,
        customer: customer_id,
      };
      food.reviews.push(review);
      food.totalReviews = food.reviews.length;
      food.rating =
        food.reviews.reduce((acc, item) => item.rating + acc, 0) /
        food.reviews.length;
      await food.save().then((data) => {
        res.json({ message: "Review added succesfully." });
      });
    } else {
      res.json({ message: "Food item not found." });
    }
  } catch (error) {
    res.json({ message: "Something went wrong." });
  }
});

export default router;
