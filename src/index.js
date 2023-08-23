import express from 'express';
// import mysql2 from 'mysql2';
import cors from 'cors'
import rootRoutes from './Routes/rootRoutes.js';

const app = express();
app.use(express.json()) // hàm gọi middleware chuyển đổi cấu trúc json để backend nhận được

app.use(cors());
app.listen(8080);

// const conn = mysql2.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "1234",
//     database: "db_node33",
//     port: "3306"
// });

// http://localhost:8080/api/food/get-food
// http://localhost:8080/api/user/get-user

app.use("/api", rootRoutes);

