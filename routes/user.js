const { Router, response } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const newUser = User.create({
        username,
        password
    })

    res.json({
        "message":"user created succesfully"
    })
});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const allCourses = await User.find({});

    res.json({
        courses:allCourses
    })
});

router.post('/courses/:courseId', userMiddleware, async(req, res) => {
    // Implement course purchase logic
    const courseId = req.params.courseId;
    // const username = req.headers.username;
    const username = req.username;
    console.log(username)

    await User.updateOne({
        username : username
    },  {
        "$push":{
            purchasedCourses: courseId
        }
    })

    res.json({
        "message":"Purchase complete"
    })
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });
    console.log(user.purchasedCourses)


    const courses = await Course.find({
        _id:{
            "$in":user.purchasedCourses
        }
    })
    res.json({
        "Courses":courses
    })
});

module.exports = router