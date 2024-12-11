DROP DATABASE IF EXISTS hospital;

CREATE DATABASE hospital;
USE hospital;


CREATE TABLE medicos (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    especialidad VARCHAR(200),
    perfil VARCHAR(200),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE productos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;

INSERT INTO medicos (nombre, especialidad, perfil) 
VALUES 
  ('Juan', 'Atención primaria', 'ESPECIALISTA'),
  ('María', 'Dermatólogo', 'RESIDENTE'),
  ('Marta', 'Traumatólogo', 'RESIDENTE');

DROP TABLE IF EXISTS pacientes;
CREATE TABLE pacientes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    localidad VARCHAR(200),
    fecha_nacimiento DATE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ALTER TABLE productos ADD COLUMN imagen VARCHAR(200) AFTER descripcion;

INSERT INTO pacientes (nombre, localidad, fecha_nacimiento) 
VALUES 
  ('Luis', 'Córdoba', '1992-01-01');
  ('Pedro', 'Málaga', '1999-02-06');
  ('Celia', 'Montilla', '1990-05-01');
