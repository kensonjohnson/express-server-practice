const express = require("express");
const uuid = require("uuid");
const router = express.Router();
const members = require("../../Members");

// Gets all members
router.get("/", (req, res) => res.json(members));

// Get single memeber
router.get("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json(members.filter((member) => member.id === parseInt(req.params.id)));
  } else {
    res
      .status(400)
      .json({ msg: `No member with an id of ${req.params.id} exists` });
  }
});

// Create member
router.post("/", (req, res) => {
  const newMember = {
    id: uuid.v4(),
    name: req.body.name,
    email: req.body.email,
    status: "active",
  };

  // Check that new member has valid information
  if (!newMember.name || !newMember.email) {
    // Use the return so we don't run the code after this statement.
    // This would cause an error because the status is already called
    return res.status(400).json({ msg: "Please include a name and email." });
  }

  // Add the new member
  members.push(newMember);

  // We include a response
  res.json(members);
  // res.redirect("/");
});

// Update member
router.put("/:id", (req, res) => {
  // Check if member exists
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    const updateMember = req.body;
    members.forEach((member) => {
      if (member.id === parseInt(req.params.id)) {
        // conditionaly update information if it is passed in
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;

        // We include a response
        res.json({ msg: "Member updated", member });
      }
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with an id of ${req.params.id} exists` });
  }
});

// Delete member
router.delete("/:id", (req, res) => {
  const found = members.some((member) => member.id === parseInt(req.params.id));
  if (found) {
    res.json({
      msg: "Member deleted",
      members: members.filter(
        (member) => member.id !== parseInt(req.params.id)
      ),
    });
  } else {
    res
      .status(400)
      .json({ msg: `No member with an id of ${req.params.id} exists` });
  }
});

module.exports = router;
