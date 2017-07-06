import * as express from 'express';
import * as mysql from 'mysql';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as session from 'express-session';
import * as crypto from 'crypto';



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
            tempCont.query('SELECT * FROM hotels order by updated desc limit 6',(err,rows)=>{
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

app.post('/login',(req:any,res:any)=>{
    // req.session.user =user;
    // req.session.save();
    // res.redirect('/')
    let body = req.body;
    con.getConnection((err, tempCont)=> {
        if(err) throw  err;
        let query = 'SELECT * FROM users WHERE email = ? AND password = ?';
        let user = [body.email,crypto.createHash('md5').update(body.password).digest("hex")];
        tempCont.query(query, user, (err,rows)=> {
            if(err) throw err;
            req.session.user = rows[0];
            res.redirect(body.redirect);
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
    res.render('adminlogin');
});
app.use('/admin',function (req:any,res,next) {
    if( !req.session.admin){
        res.redirect('/admin/login')
    }else{
        next();
    }
});

app.post('/admin/login',(req:any,res:any)=>{
    let body = req.body;
    con.getConnection((err, tempCont)=> {
        if(err) throw  err;
        let query = 'SELECT * FROM users WHERE email = ? AND password = ? AND admin = 1';
        let user = [body.email,crypto.createHash('md5').update(body.password).digest("hex")];
        tempCont.query(query, user, (err,rows)=> {
            if(err) throw err;
            if( !rows.length ){
                res.redirect('/admin/login');
            }
            req.session.admin = rows[0];
            res.redirect('/admin',{admin:req.session.admin});
        });
    });
});



app.get('/ajax/data/admin',(req,res)=>{
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

app.get('*', (req:any, res)=>{
    res.render('index',{user:req.session.user});
});

console.info('started at localhost:7000');
app.listen(7000);