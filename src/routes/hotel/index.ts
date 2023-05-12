import hotelController from '@/controllers/hotel.controller';
import {
  catchError,
  checkParamsId,
  checkRole,
  checkUser,
  validateRequest,
} from '@/middleware/validate';
import { Role } from '@/models/User';
import {
  createRoomSchema,
  createHotelSchema,
  getHotelSchema,
  updateHotelSchema,
  updateRoomSchema,
} from '@/schema/hotel.schema';
import express from 'express';
const router = express.Router();

/**
 * @Admin send new pass(random)to email user
 * block user
 * see all user ( cant not see money,password)
 * @user can see all my account
 */

router.get('/', validateRequest(getHotelSchema), catchError(hotelController.getHotels));

router.get('/:id', checkParamsId, catchError(hotelController.detailHotel));

router.use(checkUser);

router.post(
  '/create-hotel',
  validateRequest(createHotelSchema),
  catchError(hotelController.createHotel),
);

// hotelier can use router
router.use(checkRole(Role.HOTELIER));

router.get('/me', catchError(hotelController.updateHotel));

router.put(
  '/update-hotel/:id',
  checkParamsId,
  validateRequest(updateHotelSchema),
  catchError(hotelController.updateHotel),
);

router.post(
  '/create-room/:id',
  checkParamsId,
  validateRequest(createRoomSchema),
  catchError(hotelController.createRoom),
);

router.put(
  '/update-room/:id',
  checkParamsId,
  validateRequest(updateRoomSchema),
  catchError(hotelController.updateRoomType),
);
export default router;
