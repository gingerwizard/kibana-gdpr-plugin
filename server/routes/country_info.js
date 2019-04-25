import { get } from 'lodash';
import axios from 'axios';
export default function (server) {

  server.route({
    path: '/api/kibana_gdpr_plugin/ip_info',
    method: 'GET',
    handler(req, reply) {
      const ip = get(req, 'query.ip');
      if (ip) {
        return axios.get('https://api.ip.sb/geoip/'+ip).then(function (response) {
          if (response.data.country){
            return({ country: response.data.country });
          } else {
            return ({ country: "Unknown" });
          }
          }).catch(function (error) {
            console.log("Unable to determine ip for "+ip)
            console.log(error)
            return({ country: "Unknown" });
          })
      }
      else
      {
        return({ country: "Unknown" });
      }
    }
  });

}
