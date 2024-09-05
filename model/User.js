import { connection as db } from "../config/index.js"
import { hash, compare } from "bcrypt"
import { createToken } from "../middleware/UserAuthentification.js"

class Users {
  fetchUsers(req, res) {
    try {
      const strQry = `
                select userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile
                from Users;
                `
      db.query(strQry, (err, results) => {
        if (err) throw new Error(err.message)
        res.json({
          status: res.statusCode,
          results,
        });
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      })
    }
  }

  fetchUser(req, res) {
    try {
      const strQry = `
            select userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile
            from Users where userID = ${req.params.id};
            `
      db.query(strQry, (err, result) => {
        if (err) throw new Error(err.message)
        res.json({
          status: res.statusCode,
          result: result[0],
        })
      })
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      })
    }
  }

  async registerUser(req, res) {
    try {
      let data = req.body;
      data.userPass = await hash(data.userPass, 12)

      let user = {
        emailAdd: data.emailAdd,
        userPass: data.userPass,
      };

      let strQry = `
            insert into  Users
            set ?;
            `
      db.query(strQry, [data], (err) => {
        if (err) {
          res.json({
            status: res.statusCode,
            msg: "This email has already been taken",
          });
        } else {
          const token = createToken(user);
          res.json({
            token,
            msg: 'Registration Successful =). Welcome to Novas Digitalis',
          })
        }
      });
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      });
    }
  }

  async updateUser(req, res) {
    try {
      let data = req.body
      if (data.userPass) {
        data.userPass = await hash(data.userPass, 12)
      }
      const strQry = `
            update Users
            set ?
            where userID = ${req.params.id}
            `;
      db.query(strQry, [data], (err) => {
        if (err) throw new Error(err.message);
        res.json({
          status: res.statusCode,
          msg: 'User details updated successfully 🔄',
        })
      })
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      })
    }
  }

  deleteUser(req, res) {
    try {
      const strQry = `
            delete from Users 
            where userID = ${req.params.id}
            `;
      db.query(strQry, (err) => {
        if (err) throw new Error(err)
        res.json({
          status: res.statusCode,
          msg: "Successfully deleted user's information.",
        })
      })
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      })
    }
  }

  login(req, res) {
    try {
      const { emailAdd, userPass } = req.body;
      const strQry = `
            select userID, firstName, lastName, userAge, gender, userRole, emailAdd, userPass, userProfile
            from Users
            where emailAdd = '${emailAdd}'                  
            `;
      db.query(strQry, async (err, result) => {
        if (err) throw new Error(err)
        if (!result?.length) {
          res.json({
            status: 401,
            msg: "Invalid email. Please provide a valid email or register.",
          })
        } else {
          const isValidPass = await compare(userPass, result[0].userPass)
          if (isValidPass) {
            const token = createToken({
              emailAdd,
              userPass,
            })
            res.json({
              status: res.statusCode,
              msg: "Login Successful. =)",
              token,
              result: result[0],
            })
          } else {
            res.json({
              status: 401,
              msg: "Invalid Password. Please input correct password or register.",
            })
          }
        }
      })
    } catch (e) {
      res.json({
        status: 404,
        msg: e.message,
      })
    }
  }

//   fetchCart(req, res) {
//     try {
//     const userID = req.params.id;

//      const strQry = `
//     SELECT p.id, p.name, p.price, o.quantity
//     FROM Orders o
//     JOIN Products p ON o.prodID = p.id
//     WHERE o.userID = ?
//   `;
//   db.query(strQry, [userID], (err, results) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     res.status(200).json(results);
//   })

//     } catch (e) {
//       res.json({
//         status: 404,
//         msg: e.message
//       })
//     }
//   }

//   updateCart(req, res) {
//     try {
//       const userID= req.params.id;
//   const prodID = req.params.prodID;
//   const { quantity } = req.body;

//   if (!quantity) {
//     return res.status(400).json({ message: 'Quantity is required' });
//   }

//   const strQry = `
//     UPDATE carts
//     SET quantity = ?
//     WHERE userID = ? AND prodID = ?
//   `;
//   db.query(strQry, [quantity, userID, prodID], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     res.status(200).json(result, { message: 'Cart updated' });
//   }) 
//     } catch (e) {
//       res.json({
//         status: 404,
//         msg: e.message
//       })
//     }
//   }

//   deleteCart(req, res) {
//     try {
//       const userID = req.params.id;
//   const prodID = req.params.prodID;

//   const strQry = `
//     DELETE FROM carts
//     WHERE userID = ? AND prodID = ?
//   `;

//   db.query(strQry, [userID, prodID], (err, result) => {
//     if (err) return res.status(500).json({ message: 'Database error' });
//     res.status(200).json({ message: 'Cart item deleted' });
//   });
//     } catch (e) {
      
//     }
//   }
}

export { 
    Users 
}
