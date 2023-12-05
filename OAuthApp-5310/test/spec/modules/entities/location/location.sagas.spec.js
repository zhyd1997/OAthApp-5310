import { put } from 'redux-saga/effects';

import FixtureAPI from '../../../../../app/shared/services/fixture-api';
import LocationSagas from '../../../../../app/modules/entities/location/location.sagas';
import LocationActions from '../../../../../app/modules/entities/location/location.reducer';

const { getLocation, getAllLocations, updateLocation, deleteLocation } = LocationSagas;
const stepper = (fn) => (mock) => fn.next(mock).value;

test('get success path', () => {
  const response = FixtureAPI.getLocation(1);
  const step = stepper(getLocation(FixtureAPI, { locationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LocationActions.locationSuccess(response.data)));
});

test('get failure path', () => {
  const response = { ok: false };
  const step = stepper(getLocation(FixtureAPI, { locationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LocationActions.locationFailure()));
});

test('getAll success path', () => {
  const response = FixtureAPI.getAllLocations();
  const step = stepper(getAllLocations(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LocationActions.locationAllSuccess([{ id: 1 }, { id: 2 }])));
});

test('getAll failure path', () => {
  const response = { ok: false };
  const step = stepper(getAllLocations(FixtureAPI, { options: { page: 0, sort: 'id,asc', size: 20 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LocationActions.locationAllFailure()));
});

test('update success path', () => {
  const response = FixtureAPI.updateLocation({ id: 1 });
  const step = stepper(updateLocation(FixtureAPI, { location: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LocationActions.locationUpdateSuccess(response.data)));
});

test('update failure path', () => {
  const response = { ok: false };
  const step = stepper(updateLocation(FixtureAPI, { location: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LocationActions.locationUpdateFailure()));
});

test('delete success path', () => {
  const response = FixtureAPI.deleteLocation({ id: 1 });
  const step = stepper(deleteLocation(FixtureAPI, { locationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Successful return and data!
  expect(step(response)).toEqual(put(LocationActions.locationDeleteSuccess(response.data)));
});

test('delete failure path', () => {
  const response = { ok: false };
  const step = stepper(deleteLocation(FixtureAPI, { locationId: { id: 1 } }));
  // Step 1: Hit the api
  step();
  // Step 2: Failed response.
  expect(step(response)).toEqual(put(LocationActions.locationDeleteFailure()));
});
