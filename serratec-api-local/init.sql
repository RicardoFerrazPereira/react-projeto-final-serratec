-- Table: public.alunos

-- DROP TABLE IF EXISTS public.alunos;

CREATE TABLE IF NOT EXISTS public.alunos
(
    id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),
    nome character varying(200) COLLATE pg_catalog."C.UTF-8"
)