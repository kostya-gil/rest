import { getManager, getRepository } from 'typeorm';
import Section from '@entity/Section';

export const getSections = async () => {
  const manager = await getManager();
  const sections = await manager.getTreeRepository(Section).findTrees();
  return sections;
};

export const getSectionById = async (id: number) => {
  const sections = await getRepository(Section)
    .find({ select: ['id', 'name'], where: { id } });
  return sections[0];
};