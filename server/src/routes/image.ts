import { JwtPayload } from '@/@types';
import { getMenuImage } from '@/services/menu';
import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/menus/:id/image', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  (async () => {
    const auth = req.user as JwtPayload;
    const image = await getMenuImage(parseInt(req.params.id), auth.user);

    if (image) {
      res.writeHead(200, { 'Content-Type': image.contentType });
      res.end(image.buffer);
    } else {
      res.status(404).send({ message: 'menu image not found!' });
    }
  })().catch(next);
});

export default router;
