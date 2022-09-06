import {
  Content, IContent, ContentReport, Report, getDashboardSettings, User,
} from 'db-models-nc';
import {
  min, max, differenceInDays, addYears,
} from 'date-fns';
import Big from 'big.js';

import { EventEmitter } from 'node:events';
import { CustomError } from '../../helpers';
import { HttpStatus } from '../../helpers/constants';
import Logger from '../../helpers/logger';

let settings = getDashboardSettings();

const myEmitter = new EventEmitter();
myEmitter.on('update', () => {
  Logger.info('settings was updated');
  settings = getDashboardSettings();
});
type IMatchUserContent = (userData: {
  id: string,
  userId: number,
  filmingCosts: string,
  launchDate: string,
  advance: string,
  feePaid: string,
  recoveredCosts: string,
}) => Promise<IContent>

const matchUserContent: IMatchUserContent = async ({
  id,
  userId,
  filmingCosts,
  launchDate,
  advance,
  feePaid,
  recoveredCosts,
}) => {
  const content = await Content.findOne({
    where: { id },
    include: {
      model: ContentReport,
      as: 'contentReports',
      include: [{ model: Report, attributes: ['watchTimeFrom', 'watchTimeTo'] }, { model: User, attributes: ['totalRevenue', 'paidRevenue'] }],
    },
  });

  if (!content) throw new CustomError('No such a content', HttpStatus.NOT_FOUND);
  if (content.userId) throw new CustomError('Content is already matched with a user', HttpStatus.BAD_REQUEST);
  content.userId = userId;
  content.filmingCosts = filmingCosts;
  content.launchDate = launchDate;
  content.advance = advance;
  content.feePaid = feePaid;
  content.recoveredCosts = recoveredCosts;

  const { expiredAfterInYears, nextUpToOwedSplitPercentage } = await settings;

  const owedSplitPercentage = new Big(1).minus(nextUpToOwedSplitPercentage);
  const cReports = content?.contentReports?.map(({
    id,
    contentId,
    reportId,
    watchedSeconds,
    revenue,
    createdBy,
    updatedBy,
    tvodTicketsCount,
    tvodSeconds,
    watches,
    report,
  }) => {
    if (!report) throw new CustomError('Bad Request', HttpStatus.BAD_REQUEST);
    const toDate = new Date(report.watchTimeTo);
    const fromDate:Date = new Date(report.watchTimeFrom);
    const expDate = addYears(new Date(launchDate), expiredAfterInYears);
    const markPointDate = max([min([expDate, toDate]), fromDate]);
    const beforeExpiryReportDaysPercentage = new Big(1)
      .times(differenceInDays(markPointDate, fromDate))
      .div(differenceInDays(toDate, fromDate));
    const beforeExpRevenue = beforeExpiryReportDaysPercentage.times(revenue);
    const afterExpRevenue:Big = new Big(revenue).minus(beforeExpRevenue);
    let nextupRevenue = afterExpRevenue.times(nextUpToOwedSplitPercentage);
    let owedRevenue = afterExpRevenue.times(owedSplitPercentage);
    const remainingCosts = new Big(filmingCosts)
      .plus(feePaid).plus(advance).minus(recoveredCosts);// >=0
    let splittableBeforeExpRevenue = beforeExpRevenue;
    if (remainingCosts.gt(0)) {
      splittableBeforeExpRevenue = splittableBeforeExpRevenue.minus(remainingCosts);
      if (splittableBeforeExpRevenue.lt(0)) {
        splittableBeforeExpRevenue = new Big(0);
      }
    }
    const reimbursementBeforeExpRevenue = beforeExpRevenue
      .minus(splittableBeforeExpRevenue);
    nextupRevenue = nextupRevenue
      .plus(splittableBeforeExpRevenue.times(nextUpToOwedSplitPercentage));
    owedRevenue = owedRevenue
      .plus(splittableBeforeExpRevenue.times(owedSplitPercentage));

    content.nextUpAccRevenue = nextupRevenue
      .plus(content.nextUpAccRevenue).toString();

    content.owedAccRevenue = owedRevenue
      .plus(content.owedAccRevenue).toString();
    content.recoveredCosts = reimbursementBeforeExpRevenue
      .plus(recoveredCosts).toString();

    return ({
      id,
      contentId,
      reportId,
      watchedSeconds,
      revenue,
      createdBy,
      updatedBy,
      tvodTicketsCount,
      tvodSeconds,
      watches,
      nextupRevenue: nextupRevenue.toString(),
      owedRevenue: owedRevenue.toString(),
      beforeExpiryReportDaysPercentage: beforeExpiryReportDaysPercentage.toString(),
      beforeExpRevenue: beforeExpRevenue.toString(),
      splittableBeforeExpRevenue: splittableBeforeExpRevenue.toString(),
      reimbursementBeforeExpRevenue: reimbursementBeforeExpRevenue.toString(),
      afterExpRevenue: afterExpRevenue.toString(),
    });
  });
  if (cReports) {
    await ContentReport.bulkCreate(cReports, {
      updateOnDuplicate: [
        'nextupRevenue',
        'owedRevenue',
        'beforeExpiryReportDaysPercentage',
        'beforeExpRevenue',
        'splittableBeforeExpRevenue',
        'reimbursementBeforeExpRevenue',
        'afterExpRevenue',
      ],
    });
  }
  await content.save();
  return content;
};

export default matchUserContent;
export { myEmitter };
