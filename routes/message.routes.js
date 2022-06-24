const router = require("express").Router();
const Message = require("../models/Message.model");
const UserModel = require("../models/User.model");
const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/message", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.User;
    const { recipientId, text } = req.body;
    
      const result = await Message.create({ recipientId, text, authorId: _id });

      console.log(req.body);

      return res.status(201).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.get("/allmessages", isAuthenticated,  async (req, res) => {
  try {
    const { _id } = req.User;
    const result = await Message.find({ authorId: _id }).populate("recipientId");

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Messages not found" });
  }
});


module.exports = router;