
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
    
import express from "express";

import { homePage } from "../controllers/homeController.js";
import { authController } from "../controllers/authcontroller.js";
import { admindashboardcontroller } from "../controllers/admindashboardcontroller.js";
import { adminAnnouncementController } from "../controllers/adminannouncementcontroller.js";
import { adminShelterController } from "../controllers/adminsheltercontroller.js";
import { adminResourceController } from "../controllers/adminresourcecontroller.js";
import { adminStaffController } from "../controllers/adminstaffcontroller.js";
import { adminOccupantController } from "../controllers/adminoccupantcontroller.js";


const router = express.Router();


// Home Route
router.get('/', homePage);

// Auth Routes
router.get('/login', authController.loginPage);
router.post('/login', authController.login);
router.get('/register', authController.registerPage)
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// Admin Dashboard
router.get("/admin/dashboard", admindashboardcontroller.dashboard);

// Admin Routes
router.get("/admin/announcements", adminAnnouncementController.manageAnnouncements);
router.post("/admin/announcements/create", adminAnnouncementController.createAnnouncement);
router.post("/admin/announcements/update/:id", adminAnnouncementController.updateAnnouncement);
router.post("/admin/announcements/delete", adminAnnouncementController.deleteAnnouncement);

router.get("/admin/shelters", adminShelterController.manageShelters);
router.post("/admin/shelters/update/:id", adminShelterController.updateShelter);
router.post("/admin/shelters/create", adminShelterController.createShelter);

router.get("/admin/resources", adminResourceController.manageResources);
router.post("/admin/resources/create", adminResourceController.createResourceTransaction);
router.post("/admin/resources/update/:id", adminResourceController.updateResourceTransaction);

router.get("/admin/staff", adminStaffController.manageStaff);
router.post("/admin/staff/create", adminStaffController.createStaff);
router.post("/admin/staff/update/:id", adminStaffController.updateStaff);
router.post("/admin/staff/delete", adminStaffController.deleteStaff);

router.get("/admin/occupants", adminOccupantController.manageOccupants);
router.post("/admin/occupants/create", adminOccupantController.createOccupant);
router.post("/admin/occupants/update/:id", adminOccupantController.updateOccupant);
router.get("/admin/occupancy", adminOccupantController.manageOccupancy);
router.get("/admin/occupants-in", adminOccupantController.viewManageOccupantsIn);

export default router;