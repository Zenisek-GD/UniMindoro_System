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
import { User, sequelize } from "../models/User.js";
await sequelize.sync();

const authController = {
  loginPage: async (req, res) => {
    try {
      res.render('login', { error: null });
    } catch (error) {
      res.render('login', { error: 'Failed to load login page' });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Demo authentication
      const demoUsers = {
        'admin@unimindoro.com': { 
          id: 1, 
          name: 'System Administrator', 
          role: 'admin', 
          password: 'password'
        },
        'staff@unimindoro.com': { 
          id: 2, 
          name: 'Staff Member', 
          role: 'staff', 
          password: 'password'
        },
        'sector@unimindoro.com': { 
          id: 3, 
          name: 'Sector Representative', 
          role: 'sector_rep', 
          password: 'password', 
          sector_id: 1 
        }
      };

      const user = demoUsers[email];
      
      if (!user || user.password !== password) {
        return res.render('login', { 
          error: 'Invalid email or password',
          email: email 
        });
      }

      // Set session
      req.session.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        sector_id: user.sector_id
      };

      // Redirect based on role
      if (user.role === 'admin') {
        res.redirect('/admin/dashboard');
      } else if (user.role === 'staff') {
        res.redirect('/staff/dashboard');
      } else if (user.role === 'sector_rep') {
        res.redirect('/sector-rep/dashboard');
      }
    } catch (error) {
      res.render('login', { 
        error: 'Login failed. Please try again.',
        email: req.body.email 
      });
    }
  },

  registerPage: async (req, res) => {
    try {
      res.render('register', { error: null });
    } catch (error) {
      res.render('register', { error: 'Failed to load registration page' });
    }
  },

  register: async (req, res) => {
    try {
      const { name, email, password, confirmPassword } = req.body;
      
      // Demo registration - Only staff accounts can be created
      if (password !== confirmPassword) {
        return res.render('register', { 
          error: 'Passwords do not match',
          name,
          email
        });
      }

      // Check if email already exists in demo users
      const demoUsers = {
        'admin@unimindoro.com': true,
        'staff@unimindoro.com': true,
        'sector@unimindoro.com': true
      };

      if (demoUsers[email]) {
        return res.render('register', { 
          error: 'Email already exists. Please use a different email.',
          name,
          email
        });
      }

      // Auto-login after registration for demo (always as staff)
      req.session.user = {
        id: Date.now(),
        name: name,
        email: email,
        role: 'staff'
      };

      res.redirect('/staff/dashboard');
    } catch (error) {
      res.render('register', { 
        error: 'Registration failed. Please try again.',
        name: req.body.name,
        email: req.body.email
      });
    }
  },

  logout: async (req, res) => {
    try {
      req.session.destroy();
      res.redirect('/');
    } catch (error) {
      res.redirect('/');
    }
  }
};

export { authController };