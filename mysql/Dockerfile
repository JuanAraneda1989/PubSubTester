FROM mariadb

ENV MYSQL_DATABASE road_db
ENV MYSQL_ROOT_PASSWORD INDIporNitaT2021

ADD src/schema.sql /docker-entrypoint-initdb.d

EXPOSE 4005