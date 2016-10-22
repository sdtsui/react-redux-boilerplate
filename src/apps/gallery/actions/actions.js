// @flow
import { Map } from 'immutable';
import * as constants from '../constants';
/**
 * All actions must be exported with export const
 */

export const testReducer = (payload = 'ok!') => {
  return Map(
    {
      type: constants.TEST,
      payload,
    }
  );
};
