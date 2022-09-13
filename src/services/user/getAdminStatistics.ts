import { literal, Op } from 'sequelize';
import {
  Content,
  User,
  Payout,
  Report,
} from 'db-models-nc';
import { USER_STATUS, statisticsInitialValues } from '../../helpers/constants';
import { IStatistics } from '../../interfaces';

type IGetAdminStatistics = ({ fromDate }: { fromDate: string }) => Promise<IStatistics>;

const getAdminStatistics: IGetAdminStatistics = async ({ fromDate }) => {
  const [contentsNumber, totalRevenue, payoutsNumber, users] = await Promise.all([
    Content.count({
      where: {
        createdAt: {
          [Op.gte]: fromDate,
        },
      },
    }),
    Report.sum('totalRevenue', {
      where: {
        createdAt: {
          [Op.gte]: fromDate,
        },
      },
    }),
    Payout.count({
      where: {
        createdAt: {
          [Op.gte]: fromDate,
        },
      },
    }),
    User.findAll({
      where: {
        createdAt: {
          [Op.gte]: fromDate,
        },
      },
      attributes: [
        'userStatusId',
        [literal('SUM(paid_revenue)'), 'paidRevenue'],
        [literal('SUM(total_revenue)'), 'totalRevenue'],
        [literal('COUNT(paid_revenue)'), 'usersCount'],
      ],
      group: ['userStatusId'],
    }),
  ]);

  const statistics = users.reduce((
    acc,
    curUsers,
  ) => {
    const {
      userStatusId,
      paidRevenue,
      totalRevenue: userTotalRevenue,
    } = curUsers;
    const usersCount = curUsers.get('usersCount') as number;

    switch (userStatusId) {
      case USER_STATUS.PENDING:
        acc.counts.pendingUsers = +usersCount;
        acc.revenues.paid.pendingUsers = +paidRevenue;
        acc.revenues.total.pendingUsers = +userTotalRevenue;
        break;
      case USER_STATUS.APPROVED:
        acc.counts.approvedUsers = +usersCount;
        acc.revenues.paid.approvedUsers = +paidRevenue;
        acc.revenues.total.approvedUsers = +userTotalRevenue;
        break;
      case USER_STATUS.REJECTED:
        acc.counts.rejectedUsers = +usersCount;
        acc.revenues.paid.rejectedUsers = +paidRevenue;
        acc.revenues.total.rejectedUsers = +userTotalRevenue;
        break;
      case USER_STATUS.BANNED:
        acc.counts.bannedUsers = +usersCount;
        acc.revenues.paid.bannedUsers = +paidRevenue;
        acc.revenues.total.bannedUsers = +userTotalRevenue;
        break;
      default:
        break;
    }

    acc.counts.allUsers += +usersCount;
    acc.revenues.paid.allUsers += +paidRevenue;

    return acc;
  }, statisticsInitialValues);

  statistics.counts = {
    ...statistics.counts,
    contents: contentsNumber,
    payouts: payoutsNumber,
  };
  statistics.revenues.total.earnings = totalRevenue;

  return { ...statistics };
};

export default getAdminStatistics;
