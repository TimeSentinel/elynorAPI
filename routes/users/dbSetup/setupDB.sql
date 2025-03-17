-- Themes module tables
-- Setup table
-- (c) 2025 Lance Stubblefield

CREATE SCHEMA IF NOT EXISTS accounts
    AUTHORIZATION admin;

-- Table: admin.users

-- DROP TABLE IF EXISTS admin.users;

CREATE TABLE IF NOT EXISTS accounts.users
(
    "userID" uuid NOT NULL,
    "userName" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "userPassword" character varying(100) COLLATE pg_catalog."default" NOT NULL,
    "userEmail" character varying(100) COLLATE pg_catalog."default" NOT NULL UNIQUE,
    "userPermissions" character varying(255)[] COLLATE pg_catalog."default",
    "userActive" numeric(1,0) DEFAULT 1,
    "userCreateDate" date NOT NULL DEFAULT CURRENT_DATE,
    CONSTRAINT "userID" PRIMARY KEY ("userID")
    )

    TABLESPACE pg_default;

ALTER TABLE IF EXISTS accounts.users
    OWNER to admin;
