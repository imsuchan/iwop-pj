module.exports = (sequlize, DataTypes) => {
    let hashTag = sequlize.define('hashtag', {
        title: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    }, {
            timestamps: true,
            paranoid: true,
        })
        return hashTag
}