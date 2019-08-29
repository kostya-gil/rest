import { getManager, getConnection, getRepository } from 'typeorm';

import { BodySection } from '../types';
import Section from '@entity/Section';
import { getSectionById } from './findSections';

export const createRootSection = async (body: BodySection) => {
  let { name } = body;
  name = name.trim();

  const manager = await getManager();

  const section = new Section();
  section.name = name;

  await manager.save(section);
  return section;
};

export const createSection = async (body: BodySection, id: string) => {
  let { name } = body;
  name = name.trim();
  
  const sectionParent = await getSectionById(Number(id));
  const manager = await getManager();

  const section = new Section();
  section.parent = sectionParent;
  section.name = name;

  await manager.save(section);
  return section;
};

export const editSection = async (body: BodySection, id: string) => {
  await getConnection()
    .createQueryBuilder()
    .update(Section)
    .set({
      name: body.name
    })
    .where('id = :id', { id: Number(id) })
    .execute();
};

export const deleteSection = async (id: string) => {
  //к сожалению, хоть и ОРМ дает возможности создавать таблицы для хранения древовидных структур с помощью описания всего 1 сущности, 
  // но удалять
  // или обновлять каким то особым способом она их еще не умеет, поэтому это нужно делать ручками, что несомненно портит впечатление.
  const myEntityRepository = getRepository(Section);
  const tableName = myEntityRepository.metadata.tableName;

  
  if (myEntityRepository.metadata.treeParentRelation) {
    const treeRelationFks = myEntityRepository.metadata.treeParentRelation.foreignKeys[0];
    const parentIdColumnName = treeRelationFks.columnNames[0];
    const parentIdFkName = treeRelationFks.name;

    const closureTableMetadata = myEntityRepository.metadata.closureJunctionTable;

    const closureTableName = closureTableMetadata.tableName;
    const closureAncestorColumnName = closureTableMetadata.foreignKeys[0].columnNames[0];
    const closureAncestorFkName = closureTableMetadata.foreignKeys[0].name;
    const closureDescendantColumnName = closureTableMetadata.foreignKeys[1].columnNames[0];
    const closureDescendantFkName = closureTableMetadata.foreignKeys[1].name;

    await getConnection().query(`
      ALTER TABLE ${tableName}
      DROP CONSTRAINT "${parentIdFkName}",
      ADD CONSTRAINT "${parentIdFkName}"
      FOREIGN KEY ("${parentIdColumnName}")
      REFERENCES ${tableName}(id)
      ON DELETE CASCADE;

      ALTER TABLE ${closureTableName}
      DROP CONSTRAINT "${closureAncestorFkName}",
      ADD CONSTRAINT "${closureAncestorFkName}"
      FOREIGN KEY ("${closureAncestorColumnName}")
      REFERENCES ${tableName}(id)
      ON DELETE CASCADE;

      ALTER TABLE ${closureTableName}
      DROP CONSTRAINT "${closureDescendantFkName}",
      ADD CONSTRAINT "${closureDescendantFkName}"
      FOREIGN KEY ("${closureDescendantColumnName}")
      REFERENCES ${tableName}(id)
      ON DELETE CASCADE;
    `);
  }

  const section = await getSectionById(Number(id));
  const manager = await getManager();
  await manager.remove(section);
};