import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | transcript/id', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:transcript/id');
    assert.ok(route);
  });
});
