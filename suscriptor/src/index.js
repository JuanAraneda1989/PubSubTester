const {PubSub} = require('@google-cloud/pubsub');
const mysql = require('mysql');

const pubSubClient = new PubSub();
const subscription = pubSubClient.subscription(process.env.SUBSCRIPTION);

var conexion = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB
  });

function listenPubsub(){
    const messageHandler = message => {
        var data = JSON.parse(message.data);

        if(data.event_type == 0){
            var fecha = data.fecha_marcacion.substring(0,10);
            var hora = data.fecha_marcacion.substring(11,19);
            var record = [data.id_equipo,data.id_trabajador,fecha,hora,data.asistencia_io];
            sql = "INSERT INTO asistencia (id_device,id_employee,fecha,hora,flag) VALUES (?,?,?,?,?)";
            conexion.query(sql,record, function(err,result,fields) {
                if (err) {
                    console.log(err);
                } else {
                    message.ack();
                }
            });
        }
    };
    subscription.on('message', messageHandler);
}

listenPubsub();