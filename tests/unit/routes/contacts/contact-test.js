import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | contacts/contact', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:contacts/contact');
    assert.ok(route);
  });
});
