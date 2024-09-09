// import { connection as db } from "../config/index.js";

// class Cart {
//   fetchCart(req, res) {
//     try {
//       const strQry = `
//             SELECT o.orderID, p.prodName, p.amount 'Unit Price', o.quantity, p.amount * o.quantity 'Total Price' 
//             FROM Orders o
//             JOIN Products p ON o.prodID = p.prodID
//             JOIN Users u ON o.userID = u.userID
//             WHERE o.userID = ${req.params.id};
//             `;
//       db.query(strQry, (err, results) => {
//         if (err) throw new Error(err.message);
//         res.json({
//           status: res.statusCode,
//           results,
//         });
//       });
//     } catch (e) {
//       res.json({
//         status: 404,
//         msg: e.message,
//       });
//     }
//   }
//   addToCart(req, res) {
//     try {
//         const strQry = ` 
//         INSERT INTO Orders (userID, prodID, quantity)
//         VALUES(${req.params.id}, ${req.params.pid},);
//         `
//     } catch (e) {
        
//     }
//   }
  
//   updateCart(req, res) {
//     try {
//         const strQry = ` 
//         UPDATE Orders
//         SET quantity = ${req.params.quantity}
//         WHERE orderID = ${req.params.oid} 
//         AND userID = ${req.params.id};
//         `
//     } catch (e) {
//         res.json({
//             staus: 404,
//             msg: e.message
//         })
//     }
//   }

//   clearCart(req, res) {
//     try {
//         const strQry = `
//         delete from  Orders
//         where userID = ${req.params.id};
//         `
//         db.query(strQry, (err) => {
//             if(err) throw new Error(err.message)
//             res.json({
//                 status: res.statusCode,
//                 msg: "Product removed successfully✔️"
//             })
//         })
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
//   }
//   deleteProduct(req, res) {
//     try {
//         const strQry =  `
//         DELETE FROM  Orders
//         WHERE userID = ${req.params.id} 
//         AND orderID = ${req.params.oid};
//         `
//     } catch (e) {
//         res.json({
//             status: 404,
//             msg: e.message
//         })
//     }
//   }
// }
