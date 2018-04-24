/**
 * dotenv config file. This gets run as early on as possible
 * in order for us to have access to our .env.
 *
 * In later development, it can be configured to have multiple
 * configs
 */
import * as dotenv from 'dotenv';

// Allows us to use process.env
dotenv.config();
