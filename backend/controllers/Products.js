const Products = require("../models/ProductModel");
const Users = require("../models/UserModel");
const { Op } = require("sequelize");

const getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        include: [
          {
            model: Users,
            attributes: ["uuid", "name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "price"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: Users,
            attributes: ["uuid", "name", "email", "role"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const getProductsById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) {
      return res.status(400).json({ msg: "product not found" });
    }
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: Users,
            attributes: ["uuid", "name", "email", "role"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "price"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: Users,
            attributes: ["uuid", "name", "email", "role"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const createProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    await Products.create({
      name: name,
      price: price,
      userId: req.userId,
    });
    res.status(201).json({ msg: "product successfully created!" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const updateProduct = async (req, res) => {
  const { name, price } = req.body;
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });

    if (!product) {
      return res.status(400).json({ msg: "product not found" });
    }
    if (req.role === "admin") {
      await Products.update(
        {
          name: name,
          price: price,
        },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId) {
        return res.status(403).json({ msg: "access denied" });
      }
      await Products.update(
        {
          name: name,
          price: price,
        },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "product successfully updated" });
  } catch (error) {
    res.status(500).json({ msg: error.mmessage });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) {
      return res.status(400).json({ msg: "product not found" });
    }
    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId) {
        return res.status(403).json({ msg: "access denied" });
      }
      await Products.destroy({
        where: {
          [Op.and]: [{id: product.id}, {userId: req.userId}]
        }
      })
    }
    res.status(200).json({msg: "product successfully deleted"})
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = { getProducts, getProductsById, createProduct, updateProduct, deleteProduct };
