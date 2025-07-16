"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioRouter = void 0;
const express_1 = require("express");
const usuario_1 = require("../controllers/usuario");
exports.UsuarioRouter = (0, express_1.Router)();
exports.UsuarioRouter.get('/', usuario_1.ContrallerUsuario.getUsuario);
exports.UsuarioRouter.put('/', usuario_1.ContrallerUsuario.updateUsuario);
