import * as express from 'express';
import * as mysql from 'mysql';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as session from 'express-session';
import * as crypto from 'crypto';
import * as multipart from 'connect-multiparty';
import * as fs from 'fs';


let  multipartMiddleware = multipart({uploadDir: 'public/uploads/'});



let con = mysql.createPool({
    connectionLimit: 50,
    host: "localhost",
    user: "root",
    password: "123456",
    database: "hotelList"
});

let app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../views'));
app.use('/public', express.static(path.join(__dirname,'../../public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
    secret: 'ssshhhhh',
    proxy: true,
    resave: true,
    saveUninitialized: true
}));

app.get('/ajax/data', (req:any, res)=>{
    con.getConnection((err, tempCont)=> {
        if(err) throw err;
        else {
            console.log('Connected!');
            tempCont.query('SELECT * FROM hotels',(err,data)=>{
                if(err) throw err;
                tempCont.query('SELECT * FROM hotels order by updated desc limit 6',(err,rows)=>{
                    if(err) throw err;
                    else {
                        res.json({data:data,hotels:rows});
                    }
                })
            });

        }
    });
});
app.get('/ajax/data/all', (req:any, res)=>{
    let skip = req.query.skip;
    con.getConnection((err, tempCont)=> {
        if(err) throw err;
        else {
            tempCont.query(`SELECT * FROM hotels order by updated desc limit ${skip},6`,(err,rows)=>{
                if(err) throw err;
                else {
                    res.json(rows);
                }
            })
        }
    });
});

app.get('/ajax/data/detail/:id', (req, res)=>{
    let id = req.params.id;
    con.getConnection((err, tempCont)=> {
        if(err) throw err;
        else {
            tempCont.query('SELECT * FROM hotels where id=?',[id],(err,rows)=>{
                if(err) throw err;
                else {
                    res.json(rows[0]);
                }
            })
        }
    });
});
app.get( "/ajax/data/searched",(req,res)=>{
    let body = req.query;
    con.getConnection((err,tempCont)=>{
        if(err) throw  err;
        let q = `%${body.q}%`;
        let query = "SELECT * FROM hotels WHERE (name LIKE ? OR location LIKE ?)";
        let args = [q,q];
        if(body.breakfast){
            query += 'AND breakfast=?';
            args.push(body.breakfast);
        }
        if(body.pool) {
            query+= 'AND pool=?';
            args.push(body.pool);
        }
        if( body.fitness  ){
            query+= ' AND fitness=?';
            args.push(body.fitness);
        }
        if(body.roomservice) {
            query+= 'AND roomservice=?';
            args.push(body.roomservice);
        }
        if(body.hairdryer) {
            query+= 'AND hairdryer=?';
            args.push(body.hairdryer);
        }
        if(body.laundry) {
            query+= 'AND laundry=?';
            args.push(body.laundry);
        }
        if(body.fax) {
            query+= 'AND fax=?';
            args.push(body.fax);
        }

        tempCont.query(query,args,(err,rows)=>{
            if(err) throw err;
            res.json(rows)
        })

    })
});

app.post('/ajax/login',(req:any,res:any)=>{
    // req.session.user =user;
    // req.session.save();
    // res.redirect('/')
    let body = req.body;
    con.getConnection((err, tempCont)=> {
        if(err) throw  err;
        let query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        let user = [body.email,crypto.createHash('md5').update(body.password).digest("hex")];
        tempCont.query(query, user, (err,rows)=> {
            if(!rows.length) {
                res.json({errors:"Incorrect login or password"})
            }else{
                req.session.user = rows[0];
                //res.redirect(body.redirect);
                res.json(rows[0])
            }
        });
    });
});

app.post('/registration',(req,res)=>{
    let body = req.body;
    con.getConnection((err, tempCont)=> {
        if(err) throw  err;
        else {
            let user = { firstname: body.firstname, lastname: body.lastname, email: body.email, password: crypto.createHash('md5').update(body.password).digest("hex")};
            tempCont.query('INSERT INTO users SET ?', user, (err,resp)=> {
                tempCont.release();
                if(err) throw err;
                else {
                    res.redirect("/");
                }
            });
        }
    });
});
app.get('/logout',(req:any,res)=>{
    req.session.destroy();
    res.redirect("/");
});

