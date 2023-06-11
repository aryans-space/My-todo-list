var bodyParser=require('body-parser');
var mongoose=require('mongoose');

mongoose.connect('mongodb+srv://aryan:iatraiatra@cluster0.9q8qtfx.mongodb.net/?retryWrites=true&w=majority');
 var todoschema=mongoose.Schema({
    item: String
 }

 );

 var Todo=mongoose.model('Todo',todoschema);


var urlencodedParser= bodyParser.urlencoded({extended:false});
module.exports=function(app){

app.get('/todo', async (req, res) => {
  try {
    // Retrieve data from MongoDB
    const data = await Todo.find();

    // Render the EJS template and pass the data as a variable
    
    res.render('todo', { todos: data });
  } catch (error) {
    console.error('Error retrieving data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/todo',urlencodedParser, async function(req,res){
    //get data from view and add it to mongodb
    const newData = new Todo(req.body);
    const savedData = await newData.save();
    res.json(savedData);
});

app.delete('/todo/:itemId', async (req, res) => {
    try {
      const itemId = req.params.itemId;
  
      // Remove the item from MongoDB
      const deletedItem = await Todo.findOneAndRemove(itemId);
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
  
      // Retrieve the complete data with the modified version
      const data = await Todo.find();
  
      res.json(data);
    } catch (error) {
      console.error('Error deleting item:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
}
