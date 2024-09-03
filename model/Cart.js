import { connection as db } from "../config/index.js";

class Cart {
    fetchCart(req, res) {
        try {
            const strQry = `
            select o.orderID, 
            p.prodURL, p.prodName, p.category, p.quantity, p.amount
            from Orders o
            inner join Products p 
            using (userID)
            where userID = ${req.params.oid}
            group by orderID;
            `
            db.query(strQry, (err, results) => {
                if (err) throw new Error(err.message)
                    res.json({
                        status: res.statusCode,
                        results
                    })
            })
        } catch (e) {
            res.json({
                status: 404,
                msg: e.message
            })
        }
    }
}