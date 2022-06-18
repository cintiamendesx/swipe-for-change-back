const router = require("express").Router();
const Project = require("../models/Project.model");
const UserModel = require("../models/User.model");

const isAuthenticated = require("../middlewares/isAuthenticated");

router.post("/project", isAuthenticated, async (req, res) => {
  try {
    // Extraindo o id do usuário logado
    const { _id } = req.body;

    // Cria o novo projeto
    const result = await Project.create({ ...req.body, ownerId: _id });

    // Salvar a referência dela no modelo de usuário
    await UserModel.updateOne({ _id }, { $push: { projects: result._id } }); 

    return res.status(201).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal" });
  }
});


router.get("/project", isAuthenticated, async (req, res) => {
  try {
    const result = await Project.find();

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});


router.patch("/project/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    const result = await Project.findOneAndUpdate(
      { _id, ownerId: req.user._id },
      { $set: req.body },
      { new: true, runValidators: true }
    );

    return res.status(200).json(result);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

router.delete("/project/:_id", isAuthenticated, async (req, res) => {
  try {
    const { _id } = req.params;

    // Deleta o projeto
    const result = await Project.findOneAndDelete(
      { _id, ownerId: req.user._id },
      { new: true }
    );
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).json({ msg: "Internal server error." });
  }
});

module.exports = router;

//________________________________________________________________________