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
  // Firebase doesn't require predefined models.
  // Use Firestore directly in controllers or create helper functions here.
  // Collection name: "resource"

import { DataTypes } from "sequelize";
import { sequelize } from "./db.js";


export const Resource = sequelize.define("resources", {
  resource_id: { 
    type: DataTypes.INTEGER,
    autoIncrement: true, 
    primaryKey: true, 
  },
  resource_name: { 
    type: DataTypes.STRING(255), 
    allowNull: false 
  },
  category_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sector_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  },
  total_quantity: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  },
  available_quantity: { 
    type: DataTypes.DECIMAL(10, 2), 
    allowNull: false 
  },
  unit_of_measure: { 
    type: DataTypes.STRING(50), 
    allowNull: false 
  },
  min_threshold: { 
    type: DataTypes.DECIMAL(10, 2), 
    defaultValue: 0 
  },
  is_critical: { 
    type: DataTypes.BOOLEAN, 
    defaultValue: false 
  },
  last_updated: { 
    type: DataTypes.DATE, 
    defaultValue: DataTypes.NOW 
  }
});


export { sequelize };