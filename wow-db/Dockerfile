FROM amd64/mysql:5.7

ENV MYSQL_ROOT_PASSWORD "1234"

ADD ./init /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]