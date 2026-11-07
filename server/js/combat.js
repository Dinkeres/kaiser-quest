var Formulas = require("./formulas"),
    Combat = {};

module.exports = Combat;

Combat.ATTACK_COOLDOWN_MS = 1000;
Combat.ATTACK_RANGE = 1;

Combat.isInRange = function(attacker, target, range) {
    if(!attacker || !target) {
        return false;
    }
    return Math.max(Math.abs(attacker.x - target.x), Math.abs(attacker.y - target.y)) <= range;
};

Combat.canAttack = function(attacker, target, now) {
    return attacker && target && attacker.hitPoints > 0 && target.hitPoints > 0
        && attacker.target === target.id
        && Combat.isInRange(attacker, target, Combat.ATTACK_RANGE)
        && (!attacker.nextAttackAt || now >= attacker.nextAttackAt);
};

Combat.calculateDamage = function(attacker, target) {
    return Formulas.dmg(attacker.weaponLevel, target.armorLevel);
};

Combat.recordAttack = function(attacker, now) {
    attacker.nextAttackAt = now + Combat.ATTACK_COOLDOWN_MS;
};
