import { Payments } from '../../database/models';
import { IPayments, FinancialInformation } from '../../interfaces';

type GetFinancialInformation = (id: number) => Promise<IPayments | null>
type PostFinancialInformation = (data: FinancialInformation) => string

export const getFinancialInformation: GetFinancialInformation = (id: number) => Payments.findOne({
  where: {
    userId: id,
  },
});

export const addFinancialInformation: PostFinancialInformation = (data: FinancialInformation) => {
  Payments.create(data);
  return 'success process';
};
