import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConnect";
import User from "./userModel";

export interface ContactAttributes {
	id: number;
	fullName: string;
	phoneNumber: string;
	email?: string;
	image?: string;
	UserId: number;
}

class Contact extends Model<ContactAttributes> implements ContactAttributes {
	public id!: number;
	public fullName!: string;
	public phoneNumber!: string;
	public email?: string;
	public image?: string;
	public UserId!: number;
}

Contact.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		fullName: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phoneNumber: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		image: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		UserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "Contact",
	}
);

Contact.belongsTo(User);
User.hasMany(Contact);

export default Contact;
