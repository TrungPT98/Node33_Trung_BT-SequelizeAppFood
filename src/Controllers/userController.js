import sequelize from "../Models/index.js";
import initModels from "../Models/init-models.js";
import { Sequelize } from "sequelize";

const Op = Sequelize.Op;

const model = initModels(sequelize);

// R => get all
const getUser = async (req, res) => {
  let data = await model.user.findAll();
  res.send(data);
};

// R => get by id
const getUserById = async (req, res) => {
  let { id } = req.params;
  let data = await model.user.findOne({
    where: { user_id: id },
  });
  res.send(data);
};

// CUD
const createUser = async (req, res) => {
  try {
    let { full_name, email, pass_word } = req.body;

    let checkEmail = await model.user.findAll({
      where: {
        email,
      },
    });
    if (checkEmail.length > 0) {
      res.send("Email đã tồn tại !");
      return;
    }
    await model.user.create({ full_name, email, pass_word });

    res.send("Thêm thành công");
  } catch (exp) {
    res.status(500).send(exp.message);
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let { full_name, email, pass_word } = req.body;

  await model.user.update(
    { full_name, email, pass_word },
    { where: { user_id: id } }
  );
  res.send("Cập nhật thành công");
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  await model.user.destroy({ where: { user_id: id } });
  res.send("Xóa thành công");
};

const getUserByName = async (req, res) => {
  let { fullName } = req.params;
  let data = await model.user.findAll({
    where: {
      full_name: {
        [Op.like]: `%${fullName}%`,
      },
    },
  });

  res.send(data);
};

// Controller to get all restaurants liked by a user
const getLikedRestaurants = async (req, res) => {
  try {
    let likedRestaurants = await model.like_res.findAll({
      include: [
        "re",
      ],
    });

    res.status(200).json(likedRestaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all user likes
const getUserLikes = async (req, res) => {
  try {
    let { user_id } = req.params;

    let userLikes = await model.like_res.findAll({
      where: { user_id },
      include: ["re"],
    });

    res.status(200).json(userLikes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Controller to get all ratings made by a user
const getUserRatings = async (req, res) => {
  try {
    let { user_id } = req.params;

    const userRatings = await model.rate_res.findAll({
      where: { user_id },
      include: ["re"]
    });

    res.status(200).json(userRatings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to place an order
const placeOrder = async (req, res) => {
  try {
    let { user_id, food_id, amount, code, arr_sub_id } = req.body;

    // Create a new order entry
    await model.order.create({ user_id, food_id, amount, code, arr_sub_id });

    res.status(201).json({ message: 'Order placed successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Controller to get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    let { user_id } = req.params;

    const userOrders = await model.order.findAll({
      where: { user_id },
      include: ["food"]
    });

    res.status(200).json(userOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export {
  getUser,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserByName,
  getLikedRestaurants,
  getUserLikes,
  getUserRatings,
  placeOrder,
  getUserOrders
};
