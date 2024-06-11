const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Listing = require("./models/listing");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const { log } = require("console");
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("connected DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public/css")));
app.use(express.static(path.join(__dirname, "public/js")));

//INDEX ROUTER

app.get("/listings", async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
});

//New Router

app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Create Route

app.post("/listings", async (req, res) => {
  const newListing = new Listing({ ...req.body.listing });
  await newListing.save();
  res.redirect("/listings");
});

//edit Route

app.get("/listings/:id/edit", async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
});

//Update Route

app.put("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
});

//DELETE ROUTE
app.delete("/listings/:id", async (req, res) => {
  let { id } = req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect("/listings");
});

//View Router

app.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listings = await Listing.findById(id);

  res.render("listings/view", { listings });
});

app.get("/", (req, res) => {
  res.send("Root is Working");
});

app.listen(8080, () => {
  console.log(`App is listening on port 8080`);
});
