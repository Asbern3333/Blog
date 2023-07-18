const express = require("express");
const app = express();
const port = 4003;
const bcrypt = require("bcryptjs");
const session = require('express-session');
const { User, Comments, Post } = require("./models");
const comments = require("./models/comments");
require("dotenv").config();
app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  res.on("finish", () => {
    // the 'finish' event will be emitted when the response is handed over to the OS
    console.log(`Response Status: ${res.statusCode}`);
  });
  next();
});
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000, // 1 hour
    },
  })
);

const authenticateUser = (req, res, next) => {
  if (!req.session.userId) {
    return res
      .status(401)
      .json({ message: "You must be logged in to view this page." });
  }
  next();
};
app.delete("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.sendStatus(500);
    }

    res.clearCookie("connect.sid");
    return res.sendStatus(200);
  });
});

app.get("/post", async (req, res) => {
  try {
    const userinfo = await Post.findAll();
    res.status(201).json(userinfo)
  } catch (error) {
    console.error(error)
  }
})
app.get("/post/:id", async (req, res) => {
  const PostID = parseInt(req.params.id, 10);
  
  try {
    const Postinfo = await Post.findByPk(PostID);
    res.status(201).json(Postinfo)
  } catch (error) {
    console.error(error)
  }
})

app.post("/post", async (req, res) => {
  req.session.PostId = Post.id;
  try {
    const post = await Post.create({
      content: req.body.content,
      title: req.body.title,
    });

    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "Post created!",
      post: {
        content: post.content,
        title: post.title,
      },
    });
    req.session.PostId = post.id;

  } catch (error) {
    console.error(error);
  }
});
app.patch("/post/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  try {
    const [numberOfAffectedRows, affectedRows] = await Post.update(
      req.body,
      { where: { id: postId }, returning: true }
    ); if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

app.delete("/post/:id", async (req, res) => {
  const PostID = parseInt(req.params.id, 10);
  const Postindex = await Post.findByPk(PostID);
  if (Postindex !== -1) {
    Postindex.destroy();
    res.send({ message: "Job deleted successfully" });
  } else {
    res.status(404).send({ message: "Job not found" });
  }

});
app.get("/comments", async (req, res) => {
  try {
    const userinfo = await Comments.findAll();
    res.status(201).json(userinfo)
  } catch (error) {
    console.error(error)
  }
})
app.get("/comments/:id", async (req, res) => {
  const PostID = parseInt(req.params.id, 10);
  
  try {
    const Postinfo = await Comments.findByPk(PostID);
    res.status(201).json(Postinfo)
  } catch (error) {
    console.error(error)
  }
})

app.post("/comments", async (req, res) => {
  req.session.commentId = Comments.id;
  try {
    const comment = await Comments.create({
      content: req.body.content,
    });

    // Send a response to the client informing them that the user was successfully created
    res.status(201).json({
      message: "comment created!",
      comment: {
        content: comment.content,
      },
    });
    req.session.PostId = content.id;

  } catch (error) {
    console.error(error);
  }
});
app.patch("/comments/:id", async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  try {
    const [numberOfAffectedRows, affectedRows] = await Comments.update(
      req.body,
      { where: { id: postId }, returning: true }
    ); if (numberOfAffectedRows > 0) {
      res.status(200).json(affectedRows[0]);
    } else {
      res.status(404).send({ message: "Job not found" });
    }
  } catch (err) {
    if (err.name === "SequelizeValidationError") {
      return res.status(422).json({ errors: err.errors.map((e) => e.message) });
    }
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

app.delete("/comments/:id", async (req, res) => {
  const commentsId = parseInt(req.params.id, 10);
  const commentsID = await Comments.findByPk(commentsId);
  if (commentsID !== -1) {
    commentsID.destroy();
    res.send({ message: "Job deleted successfully" });
  } else {
    res.status(404).send({ message: "Job not found" });
  }

});


app.post("/login", async (req, res) => {
  try {
    // find the user based on the email address in the body
    const user = await User.findOne({ where: { email: req.body.email } });

    if (user === null) {
      return res.status(401).json({
        message: "Incorrect credentials"
      })
    }

    bcrypt.compare(req.body.password, user.password, (error, result) => {
      if (result) {
        // passwords match
        req.session.userId = user.id;

        res.status(200).json({
          message: "Logged in successfully",
          user: {
            username: user.username,
            email: user.email
          }
        })
      } else {
        // passwords don't match
        return res.status(401).json({
          message: "Incorrect credentials",
        });
      }
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during the login process"})
  }
})
app.get("/user", async (req, res) => {
  try {
    const userinfo = await User.findAll();
    res.status(201).json(userinfo)
  } catch (error) {
    console.error(error)
  }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`)
});

     app.post("/signup", async (req, res) => {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      req.session.UserId = User.id;
      try {
        const user = await User.create({
          username: req.body.username,
          email: req.body.email,
          password: hashedPassword,
        });
    
        // Send a response to the client informing them that the user was successfully created
        res.status(201).json({
          message: "User created!",   
        comment: req.body.comment,
        title: req.body.title,    
        });
        req.session.UserId = user.id;

      } catch (error) {
        if (error.username === "SequelizeValidationError") {
          return res.status(422).json({ errors: err.errors.map((e) => e.message) });
        }
        res.status(500).json({
          message: "Error occurred while creating user",
          error: error,
        });
      }
    });