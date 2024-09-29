import express from 'express';
import bodyParser from 'body-parser';
import Logincol from '../model/db.js';

const router = new express.Router();
const app = express();


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get('/', (req, res) => {
    res.render("index")
});

router.post('/login', (req, res) => {

  const Data = new Logincol(req.body);
Data.save().then((data)=>{
    res.send('Data has been saved');
    console.log(data);
}).catch((e)=>{
    res.status(400).send(e);
})

})



router.delete('/delete',(req,res)=>{
    Logincol.deleteMany().then(()=>{
        res.send('Data has been deleted');
    }).catch((e)=>{
    res.send(e);
    })
})

export default router;