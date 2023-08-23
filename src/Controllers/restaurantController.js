import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";

const model = initModels(sequelize);

// Xử lý like nhà hàng
const likeRestaurant = async (req, res) => {
  try {
    let { user_id, res_id } = req.body;

    // Check if the user has already liked the restaurant
    let existingLike = await model.like_res.findOne({
      where: { user_id, res_id },
    });

    if (existingLike) {
      return res
        .status(400)
        .json({ message: "User has already liked the restaurant." });
    }

    // Create a new like entry
    await model.like_res.create({ user_id, res_id, date_like: new Date() });

    res.status(201).json({ message: "Restaurant liked successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to rate a restaurant
const rateRestaurant = async (req, res) => {
  try {
    let { user_id, res_id, amount } = req.body;

    // Create a new rate entry
    await model.rate_res.create({
      user_id,
      res_id,
      amount,
      date_rate: new Date(),
    });

    res.status(201).json({ message: "Restaurant rated successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all restaurants that have been rated
const getAllRatedRestaurants = async (req, res) => {
  try {
    const ratedRestaurants = await model.rate_res.findAll({
      include: ["re"],
    });

    res.status(200).json(ratedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export { likeRestaurant, rateRestaurant, getAllRatedRestaurants };
