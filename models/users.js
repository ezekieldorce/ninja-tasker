const bcrypt = require("bcryptjs")
// create a model for our tasks

//exporting this model to our index
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {
        //define columns of our table
        todo: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true,
            validate: {
                isEmail: true
            }

        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false
        }
    });

    // create custom methods for user models
    User.prototype.verifyPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    //hooks happen on specific scenarios
    User.addHook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(
            user.password,
            bcrypt.genSaltSync(10),
            null
        );
    });


    return User;
};