CREATE TABLE asistencia(
    id INT NOT NULL AUTO_INCREMENT,
    id_device INT NOT NULL,
    id_employee INT NOT NULL,
    fecha DATE,
    hora TIME,
    flag INT,
    PRIMARY KEY(id)
);