const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/database');

module.exports = (router) => {
    router.post('/register', (req, res) => {
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an email' });
        }else{
            if (!req.body.username) {
                res.json({ success: false, message: 'You must provide a username' });
            }else{
                if (!req.body.password) {
                    res.json({ success: false, message: 'You must provide a password' });
                }else{
                    let user = new User({
                        email: req.body.email.toLowerCase(),
                        username: req.body.username.toLowerCase(),
                        password: req.body.password
                    });
                    user.save((err) =>{
                        if(err){
                            if (err.code === 11000 ){
                                res.json({ success: false, message: 'Username or email already exists'});
                            }else{
                                if (err.errors){
                                 if (err.errors.email) {
                                     res.json({ success: false, message: err.errors.email.message });
                                 }else{
                                     if (err.errors.username) {
                                         res.json({ success: false, message: err.errors.username.message });
                                     }else{
                                         if (err.errors.password) {
                                             res.json({ success: false, message: err.errors.password.message });
                                         }else{
                                             res.json({ success: false, message: err});
                                         }
                                     }
                                 }
                                }else{
                                 res.json({ success: false, message: 'Could not save user. Error: ' + err});
                             }
                           }
                             }else{
         
                            res.json({ success: true, message: 'Account registered: '});
                        }
                    });
                
            } 
        }
        }

        
    });
    
    router.get('/checkEmail/:email', (req, res) =>{
        if(!req.params.email){
            res.json({ success: false, message: 'E-mail was not provided'});
        }else{
            User.findOne({ email: req.params.email}, (err, user) =>{
                if(err){
                    res.json({ success: false, message: err});
                }else{
                    if(user){
                        res.json({ success: false, message: 'E-mail is already taken'});
                    }else{
                        res.json({ success: true, message: 'Email is available'});
                    }
                       
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) =>{
        if(!req.params.username){
            res.json({ success: false, message: 'Username was not provided'});
        }else{
            User.findOne({ username: req.params.username}, (err, user) =>{
                if(err){
                    res.json({ success: false, message: err});
                }else{
                    if(user){
                        res.json({ success: false, message: 'Username is already taken'});
                    }else{
                        res.json({ success: true, message: 'Username is available'});
                    }
                       
                }
            });
        }
    });

    router.post('/login', (req, res) =>{
        if(!req.body.username){
            res.json({ success: false, message: 'No username was provided'});
        }else{
            if(!req.body.password){
                res.json({ success: false, message: 'No password was provided'});
            }else{
                User.findOne({ username: req.body.username.toLowerCase()}, (err, user) =>{
                    if(err){
                        res.json({ success: false, message:err});
                    }else{
                        if(!user){
                            res.json({ success: false, message: 'Username not found'});
                        }else{
                           const validPassword = user.comparePassword(req.body.password);
                           if(!validPassword){
                               res.json({ success: false, message: 'password invalid'});
                           }else{
                              const token = jwt.sign({ userId: user._id}, config.secret, { expiresIn: '2h'});
                               res.json({success: true, message: 'Success!', token: token, user: { username: user.username}});
                           }
                        }
                    }
                })


            }
        }
        
    });

    /* MIIDDLEWARE -Used to grab user's token from headers */
    router.use((req, res, next) =>{
      const token = req.headers['authorization'];
      //var token = req.body.token || req.query.token || req.headers['x-access-token'] || req.headers['authorization'];
        if(!token){
            res.json({success: false, message: 'No token provided'});
        }else{
            jwt.verify(token, config.secret, (err, decoded) =>{
                if(err){
                    res.json({ success: false, message: 'Token invalid: ' + err});
                }else{
                    req.decoded = decoded;
                    next();
                }
            });
        }
    });
     
    router.get('/profile', (req, res) =>{
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err,user) =>{
            if(err){
                res.json({ success: false, message: err});
            }else{
                if(!user){
                    res.json({ success: false, message: 'User not found'});
                }else{
                    res.json({ success: true, user: user });
                }
            }
        });
    });

    router.get('/publicProfile/:username', (req, res) =>{
        if(!req.params.username){
            res.json({ success: false, message: 'No username was provided'});
        }else{
            User.findOne({ username: req.params.username }).select('username email').exec((err, user) =>{
                if(err){
                    res.json({ success: false, message: 'Something went wrong'});
                }else{
                    if(!user){
                        res.json({ success: false, message: 'Username not found.'});
                    }else{
                        res.json({ success: true, user: user });
                    }
                }
            });
        }
    });

    router.get('/allUsers', (req, res) =>{
        User.find({}, (err, users) =>{
            if(err){
                res.json({ success: false, message: err});
            }else{
                if(!users){
                    res.json({ success: false, message: 'No users found.'});
                }else{
                    res.json({ success: true, users: users});
                }
            }
        }).sort({ '_id': -1});
    });

    router.delete('/deleteUser/:id', (req, res) =>{
        if(!req.params.id){
            res.json({ success: false, message: 'No id provided'});
        }else{
            Blog.findOne({_id: req.params.id }, (err, user) =>{
        if(err){
            res.json({ success: false, message: 'Invalid id'});
        }else{
            if(!user){
                res.json({ success: false, message: 'Id was not found'});
            }else{
                User.findOne({ admin: true }, (err, user) => {
                    if( err )
                    return done(err);
              
                  if( !user ) {
                    let content = {
                      success: false,
                      message: 'You have no right'
                    };
                    res.send(content);
                    return;
                  }
                  
        
                });
                user.remove((err) =>{
                    if( err )
                    return done(err);
                    res.json({ success: true, message: 'user deleted!'});            
                });
            }
        }
    });
   }
});
        
 router.put('/updateUser/:id', (req, res)=>{
                if(!req.params.id){
                    res.json({ success: false, message: "No user found" });
                }else{
                    
                    User.update({ _id: req.params.id}, {$set: { address: 'Hanoi'}})
                        .exec()
                        .then(result =>{
                            console.log(result);
                            res.status(200).json({
                                message: 'Update user!'
                            });
                        })
                        .catch(err =>{
                        console.log(JSON.parse(err));
                        })
                    
                }
            });
                   
            router.get('/singleUser/:id', (req, res) =>{
                if(!req.params.id){
                    res.json({ success: false, message: 'No user ID was provided.'});
                }else{
                    User.findOne({ _id: req.params.id}, (err, user) =>{
                        if(err){
                            res.json({ success: false, message: err});
                        }else{
                            if(!user){
                                res.json({ success: false, message: 'Not a valid user id.'});
                            }else{
                                res.json({ success: true, user: user});
                            }
                        }
                
                      });
                }
             
            });
    return router;
}