app.get('/admin/login',(req:any,res)=>{
    if( req.session.admin){
        return res.redirect('/admin');
    }
    res.render('adminlogin',{errors:""});
});
app.post('/admin/login',(req:any,res:any)=>{
    let body = req.body;
    con.getConnection((err, tempCont)=> {
        if(err) throw  err;
        let query = 'SELECT * FROM users WHERE email = ? AND password = ? AND admin = 1';
        let user = [body.email,crypto.createHash('md5').update(body.password).digest("hex")];
        tempCont.query(query, user, (err,rows)=> {
            if( !rows.length ){
                res.render('adminlogin',{errors:"Incorrect login or password"});
            }else {
                req.session.admin = rows[0];
                res.redirect('/admin');
            }

        });
    });
});
app.use('/admin',function (req:any,res,next) {
    if( !req.session.admin){
        res.redirect('/admin/login')
    }else{
        next();
    }
});
app.get('/admin',function (req:any,res) {
    res.render('admin',{admin:req.session.admin})
});
app.get('/admin/*',function (req:any,res) {
    res.render('admin',{admin:req.session.admin})
});


app.get('/ajax/data/table',(req,res)=>{
    con.getConnection((err, tempCont)=> {
        if(err) throw err;
        else {
            tempCont.query('SELECT * FROM hotels ',(err,rows)=>{
                if(err) throw err;
                else {
                    res.json(rows);
                }
            })
        }
    });
});
app.post('/create',multipartMiddleware,(req:any,res)=>{
    let body = req.body;
    con.getConnection((err,tempCont)=>{
        if (err) throw err;
        else {
            let hotel:any = {name:body.name,location:body.location,description:body.description,text:body.text,image:path.basename(req.files.image.path)}
            if(body.breakfast){
                hotel.breakfast = body.breakfast;
            }
            if(body.pool) {
                hotel.pool = body.pool;
            }
            if(body.fitness) {
                hotel.fitness = body.fitness;
            }
            if(body.roomservice) {
                hotel.roomservice = body.roomservice;
            }
            if(body.hairdryer) {
                hotel.hairdryer = body.hairdryer;
            }
            if(body.fax) {
                hotel.fax = body.fax;
            }
            if(body.laundry) {
                hotel.laundry = body.laundry;
            }
            tempCont.query('Insert into hotels SET ?',hotel,(err,resp)=>{
                tempCont.release();
                if(err) throw err;
                else {
                    console.log('Last inserted id ' + resp.insertId);
                    res.redirect('/admin');
                }
            })
        }
    })
});

app.delete('/ajax/data/delete/:id',(req, res)=> {
    con.getConnection((err, tempCont)=> {
        if(err) throw  err;
        else {
            tempCont.query('Select image from hotels where id = ?',[req.params.id],(err,resp)=>{
                if(err) throw err;
                tempCont.query('DELETE FROM hotels WHERE id = ?',
                    [req.params.id], (err,result)=> {
                        if(err) throw err;
                        console.log(resp[0]);
                        fs.unlinkSync(path.join(__dirname,`../../public/uploads/${resp[0].image}`));
                        console.log('Deleted ' + result.affectedRows + ' rows');
                        res.json(resp[0]);
                    });
            })

        }
    });
});

app.post('/update/:id',multipartMiddleware,(req:any,res)=>{
    let body = req.body;
    console.log(body)
    console.log(req.params.id)
    console.log (req.files.image.size)
    let hotel:any = {name:body.name, location:body.location, description:body.description, text:body.text};
    con.getConnection((err,tempCont)=>{
        if(err) throw err;
        tempCont.query('Select image from hotels where id = ?',[req.params.id],(err,resp)=>{
            if (err) throw  err;
            if(req.files.image.size > 0){
                console.log(req.files.image.path)
                hotel.image = path.basename(req.files.image.path);
                fs.unlinkSync(path.join(__dirname,`../../public/uploads/${resp[0].image}`));
            }else{
                console.log(req.files.image.path)
                hotel.image = resp[0].image;
                fs.unlinkSync(req.files.image.path)
            }
            if(body.breakfast){
                hotel.breakfast = body.breakfast;
            }else{
                hotel.breakfast = 0;
            }
            if(body.pool) {
                hotel.pool = body.pool;
            }else{
                hotel.pool = 0;
            }
            if(body.fitness) {
                hotel.fitness = body.fitness;
            }else{
                hotel.fitness = 0;
            }
            if(body.roomservice) {
                hotel.roomservice = body.roomservice;
            }else{
                hotel.roomservice = 0;
            }
            if(body.hairdryer) {
                hotel.hairdryer = body.hairdryer;
            }else{
                hotel.hairdryer = 0;
            }
            if(body.fax) {
                hotel.fax = body.fax;
            }else{
                hotel.fax = 0;
            }
            if(body.laundry) {
                hotel.laundry = body.laundry;
            }else{
                hotel.laundry = 0;
            }
            tempCont.query('Update hotels Set ? Where id = ?',[hotel,req.params.id],(err,result)=>{
                tempCont.release();
                if(err) throw err;
                console.log('Changed ' + result.changedRows + ' rows');
                res.redirect('/admin');
            })

        });

    });
});

app.get('*', (req:any, res)=>{
    res.render('index',{user:req.session.user});
});

console.info('started at localhost:7000');
app.listen(7000);