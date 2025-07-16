import { Router } from 'express';
import { ContrallerSocial } from '@/controllers/social';


export const SocialesRoutes = Router();

SocialesRoutes.get('/', ContrallerSocial.getAll)

//SocialesRoutes.post('/', ContrallerSocial.createSocial)
//
//SocialesRoutes.delete('/:id', ContrallerSocial.deleteSocial)
//
SocialesRoutes.put('/:id', ContrallerSocial.updateSocial)