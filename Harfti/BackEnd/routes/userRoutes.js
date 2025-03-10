const express = require("express");
const router = express.Router();
const {usersCollection} = require("../models/User");


router.post("/Profile", async (req, res) => {
  const { userID } = req.body;

  try {
    if (userID) {
      const Finded = await usersCollection.findOne({ _id: userID });

      if (Finded) {
        res.send({ status: "success", message: "user finded", user: Finded });
      }
    } else {
      res.send({ status: "error", message: "Id don't founded" });
    }
  } catch (error) {
    res.send({ status: "error", message: "error in server", error });
  }
});

router.put("/Profile/Update", async (req, res) => {

  let { userID, newemail, newfirstName, newlastName, newusername, Items } =
    req.body;
    if(!Items){
        const user = usersCollection.findOne({_id:userID});
        Items = user.image
    }
  try {
    modifier = await usersCollection.updateOne(
      { _id: userID },
      {
        $set: {
          username: newusername,
          lastName: newlastName,
          firstName: newfirstName,
          image: Items,
          email: newemail,
        },
      }
    );

    if (modifier) {
      res.send({ status: "success", message: "Infos updated successfully" });
    } else {
      res.send({ status: "error", message: "user dont updated" });
    }
  } catch (error) {
    console.log(error);
    res.send({ status: "error", message: "error server" });
  }
});

module.exports = router;
