
Visit this link - https://codersee.com/how-to-set-up-apache-kafka-with-docker/

```bash
# run the zookeeper and kafka instances
❯ docker-compose down
# enter the kafka bash
❯ docker exec -it kafka bash
# create a topic you want
❯ docker exec kafka kafka-topics --bootstrap-server localhost:8098 --create --topic example
# produce to that topic
❯ docker exec --interactive --tty kafka kafka-console-producer --bootstrap-server localhost:8098 --topic example
# consume from that topic
❯ docker exec --interactive --tty kafka kafka-console-consumer --bootstrap-server localhost:8098 --topic example --from-beginning
```