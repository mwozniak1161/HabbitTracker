const Router = require("express")
const { getUser, doneHabbit, createUser, loginUser, addHabbit, addToday, changeHabbitName, changeTodayHabbitInfo,  changeDefaultHabbitInfo, deleteHabbit, logoutUser } = require("../controllers/User")
const { authenticateToken }= require('../middlewares/Auth')
const router = Router()

router.get("/users/", authenticateToken, getUser)
router.post("/users/signUp", createUser)
router.post("/users/signIn", loginUser)
router.post("/users/logout", authenticateToken, logoutUser)
router.patch("/users/addToday", authenticateToken, addToday)
router.patch("/users/:habbit/changeTodayHabbitInfo", authenticateToken, changeTodayHabbitInfo)
router.patch("/users/addHabbit", authenticateToken, addHabbit)
router.patch("/users/:habbit/doneHabbit", authenticateToken, doneHabbit)
router.patch("/users/:habbit/changeHabbitName", authenticateToken, changeHabbitName)
router.patch("/users/:habbit/changeDefaultHabbitInfo", authenticateToken, changeDefaultHabbitInfo)
router.patch("/users/:habbit/deleteHabbit", authenticateToken, deleteHabbit)

module.exports = router