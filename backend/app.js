require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const findOrCreate = require("mongoose-find-or-create");
const MONGO_URI = process.env.MONGO_URI;
const api = "/api/v1";
const app = express();
app.use(express.json());
app.use(cors());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
mongoose.set("strictQuery", false);
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true,
    tlsAllowInvalidHostnames: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err);
  });

//DRIVER SCHEMA
const driverSchema = new mongoose.Schema(
  {
    data: Object,
  },
  {
    timestamps: true,
  }
);

driverSchema.plugin(findOrCreate);

const Driver = new mongoose.model("Driver", driverSchema);

app.post(`${api}/add-driver`, (req, res) => {
  Driver.findOrCreate(
    {
      data: req.body,
    },
    function (err, doc) {
      if (!err) {
        res.json(doc);
        console.log(doc);
      } else {
        console.log(err);
      }
    }
  );
});

app.get(`${api}/drivers`, (req, res) => {
  Driver.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.delete(`${api}/delete-driver/:id`, (req, res) => {
  Driver.deleteOne({ _id: req.params.id })
    .then((item) => console.log(item))
    .catch((err) => console.log(err));
});

app.get(`${api}/find-driver`, (req, res) => {
  Driver.find({ "data.status": "Online" })
    .sort({ "data.earnedToday": 1 })
    .limit(1)
    .exec((err, driver) => {
      if (err) return console.error(err);
      res.send(driver[0].data.email);
      console.log(driver);
    });
});

app.put(`${api}/update-driver-status/:email`, (req, res) => {
  const email = req.params.email;
  const status = req.body.status;
  Driver.findOneAndUpdate(
    { "data.email": email },
    { $set: { "data.status": status } },
    { new: true }
  )
    .then((updatedPerson) => {
      res.send({
        message: "Person status updated successfully",
        person: updatedPerson,
      });
    })
    .catch((err) => {
      console.error(err);
      res
        .status(500)
        .send({ message: "An error occurred while updating status" });
    });
});

//REQUEST SCHEMA
const requestSchema = new mongoose.Schema(
  {
    data: Object,
  },
  {
    timestamps: true,
  }
);

requestSchema.plugin(findOrCreate);

const Request = new mongoose.model("Request", requestSchema);

app.post(`${api}/create-request`, (req, res) => {
  Request.findOrCreate(
    {
      data: req.body,
    },
    function (err, doc) {
      if (!err) {
        res.json(doc);
      } else {
        console.log(err);
      }
    }
  );
});

app.get(`${api}/all-requests`, (req, res) => {
  Request.find()
    .then((items) => res.json(items))
    .catch((err) => console.log(err));
});

app.get(`${api}/requests/:email`, (req, res) => {
  Request.find({ "data.driver": req.params.email })
    .then((items) => {
      res.json(items);
      console.log(items);
    })
    .catch((err) => console.log(err));
});

app.put(`${api}/update-request-status/:id`, (req, res) => {
  const id = req.params.id;
  const status = req.body.status;
  if (status == "rejected") {
    Request.findOneAndUpdate(
      { _id: id },
      { $set: { "data.status": status, "data.driver": "" } },
      { new: true }
    )
      .then((updatedRequest) => {
        res.send({
          message: "Request status updated successfully",
          request: updatedRequest,
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "An error occurred while updating status" });
      });
  } else {
    Request.findOneAndUpdate(
      { _id: id },
      { $set: { "data.status": status } },
      { new: true }
    )
      .then((updatedRequest) => {
        res.send({
          message: "Request status updated successfully",
          request: updatedRequest,
        });
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .send({ message: "An error occurred while updating status" });
      });
  }
});

app.delete(`${api}/delete-request/:id`, (req, res) => {
  Request.deleteOne({ _id: req.params.id })
    .then((item) => console.log(item))
    .catch((err) => console.log(err));
});

//POST DELIVERY REQUEST SCHEMA
const postRequestSchema = new mongoose.Schema(
  {
    data: Object,
  },
  {
    timestamps: true,
  }
);

postRequestSchema.plugin(findOrCreate);

const PostRequest = new mongoose.model("PostRequest", postRequestSchema);

app.post(`${api}/log-post-request`, (req, res) => {
  PostRequest.findOrCreate(
    {
      data: req.body,
    },
    function (err, doc) {
      if (!err) {
        res.json(doc);
      } else {
        console.log(err);
      }
    }
  );
});

app.listen(3000, () => {
  console.log(`Server is running on http://localhost:3000${api}`);
});
