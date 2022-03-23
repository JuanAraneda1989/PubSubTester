const {PubSub} = require('@google-cloud/pubsub');

const pubSubClient = new PubSub();

const batchPublisher = pubSubClient.topic(process.env.TOPIC, {
    batching: {
    maxMessages: process.env.MAX_MESSAGES,
    maxMilliseconds: process.env.MAX_TIME_WAIT * 1000
    },
})

async function publishBatchedMessages() {
    const dataBufs = [];
    for(i=process.env.INF_RANGE;i<process.env.SUP_RANGE;i++){
        var data = {}
        data["id_equipo"] = process.env.ID_EQUIPO;
        data["id_trabajador"] = i;
        data["uuid"] = i;
        data["card_number"] = null;
        data["fecha_marcacion"] = "2022-03-21T15:30:30.653754-03:00";
        data["tiempo_presencia"] = 0;
        data["asistencia_io"] = 1;
        data["tipo_marcacion"] = 3;
        data["event_type"] = 0;
    
        const dataBuffer = Buffer.from(JSON.stringify(data));
        dataBufs.push(dataBuffer);    
    }

    const result = await Promise.all(
        dataBufs.map((dataBuf, idx) =>
            batchPublisher.publish(dataBuf).then((messageId) => {
                return messageId;
            })
        )
    );

    console.log(result.toString());
}

publishBatchedMessages().catch(console.error);