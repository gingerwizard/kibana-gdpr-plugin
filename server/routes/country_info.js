import { get } from 'lodash';
import axios from 'axios';
export default function (server) {

  server.route({
    path: '/api/kibana_gdpr_plugin/ip_info',
    method: 'GET',
    handler(req, reply) {
      const ip = get(req, 'query.ip');
      if (ip) {
        axios.get('https://www.elastic.co/ip-data', {
          params: {
            myip:ip
          }
        }).then(function (response) {
            if (response.data.country){
              reply({ country: response.data.country });
            } else {
              reply({ country: "Unknown" });
            }
          })
          .catch(function (error) {
            console.log("Unable to determine ip for "+ip)
            console.log(error)
          })
        } else {
          reply({ country: "Unknown" });
        }
    }
  });

}
