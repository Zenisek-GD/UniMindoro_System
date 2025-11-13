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
const adminOccupantController = {
  manageOccupants: async (req, res) => {
    try {
      const sampleOccupants = [
        {
          id: 1,
          name: "Maria Santos",
          age: 32,
          gender: "female",
          contact: "09123456789",
          emergencyContact: "09123456780",
          shelter: "Central Elementary School",
          checkInDate: "2024-01-15",
          status: "active",
          medicalNotes: "None"
        },
        {
          id: 2,
          name: "Juan Dela Cruz",
          age: 45,
          gender: "male",
          contact: "09123456790",
          emergencyContact: "09123456781",
          shelter: "North Community Center",
          checkInDate: "2024-01-14",
          status: "active",
          medicalNotes: "Hypertension medication"
        },
        {
          id: 3,
          name: "Anna Reyes",
          age: 28,
          gender: "female",
          contact: "09123456791",
          emergencyContact: "09123456782",
          shelter: "West Sports Complex",
          checkInDate: "2024-01-15",
          status: "active",
          medicalNotes: "Pregnant - 6 months"
        },
        {
          id: 4,
          name: "Carlos Garcia",
          age: 60,
          gender: "male",
          contact: "09123456792",
          emergencyContact: "09123456783",
          shelter: "South Church Hall",
          checkInDate: "2024-01-13",
          status: "checked_out",
          medicalNotes: "Diabetes"
        }
      ];

      res.render('admin/occupants', {
        user: req.session.user,
        occupants: sampleOccupants,
        pageTitle: "Occupant Management",
        pageSubtitle: "Manage shelter occupants"
      });
    } catch (error) {
      console.error('Occupants error:', error);
      res.render('admin/occupants', {
        user: req.session.user,
        occupants: [],
        error: 'Failed to load occupants',
        pageTitle: "Occupant Management",
        pageSubtitle: "Manage shelter occupants"
      });
    }
  },

  createOccupant: async (req, res) => {
    try {
      const { name, age, gender, contact, emergencyContact, shelter, medicalNotes } = req.body;
      // In a real app, you would save to database here
      console.log('Creating occupant:', { name, age, gender, contact, emergencyContact, shelter, medicalNotes });
      
      res.redirect('/admin/occupants?success=Occupant created successfully');
    } catch (error) {
      console.error('Create occupant error:', error);
      res.redirect('/admin/occupants?error=Failed to create occupant');
    }
  },

  updateOccupant: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, gender, contact, emergencyContact, shelter, medicalNotes, status } = req.body;
      // In a real app, you would update in database here
      console.log('Updating occupant:', { id, name, age, gender, contact, emergencyContact, shelter, medicalNotes, status });
      
      res.redirect('/admin/occupants?success=Occupant updated successfully');
    } catch (error) {
      console.error('Update occupant error:', error);
      res.redirect('/admin/occupants?error=Failed to update occupant');
    }
  },

  manageOccupancy: async (req, res) => {
    try {
      const occupancyData = {
        totalCapacity: 750,
        currentOccupants: 142,
        availableBeds: 190,
        shelters: [
          { name: "Central Elementary School", capacity: 200, occupants: 155, available: 45 },
          { name: "North Community Center", capacity: 150, occupants: 150, available: 0 },
          { name: "West Sports Complex", capacity: 300, occupants: 180, available: 120 },
          { name: "South Church Hall", capacity: 100, occupants: 75, available: 25 }
        ]
      };

      res.render('admin/occupancy', {
        user: req.session.user,
        occupancy: occupancyData,
        pageTitle: "Occupancy Management",
        pageSubtitle: "View shelter occupancy rates"
      });
    } catch (error) {
      console.error('Occupancy error:', error);
      res.render('admin/occupancy', {
        user: req.session.user,
        occupancy: null,
        error: 'Failed to load occupancy data',
        pageTitle: "Occupancy Management",
        pageSubtitle: "View shelter occupancy rates"
      });
    }
  },

  viewManageOccupantsIn: async (req, res) => {
    try {
      const currentOccupants = [
        {
          id: 1,
          name: "Maria Santos",
          shelter: "Central Elementary School",
          checkInDate: "2024-01-15 10:30:00",
          assignedStaff: "Anna Reyes"
        },
        {
          id: 2,
          name: "Juan Dela Cruz",
          shelter: "North Community Center",
          checkInDate: "2024-01-14 14:20:00",
          assignedStaff: "Maria Santos"
        },
        {
          id: 3,
          name: "Anna Reyes",
          shelter: "West Sports Complex",
          checkInDate: "2024-01-15 09:15:00",
          assignedStaff: "Juan Dela Cruz"
        }
      ];

      res.render('admin/occupants-in', {
        user: req.session.user,
        currentOccupants: currentOccupants,
        pageTitle: "Current Occupants",
        pageSubtitle: "View occupants currently in shelters"
      });
    } catch (error) {
      console.error('Current occupants error:', error);
      res.render('admin/occupants-in', {
        user: req.session.user,
        currentOccupants: [],
        error: 'Failed to load current occupants',
        pageTitle: "Current Occupants",
        pageSubtitle: "View occupants currently in shelters"
      });
    }
  }
};

export { adminOccupantController };