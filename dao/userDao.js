const uuidv4 = require('uuid');
const Cloudant = require('@cloudant/cloudant');
const cloudant = new Cloudant({
    url: process.env.CLOUDANT_URL,
    plugins: {iamauth: {iamApiKey: process.env.CLOUDANT_IAM_API_KEY}}
});
const db = cloudant.db.use(process.env.CLOUDANT_DB_NAME)

cloudant.db.list(function (err, body) {
    body.forEach(function (db) {
        console.log(db);
    });
});

class UserDao {

    static async createUser(user) {
        console.log("Creating document 'user'");
        let uuid = uuidv4.v4();
        let now = Date.now()
        user._id = uuid
        user.createdAt = now

        // specify the id of the document so you can update and delete it later
        await db.insert(user, function (err, data) {
            console.log('Error:', err);
            console.log('Data:', data);
            // callback(err, data);
        });
    }

}

module.exports = UserDao