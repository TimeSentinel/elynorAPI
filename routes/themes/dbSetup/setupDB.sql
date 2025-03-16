-- Themes module tables
-- Setup table
-- (c) 2025 Lance Stubblefield

CREATE SCHEMA themes;

CREATE TABLE IF NOT EXISTS themes.templates
(
    themeid uuid NOT NULL,
    themename character varying(100) COLLATE pg_catalog."default",
    themelabelbgcolor character varying(10) COLLATE pg_catalog."default",
    themelabeltxtcolor character varying(10) COLLATE pg_catalog."default",
    logourl character varying(255) COLLATE pg_catalog."default",
    faintcolor character varying(10) COLLATE pg_catalog."default",
    lightcolor character varying(10) COLLATE pg_catalog."default",
    softcolor character varying(10) COLLATE pg_catalog."default",
    mediumcolor character varying(10) COLLATE pg_catalog."default",
    darkcolor character varying(10) COLLATE pg_catalog."default",
    verydarkcolor character varying(10) COLLATE pg_catalog."default",
    brightcolor character varying(10) COLLATE pg_catalog."default",
    okcolor character varying(10) COLLATE pg_catalog."default",
    highlightcolor character varying(10) COLLATE pg_catalog."default",
    alertcolor character varying(10) COLLATE pg_catalog."default",
    lightshade character varying(10) COLLATE pg_catalog."default",
    mediumshade character varying(10) COLLATE pg_catalog."default",
    darkshade character varying(10) COLLATE pg_catalog."default",
    verydarkshade character varying(10) COLLATE pg_catalog."default",
    body character varying(255) COLLATE pg_catalog."default",
    h1 character varying(255) COLLATE pg_catalog."default",
    h2 character varying(255) COLLATE pg_catalog."default",
    h3 character varying(255) COLLATE pg_catalog."default",
    h4 character varying(255) COLLATE pg_catalog."default",
    h5 character varying(255) COLLATE pg_catalog."default",
    font character varying(255) COLLATE pg_catalog."default",
    fontsize character varying(255) COLLATE pg_catalog."default",
    button character varying(255) COLLATE pg_catalog."default",
    p character varying(255) COLLATE pg_catalog."default",
    sitetitle character varying(255) COLLATE pg_catalog."default",
    sitetagline character varying(255) COLLATE pg_catalog."default",
    heroimage character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT templates_pkey PRIMARY KEY (themeid),
    CONSTRAINT templates_themeid_key UNIQUE (themeid)
)
