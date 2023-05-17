import dayjs from 'dayjs';
import * as Yup from 'yup';

export const createCartSchema = Yup.object().shape({
  body: Yup.object().shape({
    _id: Yup.string().max(0, 'no input value'),
    rooms: Yup.array(
      Yup.object().shape({
        roomTypeId: Yup.string().objectIdValid().required(),
        quantity: Yup.number().min(1).integer().required(),
      }),
    )
      .max(1)
      .required(),
    hotelId: Yup.string().objectIdValid().required(),
    createdAt: Yup.date().min(new Date()).notRequired(),
    startDate: Yup.date().min(dayjs(new Date()).format('YYYY-MM-DD')).required(),
    endDate: Yup.date()
      .test('compareStartDate', 'Not less or equal than start date', (endDate, context) =>
        endDate < context.parent.startDate ? false : true,
      )
      .required(),
  }),
});

export type CreateCartSchema = Yup.InferType<typeof createCartSchema>['body'];
