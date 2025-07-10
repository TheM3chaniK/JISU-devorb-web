import { Router } from 'express';
import { getAvailableForms, downloadForm } from '@/controllers/forms.controller.js';

const router = Router();

router.get('/', getAvailableForms);

router.get('/:id/download', downloadForm);

export default router;

