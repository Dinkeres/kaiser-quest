var assert = require("assert"),
    Combat = require("../server/js/combat");

var attacker = { id: 1, x: 10, y: 10, target: 2, hitPoints: 100 },
    target = { id: 2, x: 11, y: 10, hitPoints: 100 };

assert.strictEqual(Combat.isInRange(attacker, target, 1), true);
assert.strictEqual(Combat.canAttack(attacker, target, 1000), true);
Combat.recordAttack(attacker, 1000);
assert.strictEqual(Combat.canAttack(attacker, target, 1500), false);
assert.strictEqual(Combat.canAttack(attacker, target, 2000), true);
target.x = 12;
assert.strictEqual(Combat.canAttack(attacker, target, 3000), false);
console.log("Combat validation verification passed");
