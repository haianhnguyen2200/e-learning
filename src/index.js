const path = require("path");
const paypal = require("paypal-rest-sdk");

const express = require("express");
// const morgan = require('morgan');
const methodOverride = require("method-override");
const handlebars = require("express-handlebars");
const app = express();
const port = 3001;

const sortMiddleware = require("./app/middlewares/sortMiddleware");

const route = require("./routes");
const db = require("./config/db");

// Connect DB
db.connect();

// Static file
app.use(express.static(path.join(__dirname, "public")));

// Apply middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.use(methodOverride("_method"));

// Custom middleware
app.use(sortMiddleware);

// HTTP logger
// app.use(morgan('combined'))

// Template engine
app.engine(
  "hbs",
  handlebars({
    extname: ".hbs",
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : "default";

        const icons = {
          default: "oi oi-elevator",
          asc: "oi oi-sort-ascending",
          desc: "oi oi-sort-descending",
        };

        const types = {
          default: "desc",
          asc: "desc",
          desc: "asc",
        };

        const icon = icons[sortType];
        const type = types[sortType];

        return `
                <a href="?_sort&column=${field}&type=${type}">
                <span class="${icon} ml-2"></span>
                </a>
                `;
      },
    },
  })
);
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "resources", "views"));

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id:
    "AfMlsyPUkni53pJCeM1GkgsdjtsoP7cZoayUx91MGMVdYeTetBzYK_moW4vA1tefLY7_M4uJ9iIix3Jh",
  client_secret:
    "EFT6sbtuz7pf76nJGT3du-ZenoWMx4kJmZ5QkPpSbWVwKJ2Ll0HU1LiGaJWh909DqkL-LJUe4wLJeR5e",
});

app.post("/pay", function (req, res) {
  const create_payment_json = {
    intent: "sale",
    payer: {
      payment_method: "paypal",
    },
    redirect_urls: {
      return_url: "http://localhost:3001/success",
      cancel_url: "http://localhost:3001/cancel",
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: "item",
              sku: "item",
              price: "1.00",
              currency: "USD",
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: "USD",
          total: "1.00",
        },
        description: "This is the payment description.",
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === "approval_url") {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});

app.get("/cancel", function (req, res) {
  res.render("cancel");
});
app.get("/success", (req, res) => {
  const payerId = req.query.PayerID;
  const paymentId = req.query.paymentId;

  const execute_payment_json = {
    payer_id: payerId,
    transactions: [
      {
        amount: {
          currency: "USD",
          total: "1.00",
        },
      },
    ],
  };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    function (error, payment) {
      if (error) {
        res.send("THANH TOÁN THẤT BẠI, VUI LÒNG THỬ LẠI.");
      } else {
        // console.log(JSON.stringify(payment));
        // res.send("THANH TOÁN THÀNH CÔNG !");
        res.redirect("http://localhost:3000/add-order");
      }
    }
  );
});

app.get("/cancel", (req, res) => res.send("ĐƠN HÀNG ĐÃ HUỶ"));

// Routes init
route(app);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
