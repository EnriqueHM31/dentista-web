"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocialesRoutes = void 0;
const express_1 = require("express");
const social_1 = require("../controllers/social");
exports.SocialesRoutes = (0, express_1.Router)();
exports.SocialesRoutes.get('/', social_1.ContrallerSocial.getAll);
//SocialesRoutes.post('/', ContrallerSocial.createSocial)
//
//SocialesRoutes.delete('/:id', ContrallerSocial.deleteSocial)
//
exports.SocialesRoutes.put('/:id', social_1.ContrallerSocial.updateSocial);
