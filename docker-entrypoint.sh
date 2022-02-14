#!/bin/bash
set -e

# could't install postgresql-client
# https://serverfault.com/a/819511
for count in {1..100}; do
    echo "Pinging database attempt "${count}
    if  $(nc -z ${DB_HOST} ${DB_PORT}) ; then
        echo "Can connect into database"
        break
    fi
    sleep 3
done

yarn typeorm migration:run

exec "$@"