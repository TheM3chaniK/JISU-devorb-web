import { Request, Response } from 'express';
import path from 'path';
import { forms } from '@/test-data/forms.js';

export const getAvailableForms = (req: Request, res: Response) => {
  const { type } = req.query;

  if (type) {
    const filtered = forms.filter(form => form.type === type);
    return res.json(filtered);
  }

  return res.json(forms);
};

export const downloadForm = (req: Request, res: Response) => {
  const { id } = req.params;
  const form = forms.find(f => f.id === id);

  if (!form) {
    return res.status(404).json({ message: 'Form not found' });
  }

  const filePath = path.join(__dirname, '../../forms', form.filename);

  res.download(filePath, form.filename, (err) => {
    if (err) {
      console.error('Error sending file:', err);
      res.status(500).send('Error downloading file');
    }
  });
};

