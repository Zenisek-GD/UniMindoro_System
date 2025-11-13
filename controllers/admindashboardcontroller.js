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
const admindashboardcontroller = {
  dashboard: async (req, res) => {
    try {
      // Sample data for testing
      const sampleData = {
        user: req.session.user,
        stats: {
          totalShelters: 14,
          availableShelters: 5,
          totalOccupants: 142,
          activeStaff: 3,
          totalResources: 67
        },
        recentAnnouncements: [
          {
            id: 1,
            title: "Storm Warning Alert",
            content: "Heavy rainfall expected in the next 24 hours. All shelters should prepare for potential evacuees. Ensure emergency protocols are ready.",
            createdAt: "2 hours ago",
            priority: "high"
          },
          {
            id: 2,
            title: "New Shelter Opened",
            content: "Central Elementary School has been designated as an emergency shelter with capacity for 200 people.",
            createdAt: "1 day ago",
            priority: "medium"
          },
          {
            id: 3,
            title: "Resource Delivery",
            content: "Medical supplies and food packages will be delivered to all shelters tomorrow morning.",
            createdAt: "2 days ago",
            priority: "low"
          }
        ],
        currentTime: new Date().toLocaleString(),
        pageTitle: "Admin Dashboard",
        pageSubtitle: "System Overview & Analytics"
      };

      res.render('admin/dashboard', sampleData);
    } catch (error) {
      console.error('Dashboard error:', error);
      res.render('admin/dashboard', { 
        user: req.session.user,
        stats: null, 
        recentAnnouncements: [],
        error: 'Failed to load dashboard data',
        pageTitle: "Admin Dashboard",
        pageSubtitle: "System Overview & Analytics"
      });
    }
  }
};

export { admindashboardcontroller };
