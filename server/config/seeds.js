const db = require('./connection');

const User = require('../models/User');
const Category = require('../models/Category');
const Class = require('../models/Class');
const Review = require('../models/Review');
const UserRating = require('../models/UserRating');

const userData = require('./seedData/userData.json');
const categoryData = require('./seedData/categoryData.json');
const classData = require('./seedData/classData.json');
const class1ReviewData = require('./seedData/class1Reviews.json');
const class2ReviewData = require('./seedData/class2Reviews.json');
const userRatingData = require('./seedData/userRatingData.json');

async function seedData() {
    try {
        await User.deleteMany({});
        await Category.deleteMany({});
        await Class.deleteMany({});
        await Review.deleteMany({});
        await UserRating.deleteMany({});

        const users = await User.create(userData);
        const categories = await Category.create(categoryData);

        const classes = [];
        for (let i in classData) {
            const newClass = await Class.create({
                ...classData[i],
                author: users[i]._id,
                category: categories[i]._id
            });
            await users[i].addCreatedClass(newClass);
            classes.push(newClass);
        }

        for (let i in class1ReviewData) {
            const newReview = await Review.create({
                ...class1ReviewData[i],
                class: classes[0]._id,
                author: (await User.findOne({ username: class1ReviewData[i].author}))._id
            });
            await classes[0].addReview(newReview);
        }

        for (let i in class2ReviewData) {
            const newReview = await Review.create({
                ...class2ReviewData[i],
                class: classes[1]._id,
                author: (await User.findOne({ username: class2ReviewData[i].author}))._id
            });
            await classes[1].addReview(newReview);
        }

        for (let i in userRatingData) {
            const newUserRating = await UserRating.create({
                ...userRatingData[i],
                user: (await User.findOne({ username: userRatingData[i].user }))._id,
                ratedUser: users[0]._id
            });
            await users[0].addUserRating(newUserRating);
        }

        console.log("Seeded successfully");
    } catch (err) {
        console.error(err);
    } finally {
        db.close();
    }
}

seedData();