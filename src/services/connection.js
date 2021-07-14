import { DBHOST, DBUSER, DBPWD, DBNAME } from "@env";
import MySqlConnection from 'react-native-my-sql-connection';

const connect = async () => {
  console.log(DBHOST);
  console.log(DBUSER);
  console.log(DBPWD);
  console.log(DBNAME);

  const conn = await MySqlConnection.createConnection({
    host: DBHOST,
    user: DBUSER,
    password: DBPWD,
    database: DBNAME,
    port: 3306
  });
  return conn
}

const query = async () => {
  const connection = await connect();
  const response = connection.executeQuery("SELECT * FROM Cooker");
  console.log(response);
  connection.close();
};

export default query;
