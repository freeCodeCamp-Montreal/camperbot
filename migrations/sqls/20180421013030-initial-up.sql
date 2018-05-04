CREATE SCHEMA IF NOT EXISTS public;

CREATE TABLE accounts(
  id SERIAL PRIMARY KEY,
  email VARCHAR(75),
	discord_id BIGINT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  marshmallows INTEGER DEFAULT 0,
  camper BOOLEAN DEFAULT false
);

CREATE TABLE techs(
  id SERIAL PRIMARY KEY,
	name VARCHAR(50) UNIQUE NOT NULL
);

-- Techs that the user knows
-- Might want to add mastery
CREATE TABLE accounts_techs(
	account INTEGER REFERENCES accounts(id) ON DELETE CASCADE NOT NULL,
	tech INTEGER REFERENCES techs(id) ON DELETE CASCADE NOT NULL,
	PRIMARY KEY (account, tech)
);
