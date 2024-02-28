import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/dbConnect";

interface UserAttributes {
	id: number;
	email: string;
	password: string;
	fullname: string;
	phone: string;
}

export interface UserCreationAttributes extends Partial<UserAttributes> {}

class User
	extends Model<UserAttributes, UserCreationAttributes>
	implements UserAttributes
{
	public id!: number;
	public email!: string;
	public password!: string;
	public fullname!: string;
	public phone!: string;
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		fullname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: "User",
	}
);

sequelize.sync();

export default User;
