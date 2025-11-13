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
const adminAnnouncementController = {
  manageAnnouncements: async (req, res) => {
    try {
      const sampleAnnouncements = [
        {
          id: 1,
          title: "Storm Warning Alert",
          content: "Heavy rainfall expected in the next 24 hours. All shelters should prepare for potential evacuees.",
          priority: "high",
          status: "active",
          createdAt: "2024-01-15 10:30:00",
          author: "System Admin"
        },
        {
          id: 2,
          title: "New Shelter Opened",
          content: "Central Elementary School has been designated as an emergency shelter with capacity for 200 people.",
          priority: "medium",
          status: "active",
          createdAt: "2024-01-14 14:20:00",
          author: "System Admin"
        },
        {
          id: 3,
          title: "Resource Delivery Schedule",
          content: "Medical supplies and food packages will be delivered to all shelters tomorrow morning.",
          priority: "low",
          status: "active",
          createdAt: "2024-01-13 09:15:00",
          author: "System Admin"
        }
      ];

      res.render('admin/announcements', {
        user: req.session.user,
        announcements: sampleAnnouncements,
        pageTitle: "Announcements Management",
        pageSubtitle: "Create and manage system announcements"
      });
    } catch (error) {
      console.error('Announcements error:', error);
      res.render('admin/announcements', {
        user: req.session.user,
        announcements: [],
        error: 'Failed to load announcements',
        pageTitle: "Announcements Management",
        pageSubtitle: "Create and manage system announcements"
      });
    }
  },

  createAnnouncement: async (req, res) => {
    try {
      const { title, content, priority } = req.body;
      // In a real app, you would save to database here
      console.log('Creating announcement:', { title, content, priority });
      
      // Redirect back to announcements page
      res.redirect('/admin/announcements?success=Announcement created successfully');
    } catch (error) {
      console.error('Create announcement error:', error);
      res.redirect('/admin/announcements?error=Failed to create announcement');
    }
  },

  updateAnnouncement: async (req, res) => {
    try {
      const { id } = req.params;
      const { title, content, priority, status } = req.body;
      // In a real app, you would update in database here
      console.log('Updating announcement:', { id, title, content, priority, status });
      
      res.redirect('/admin/announcements?success=Announcement updated successfully');
    } catch (error) {
      console.error('Update announcement error:', error);
      res.redirect('/admin/announcements?error=Failed to update announcement');
    }
  },

  deleteAnnouncement: async (req, res) => {
    try {
      const { id } = req.body;
      // In a real app, you would delete from database here
      console.log('Deleting announcement:', id);
      
      res.redirect('/admin/announcements?success=Announcement deleted successfully');
    } catch (error) {
      console.error('Delete announcement error:', error);
      res.redirect('/admin/announcements?error=Failed to delete announcement');
    }
  }
};

export { adminAnnouncementController };