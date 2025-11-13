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
import { sequelize } from "../models/User.js";
await sequelize.sync();
const adminResourceController = {
  manageResources: async (req, res) => {
    try {
      const sampleResources = [
        {
          id: 1,
          itemName: "Emergency Blankets",
          category: "Shelter Supplies",
          quantity: 500,
          unit: "pieces",
          status: "in_stock",
          lastUpdated: "2024-01-15 08:30:00",
          location: "Central Warehouse"
        },
        {
          id: 2,
          itemName: "Bottled Water",
          category: "Food & Water",
          quantity: 1200,
          unit: "bottles",
          status: "in_stock",
          lastUpdated: "2024-01-15 09:15:00",
          location: "Central Warehouse"
        },
        {
          id: 3,
          itemName: "First Aid Kits",
          category: "Medical Supplies",
          quantity: 85,
          unit: "kits",
          status: "low_stock",
          lastUpdated: "2024-01-14 16:45:00",
          location: "Medical Storage"
        },
        {
          id: 4,
          itemName: "Ready-to-Eat Meals",
          category: "Food & Water",
          quantity: 800,
          unit: "meals",
          status: "in_stock",
          lastUpdated: "2024-01-15 10:00:00",
          location: "Central Warehouse"
        }
      ];

      const transactions = [
        {
          id: 1,
          itemName: "Emergency Blankets",
          type: "incoming",
          quantity: 200,
          date: "2024-01-15 08:30:00",
          recordedBy: "Admin User"
        },
        {
          id: 2,
          itemName: "First Aid Kits",
          type: "outgoing",
          quantity: 15,
          date: "2024-01-14 16:45:00",
          recordedBy: "Staff Member"
        }
      ];

      res.render('admin/resources', {
        user: req.session.user,
        resources: sampleResources,
        transactions: transactions,
        pageTitle: "Resource Management",
        pageSubtitle: "Track and manage emergency resources"
      });
    } catch (error) {
      console.error('Resources error:', error);
      res.render('admin/resources', {
        user: req.session.user,
        resources: [],
        transactions: [],
        error: 'Failed to load resources',
        pageTitle: "Resource Management",
        pageSubtitle: "Track and manage emergency resources"
      });
    }
  },

  createResourceTransaction: async (req, res) => {
    try {
      const { itemName, category, quantity, transactionType, notes } = req.body;
      // In a real app, you would save to database here
      console.log('Creating resource transaction:', { itemName, category, quantity, transactionType, notes });
      
      res.redirect('/admin/resources?success=Resource transaction recorded successfully');
    } catch (error) {
      console.error('Create resource transaction error:', error);
      res.redirect('/admin/resources?error=Failed to record resource transaction');
    }
  },

  updateResourceTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { itemName, category, quantity, transactionType, notes } = req.body;
      // In a real app, you would update in database here
      console.log('Updating resource transaction:', { id, itemName, category, quantity, transactionType, notes });
      
      res.redirect('/admin/resources?success=Resource transaction updated successfully');
    } catch (error) {
      console.error('Update resource transaction error:', error);
      res.redirect('/admin/resources?error=Failed to update resource transaction');
    }
  }
};

export { adminResourceController };