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
import { Announcement, Shelter, Resource, Staff, Occupant, Occupancy, sequelize } from "../models/Admin.js";
await sequelize.sync();

const adminController = {
  dashboard: async (req, res) => {
    try {
      const totalShelters = await Shelter.count();
      const availableShelters = await Shelter.count({ where: { status: 'available' } });
      const totalOccupants = await Occupant.count();
      const activeStaff = await Staff.count({ where: { status: 'active' } });
      const recentAnnouncements = await Announcement.findAll({ 
        limit: 5, 
        order: [['createdAt', 'DESC']] 
      });

      res.render('admin/dashboard', {
        stats: {
          totalShelters,
          availableShelters,
          totalOccupants,
          activeStaff
        },
        recentAnnouncements
      });
    } catch (error) {
      res.render('admin/dashboard', { 
        stats: null, 
        recentAnnouncements: [],
        error: 'Failed to load dashboard data' 
      });
    }
  },

  manageAnnouncements: async (req, res) => {
    try {
      const announcements = await Announcement.findAll({ order: [['createdAt', 'DESC']] });
      res.render('admin/announcements', { announcements });
    } catch (error) {
      res.render('admin/announcements', { 
        announcements: [],
        error: 'Failed to load announcements' 
      });
    }
  },

  addAnnouncement: async (req, res) => {
    try {
      const { title, content, priority } = req.body;
      await Announcement.create({
        title,
        content,
        priority: priority || 'medium',
        author: req.user.id,
        status: 'active'
      });
      res.redirect('/admin/announcements');
    } catch (error) {
      res.redirect('/admin/announcements?error=Failed to create announcement');
    }
  },

  updateAnnouncement: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, priority, status } = req.body;
      
      await Announcement.update(
        { title, content, priority, status },
        { where: { id } }
      );
      res.redirect('/admin/announcements');
    } catch (error) {
      res.redirect('/admin/announcements?error=Failed to update announcement');
    }
  },

  deleteAnnouncement: async (req, res) => {
    try {
      const { id } = req.body;
      await Announcement.destroy({ where: { id } });
      res.redirect('/admin/announcements');
    } catch (error) {
      res.redirect('/admin/announcements?error=Failed to delete announcement');
    }
  },

  updateShelterAvailability: async (req, res) => {
    try {
      const shelters = await Shelter.findAll();
      res.render('admin/shelters', { shelters });
    } catch (error) {
      res.render('admin/shelters', { 
        shelters: [],
        error: 'Failed to load shelters' 
      });
    }
  },

  updateShelter: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, capacity, available_beds, status, location } = req.body;
      
      await Shelter.update(
        { name, capacity, available_beds, status, location },
        { where: { id } }
      );
      res.redirect('/admin/shelters');
    } catch (error) {
      res.redirect('/admin/shelters?error=Failed to update shelter');
    }
  },

  addShelter: async (req, res) => {
    try {
      const { name, capacity, location } = req.body;
      await Shelter.create({
        name,
        capacity,
        available_beds: capacity,
        location,
        status: 'available'
      });
      res.redirect('/admin/shelters');
    } catch (error) {
      res.redirect('/admin/shelters?error=Failed to add shelter');
    }
  },

  recordResourcesTransaction: async (req, res) => {
    try {
      const resources = await Resource.findAll({ order: [['createdAt', 'DESC']] });
      res.render('admin/resources', { resources });
    } catch (error) {
      res.render('admin/resources', { 
        resources: [],
        error: 'Failed to load resources' 
      });
    }
  },

  addResourceTransaction: async (req, res) => {
    try {
      const { item_name, category, quantity, transaction_type, notes } = req.body;
      await Resource.create({
        item_name,
        category,
        quantity: parseInt(quantity),
        transaction_type,
        notes,
        recorded_by: req.user.id
      });
      res.redirect('/admin/resources');
    } catch (error) {
      res.redirect('/admin/resources?error=Failed to record resource transaction');
    }
  },

  updateResourceTransaction: async (req, res) => {
    try {
      const { id } = req.params;
      const { item_name, category, quantity, transaction_type, notes } = req.body;
      
      await Resource.update(
        { item_name, category, quantity, transaction_type, notes },
        { where: { id } }
      );
      res.redirect('/admin/resources');
    } catch (error) {
      res.redirect('/admin/resources?error=Failed to update resource transaction');
    }
  },

  manageStaff: async (req, res) => {
    try {
      const staff = await Staff.findAll();
      res.render('admin/staff', { staff });
    } catch (error) {
      res.render('admin/staff', { 
        staff: [],
        error: 'Failed to load staff' 
      });
    }
  },

  addStaff: async (req, res) => {
    try {
      const { name, email, role, department } = req.body;
      await Staff.create({
        name,
        email,
        role,
        department,
        status: 'active'
      });
      res.redirect('/admin/staff');
    } catch (error) {
      res.redirect('/admin/staff?error=Failed to add staff');
    }
  },

  updateStaff: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, email, role, department, status } = req.body;
      
      await Staff.update(
        { name, email, role, department, status },
        { where: { id } }
      );
      res.redirect('/admin/staff');
    } catch (error) {
      res.redirect('/admin/staff?error=Failed to update staff');
    }
  },

  deleteStaff: async (req, res) => {
    try {
      const { id } = req.body;
      await Staff.destroy({ where: { id } });
      res.redirect('/admin/staff');
    } catch (error) {
      res.redirect('/admin/staff?error=Failed to delete staff');
    }
  },

  manageOccupants: async (req, res) => {
    try {
      const occupants = await Occupant.findAll({ include: [Shelter] });
      res.render('admin/occupants', { occupants });
    } catch (error) {
      res.render('admin/occupants', { 
        occupants: [],
        error: 'Failed to load occupants' 
      });
    }
  },

  addOccupant: async (req, res) => {
    try {
      const { name, age, gender, contact, emergency_contact, medical_notes, shelter_id } = req.body;
      await Occupant.create({
        name,
        age: parseInt(age),
        gender,
        contact,
        emergency_contact,
        medical_notes,
        shelter_id,
        status: 'active'
      });
      res.redirect('/admin/occupants');
    } catch (error) {
      res.redirect('/admin/occupants?error=Failed to add occupant');
    }
  },

  updateOccupant: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, age, gender, contact, emergency_contact, medical_notes, shelter_id, status } = req.body;
      
      await Occupant.update(
        { name, age, gender, contact, emergency_contact, medical_notes, shelter_id, status },
        { where: { id } }
      );
      res.redirect('/admin/occupants');
    } catch (error) {
      res.redirect('/admin/occupants?error=Failed to update occupant');
    }
  },

  manageOccupancy: async (req, res) => {
    try {
      const occupancy = await Occupancy.findAll({ 
        include: [Occupant, Shelter],
        order: [['check_in_date', 'DESC']]
      });
      res.render('admin/occupancy', { occupancy });
    } catch (error) {
      res.render('admin/occupancy', { 
        occupancy: [],
        error: 'Failed to load occupancy records' 
      });
    }
  },

  viewManageOccupantsIn: async (req, res) => {
    try {
      const currentOccupants = await Occupant.findAll({ 
        where: { status: 'active' },
        include: [Shelter]
      });
      res.render('admin/occupants-in', { currentOccupants });
    } catch (error) {
      res.render('admin/occupants-in', { 
        currentOccupants: [],
        error: 'Failed to load current occupants' 
      });
    }
  },
};

export { adminController };