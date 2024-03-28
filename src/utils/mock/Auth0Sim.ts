// import { main } from 'effection';
// import { createSimulationServer, Server } from '@simulacrum/server';
// import { auth0 } from '@simulacrum/auth0-simulator';
// import { createClient } from '@simulacrum/client';
//
// const port = Number(process.env.PORT) ?? 4500; // port for the main simulation service
//
// // effection is a structured concurrency library and this will help us handle errors and shutting down the server gracefully
// main(function * () {
//   const server: Server = yield createSimulationServer({
//     seed: 1,
//     port,
//     simulators: { auth0 }
//   });
//
//   const url = `http://localhost:${server.address.port}`;
//
//   console.log(`simulation server running at ${url}`);
//
//   const client = createClient(url);
//
//   const simulation = yield client.createSimulation('auth0', {
//     options: {
//       audience: '[your audience]',
//       scope: '[your scope]',
//       clientID: '[your client-id]'
//     },
//     services: {
//       auth0: {
//         port: 4400 // port for the auth0 service itself
//       }
//     }
//   });
//
//   console.log(`auth0 service running at ${simulation.services[0].url}`);
//   const person = yield client.given(simulation, 'person');
//
//   console.log('store populated with user');
//   console.log(
//     `username = ${person.data.email} password = ${person.data.password}`
//   );
//
//   yield;
// });
