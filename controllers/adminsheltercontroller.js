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
import {sequelize } from "../models/User.js";
await sequelize.sync();
const adminShelterController = {
  manageShelters: async (req, res) => {
    try {
      const sampleShelters = [
        {
          id: 1,
          name: "Central Elementary School",
          location: "123 Main Street, Downtown",
          capacity: 200,
          availableBeds: 45,
          status: "available",
          contact: "09123456789",
          notes: "Fully equipped with emergency supplies"
        },
        {
          id: 2,
          name: "North Community Center",
          location: "456 North Avenue",
          capacity: 150,
          availableBeds: 0,
          status: "full",
          contact: "09123456790",
          notes: "Maximum capacity reached"
        },
        {
          id: 3,
          name: "West Sports Complex",
          location: "789 West Road",
          capacity: 300,
          availableBeds: 120,
          status: "available",
          contact: "09123456791",
          notes: "Large space available, needs more volunteers"
        },
        {
          id: 4,
          name: "South Church Hall",
          location: "321 South Street",
          capacity: 100,
          availableBeds: 25,
          status: "available",
          contact: "09123456792",
          notes: "Basic amenities available"
        }
      ];

      res.render('admin/shelters', {
        user: req.session.user,
        shelters: sampleShelters,
        pageTitle: "Shelter Management",
        pageSubtitle: "Manage emergency shelters and availability"
      });
    } catch (error) {
      console.error('Shelters error:', error);
      res.render('admin/shelters', {
        user: req.session.user,
        shelters: [],
        error: 'Failed to load shelters',
        pageTitle: "Shelter Management",
        pageSubtitle: "Manage emergency shelters and availability"
      });
    }
  },

  updateShelter: async (req, res) => {
    try {
      const { id } = req.params;
      const { availableBeds, status, notes } = req.body;
      // In a real app, you would update in database here
      console.log('Updating shelter:', { id, availableBeds, status, notes });
      
      res.redirect('/admin/shelters?success=Shelter updated successfully');
    } catch (error) {
      console.error('Update shelter error:', error);
      res.redirect('/admin/shelters?error=Failed to update shelter');
    }
  },

  createShelter: async (req, res) => {
    try {
      const { name, location, capacity, contact, notes } = req.body;
      // In a real app, you would save to database here
      console.log('Creating shelter:', { name, location, capacity, contact, notes });
      
      res.redirect('/admin/shelters?success=Shelter created successfully');
    } catch (error) {
      console.error('Create shelter error:', error);
      res.redirect('/admin/shelters?error=Failed to create shelter');
    }
  }
};

export { adminShelterController };