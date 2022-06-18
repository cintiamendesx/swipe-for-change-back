const router = require("express").Router();
const Message = require("../models/Message.model");
const UserModel = require("../models/User.model");

router.post("/message", async (req, res) => {
  try {
    const { _id } = req.body;

    const user = await UserModel.findOne({
      _id,

    })

    console.log(user);

    
      const result = await Message.create({ ...req.body, authorId: _id });

      return res.status(201).json(result);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

module.exports = router;