import { Content, IContent } from 'db-models-nc';
import { CustomError } from '../../helpers';
import { HttpStatus } from '../../helpers/constants';

type IMatchUserContent = (_: {
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
  const content = await Content.findOne({ where: { id } });
  if (!content) throw new CustomError('No such a content', HttpStatus.NOT_FOUND);

  content.userId = userId;
  content.filmingCosts = filmingCosts;
  content.launchDate = launchDate;
  content.advance = advance;
  content.feePaid = feePaid;
  content.recoveredCosts = recoveredCosts;

  await content.save();
  return content;
};

export default matchUserContent;
