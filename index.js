 const Joi = require('joi');
 const express= require('express');
 const app = express();
// Middleware
app.use(express.json());
 const courses = [
    { id:1, name: 'course1'},
    { id:2, name: 'course2'},
    { id:3, name: 'course3'},
  ];

 // Reading
 app.get('/', (req,res) =>{
 res.send('Hello, client');
 });

 app.get ('/api/courses', (req,res) => {
    res.send(courses);
 }); 
 app.get ('/api/courses/:id', (req,res) => {
 const course =  courses.find(c => c.id === parseInt(req.params.id));
 if(!course) res.status(404).send('Sorry, your request is not found');
 if(course) res.send(course); 
 });

 //creating
 app.post('/api/courses', (req,res) => {

  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };

  courses.push(course);
  res.send(course);
 });

 app.put('/api/courses/:id' , (req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send('The request you made results to not found course with that ID');
  

const { error } = validateCourse(req.body);
if (error) return res.status(400).send(error.details[0].message);
  

  course.name = req.body.name;
  res.send(course);

 });

 app.delete('/api/courses/:id', (req,res) =>{
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if(!course) res.status(404).send('The data to be deleted is not found');
 
   const index = courses.indexOf(course);

   courses.splice(index,1);
   res.send(course);
 })

 function validateCourse(course){
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

 //return schema.validate(course); or
 const result = schema.validate(course);
 return result;
 }

//PORT 
const port = process.env.PORT || 3000;
 app.listen(port, () =>  console.log(`server listening at port ${port} ...`) );
   