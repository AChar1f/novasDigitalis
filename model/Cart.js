import { connection as db } from "../config/index.js";

class Cart {
  fetchCart(req, res) {
    try {
      const strQry = `
            SELECT o.orderID, p.prodName, p.amount 'UnitPrice', o.quantity, p.amount * o.quantity 'TotalPrice', p.prodURL 
            FROM Orders o
            JOIN Products p ON o.prodID = p.prodID
            JOIN Users u ON o.userID = u.userID
            WHERE o.userID = ${req.params.id};
            `;
      db.query(strQry, (err, results) => {
        if (err) throw new Error(err.message);
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }
  addToCart(req, res) {
    try {
        const strQry = ` 
        INSERT INTO Orders (quantity, userID, prodID)
        VALUES (1, ${req.params.id}, ${req.body.prodID}) 
        ON DUPLICATE KEY UPDATE
        quantity = quantity + VALUES(quantity);
        `
        db.query(strQry, (err, results) => {
            if (err) throw new Error(err.message);
            res.json({
              status: res.statusCode,
              msg : 'Item added successfully to Cart',
              results
            });
          });
    } catch (e) {
        
    }
  }
  
  updateCart(req, res) {
    try {
        const strQry = ` 
        UPDATE Orders
        SET quantity = ${req.body.quantity}
        WHERE orderID = ${req.params.oid} 
        AND userID = ${req.params.id};
        `
        db.query(strQry, (err) =>{
            if (err) throw new Error (err.message)
            res.json({
                status : res.statusCode,
                msg: 'Cart updated successfully'
            })
        })
    } catch (e) {
        res.json({
            staus: 404,
            msg: e.message
        })
    }
  }

  clearCart(req, res) {
    try {
        const strQry = `
        delete from  Orders
        where userID = ${req.params.id};
        `
        db.query(strQry, (err) => {
            if(err) throw new Error(err.message)
            res.json({
                status: res.statusCode,
                msg: "Cart cleared successfully.✔️"
            })
        })
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
  }
  deleteItem(req, res) {
    try {
        const strQry =  `
        DELETE FROM  Orders
        WHERE userID = ${req.params.id} 
        AND orderID = ${req.params.oid};
        `
        db.query(strQry, (err) => {
    if(err) throw new Error(err.message) 
        res.json({
            status: res.statusCode, 
            msg: 'Item deleted successfully'})
        }) 
    } catch (e) {
        res.json({
            status: 404,
            msg: e.message
        })
    }
  }
}

export {
    Cart
}