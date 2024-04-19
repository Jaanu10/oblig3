CREATE TABLE KinoBilletter
(
        id INTEGER AUTO_INCREMENT NOT NULL,
        film VARCHAR (100) NOT NULL,
        antall SMALLINT NOT NULL,
        fornavn VARCHAR (100) NOT NULL,
        etternavn VARCHAR (100) NOT NULL,
        telefonnr INTEGER NOT NULL,
        epost VARCHAR (100) NOT NULL,
        primary key (id)
);
