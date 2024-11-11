import User from "../models/User.mjs";
import Car from "../models/Car.mjs";

export const getUserInfo = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId, {
      attributes: {
        exclude: ["passwordHash", "passwordResetToken", "passwordResetExpires"],
      },
      include: [
        {
          model: Car,
        },
      ],
    });

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.json({ user });
  } catch (error) {
    console.error("Error fetching user info:", error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching user info." });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userId = req.user.id;
    const updates = req.body;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.update(updates);

    res.json({ message: "User updated successfully.", user });
  } catch (error) {
    console.error("Error updating user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating user info." });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    await user.destroy();

    res.json({
      message: `User ${user.username.toUpperCase()} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user." });
  }
};
