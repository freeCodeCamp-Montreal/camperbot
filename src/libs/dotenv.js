/**
 * dotenv config file. This gets run as early on as possible
 * in order for us to have access to our .env.*
 *
 */
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { assert } from 'console';

// Uncomment to force env
// assert(!!process.env.NODE_ENV, 'Missing env variable NODE_ENV');

// Possible configs to look at
const configs = [
  `.env.${process.env.NODE_ENV}.local`,
  `.env.${process.env.NODE_ENV}`,
  `.env`,
];

configs.forEach(path => {
  if (fs.existsSync(path)) {
    // Allows us to use process.env using this config
    dotenv.config({ path });
  }
});
