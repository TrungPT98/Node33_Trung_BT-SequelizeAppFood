const getFood = (req, res) => {
    res.send("Danh sách food");

};

const findFood = (req, res) => {
    res.send("Tìm food");

};

export {getFood, findFood};