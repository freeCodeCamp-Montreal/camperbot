// Jest automatically has babel-jest installed :D
import uniqueId from 'lodash/uniqueId';
import '../src/libs/dotenv';
import { knex, pgp } from '../src/libs/postgres';
import { insertAccount } from '../src/queries';

let discordId;

beforeAll(async () => {
  [discordId] = await knex('accounts')
    .insert({
      discord_id: uniqueId(),
      created_at: '2018-04-07',
    })
    .returning('discord_id');
});

afterAll(async () => {
  await knex('accounts')
    .delete()
    .where({ discord_id: discordId });
});

afterAll(async () => {
  await pgp.end();
  await knex.destroy();
});

test('Successfully inserts an account', async () => {
  insertAccount({
    discordId: uniqueId(),
    callback: () => {
      done();
    },
  });
});

test('Fail to inserts an account with a duplicate discordId', async () => {
  insertAccount({
    discordId,
    callback: () => {},
    error: err => {
      expect(err.code).toBe('23505');
      done();
    },
  });
});
