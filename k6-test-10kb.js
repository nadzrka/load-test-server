import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  scenarios: {
    ramp_test: {
      executor: 'ramping-vus',
      startVUs: 0,
      stages: [
        { duration: '10s', target: 900 },
        { duration: '10s', target: 1500 },
        { duration: '10s', target: 3000 },
        { duration: '10s', target: 5000 },
        { duration: '10s', target: 10000 },
      ],
    },
  },
  thresholds: {
    http_req_failed: ['rate<0.2'],         
    http_req_duration: ['p(95)<500'],      
  },
};

export default function () {
  const res = http.get('https://server-load-test.vercel.app/api/10kb');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
