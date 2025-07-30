export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const user = req.user;
    const { name, avatar } = req.body;

    if (name) user.name = name;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ message: "Profile updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
