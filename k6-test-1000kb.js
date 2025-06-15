import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    ramp_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 50 },
        { duration: '10s', target: 100 },
        { duration: '10s', target: 200 },
        { duration: '10s', target: 500 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.2'],      
    http_req_duration: ['p(95)<500'],      
  },
};

export default function () {
  const res = http.get('https://server-load-test.vercel.app/api/1000kb');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
