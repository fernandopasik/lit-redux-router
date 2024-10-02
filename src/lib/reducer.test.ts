/* eslint-disable @typescript-eslint/naming-convention, no-undefined */
import { describe, expect, it } from '@jest/globals';
import deepFreeze from 'deep-freeze';
import reducer from './reducer.js';

describe('router reducer', () => {
  it('returns default state', () => {
    const initialState = deepFreeze({ activeRoute: '/about', routes: {} });

    expect(reducer(initialState)).toStrictEqual(initialState);
  });

  it('has a default initial state for active route', () => {
    expect(reducer()).toHaveProperty('activeRoute', '/');
  });

  it('has a default initial state for routes', () => {
    expect(reducer()).toHaveProperty('routes', {});
  });

  describe('add route', () => {
    it('can add a path', () => {
      const path = '/contact';
      const action = { path, type: 'ADD_ROUTE' };
      const newState = reducer(undefined, action);

      expect(newState.routes).toHaveProperty(path);
    });

    it('when adding a path the route can be active', () => {
      const path = '/contact';
      const action = { path, type: 'ADD_ROUTE' };
      const initialState = deepFreeze({ activeRoute: path, routes: {} });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', true);
    });
  });

  describe('set active route', () => {
    it('can set another route', () => {
      const path = '/contact';
      const action = { path, type: 'SET_ACTIVE_ROUTE' };
      const newState = reducer(undefined, action);

      expect(newState).toHaveProperty('activeRoute', path);
    });

    it('checks for active path', () => {
      const path = '/contact';
      const routes = {
        '/about': { active: false, params: {} },
        '/contact': { active: false, params: {} },
        '/home': { active: false, params: {} },
      };
      const action = { path, type: 'SET_ACTIVE_ROUTE' };
      const initialState = deepFreeze({ activeRoute: '/', routes });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', true);
    });

    it('checks for active parameters', () => {
      const activePath = '/products/shirt';
      const path = '/products/:id';
      const routes = {
        '/about': { active: false, params: {} },
        '/products/:id': { active: false, params: {} },
      };
      const action = { path: activePath, type: 'SET_ACTIVE_ROUTE' };
      const initialState = deepFreeze({ activeRoute: '/', routes });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', true);
      expect(newState.routes[path]).toHaveProperty('params', { id: 'shirt' });
    });

    it('parameters can be empty', () => {
      const activePath = '/about';
      const path = '/products/:id';
      const routes = {
        '/about': { active: false, params: {} },
        '/products/:id': { active: false, params: {} },
      };
      const action = { path: activePath, type: 'SET_ACTIVE_ROUTE' };
      const initialState = deepFreeze({ activeRoute: '/', routes });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', false);
      expect(newState.routes[path]).toHaveProperty('params', {});
    });
  });

  describe('navigate to route', () => {
    it('can set another route', () => {
      const path = '/contact';
      const action = { path, type: 'NAVIGATE' };
      const newState = reducer(undefined, action);

      expect(newState).toHaveProperty('activeRoute', path);
    });

    it('checks for active path', () => {
      const path = '/contact';
      const routes = {
        '/about': { active: false, params: {} },
        '/contact': { active: false, params: {} },
        '/home': { active: false, params: {} },
      };
      const action = { path, type: 'NAVIGATE' };
      const initialState = deepFreeze({ activeRoute: '/', routes });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', true);
    });

    it('checks for active parameters', () => {
      const activePath = '/products/shirt';
      const path = '/products/:id';
      const routes = {
        '/about': { active: false, params: {} },
        '/products/:id': { active: false, params: {} },
      };
      const action = { path: activePath, type: 'NAVIGATE' };
      const initialState = deepFreeze({ activeRoute: '/', routes });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', true);
      expect(newState.routes[path]).toHaveProperty('params', { id: 'shirt' });
    });

    it('parameters can be empty', () => {
      const activePath = '/about';
      const path = '/products/:id';
      const routes = {
        '/about': { active: false, params: {} },
        '/products/:id': { active: false, params: {} },
      };
      const action = { path: activePath, type: 'NAVIGATE' };
      const initialState = deepFreeze({ activeRoute: '/', routes });
      const newState = reducer(initialState, action);

      expect(newState.routes[path]).toHaveProperty('active', false);
      expect(newState.routes[path]).toHaveProperty('params', {});
    });
  });
});
