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
const adminStaffController = {
  manageStaff: async (req, res) => {
    try {
      const sampleStaff = [
        {
          id: 1,
          name: "Maria Santos",
          email: "maria.santos@unimindoro.com",
          role: "shelter_manager",
          department: "Shelter Operations",
          status: "active",
          joinDate: "2024-01-10",
          lastActive: "2024-01-15 14:30:00"
        },
        {
          id: 2,
          name: "Juan Dela Cruz",
          email: "juan.delacruz@unimindoro.com",
          role: "resource_coordinator",
          department: "Resource Management",
          status: "active",
          joinDate: "2024-01-08",
          lastActive: "2024-01-15 13:15:00"
        },
        {
          id: 3,
          name: "Anna Reyes",
          email: "anna.reyes@unimindoro.com",
          role: "occupant_specialist",
          department: "Occupant Services",
          status: "active",
          joinDate: "2024-01-05",
          lastActive: "2024-01-15 15:45:00"
        },
        {
          id: 4,
          name: "Carlos Garcia",
          email: "carlos.garcia@unimindoro.com",
          role: "logistics_officer",
          department: "Logistics",
          status: "inactive",
          joinDate: "2024-01-12",
          lastActive: "2024-01-14 11:20:00"
        }
      ];

      res.render('admin/staff', {
        user: req.session.user,
        staff: sampleStaff,
        pageTitle: "Staff Management",
        pageSubtitle: "Manage system staff members"
      });
    } catch (error) {
      console.error('Staff error:', error);
      res.render('admin/staff', {
        user: req.session.user,
        staff: [],
        error: 'Failed to load staff',
        pageTitle: "Staff Management",
        pageSubtitle: "Manage system staff members"
      });
    }
  },

  createStaff: async (req, res) => {
    try {
      const { name, email, role, department } = req.body;
      // In a real app, you would save to database here
      console.log('Creating staff:', { name, email, role, department });
      
      res.redirect('/admin/staff?success=Staff member created successfully');
    } catch (error) {
      console.error('Create staff error:', error);
      res.redirect('/admin/staff?error=Failed to create staff member');
    }
  },

  updateStaff: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, role, department, status } = req.body;
      // In a real app, you would update in database here
      console.log('Updating staff:', { id, name, email, role, department, status });
      
      res.redirect('/admin/staff?success=Staff member updated successfully');
    } catch (error) {
      console.error('Update staff error:', error);
      res.redirect('/admin/staff?error=Failed to update staff member');
    }
  },

  deleteStaff: async (req, res) => {
    try {
      const { id } = req.body;
      // In a real app, you would delete from database here
      console.log('Deleting staff:', id);
      
      res.redirect('/admin/staff?success=Staff member deleted successfully');
    } catch (error) {
      console.error('Delete staff error:', error);
      res.redirect('/admin/staff?error=Failed to delete staff member');
    }
  }
};

export { adminStaffController };