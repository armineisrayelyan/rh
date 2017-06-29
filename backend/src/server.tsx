import * as express from 'express';
import * as mysql from 'mysql';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as session from 'express-session';


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
                    /*let user = Window.user;
                    if(req.session.userId){
                        return tempCont.query('SELECT * FROM users where id=?',[req.session.userId],(err,users)=>{
                            if(err) throw err;
                            else {
                                user = users[0];
                                res.json(rows);
                                res.render('index',{user:user});
                            }
                        })
                    }*/
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

app.get('/login',(req:any,res:any)=>{
    // req.session.user =user;
    // req.session.save();
    // res.redirect('/')

});

app.get('*', (req:any, res)=>{
    res.render('index',{user:req.session.user});
});

console.info('started at localhost:7000');
app.listen(7000);