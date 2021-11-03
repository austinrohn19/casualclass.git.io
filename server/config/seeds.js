const db = require('./connection');

const User = require('../models/User');
const Category = require('../models/Category');
const Class = require('../models/Class');

const userData = require('./seedData/userData.json');
const categoryData = require('./seedData/categoryData.json');
const classData = require('./seedData/classData.json');

async function seedData() {
    try {
        await User.deleteMany({});
        await Category.deleteMany({});
        await Class.deleteMany({});

        const users = await User.create(userData);
        const categories = await Category.create(categoryData);

        for (let i in users) {
            const newClass = await Class.create({
                ...classData[i],
                author: users[i]._id,
                category: categories[i]._id
            });
            await users[i].addCreatedClass(newClass);
        }

        console.log("Seeded successfully");
    } catch (err) {
        console.error(err);
    } finally {
        db.close();
    }
}

seedData();