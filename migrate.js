
    /*
    MIT License
    
    Copyright (c) 2025 Christian I. Cabrera || XianFire Framework
    Mindoro State University - Philippines

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
    
import { Sequelize } from "sequelize";
import { sequelize } from "./models/db.js";
import { User } from "./models/User.js";
import { Shelteravailability } from "./models/Shelteravailability.js";
import { Sector } from "./models/Sector.js";
import { Resourcetransaction } from "./models/Resourcetransaction.js";
import { Resourcecategory } from "./models/Resourcecategory.js";
import { Resource } from "./models/Resource.js";
import { Occupant } from "./models/Occupant.js";
import { Occupancyrecord } from "./models/Occupancyrecord.js";
import { Announcement } from "./models/Announcement.js";
import inquirer from "inquirer";

// Server-level connection (no database selected)
const rootSequelize = new Sequelize("mysql://root:@localhost:3306/");

const { createDb } = await inquirer.prompt([
  {
    type: "confirm",
    name: "createDb",
    message: "Database 'UniMindoro_System' may not exist. Create it?",
    default: true,
  },
]);

if (createDb) {
  await rootSequelize.query("CREATE DATABASE IF NOT EXISTS UniMindoro_System;");
  console.log("✅ Database created (if it did not exist)");
}

try {
  await sequelize.authenticate();
  console.log("✅ Connected to MySQL database!");
  // User relationships
  User.hasMany(Occupancyrecord, { foreignKey: 'created_by' });
  User.hasMany(Announcement, { foreignKey: 'created_by' });
  User.hasMany(Resourcetransaction, { foreignKey: 'handled_by' });

  // Sector relationships
  Sector.hasMany(Occupancyrecord, { foreignKey: 'sector_id' });
  Sector.hasMany(Resource, { foreignKey: 'sector_id' });
  Sector.hasMany(Resourcetransaction, { foreignKey: 'sector_id' });
  Sector.hasOne(Shelteravailability, { foreignKey: 'sector_id' });

  // Occupant relationships
  Occupant.hasMany(Occupancyrecord, { foreignKey: 'occupant_id' });

  // Occupancyrecord relationships
  Occupancyrecord.belongsTo(User, { foreignKey: 'created_by' });
  Occupancyrecord.belongsTo(Sector, { foreignKey: 'sector_id' });
  Occupancyrecord.belongsTo(Occupant, { foreignKey: 'occupant_id' });

  // Resourcecategory relationships
  Resourcecategory.hasMany(Resource, { foreignKey: 'category_id' });

  // Resource relationships
  Resource.belongsTo(Resourcecategory, { foreignKey: 'category_id' });
  Resource.belongsTo(Sector, { foreignKey: 'sector_id' });
  Resource.hasMany(Resourcetransaction, { foreignKey: 'resource_id' });

  // Resourcetransaction relationships
  Resourcetransaction.belongsTo(Resource, { foreignKey: 'resource_id' });
  Resourcetransaction.belongsTo(Sector, { foreignKey: 'sector_id' });
  Resourcetransaction.belongsTo(User, { foreignKey: 'handled_by' });

  // Announcement relationships
  Announcement.belongsTo(User, { foreignKey: 'created_by' });

  // Shelteravailability relationships
  Shelteravailability.belongsTo(Sector, { foreignKey: 'sector_id' });

  await sequelize.sync({ force: true }); // Drops and recreates tables
  console.log("✅ Tables created for all models!");
} catch (err) {
  console.error("❌ Migration failed:", err);
} finally {
  process.exit();
}

