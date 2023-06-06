/* eslint-disable @typescript-eslint/no-unused-vars */
import { Status } from '@/models/Booking';
import { Package } from '@/models/Hotel';
import dayjs from 'dayjs';

import * as Yup from 'yup';

export const chargeSchema = Yup.object().shape({
  body: Yup.object().shape({
    balance: Yup.number().min(1).required(),
  }),
});

export const withdrawSchema = Yup.object().shape({
  body: Yup.object().shape({
    password: Yup.string().required(),
    withdraw: Yup.number().min(1).required(),
  }),
});

export const createBookingSchema = Yup.object().shape({
  body: Yup.object().shape({
    _id: Yup.string().max(0, 'no input value'),
    rooms: Yup.array(
      Yup.object().shape({
        roomTypeId: Yup.string().objectIdValid().required(),
        quantity: Yup.number().min(1).integer().required(),
      }),
    ),
    hotelId: Yup.string().objectIdValid().required(),
    startDate: Yup.date().min(dayjs(new Date()).format('YYYY-MM-DD')).required(),
    endDate: Yup.date()
      .test(
        'compareStartDate',
        'Not less or equal than start date',
        (endDate: Date, context) => (endDate < context.parent.startDate ? false : true),
      )
      .required(),
  }),
});

export const paymentBookingSchema = Yup.object().shape({
  body: Yup.object().shape({
    password: Yup.string().required(),
    bookingId: Yup.string().objectIdValid().required(),
    hotelId: Yup.string().objectIdValid('Wrong Id').required(),
  }),
});

export const cancelBookingSchema = Yup.object().shape({
  body: Yup.object().shape({
    bookingId: Yup.string().objectIdValid('Wrong Id').required(),
    hotelId: Yup.string().objectIdValid('Wrong Id').required(),
  }),
});

export const paymentMembershipSchema = Yup.object().shape({
  body: Yup.object().shape({
    password: Yup.string().required(),
    package: Yup.string()
      .oneOf(Object.values(Package).filter((e) => e !== Package.FREE))
      .required(),
  }),
});

export const getBookingSchema = Yup.object().shape({
  query: Yup.object().shape({
    page: Yup.number().integer().min(1).notRequired(),
    status: Yup.string().oneOf(Object.values(Status)).notRequired(),
  }),
});

export const getBookingByHotelierSchema = Yup.object().shape({
  query: Yup.object().shape({
    allHotel: Yup.boolean().required(),
    hotelId: Yup.string()
      .objectIdValid()
      .when('allHotel', (allHotel, field) =>
        allHotel[0] ? field.notRequired() : field.required(),
      ),
    page: Yup.number().integer().min(1).notRequired(),
    status: Yup.string().oneOf(Object.values(Status)).notRequired(),
  }),
});

export const getMembershipSchema = Yup.object().shape({
  query: Yup.object().shape({
    page: Yup.number().integer().min(1).notRequired(),
    package: Yup.string()
      .oneOf(Object.values(Package).filter((e) => e !== Package.FREE))
      .notRequired(),
    isExpire: Yup.boolean().notRequired(),
  }),
});

export type ChargeSchema = Yup.InferType<typeof chargeSchema>['body'];
export type WithdrawSchema = Yup.InferType<typeof withdrawSchema>['body'];
export type PaymentMembershipSchema = Yup.InferType<
  typeof paymentMembershipSchema
>['body'];
export type CreateBookingSchema = Yup.InferType<typeof createBookingSchema>['body'];
export type PaymentBookingSchema = Yup.InferType<typeof paymentBookingSchema>['body'];
export type CancelBookingSchema = Yup.InferType<typeof cancelBookingSchema>['body'];
export type GetBookingSchema = Yup.InferType<typeof getBookingSchema>['query'];
export type GetMembershipSchema = Yup.InferType<typeof getMembershipSchema>['query'];
export type GetBookingByHotelierSchema = Yup.InferType<
  typeof getBookingByHotelierSchema
>['query'];
