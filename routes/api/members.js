const express = require('express');
const router = express.Router();
const uuid = require('uuid');
const members = require("../../Members");
//Gets all members
router.get(`/`, (req,res)=> res.json(members));

//Get Single Member
router.get(`/:id`, (req,res) =>{
    // res.send(req.params.id);
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        res.json(members.filter(member => member.id === parseInt(req.params.id)));
    }else{
        //res.send("Member Not Found");
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }

});

//Create Member
router.post('/', (req,res) => {
    const newMember = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
        age: req.body.age
    }
    if(!newMember.name || !newMember.email || !newMember.age){
        return res.status(400).json({msg: 'Please include a name and email'});
    }

    members.push(newMember);

    res.json(members);
    // res.redirect('/')
})

//Update Member
router.put('/:id', (req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));
    if(found){
        const updMember = req.body; //Put request body into var
        members.forEach(member => { //Loop thru members to check and update the matching
            if(member.id === parseInt(req.params.id)){
                member.name = updMember.name? updMember.name : member.name;
                member.email = updMember.email? updMember.email : member.email;
                member.age = updMember.age? updMember.age : member.age;

                res.json({msg: `Member updated`, member: member});
            }
        })
    }else{
        res.status(400).json({msg: `No member with id of ${req.params.id}`});
    }
})

//Delete Member
router.delete(`/:id`, (req,res) =>{
    const found = members.some(member => member.id === parseInt(req.params.id));

    if(found){
        res.json({ msg: `Member Deleted` ,
            members: members.filter(member => member.id !== parseInt(req.params.id))});
    }else{
        //res.send("Member Not Found");
        res.status(400).json({msg: `No member with the id of ${req.params.id}`});
    }

});

module.exports = router;