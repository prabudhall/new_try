if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}
const mongoose = require('mongoose');
const mg = process.env.DB_URI;
mongoose.set('strictQuery', false);

const mdb = async()=>{
     await mongoose.connect(mg, { useNewUrlParser: true} ,async(err, result)=>{
        if(err) console.log("--", err);
        else{
            console.log("\nConnection Established Successfully");
            const fetched_i = await mongoose.connection.db.collection('fdi');
            fetched_i.find({}).toArray(async function(err, got_i){
                if(err) {
                    console.log('--', err);
                }
                else {
                    // console.log(got);
                    const fetched_c = await mongoose.connection.db.collection('fdc');
                    fetched_c.find({}).toArray(function(err, got_c){
                        if(err) {
                            console.log('--', err);
                        }
                        else {
                            global.food_items = got_i;
                            global.food_category = got_c;
                        }
                    })
                    
                }
            });
        }
    });
}

module.exports = mdb;
