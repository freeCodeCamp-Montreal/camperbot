// Jest automatically has babel-jest installed :D
import '../src/libs/dotenv';
import { knex, pgp } from '../src/libs/postgres';
import { insertAccount } from '../src/queries';

let discordId;

beforeEach(async () => {
  [discordId] = await knex('accounts')
    .insert({
      discord_id: '143509445354323968',
      created_at: '2018-04-07',
    })
    .returning('discord_id');
});

afterEach(async () => {
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
    discordId: '153509445354323968',
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
