const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const getUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.cookies.id})
        res.status(200).send({
          days: user.days,
          habbits: user.habbits
        })
    } catch (e) { 
        res.status(400).send({data:"Failed to retrieve user infomations!"})
    }
};

const createUser = async (req, res) => {
    try {
        const { name, password } = req.body
        const userWithHabbit = await User.findOne({ name })
        if (userWithHabbit) {
          return  res.status(403).send("User already exists!")
        }
        const hashedPassword = await bcrypt.hash(password, 13);
        const user = new User({ name, hashedPassword, habbits:[], days:[] });
        user.save()
        return res.status(201).send({data:"User created!"});
    } catch (e) {
      return res.status(400).send("Operation failed! ");
    }
};

const loginUser = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await User.findOne({ name });
    if(!user){
      return res.status(401).send('Login invalid.')
    }
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
      if (!isValidPassword){
        return res.status(401).send('Password invalid.')
      }
    const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET)
    res.cookie("jwt", token, { expires: new Date(Date.now() + 90000000000000), secure:false, httpOnly:true})
    res.cookie("id", user._id, { expires: new Date(Date.now() + 90000000000000), secure:false})
    return res.status(200).send({data:"Successfully logged in!"})
  } catch (e) {
    return res.send("Operation failed!")
  }
};

const addHabbit = async (req, res) =>{
  try{
    const userWithHabbit = await User.findOne({"_id":req.cookies.id, "habbits.name":req.body.name})
    const today = new Date(Date.now()).toLocaleDateString("pl-PL")
    
    const addToToday = async () => {
      if(userWithHabbit?.days.find(i=> i.date === today)?.habbits.find(i => i.name === req.body.name)){
        return
      }
      await User.findOneAndUpdate({ _id: req.cookies.id, "days.date": today }, { $push: { "days.$.habbits": req.body } })
    }

    const addToHabbits = async () =>{
      await User.findByIdAndUpdate({ _id: req.cookies.id }, {
        $push: {
          habbits: req.body
        }
      })
    }

    if(userWithHabbit){
      if (userWithHabbit.habbits.find(i => (i.name === req.body.name) && i.ended)){
        await addToToday()
        const habbit = await User.findOneAndUpdate({ _id: req.cookies.id, "habbits.name": req.body.name }, { $set: { "habbits.$.ended": null } })
        return res.status(200).send({data:'Habbit started again!'})
      } else if (userWithHabbit.habbits.find(i => (i.name === req.body.name))){
        return res.status(401).send({data:`Habbit already exists!`})
      }
    }
    await addToToday()
    await addToHabbits()
    return res.status(201).send({data:"Habbit successfully added!"})
  }
  catch(e){ 
    res.send({data: e})
  }
}

const logoutUser = async (req, res) =>{
  try{
    res.clearCookie('jwt');
    res.clearCookie('id');
    res.send({data:"Successfully logged out!"})
  }
  catch(e){
    res.status(400).send({data:"Logout failed!"})
  }
}

const changeHabbitName = async (req, res) => {
  try{
    const hasHabbit = await User.findById({ _id: req.cookies.id })
    if (hasHabbit.habbits.some((i) => i.name === req.body.name)){
      if (hasHabbit.habbits.some((i) => (i.name === req.body.name) && i.ended)){
        const habbitStarted = hasHabbit.habbits.find((i) => i.name === req.body.name).started
        await User.findOneAndUpdate({ _id: req.cookies.id, "habbits._id": req.params.habbit }, { $pull: { habbits: { "name": req.body.name } } })
        await User.findOneAndUpdate({ _id: req.cookies.id, "habbits._id": req.params.habbit }, { $set: { "habbits.$.name": req.body.name, "habbits.$.started" : habbitStarted } })
        return res.status(201).send('Habbit successfully edited!')
      }
      return res.status(400).send('Habbit with that name exists')
    }
    await User.findOneAndUpdate({ _id: req.cookies.id, "habbits._id": req.params.habbit }, { $set: { "habbits.$.name": req.body.name } })
    res.status(201).send({ data: "Habbit successfully edited!" })
  }
  catch(e){
    res.status(400).send(e)
} 
}

const changeDefaultHabbitInfo = async (req, res) => {
  try {
    const habbit = await User.findOneAndUpdate({ _id: req.cookies.id, "habbits._id": req.params.habbit }, { $set: { "habbits.$.info": req.body.info } })
    res.status(201).send({ data: "Habbit successfully edited!" })
  }
  catch (e) { res.status(400).send("Habbit failed to edit!") }
}

const deleteHabbit = async (req, res) => {
  try {
    const habbit = await User.findOneAndUpdate({ _id: req.cookies.id, "habbits._id": req.params.habbit }, { $set: { "habbits.$.ended": new Date(Date.now()).toLocaleDateString("pl-PL") }}  )
    res.status(200).send({data:"Habbit has been deleted!"})
  }
  catch (e) { 
    res.status(400).send({data:"Habbit hasn't been deleted!"})
  }
}

const doneHabbit = async (req, res) => {
  try {
  const bach = await User.findOne({_id: req.cookies.id})
    await User.findOneAndUpdate({ _id: req.cookies.id }, { $set: { "days.$[d].habbits.$[h].done": true } }, { arrayFilters: [{ 'd.date': new Date(Date.now()).toLocaleDateString("pl-PL") },{'h._id': req.params.habbit}]})
    res.status(200).send({ data: "Habbit has been done!" })
  }
  catch (e) {
    res.status(400).send({ data: "Habbit hasn't been deleted!" })
  }
}

const addToday = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.cookies.id })
    const habbits = user.habbits.filter(i=>{
      return !i.ended
    })
    const days = await User.findOneAndUpdate({ _id: req.cookies.id }, { $push: { days: { date: new Date(Date.now()).toLocaleDateString("pl-PL"), habbits}} })
    res.status(200).send({ data: "Habbit has been added!" })
  }
  catch (e) {
    res.status(400).send({ data: "Habbit hasn't been deleted!" })
  }
}


const changeTodayHabbitInfo = async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.cookies.id}, { $set: { "days.$[d].habbits.$[h].info": req.body.info } }, { arrayFilters: [{ 'd.date': new Date(Date.now()).toLocaleDateString("pl-PL") }, { 'h._id': req.params.habbit }] })
    res.status(201).send({ data: "Habbit successfully edited!" })
  }
  catch (e) { res.status(400) }
}

module.exports = {
  getUser, createUser, loginUser, addHabbit, logoutUser, changeHabbitName, changeDefaultHabbitInfo, deleteHabbit, doneHabbit, addToday,
  changeTodayHabbitInfo };
