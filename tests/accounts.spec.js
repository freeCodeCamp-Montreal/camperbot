// Jest automatically has babel-jest installed :D
import '../src/libs/dotenv';
import { knex, pgp } from '../src/libs/postgres';

let id;

beforeEach(async () => {
  [id] = await knex('accounts')
    .insert({
      discord_id: '143509445354323968',
      created_at: '2018-04-07',
    })
    .returning('id');
});

afterEach(async () => {
  await knex('accounts')
    .delete()
    .where({ id });
});

afterAll(async () => {
  await pgp.end();
  await knex.destroy();
});

test('adds 1 + 2 to equal 3', () => {
  expect(1 + 2).toBe(3);
});
