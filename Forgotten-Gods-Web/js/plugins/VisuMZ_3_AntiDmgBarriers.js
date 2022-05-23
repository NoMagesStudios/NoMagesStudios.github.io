//=============================================================================
// VisuStella MZ - Anti-Damage Barriers
// VisuMZ_3_AntiDmgBarriers.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_AntiDmgBarriers = true;

var VisuMZ = VisuMZ || {};
VisuMZ.AntiDmgBarriers = VisuMZ.AntiDmgBarriers || {};
VisuMZ.AntiDmgBarriers.version = 1.04;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.04] [AntiDmgBarriers]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Anti-Damage_Barriers_VisuStella_MZ
 * @base VisuMZ_0_CoreEngine
 * @base VisuMZ_1_BattleCore
 * @base VisuMZ_1_SkillsStatesCore
 * @base VisuMZ_1_ElementStatusCore
 * @orderAfter VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_SkillsStatesCore
 * @orderAfter VisuMZ_1_ElementStatusCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ does not have many options for damage mitigation. There are
 * only raw defensive parameters, elemental rates, and direct damage modifiers.
 * This plugin introduces six categories of Anti-Damage Barriers made in the
 * form of states to allow you to create more ways for the player's party to
 * defend themselves with.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Cancellation Barriers that can block out damage entirely if the damage is
 *   above or below a certain threshold.
 * * Nullification Barriers that block out damage entirely, but have a limited
 *   amount of times they can block damage for.
 * * Reduction Barriers that can stack additively with one another to provide
 *   percentile reduction values.
 * * Absorption Barriers which contain an exact number of points of damage that
 *   they can soak up.
 * * MP Barriers that disperses a percentage of the damage towards a battler's
 *   MP pool as long as they have enough MP.
 * * TP Barriers that function similarly to MP Barriers except they disperse
 *   the damage dealt instead to the TP pool.
 * * The ability to set barriers to block specific types of damage ranging from
 *   all, certain hits, physical hits, magical hits, and even elemental hits.
 * * Skill and trait effects that can bypass barriers.
 * * Make certain barrier types fragile and will break upon receiving specific
 *   types of damage (elemental, physical, magical, etc).
 * * Nullification and Absorption Barriers can regenerate themselves and/or
 *   decay over time.
 * * Playing specific animations whenever barriers tank a hit or break.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Required Plugin List ------
 *
 * * VisuMZ_0_CoreEngine
 * * VisuMZ_1_BattleCore
 * * VisuMZ_1_SkillsStatesCore
 * * VisuMZ_1_ElementStatusCore
 *
 * This plugin requires the above listed plugins to be installed inside your
 * game's Plugin Manager list in order to work. You cannot start your game with
 * this plugin enabled without the listed plugins.
 *
 * ------ Tier 3 ------
 *
 * This plugin is a Tier 3 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * How Barriers Work
 * ============================================================================
 *
 * When an action successfully hits an actor, damage is calculated. Barriers do
 * not block damage that comes directly from event commands, plugin commands,
 * script calls, percentile HP action effects, or damage over time states.
 * 
 * Instead, they must come directly from a damage formula source. Before that
 * damage is applied to a battler, the following series of events happen:
 *
 * ---
 * 
 * === HP Damage Check ===
 * 
 * Check to see if the action is dealing HP damage. This does not apply for MP
 * or TP damage. If no HP damage is being dealt, ignore the rest.
 * 
 * ---
 * 
 * === State Breakers ===
 * 
 * Some states can have the unique trait of dispersing upon receiving specific
 * kinds of damage using the notetags from this plugin. These range from
 * breaking under any kind of damage, certain hit damage, physical damage,
 * magical magical, and elemental damage. If the damage to be dealt is
 * affiliated with any of the listed and the state is vulnerable to that kind
 * of damage, immediately destroy the state before the damage calculations are
 * made. This will affect any of the states remaining.
 * 
 * ---
 * 
 * === Barrier Ignore ===
 * 
 * Check if the action itself (skill or item), if the attacking battler, or if
 * the defending battler has any notetags that would cause them to ignore any
 * barrier effects. If there are, ignore the rest.
 * 
 * ---
 * 
 * === Cancellation Barriers ===
 * 
 * Check for any Cancellation Barriers. Cancellation Barriers come in two
 * different types: Over and Under. The value listed for a Cancel Over Barrier
 * will cancel damage equal to or over a specific amount. The reverse is true
 * for a Cancel Under Barrier as it will cancel damage equal to or under a
 * specific amount. If damage is blocked here, it is blocked entirely and the
 * rest of the steps do not need any calculations made.
 * 
 * ---
 * 
 * === Nullification Barriers ===
 * 
 * Next, check for any Nullification Barriers. These Barriers have a charge to
 * them displayed separate from their turn count. Any matching damage dealt
 * while a Nullification Barrier is active will be reduced entirely to 0 at the
 * cost of one of the Nullification Barrier's charges. If the Nullification
 * Barrier's charges reach 0, that state is automatically removed. If damage
 * is blocked here, it is blocked entirely and the rest of the steps do not 
 * need any calculations made.
 * 
 * If a battler has multiple Nullification Barriers, then charges will be
 * removed from Nullification Barriers with the least amount of turns remaining
 * to the ones with the most amount of turns remaining (or indefinite). If two
 * Nullification Barriers have an equal amount of turns remaining, then the
 * charge will be deducted from the one with the higher priority. If both
 * priorities are the same, then the charge will be deducted will be the one
 * with a lower database ID.
 * 
 * Renewing a Nullification Barrier's state will recalculate its charge count.
 * 
 * ---
 * 
 * === Battle Core's Pre-Damage Step ===
 * 
 * Here, the Battle Core's Pre-Damage Step takes effect. This means any of the
 * <JS Pre-Damage> and related notetags will take effect and any damage
 * modifications made from them will be carried forward.
 * 
 * ---
 * 
 * === Reduction Barriers ===
 * 
 * After applying the Battle Core's Pre-Damage Step, the Reduction Barriers
 * will have their turn. Reduction Barriers can stack with each other and they
 * stack additively. This means if you have a Reduction Barrier state worth
 * 10% and another one that is worth 20% on the same battler, then a total of
 * 30% damage will be reduced. If damage reaches zero, skip the remaining
 * Barrier calculations.
 * 
 * ---
 * 
 * === Absorption Barriers ===
 * 
 * Absorption Barrier states have a set value that they can absorb. This value
 * can be a static number or it can be calculated by a formula. The barrier
 * value an Absorption Barrier has will trade damage 1 for 1. Once the
 * Absorption Barrier reaches 0, it will automatically remove itself. If damage
 * reaches zero, skip the remaining Barrier calculations.
 * 
 * If there is 500 incoming damage and an Absorption Barrier of 100 is present,
 * then 400 damage will go through and the Absorption Barrier is reduced to 0,
 * thus removing itself.
 * 
 * If there is 100 incoming damage and an Absorption Barrier of 500 is present,
 * then 0 damage will go through and the Absorption Barrier is reduced to 400.
 * The Absorption Barrier will remain.
 * 
 * If a battler has multiple Absorption Barriers, then barriers will be removed
 * from Absorption Barriers with the least amount of turns remaining to the
 * ones with the most amount of turns remaining (or indefinite). If two
 * Absorption Barriers have an equal amount of turns remaining, then the
 * barriers deducted from the one with the higher priority. If both priorities
 * are the same, then the barrier deducted from will be the one with a lower
 * database ID.
 * 
 * Renewing an Absorption Barrier's state will recalculate its barrier count.
 * 
 * ---
 * 
 * === MP-Dispersion Barriers ===
 * 
 * If any MP-Dispersion Barriers are present, then it's time for them to take
 * effect. MP Barriers can block a percentage of the damage using MP, trading
 * off 1 for 1. If an MP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to MP (or less if there's insufficient MP). If a battler
 * runs out of MP after this step, the MP-Dispersion Barrier will automatically
 * remove itself. If damage reaches zero, skip the remaining Barrier
 * calculations.
 * 
 * ---
 * 
 * === TP-Dispersion Barriers ===
 * 
 * If any TP-Dispersion Barriers are present, then it's time for them to take
 * effect. TP Barriers can block a percentage of the damage using TP, trading
 * off 1 for 1. If a TP Barrier has a value of 20%, then 20% of the damage
 * will be redirected to TP (or less if there's insufficient TP). If a battler
 * runs out of TP after this step, the TP-Dispersion Barrier will automatically
 * remove itself.
 * 
 * Some battlers might gain TP upon being hit. This gained TP does not apply
 * to the TP-Dispersion Barrier as it is generated after being hit.
 * 
 * ---
 * 
 * === Final Damage ===
 * 
 * After a long, long journey, any remaining damage will be dealt to the target
 * battler (unless there's other plugins affecting damage further).
 * 
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 *
 * ---
 * 
 * === Cancellation Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Barrier Cancel Damage Over: x>
 * <hitType Barrier Cancel Damage Over: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or over a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Over: 1000>
 *   <Physical Barrier Cancel Damage Over: 500>
 *   <Magical Barrier Cancel Damage Over: user.def + target.mdf>
 *   <Element Fire Cancel Damage Over: Math.randomInt(300)>
 *   <Element Wind, Ice Barrier Cancel Damage Over: $gameVariables.value(42)>
 *
 * ---
 *
 * <hitType Barrier Cancel Damage Under: x>
 * <hitType Barrier Cancel Damage Under: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a Cancellation Barrier that blocks all damage equal
 *   to or under a specific amount determined by a formula.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the damage threshold that
 *   will be blocked by this barrier type.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's threshold.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Barrier Cancel Damage Under: 100>
 *   <Physical Barrier Cancel Damage Under: 200>
 *   <Magical Barrier Cancel Damage Under: user.def + target.mdf>
 *   <Element Fire Barrier Cancel Damage Under: Math.randomInt(500)>
 *   <Element Wind, Ice Barrier Cancel Damage Under: $gameVariables.value(42)>
 *
 * ---
 * 
 * === Nullification Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Nullify Barrier: x>
 * <hitType Nullify Barrier: formula>
 *
 * - Used for: State Notetags
 * - Nullification Barriers block all damage at the cost of one charge.
 * - If a Nullification Barrier runs out of charges, it will automatically
 *   remove itself from the battler.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the number of charges the
 *   Nullification Barrier will have.
 * - Replace 'formula' with a calculation that determines how much damage will
 *   be the barrier's charges.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Absorption Barrier effect and
 *   both cannot be placed on the same state. They can, however, be placed on
 *   two separate states.
 * 
 *   Examples:
 * 
 *   <All Nullify Barrier: 3>
 *   <Physical Nullify Barrier: 5>
 *   <Magical Nullify Barrier: user.level + target.level>
 *   <Element Fire Nullify Barrier: Math.randomInt(10)>
 *   <Element Wind, Ice Nullify Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Nullify Barrier Degen: x>
 * <Nullify Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will decay by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Degen: 1>
 *   <Nullify Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Nullify Barrier Regen: x>
 * <Nullify Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the charges for the Nullification Barrier to raise by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how many charges it
 *   will regen by.
 *   - 'target' will be the battler the Nullification Barrier is on.
 * 
 *   Examples:
 *
 *   <Nullify Barrier Regen: 1>
 *   <Nullify Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === Reduction Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Reduce Barrier: x%>
 * <hitType Reduce Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into a Reduction Barrier. Reduction Barriers reduce
 *   incoming damage by a percentile.
 * - If a battler has multiple Reduction Barriers, they stack additively.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage it
 *   will reduce by.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be reduced by.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All Reduce Barrier: 20%>
 *   <Physical Reduce Barrier: 40%>
 *   <Magical Reduce Barrier: user.hpRate()>
 *   <Element Fire Reduce Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice Reduce Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Absorption Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType Absorb Barrier: x>
 * <hitType Absorb Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns the state into an Absorption Barrier which contains a visible
 *   barrier that will block damage 1 for 1.
 * - If the Absorption Barrier's value is reduced to 0, it will automatically
 *   remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a number value to determine the barrier value the
 *   Absorption Barrier state has upon being applied.
 * - Replace 'formula' with a calculation that determines what barrier value
 *   Absorption Barrier state has upon being applied.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * - Note! This effect is incompatible with the Nullification Barrier effect
 *   and both cannot be placed on the same state. They can, however, be placed
 *   on two separate states.
 * 
 *   Examples:
 * 
 *   <All Absorb Barrier: 300>
 *   <Physical Absorb Barrier: 500>
 *   <Magical Absorb Barrier: user.def + target.mdf>
 *   <Element Fire Absorb Barrier: Math.randomInt(1000)>
 *   <Element Wind, Ice Absorb Barrier: $gameVariables.value(42)>
 *
 * ---
 *
 * <Absorb Barrier Degen: x>
 * <Absorb Barrier Degen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to decay by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to decay by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will decay by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Degen: 1>
 *   <Absorb Barrier Degen: Math.randomInt(3)>
 *
 * ---
 *
 * <Absorb Barrier Regen: x>
 * <Absorb Barrier Regen: formula>
 *
 * - Used for: State Notetags
 * - This will cause the barrier for the Absorption Barrier to regen by a
 *   certain amount each regeneration phase.
 * - Replace 'x' with a static number for it to regen by.
 * - Replace 'formula' with a calculation that determines how much barrier it
 *   will regen by.
 *   - 'target' will be the battler the Absorption Barrier is on.
 * 
 *   Examples:
 *
 *   <Absorb Barrier Regen: 1>
 *   <Absorb Barrier Regen: Math.randomInt(3)>
 *
 * ---
 * 
 * === MP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType MP Barrier: x%>
 * <hitType MP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into an MP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's MP pool.
 * - Damage will be dispersed 1 for 1 with MP. If there is insufficient MP,
 *   the damage dispersion percentile will be reduced to account for MP.
 * - If MP reaches 0, the state will automatically remove itself.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's MP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the MP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All MP Barrier: 20%>
 *   <Physical MP Barrier: 40%>
 *   <Magical MP Barrier: user.hpRate()>
 *   <Element Fire MP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice MP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === TP Barrier-Related Notetags ===
 * 
 * ---
 *
 * <hitType TP Barrier: x%>
 * <hitType TP Barrier: formula>
 *
 * - Used for: State Notetags
 * - Turns this state into a TP-Dispersion Barrier state where a portion of
 *   the incoming damage can be dispersed into the affected battler's TP pool.
 * - Damage will be dispersed 1 for 1 with TP. If there is insufficient TP,
 *   the damage dispersion percentile will be reduced to account for TP.
 * - If TP reaches 0, the state will automatically remove itself.
 * - TP can be generated upon being hit. This gained TP does not apply to the
 *   TP-Dispersion Barrier as it is generated after being hit.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - Replace 'x' with a percentile number indicating the amount of damage that
 *   is dispersed into the battler's TP pool.
 * - Replace 'formula' with a calculation that determines the percentage of
 *   damage that will be dispersed into the TP pool.
 *   - 'user' will refer to the current attacking user. If none is present,
 *     then refer to the target.
 *   - 'target' will be the battler receiving the damage.
 * 
 *   Examples:
 * 
 *   <All TP Barrier: 20%>
 *   <Physical TP Barrier: 40%>
 *   <Magical TP Barrier: user.hpRate()>
 *   <Element Fire TP Barrier: Math.random() * 0.50>
 *   <Element Wind, Ice TP Barrier: $gameVariables.value(42) * 0.01>
 *
 * ---
 * 
 * === Barrier Bypass-Related Notetags ===
 * 
 * ---
 *
 * <Ignore Barriers>
 *
 * - Used for: Skill, Item Notetags
 * - Causes this skill or item to completely ignore any barriers on the target.
 *
 * ---
 *
 * <Ignore Barriers as User>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If an attacker with this notetag on any of its trait objects attacks a
 *   target with barriers, ignore the target's barriers.
 *
 * ---
 *
 * <Ignore Barriers as Target>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - If a target battler has this notetag on any of its trait objects receives
 *   an attack, any barriers on the target battler will be ignored.
 *
 * ---
 * 
 * === Break State-Related Notetags ===
 * 
 * ---
 *
 * <hitType Breaks State>
 *
 * - Used for: State Notetags
 * - If an attack hits a battler with this state and state's notetag, as long
 *   as the damage type matches, automatically remove the state.
 * - Replace 'hitType' with any of the following:
 *   - 'All' for all damage types.
 *   - 'Certain Hit' for certain hit damage only.
 *   - 'Physical' for physical damage only.
 *   - 'Magical' for magical damage only.
 *   - 'Element id' for elemental damage that matches the element's 'id'.
 *   - 'Element name' for elemental damage that matches the element's name.
 *   - Insert multiple element id's or names with commas separating them.
 * - This can be used for states that aren't barriers.
 * - This occurs before most of the pre-damage phase.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Absorption Barriers
 * ============================================================================
 *
 * Settings for the Absorption Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much barrier was lost.
 *   - %1 - Barrier
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Cancellation Barriers
 * ============================================================================
 *
 * Settings for the Cancellation Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: MP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the MP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Nullification Barriers
 * ============================================================================
 *
 * Settings for the Nullificaton Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reduction Barriers
 * ============================================================================
 *
 * Settings for the Reduction Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: TP-Dispersion Barriers
 * ============================================================================
 *
 * Settings for the TP-Dispersion Barrier state type.
 *
 * ---
 *
 * Intact Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier is still intact.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Break Animation
 * 
 *   Animation ID:
 *   - Play this animation if the barrier has broken.
 * 
 *   Mirror Animation:
 *   - Mirror the effect animation?
 * 
 *     Enemy Flip?:
 *     - Flip the animation for enemies?
 * 
 *   Mute Animation:
 *   - Mute the effect animation?
 *
 * ---
 *
 * Popups
 * 
 *   Text:
 *   - Text popup stating how much TP was lost.
 *   - %1 - TP Lost, %2 - TP Text
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 * 
 * 7. If this VisuStella MZ plugin is a paid product, all project team members
 * must purchase their own individual copies of the paid product if they are to
 * use it. Usage includes working on related game mechanics, managing related
 * code, and/or using related Plugin Commands and features. Redistribution of
 * the plugin and/or its code to other members of the team is NOT allowed
 * unless they own the plugin itself as that conflicts with Article 4.
 * 
 * 8. Any extensions and/or addendums made to this plugin's Terms of Use can be
 * found on VisuStella.com and must be followed.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.04: July 2, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.03: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu:
 * *** Plugin Parameters > Absorption Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Absorption Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Cancellation Settings > Break > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > MP-Dispersion Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Nullification Settings > Break > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > Reduction Settings > Break > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Intact > Enemy Flip?
 * *** Plugin Parameters > TP-Dispersion Settings > Break > Enemy Flip?
 * **** Flip the animation for enemies?
 * 
 * Version 1.02: December 11, 2020
 * * Compatibility Update!
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.01: November 15, 2020
 * * Optimization Update!
 * ** Plugin should run more optimized.
 *
 * Version 1.00: November 4, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PluginCommandFunctionName
 * @text Category: Function Name
 * @desc Plugin Command Description Text
 *
 * @arg Step1:arraynum
 * @text Step 1: Actor ID(s)
 * @type actor[]
 * @desc Select which Actor ID(s) to affect.
 * @default ["1"]
 *
 * @arg option:num
 * @text Option Text
 * @type number
 * @max 1
 * @desc Change the value to this number
 * @default 42069
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemEnableAntiDmgBarriersMenu
 * @text System: Enable AntiDmgBarriers in Menu?
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 *
 * @arg Enable:eval
 * @text Enable/Disable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enables/disables AntiDmgBarriers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemShowAntiDmgBarriersMenu
 * @text System: Show AntiDmgBarriers in Menu?
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
 *
 * @arg Show:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides AntiDmgBarriers menu inside the main menu.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AntiDmgBarriers
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Absorb:struct
 * @text Absorption Barriers
 * @type struct<Absorb>
 * @desc Settings for the Absorption Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"4","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"5","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1","TextColor:str":"27","FlashColor:eval":"[255, 0, 255, 160]","FlashDuration:num":"60"}
 *
 * @param Cancel:struct
 * @text Cancellation Barriers
 * @type struct<Cancel>
 * @desc Settings for the Cancellation Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"119","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"15","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param MP:struct
 * @text MP-Dispersion Barriers
 * @type struct<MP>
 * @desc Settings for the MP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"62","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"81","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Nullify:struct
 * @text Nullification Barriers
 * @type struct<Nullify>
 * @desc Settings for the Nullificaton Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"58","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"11","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param Reduce:struct
 * @text Reduction Barriers
 * @type struct<Reduce>
 * @desc Settings for the Reduction Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"53","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"14","BreakMirror:eval":"false","BreakMute:eval":"false"}
 *
 * @param TP:struct
 * @text TP-Dispersion Barriers
 * @type struct<TP>
 * @desc Settings for the TP-Dispersion Barrier state type.
 * @default {"IntactAnimation":"","IntactAnimationID:num":"91","IntactMirror:eval":"false","IntactMute:eval":"false","BreakAnimation":"","BreakAnimationID:num":"45","BreakMirror:eval":"false","BreakMute:eval":"false","Popups":"","PopupText:str":"-%1 %2","TextColor:str":"29","FlashColor:eval":"[0, 255, 0, 160]","FlashDuration:num":"60"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Absorption Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Absorb:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 4
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 5
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much barrier was lost.
 * %1 - Barrier
 * @default -%1
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 255, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
/* ----------------------------------------------------------------------------
 * Cancellation Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cancel:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 119
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 15
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * MP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 62
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 61
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Nullify Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Nullify:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 58
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 11
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Reduction Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Reduce:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 53
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 14
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * TP Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~TP:
 *
 * @param IntactAnimation
 * @text Intact Animation
 *
 * @param IntactAnimationID:num
 * @text Animation ID
 * @parent IntactAnimation
 * @type animation
 * @desc Play this animation if the barrier is still intact.
 * @default 91
 *
 * @param IntactMirror:eval
 * @text Mirror Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param IntactEnemyFlip:eval
 * @text Enemy Flip?
 * @parent IntactMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param IntactMute:eval
 * @text Mute Animation
 * @parent IntactAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param BreakAnimation
 * @text Break Animation
 *
 * @param BreakAnimationID:num
 * @text Animation ID
 * @parent BreakAnimation
 * @type animation
 * @desc Play this animation if the barrier has broken.
 * @default 45
 *
 * @param BreakMirror:eval
 * @text Mirror Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the effect animation?
 * @default false
 *
 * @param BreakEnemyFlip:eval
 * @text Enemy Flip?
 * @parent BreakMirror:eval
 * @type boolean
 * @on Flip for Enemies?
 * @off No Flip
 * @desc Flip the animation for enemies?
 * @default false
 *
 * @param BreakMute:eval
 * @text Mute Animation
 * @parent BreakAnimation
 * @type boolean
 * @on Mute
 * @off Normal
 * @desc Mute the effect animation?
 * @default false
 *
 * @param Popups
 *
 * @param PopupText:str
 * @text Text
 * @parent Popups
 * @desc Text popup stating how much TP was lost.
 * %1 - TP Lost, %2 - TP Text
 * @default -%1 %2
 *
 * @param TextColor:str
 * @text Text Color
 * @parent Popups
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [0, 255, 0, 160]
 * 
 * @param FlashDuration:num
 * @text Flash Duration
 * @parent Popups
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 */
//=============================================================================

const _0x2556=['removeState','2GoOgDi','applyNullificationBarrier','ARRAYNUM','BarrierRegen','user','DAMAGE','applyCancelOverBarrier','states','setAntiDamageBarrierTp','setupTextPopup','prototype','oVZEV','note','some','replace','KcSFr','jCNxz','addState','KqsAV','initAntiDamageBarriers','match','target','FlashDuration','IylBp','hasAntiDmgBarriersNotetag','htfAQ','NullBarrier','NUM','initAntiDamageBarrierDataForState','EVAL','AntiDmgBarriers','_antiDamageBarrierReduction','initMembers','onAntiDamageMpBarrier','skills','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','TextColor','isSceneBattle','tBaSZ','pWnbO','237446jmnRIC','setAntiDamageBarrierCancelOver','isAntiDamageBarrierIgnored','displayTpBarrierPopup','setStateDisplay','applyPreAntiDamageBarriers','Settings','FeuhF','_antiDamageBarrierTp','split','clamp','subject','applyTpBarrier','CXUOE','VisuMZ_0_CoreEngine','LsOPz','onAntiDamageBarrierEffect','clearJsTargets','%1Mirror','JixgE','Break','193469HRYfTM','BarrierDegen','zzuLK','11834PqiWqa','StateMatchesBreakEffect','gainMp','Reduce','BreakState','getAntiDamageBarrierTp','YgMSA','concat','Game_Action_applyBattleCoreJS','IUbWJ','isPhysical','getAntiDamageBarrierCancelOver','tezIo','applyPostAntiDamageBarriers','dRNBj','HSYUW','TJhQp','status','regenerateAntiDamageBarrierState','setAntiDamageBarrierReduction','applyAbsorptionBarrier','PopupText','_antiDamageBarrierMp','CancelUnder','isCertainHit','getAntiDamageBarrierMp','FUNC','isMagical','exit','onAntiDamageNullificationBarrier','utBWk','isAntiDamageBarrierIgnoredAsTarget','getElementIdWithName','ReduceBarrier','_antiDamageBarrierCancelOver','format','ybGyu','beJgi','SSkHc','PIftf','VWqJp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','min','1082733YTfohV','_antiDamageBarrierCancelUnder','AbsorbBarrier','RaArM','description','log','qLdLa','applyBreakStateEffects','STR','NFtbD','%1AnimationID','createJsTargets','Intact','SjJVJ','DzRSa','getStateDisplay','ARRAYJSON','onAntiDamageTpBarrier','Game_Battler_addState','IgnoreAllBarrier','call','priority','mdoae','MpBarrier','onAntiDamageReductionBarrier','eRAZR','CalculateCharges','setAntiDamageBarrierMp','YGzNs','Game_Battler_regenerateAll','getAntiDamageBarrierCancelUnder','regenerateAll','rIAxZ','toUpperCase','ouQDl','_subject','map','applyCancelUnderBarrier','isStateAffected','VisuMZ_1_ElementStatusCore','return\x200','item','35ztgnzY','PreDamage%1JS','431943EUCUZt','getAntiDamageBarrierStates','FlashColor','stateTurns','%1Mute','ARRAYFUNC','1114383TgdKom','JDoSu','getAntiDamageBarrierReduction','2LdGXsO','RegExp','matchesAntiDamageBarrier','matchesAntiDamageBarrierElementType','tjxNg','max','Absorb','matchesAntiDamageBarrierType','filter','isPlaytest','ARRAYEVAL','LOiMK','name','applyReductionBarrier','isAntiDamageBarrierIgnoredAsSubject','CancelOver','ceil','Cancel','applyBattleCoreJS','ConvertParams','traitObjects','mciJq','Auami','displayAbsorptionBarrierPopup','onAntiDamageAbsorptionBarrier','autoRemovalTiming','aXGmt','jJbhS','JSON','Rrckk','isHpEffect','1kJTsSF','gainTp','eiozV','setAntiDamageBarrierCancelUnder','cTdPo','Nullify','parse','MTBHe','nqXAT','version','regenerateAntiDamageBarriers','Game_BattlerBase_initMembers','sort','TpBarrier','elements','onAntiDamageCancelBarrier','412826bGtPCe','IgnoreAllBarrierAsAttacker','NVaQa','processBreakStateEffect','%1EnemyFlip','ARRAYSTR','TfdgC','yxaLg','includes'];const _0x2585e8=_0xb267;(function(_0x4aac6d,_0x18e5c0){const _0x31d0ad=_0xb267;while(!![]){try{const _0x564347=-parseInt(_0x31d0ad(0x10a))*parseInt(_0x31d0ad(0x88))+-parseInt(_0x31d0ad(0xe0))*-parseInt(_0x31d0ad(0x8b))+parseInt(_0x31d0ad(0xe2))+-parseInt(_0x31d0ad(0x14c))+-parseInt(_0x31d0ad(0x124))*parseInt(_0x31d0ad(0x11a))+-parseInt(_0x31d0ad(0xb6))+parseInt(_0x31d0ad(0xe8))*parseInt(_0x31d0ad(0xeb));if(_0x564347===_0x18e5c0)break;else _0x4aac6d['push'](_0x4aac6d['shift']());}catch(_0x23e372){_0x4aac6d['push'](_0x4aac6d['shift']());}}}(_0x2556,0xb396f));var label=_0x2585e8(0x142),tier=tier||0x0,dependencies=[_0x2585e8(0x81),'VisuMZ_1_BattleCore','VisuMZ_1_SkillsStatesCore',_0x2585e8(0xdd)],pluginData=$plugins[_0x2585e8(0xf3)](function(_0x3124c4){const _0x1948a9=_0x2585e8;return _0x3124c4[_0x1948a9(0x9c)]&&_0x3124c4[_0x1948a9(0xba)][_0x1948a9(0x122)]('['+label+']');})[0x0];function _0xb267(_0x2c9001,_0x30e32c){return _0xb267=function(_0x255623,_0xb267f9){_0x255623=_0x255623-0x80;let _0x456776=_0x2556[_0x255623];return _0x456776;},_0xb267(_0x2c9001,_0x30e32c);}VisuMZ[label][_0x2585e8(0x152)]=VisuMZ[label][_0x2585e8(0x152)]||{},VisuMZ[_0x2585e8(0xfe)]=function(_0x24fe16,_0x9877f3){const _0x337810=_0x2585e8;for(const _0x27453c in _0x9877f3){if('pDwzk'===_0x337810(0xa9))this[_0x337810(0x137)]();else{if(_0x27453c['match'](/(.*):(.*)/i)){const _0x581819=String(RegExp['$1']),_0xff7ae9=String(RegExp['$2'])[_0x337810(0xd7)]()['trim']();let _0x2f0b3d,_0x287cdb,_0x22c33f;switch(_0xff7ae9){case _0x337810(0x13f):_0x2f0b3d=_0x9877f3[_0x27453c]!==''?Number(_0x9877f3[_0x27453c]):0x0;break;case _0x337810(0x126):_0x287cdb=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):[],_0x2f0b3d=_0x287cdb[_0x337810(0xda)](_0x58fa08=>Number(_0x58fa08));break;case _0x337810(0x141):_0x2f0b3d=_0x9877f3[_0x27453c]!==''?eval(_0x9877f3[_0x27453c]):null;break;case _0x337810(0xf5):_0x287cdb=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):[],_0x2f0b3d=_0x287cdb[_0x337810(0xda)](_0x1efdcb=>eval(_0x1efdcb));break;case _0x337810(0x107):_0x2f0b3d=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):'';break;case _0x337810(0xc6):_0x287cdb=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):[],_0x2f0b3d=_0x287cdb[_0x337810(0xda)](_0x27acbc=>JSON[_0x337810(0x110)](_0x27acbc));break;case _0x337810(0xa5):_0x2f0b3d=_0x9877f3[_0x27453c]!==''?new Function(JSON[_0x337810(0x110)](_0x9877f3[_0x27453c])):new Function(_0x337810(0xde));break;case _0x337810(0xe7):_0x287cdb=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):[],_0x2f0b3d=_0x287cdb[_0x337810(0xda)](_0x1d23b7=>new Function(JSON[_0x337810(0x110)](_0x1d23b7)));break;case _0x337810(0xbe):_0x2f0b3d=_0x9877f3[_0x27453c]!==''?String(_0x9877f3[_0x27453c]):'';break;case _0x337810(0x11f):_0x287cdb=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):[],_0x2f0b3d=_0x287cdb[_0x337810(0xda)](_0x86531c=>String(_0x86531c));break;case'STRUCT':_0x22c33f=_0x9877f3[_0x27453c]!==''?JSON['parse'](_0x9877f3[_0x27453c]):{},_0x2f0b3d=VisuMZ[_0x337810(0xfe)]({},_0x22c33f);break;case'ARRAYSTRUCT':_0x287cdb=_0x9877f3[_0x27453c]!==''?JSON[_0x337810(0x110)](_0x9877f3[_0x27453c]):[],_0x2f0b3d=_0x287cdb[_0x337810(0xda)](_0x2581d1=>VisuMZ[_0x337810(0xfe)]({},JSON[_0x337810(0x110)](_0x2581d1)));break;default:continue;}_0x24fe16[_0x581819]=_0x2f0b3d;}}}return _0x24fe16;},(_0x2a2533=>{const _0x37a413=_0x2585e8,_0x2bacf8=_0x2a2533[_0x37a413(0xf7)];for(const _0xdace58 of dependencies){if(!Imported[_0xdace58]){alert(_0x37a413(0x147)[_0x37a413(0xae)](_0x2bacf8,_0xdace58)),SceneManager[_0x37a413(0xa7)]();break;}}const _0x2e0736=_0x2a2533[_0x37a413(0xba)];if(_0x2e0736[_0x37a413(0x138)](/\[Version[ ](.*?)\]/i)){if('DwlJg'!==_0x37a413(0xd8)){const _0x1094de=Number(RegExp['$1']);_0x1094de!==VisuMZ[label][_0x37a413(0x113)]&&(alert(_0x37a413(0xb4)[_0x37a413(0xae)](_0x2bacf8,_0x1094de)),SceneManager['exit']());}else this[_0x37a413(0x83)](_0x37a413(0xfc),![]);}if(_0x2e0736[_0x37a413(0x138)](/\[Tier[ ](\d+)\]/i)){const _0x103d15=Number(RegExp['$1']);_0x103d15<tier?(alert('%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.'['format'](_0x2bacf8,_0x103d15,tier)),SceneManager[_0x37a413(0xa7)]()):tier=Math[_0x37a413(0xf0)](_0x103d15,tier);}VisuMZ[_0x37a413(0xfe)](VisuMZ[label]['Settings'],_0x2a2533['parameters']);})(pluginData),VisuMZ[_0x2585e8(0x142)][_0x2585e8(0xec)]={'IgnoreAllBarrier':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS)>/gi,'IgnoreAllBarrierAsAttacker':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:ATTACKER|USER)>/gi,'IgnoreAllBarrierAsDefender':/<IGNORE (?:ALL BARRIER|ALL BARRIERS|BARRIER|BARRIERS) AS (?:TARGET|DEFENDER)>/gi,'CancelOver':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG OVER|DAMAGE OVER|OVER):[ ](.*)>/gi,'CancelUnder':/<(.*)[ ]BARRIER CANCEL[ ](?:DMG UNDER|DAMAGE UNDER|UNDER):[ ](.*)>/gi,'NullBarrier':/<(.*)[ ](?:NULLIFY|NULL|NULLIFICATION)[ ]BARRIER:[ ](.*)>/gi,'ReduceBarrier':/<(.*)[ ](?:CUT|REDUCE|REDUCTION)[ ]BARRIER:[ ](.*)>/gi,'AbsorbBarrier':/<(.*)[ ](?:ABSORB|ABSORPTION)[ ]BARRIER:[ ](.*)>/gi,'MpBarrier':/<(.*)[ ](?:MP|MAGIC|MANA)[ ]BARRIER:[ ](.*)>/gi,'TpBarrier':/<(.*)[ ](?:TP|TECH|LIMIT)[ ]BARRIER:[ ](.*)>/gi,'BreakState':/<(.*)[ ](?:BREAK|BREAKS)[ ]STATE>/gi,'BarrierDegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:DECAY|DEGEN):[ ](.*)>/gi,'BarrierRegen':/<(?:ABSORB|ABSORPTION|NULLIFY|NULL|NULLIFICATION)[ ]BARRIER[ ](?:REGENERATION|REGEN):[ ](.*)>/gi},DataManager[_0x2585e8(0x13c)]=function(_0x3077ad){const _0x52e276=_0x2585e8;if(!_0x3077ad)return![];const _0x41cf1e=VisuMZ[_0x52e276(0x142)][_0x52e276(0xec)],_0x11788d=_0x3077ad[_0x52e276(0x130)]||'';for(const _0x2a79ff in _0x41cf1e){if('DlRDu'==='ifjns')_0x168bc8=!_0x524d07;else{if(_0x11788d['match'](_0x41cf1e[_0x2a79ff]))return!![];}}return![];},VisuMZ['AntiDmgBarriers'][_0x2585e8(0x93)]=Game_Action[_0x2585e8(0x12e)][_0x2585e8(0xfd)],Game_Action[_0x2585e8(0x12e)][_0x2585e8(0xfd)]=function(_0x3790d4,_0x14a71a,_0x37ab77,_0x4115d9){const _0x5019c8=_0x2585e8,_0x5671e3=_0x3790d4===_0x5019c8(0xe1)&&this[_0x5019c8(0x109)]()&&_0x37ab77>0x0;return _0x5671e3&&(_0x5019c8(0x8a)===_0x5019c8(0x8a)?_0x14a71a[_0x5019c8(0xbd)](this):this[_0x5019c8(0x123)](_0x30ebd7)),_0x5671e3&&(_0x37ab77=this[_0x5019c8(0x151)](_0x14a71a,_0x37ab77)),_0x37ab77=VisuMZ[_0x5019c8(0x142)]['Game_Action_applyBattleCoreJS'][_0x5019c8(0xca)](this,_0x3790d4,_0x14a71a,_0x37ab77,_0x4115d9),_0x5671e3&&('htfAQ'===_0x5019c8(0x13d)?_0x37ab77=this[_0x5019c8(0x98)](_0x14a71a,_0x37ab77):this[_0x5019c8(0x83)](_0x5019c8(0xf1),![])),_0x37ab77;},Game_Action[_0x2585e8(0x12e)][_0x2585e8(0x151)]=function(_0x3550fa,_0x23ec5b){const _0x4e6c94=_0x2585e8;if(this[_0x4e6c94(0x14e)](_0x3550fa))return _0x23ec5b;if(this[_0x4e6c94(0x12a)](_0x3550fa,_0x23ec5b))return 0x0;if(this[_0x4e6c94(0xdb)](_0x3550fa,_0x23ec5b))return 0x0;if(this[_0x4e6c94(0x125)](_0x3550fa))return 0x0;return _0x23ec5b;},Game_Action[_0x2585e8(0x12e)][_0x2585e8(0x98)]=function(_0x2d3db4,_0x30f319){const _0x325733=_0x2585e8;if(this['isAntiDamageBarrierIgnored'](_0x2d3db4))return _0x30f319;if(_0x30f319<=0x0)return _0x30f319;return _0x30f319=this['applyReductionBarrier'](_0x2d3db4,_0x30f319),_0x30f319=this[_0x325733(0x9f)](_0x2d3db4,_0x30f319),_0x30f319=this['applyMpBarrier'](_0x2d3db4,_0x30f319),_0x30f319=this[_0x325733(0x158)](_0x2d3db4,_0x30f319),_0x30f319;},Game_Action[_0x2585e8(0x12e)][_0x2585e8(0x14e)]=function(_0x45e429){const _0xeb4a79=_0x2585e8;if(this[_0xeb4a79(0xdf)]()&&this[_0xeb4a79(0xdf)]()[_0xeb4a79(0x130)][_0xeb4a79(0x138)](VisuMZ[_0xeb4a79(0x142)]['RegExp']['IgnoreAllBarrier']))return!![];if(this[_0xeb4a79(0xf9)]())return!![];if(this[_0xeb4a79(0xaa)](_0x45e429))return _0xeb4a79(0xbf)===_0xeb4a79(0xbf)?!![]:!![];return![];},Game_Action['prototype']['isAntiDamageBarrierIgnoredAsSubject']=function(){const _0x277f70=_0x2585e8,_0x17cb22=this[_0x277f70(0x157)]()[_0x277f70(0xff)](),_0x3e7158=VisuMZ[_0x277f70(0x142)]['RegExp'][_0x277f70(0x11b)];return _0x17cb22[_0x277f70(0x131)](_0x204e00=>_0x204e00&&_0x204e00[_0x277f70(0x130)]&&_0x204e00['note'][_0x277f70(0x138)](_0x3e7158));},Game_Action['prototype'][_0x2585e8(0xaa)]=function(_0x2e0a0f){const _0x498d05=_0x2585e8,_0x568ece=_0x2e0a0f['traitObjects'](),_0x15d82c=VisuMZ[_0x498d05(0x142)][_0x498d05(0xec)]['IgnoreAllBarrierAsDefender'];return _0x568ece[_0x498d05(0x131)](_0x1ec31c=>_0x1ec31c&&_0x1ec31c[_0x498d05(0x130)]&&_0x1ec31c[_0x498d05(0x130)][_0x498d05(0x138)](_0x15d82c));},Game_Action[_0x2585e8(0x12e)][_0x2585e8(0x125)]=function(_0x3ab4e2){const _0xb47eea=_0x2585e8,_0x27738c=_0x3ab4e2[_0xb47eea(0xe3)]();for(const _0x52f436 of _0x27738c){if(!_0x52f436)continue;if(this[_0xb47eea(0xed)](_0x52f436,_0xb47eea(0x13e))){if(_0xb47eea(0x11c)===_0xb47eea(0x14b))this[_0xb47eea(0x137)]();else return _0x3ab4e2[_0xb47eea(0xa8)](_0x52f436),!![];}}return![];},Game_Action[_0x2585e8(0x12e)][_0x2585e8(0x12a)]=function(_0xc00d62,_0x247ed3){const _0x536155=_0x2585e8,_0x450ea4=_0xc00d62[_0x536155(0x12b)]();for(const _0x2c2f85 of _0x450ea4){if(!_0x2c2f85)continue;if(_0x247ed3<_0xc00d62[_0x536155(0x96)](_0x2c2f85['id']))continue;if(this['matchesAntiDamageBarrier'](_0x2c2f85,_0x536155(0xfa))){if(_0x536155(0xcf)===_0x536155(0xd6))this[_0x536155(0x83)]('TP',![]);else return _0xc00d62[_0x536155(0x119)](_0x2c2f85),!![];}}return![];},Game_Action['prototype'][_0x2585e8(0xdb)]=function(_0x3937af,_0x2bca97){const _0x2ceaa8=_0x2585e8,_0x244c4c=_0x3937af[_0x2ceaa8(0x12b)]();for(const _0x5f45b3 of _0x244c4c){if(!_0x5f45b3)continue;if(_0x2bca97>_0x3937af[_0x2ceaa8(0xd4)](_0x5f45b3['id']))continue;if(this['matchesAntiDamageBarrier'](_0x5f45b3,_0x2ceaa8(0xa2))){if(_0x2ceaa8(0x82)==='LsOPz')return _0x3937af[_0x2ceaa8(0x119)](_0x5f45b3),!![];else _0x2f803f=this['applyPostAntiDamageBarriers'](_0x383012,_0x4161a1);}}return![];},Game_Action['prototype'][_0x2585e8(0xf8)]=function(_0x41528c,_0x3bf190){const _0x364ebe=_0x2585e8;if(_0x3bf190<=0x0)return _0x3bf190;const _0x3f0f9d=_0x41528c[_0x364ebe(0x12b)]();let _0x34be28=0x0;for(const _0x572c95 of _0x3f0f9d){if(_0x364ebe(0xd2)!==_0x364ebe(0xc4)){if(!_0x572c95)continue;this[_0x364ebe(0xed)](_0x572c95,_0x364ebe(0xac))&&('MllOb'!==_0x364ebe(0x133)?_0x34be28+=_0x41528c[_0x364ebe(0xea)](_0x572c95['id']):(this[_0x364ebe(0xa1)]===_0x8edab7&&this[_0x364ebe(0x137)](),this['_antiDamageBarrierMp'][_0x30e45a]=_0x5b83ce));}else{if(!_0x43b070[_0x364ebe(0x149)]())return![];const _0x3d423a=_0x3ae7a4[_0x364ebe(0x142)][_0x364ebe(0x152)]['TP'];if(!_0x3d423a)return;if(_0x3d423a[_0x364ebe(0xa0)]==='')return;const _0x390dc2=_0x3d423a['PopupText'][_0x364ebe(0xae)](_0x1e45b0,_0x6ddd87['tp']),_0x2b31c3={'textColor':_0x3d423a[_0x364ebe(0x148)],'flashColor':_0x3d423a[_0x364ebe(0xe4)],'flashDuration':_0x3d423a['FlashDuration']};this[_0x364ebe(0x12d)](_0x390dc2,_0x2b31c3);}}if(_0x34be28>0x0){if(_0x364ebe(0x108)===_0x364ebe(0x108))console[_0x364ebe(0xbb)](_0x3bf190,_0x34be28),_0x3bf190*=(0x1-_0x34be28)[_0x364ebe(0x156)](0x0,0x1),_0x41528c[_0x364ebe(0xce)]();else{_0x41206c=_0x734087[_0x364ebe(0x132)](/\b(\d+)([%％])/gi,(_0x5d9f5c,_0x263a96)=>(_0x2e4cbc(_0x263a96)||0x0)*0.01);try{return _0x4c42f0(_0x1559d3);}catch(_0x550720){if(_0x5978ad[_0x364ebe(0xf4)]())_0x2c719d[_0x364ebe(0xbb)](_0x550720);return 0x0;}}}return _0x3bf190;},Game_Action[_0x2585e8(0x12e)]['applyAbsorptionBarrier']=function(_0x475d30,_0x32ddba){const _0x171299=_0x2585e8;if(_0x32ddba<=0x0)return _0x32ddba;const _0x17ece1=_0x475d30['getAntiDamageBarrierStates']();for(const _0x224b69 of _0x17ece1){if(!_0x224b69)continue;if(this['matchesAntiDamageBarrier'](_0x224b69,_0x171299(0xb8))){let _0x3271d7=Number(_0x475d30['getStateDisplay'](_0x224b69['id']))||0x0;const _0x38e057=Math['min'](_0x32ddba,_0x3271d7);_0x32ddba-=_0x38e057,_0x3271d7-=_0x38e057,_0x475d30['setStateDisplay'](_0x224b69['id'],_0x3271d7);_0x38e057>0x0&&(_0x171299(0x134)==='ylAHG'?this[_0x171299(0x150)](_0x388d0f['id'],_0x40a4bb):(_0x475d30['displayAbsorptionBarrierPopup'](_0x38e057,_0x224b69),_0x475d30[_0x171299(0x103)](_0x224b69)));if(_0x32ddba<=0x0){if(_0x171299(0x99)===_0x171299(0xef))return _0xef1eaa-_0x595152;else break;}}}return _0x32ddba;},Game_Action['prototype']['applyMpBarrier']=function(_0x4c0169,_0x3a8d6f){const _0x49b1df=_0x2585e8;if(_0x3a8d6f<=0x0)return _0x3a8d6f;const _0x23e53a=_0x4c0169['states']();let _0x10ce38=_0x4c0169['mp'];for(const _0x46e719 of _0x23e53a){if(!_0x46e719)continue;if(this[_0x49b1df(0xed)](_0x46e719,'MpBarrier')){if(_0x49b1df(0xb1)!==_0x49b1df(0xb1)){if(!_0x14ff83[_0x49b1df(0x149)]())return;const _0x5cd6d5=_0x14a30c[_0x49b1df(0x142)][_0x49b1df(0x152)][_0x5e2fc9];if(!_0x5cd6d5)return;const _0x4c041e=_0x336321?_0x49b1df(0xc2):_0x49b1df(0x87);if(_0x5cd6d5[_0x49b1df(0xc0)[_0x49b1df(0xae)](_0x4c041e)]>0x0){const _0x3cda0a=[this],_0x56f89c=_0x5cd6d5[_0x49b1df(0xc0)[_0x49b1df(0xae)](_0x4c041e)];let _0x402d0d=_0x5cd6d5['%1Mirror'[_0x49b1df(0xae)](_0x4c041e)];_0x5cd6d5[_0x49b1df(0x11e)[_0x49b1df(0xae)](_0x4c041e)]&&(_0x402d0d=!_0x402d0d);const _0x305f10=_0x5cd6d5[_0x49b1df(0xe6)['format'](_0x4c041e)];_0x5a586d['requestFauxAnimation'](_0x3cda0a,_0x56f89c,_0x402d0d,_0x305f10);}}else{const _0x5575f6=_0x4c0169[_0x49b1df(0xa4)](_0x46e719['id']),_0x490223=Math[_0x49b1df(0xb5)](Math[_0x49b1df(0xfb)](_0x3a8d6f*_0x5575f6),_0x4c0169['mp']);_0x3a8d6f-=_0x490223,_0x4c0169[_0x49b1df(0x8d)](-_0x490223);_0x490223>0x0&&_0x4c0169['onAntiDamageMpBarrier'](_0x46e719);if(_0x3a8d6f<=0x0){if(_0x49b1df(0x97)===_0x49b1df(0x97))break;else return this[_0x49b1df(0xee)](_0x1494a6);}}}}return _0x3a8d6f;},Game_Action[_0x2585e8(0x12e)]['applyTpBarrier']=function(_0x1b4e60,_0x4cb6a8){const _0x5504a9=_0x2585e8;if(_0x4cb6a8<=0x0)return _0x4cb6a8;const _0x2a3209=_0x1b4e60[_0x5504a9(0x12b)]();let _0x2ea309=_0x1b4e60['mp'];for(const _0x3b37c5 of _0x2a3209){if(!_0x3b37c5)continue;if(this[_0x5504a9(0xed)](_0x3b37c5,_0x5504a9(0x117))){const _0x5712c1=_0x1b4e60[_0x5504a9(0x90)](_0x3b37c5['id']),_0x17d74a=Math[_0x5504a9(0xb5)](Math[_0x5504a9(0xfb)](_0x4cb6a8*_0x5712c1),_0x1b4e60['tp']);_0x4cb6a8-=_0x17d74a,_0x1b4e60[_0x5504a9(0x10b)](-_0x17d74a);_0x17d74a>0x0&&(_0x1b4e60[_0x5504a9(0x14f)](_0x17d74a),_0x1b4e60[_0x5504a9(0xc7)](_0x3b37c5));if(_0x4cb6a8<=0x0)break;}}return _0x4cb6a8;},Game_Action[_0x2585e8(0x12e)]['matchesAntiDamageBarrier']=function(_0x4e844a,_0x34f517){const _0x503dff=_0x2585e8,_0x25763a=VisuMZ['AntiDmgBarriers']['RegExp'][_0x34f517];if(!_0x25763a)return![];const _0x416489=_0x4e844a[_0x503dff(0x130)][_0x503dff(0x138)](_0x25763a);if(_0x416489){if(_0x503dff(0xe9)!=='cJcgW')for(const _0x5bf8f1 of _0x416489){_0x5bf8f1[_0x503dff(0x138)](_0x25763a);const _0x35b304=String(RegExp['$1']);if(this[_0x503dff(0xf2)](_0x35b304)){if(_0x503dff(0x106)!==_0x503dff(0x121))return!![];else _0x439aa7-=_0x588ecf['AntiDmgBarriers'][_0x503dff(0xd0)](_0x2dd324['$1']);}}else this[_0x503dff(0x137)]();}return![];},Game_Action[_0x2585e8(0x12e)][_0x2585e8(0xf2)]=function(_0x3434f6){const _0x28d2bf=_0x2585e8;_0x3434f6=_0x3434f6['toUpperCase']()['trim']();if(['ALL','ANY',_0x28d2bf(0x129)]['includes'](_0x3434f6))return!![];else{if(_0x3434f6['match'](/ELEMENT/i))return this[_0x28d2bf(0xee)](_0x3434f6);else{if(_0x3434f6[_0x28d2bf(0x138)](/CERTAIN/i)){if('tJbGM'===_0x28d2bf(0x91))this[_0x28d2bf(0xb7)]===_0x11a2f0&&this[_0x28d2bf(0x137)](),this['_antiDamageBarrierCancelUnder'][_0x1ac8a8]=_0x38b831;else return this[_0x28d2bf(0xa3)]();}else{if(_0x3434f6[_0x28d2bf(0x138)](/PHYSICAL/i))return this[_0x28d2bf(0x95)]();else{if(_0x3434f6[_0x28d2bf(0x138)](/MAGICAL/i))return this[_0x28d2bf(0xa6)]();}}}}},Game_Action[_0x2585e8(0x12e)]['matchesAntiDamageBarrierElementType']=function(_0x466a79){const _0x37c53b=_0x2585e8,_0x50d059=this[_0x37c53b(0x118)]();if(_0x466a79[_0x37c53b(0x138)](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){if(_0x37c53b(0x80)!=='CXUOE')this[_0x37c53b(0x123)](_0x196597);else{const _0x1af7d7=JSON[_0x37c53b(0x110)]('['+RegExp['$1']['match'](/\d+/g)+']');return _0x50d059['some'](_0x17dae8=>_0x1af7d7[_0x37c53b(0x122)](_0x17dae8));}}else{if(_0x466a79['match'](/ELEMENT[ ](.*)/i)){if(_0x37c53b(0x10e)!=='DyDYg'){const _0x43e2bc=String(RegExp['$1'])[_0x37c53b(0x155)](','),_0x5aacc8=_0x43e2bc[_0x37c53b(0xda)](_0x597398=>DataManager[_0x37c53b(0xab)](_0x597398));return _0x50d059[_0x37c53b(0x131)](_0x4d7ca8=>_0x5aacc8[_0x37c53b(0x122)](_0x4d7ca8));}else this[_0x37c53b(0x83)](_0x37c53b(0xfc),!![]);}}return![];},VisuMZ[_0x2585e8(0x142)][_0x2585e8(0x115)]=Game_BattlerBase[_0x2585e8(0x12e)][_0x2585e8(0x144)],Game_BattlerBase[_0x2585e8(0x12e)][_0x2585e8(0x144)]=function(){const _0x3c642f=_0x2585e8;VisuMZ[_0x3c642f(0x142)][_0x3c642f(0x115)][_0x3c642f(0xca)](this),this[_0x3c642f(0x137)]();},Game_BattlerBase[_0x2585e8(0x12e)]['initAntiDamageBarriers']=function(){const _0x3a7eea=_0x2585e8;this[_0x3a7eea(0xad)]={},this['_antiDamageBarrierCancelUnder']={},this[_0x3a7eea(0x143)]={},this[_0x3a7eea(0xa1)]={},this[_0x3a7eea(0x154)]={};},Game_BattlerBase['prototype'][_0x2585e8(0x96)]=function(_0x5230c0){const _0x11244f=_0x2585e8;if(!this[_0x11244f(0xdc)](_0x5230c0))return 0x0;return this['_antiDamageBarrierCancelOver']===undefined&&(_0x11244f(0xbc)===_0x11244f(0x120)?_0x4fec64+=_0x313f5d[_0x11244f(0xea)](_0x311e82['id']):this[_0x11244f(0x137)]()),this[_0x11244f(0xad)][_0x5230c0]||0x0;},Game_BattlerBase[_0x2585e8(0x12e)][_0x2585e8(0x14d)]=function(_0x11ebe9,_0x218425){const _0x5a6ceb=_0x2585e8;this[_0x5a6ceb(0xad)]===undefined&&this['initAntiDamageBarriers'](),this[_0x5a6ceb(0xad)][_0x11ebe9]=_0x218425;},Game_BattlerBase['prototype'][_0x2585e8(0xd4)]=function(_0xad9ed3){const _0x56e2af=_0x2585e8;if(!this[_0x56e2af(0xdc)](_0xad9ed3))return 0x0;return this[_0x56e2af(0xb7)]===undefined&&this[_0x56e2af(0x137)](),this[_0x56e2af(0xb7)][_0xad9ed3]||0x0;},Game_BattlerBase['prototype'][_0x2585e8(0x10d)]=function(_0x2d78d4,_0x2a44e2){const _0x19c091=_0x2585e8;this[_0x19c091(0xb7)]===undefined&&this[_0x19c091(0x137)](),this[_0x19c091(0xb7)][_0x2d78d4]=_0x2a44e2;},Game_BattlerBase['prototype']['getAntiDamageBarrierReduction']=function(_0x3a58dc){const _0x223700=_0x2585e8;if(!this[_0x223700(0xdc)](_0x3a58dc))return 0x0;return this[_0x223700(0x143)]===undefined&&this[_0x223700(0x137)](),this[_0x223700(0x143)][_0x3a58dc]||0x0;},Game_BattlerBase[_0x2585e8(0x12e)][_0x2585e8(0x9e)]=function(_0x3fd534,_0x386354){const _0x3e503b=_0x2585e8;this[_0x3e503b(0x143)]===undefined&&this[_0x3e503b(0x137)](),this[_0x3e503b(0x143)][_0x3fd534]=_0x386354;},Game_BattlerBase[_0x2585e8(0x12e)]['getAntiDamageBarrierMp']=function(_0x4d55b4){const _0x4681d2=_0x2585e8;if(!this[_0x4681d2(0xdc)](_0x4d55b4))return 0x0;return this['_antiDamageBarrierMp']===undefined&&this[_0x4681d2(0x137)](),this[_0x4681d2(0xa1)][_0x4d55b4]||0x0;},Game_BattlerBase[_0x2585e8(0x12e)][_0x2585e8(0xd1)]=function(_0x6202fa,_0x5c1591){const _0x1a40d5=_0x2585e8;this[_0x1a40d5(0xa1)]===undefined&&this[_0x1a40d5(0x137)](),this[_0x1a40d5(0xa1)][_0x6202fa]=_0x5c1591;},Game_BattlerBase[_0x2585e8(0x12e)]['getAntiDamageBarrierTp']=function(_0x56f4db){const _0x54fc45=_0x2585e8;if(!this['isStateAffected'](_0x56f4db))return 0x0;return this[_0x54fc45(0x154)]===undefined&&(_0x54fc45(0x13b)===_0x54fc45(0x105)?this[_0x54fc45(0x137)]():this[_0x54fc45(0x137)]()),this[_0x54fc45(0x154)][_0x56f4db]||0x0;},Game_BattlerBase[_0x2585e8(0x12e)][_0x2585e8(0x12c)]=function(_0x2300b5,_0x327b7f){const _0x1fc5b7=_0x2585e8;this[_0x1fc5b7(0x154)]===undefined&&this[_0x1fc5b7(0x137)](),this[_0x1fc5b7(0x154)][_0x2300b5]=_0x327b7f;},Game_BattlerBase[_0x2585e8(0x12e)]['ignoreAllAntiDamageBarriers']=function(){const _0x24b45e=_0x2585e8,_0x57ca9d=this[_0x24b45e(0xff)]()[_0x24b45e(0x92)](this[_0x24b45e(0x146)]()),_0x2e3d53=VisuMZ[_0x24b45e(0x142)][_0x24b45e(0xec)][_0x24b45e(0xc9)];return _0x57ca9d[_0x24b45e(0x131)](_0x68886a=>_0x68886a&&_0x68886a[_0x24b45e(0x130)]&&_0x68886a[_0x24b45e(0x130)][_0x24b45e(0x138)](_0x2e3d53));},Game_BattlerBase['prototype'][_0x2585e8(0xe3)]=function(){const _0x108664=_0x2585e8,_0x33b724=Number['MAX_SAFE_INTEGER'],_0x256861=this[_0x108664(0x12b)]()[_0x108664(0x116)]((_0x531925,_0x1b14fe)=>{const _0x4933f5=_0x108664,_0x10040c=_0x531925[_0x4933f5(0x104)]===0x0?_0x33b724:this[_0x4933f5(0xe5)](_0x531925['id']),_0x58f3ec=_0x1b14fe['autoRemovalTiming']===0x0?_0x33b724:this['stateTurns'](_0x1b14fe['id']);if(_0x10040c!==_0x58f3ec){if(_0x4933f5(0xb0)===_0x4933f5(0xb0))return _0x10040c-_0x58f3ec;else{const _0x210a6c=_0x1f630b['AntiDmgBarriers']['CalculateCharges'](_0x2ba052['$2']);this[_0x4933f5(0xd1)](_0x62b559,_0x210a6c||0x0);}}const _0x25e6c5=_0x531925[_0x4933f5(0xcb)],_0x445364=_0x1b14fe[_0x4933f5(0xcb)];if(_0x25e6c5!==_0x445364)return _0x445364-_0x25e6c5;return _0x531925['id']-_0x1b14fe['id'];});return _0x256861;},VisuMZ[_0x2585e8(0x142)][_0x2585e8(0xc1)]=function(_0x29c652){const _0x3c07c8=_0x2585e8;window['user']=BattleManager[_0x3c07c8(0xd9)]||_0x29c652,window[_0x3c07c8(0x139)]=_0x29c652,window['a']=window[_0x3c07c8(0x128)],window['b']=window[_0x3c07c8(0x139)];},VisuMZ['AntiDmgBarriers'][_0x2585e8(0x84)]=function(){const _0x539561=_0x2585e8;window[_0x539561(0x128)]=undefined,window['target']=undefined,window['a']=undefined,window['b']=undefined;},VisuMZ[_0x2585e8(0x142)][_0x2585e8(0xd0)]=function(_0x1b8e4c){const _0x2dda98=_0x2585e8;_0x1b8e4c=_0x1b8e4c[_0x2dda98(0x132)](/\b(\d+)([%％])/gi,(_0x31b1f4,_0x2ac620)=>(Number(_0x2ac620)||0x0)*0.01);try{if(_0x2dda98(0x9b)!=='dxqzw')return eval(_0x1b8e4c);else{const _0x5ca682=_0x3d3ddf[_0x2dda98(0x142)][_0x2dda98(0xd0)](_0x265fd['$2']);this[_0x2dda98(0x12c)](_0x2925af,_0x5ca682||0x0);}}catch(_0x1081ac){if($gameTemp[_0x2dda98(0xf4)]())console[_0x2dda98(0xbb)](_0x1081ac);return 0x0;}},VisuMZ[_0x2585e8(0x142)][_0x2585e8(0xc8)]=Game_Battler['prototype'][_0x2585e8(0x135)],Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0x135)]=function(_0x491c16){const _0x365c33=_0x2585e8;VisuMZ[_0x365c33(0x142)][_0x365c33(0xc8)][_0x365c33(0xca)](this,_0x491c16),this['initAntiDamageBarrierDataForState'](_0x491c16);},Game_Battler['prototype'][_0x2585e8(0x140)]=function(_0x61bb6d){const _0x90c296=_0x2585e8;if(!this['isStateAffected'](_0x61bb6d))return;const _0x246f8c=$dataStates[_0x61bb6d];if(!_0x246f8c)return;const _0x23cd05=VisuMZ[_0x90c296(0x142)]['RegExp'],_0x497ca9=_0x246f8c['note'];VisuMZ[_0x90c296(0x142)]['createJsTargets'](this);if(_0x497ca9['match'](_0x23cd05[_0x90c296(0x13e)])){if(_0x90c296(0x9a)===_0x90c296(0x9a)){const _0x256e05=VisuMZ[_0x90c296(0x142)][_0x90c296(0xd0)](RegExp['$2']);this[_0x90c296(0x150)](_0x61bb6d,_0x256e05||0x1);}else this['onAntiDamageBarrierEffect']('Reduce',!![]);}if(_0x497ca9['match'](_0x23cd05[_0x90c296(0xfa)])){if(_0x90c296(0x112)===_0x90c296(0x112)){const _0x80fb9=VisuMZ[_0x90c296(0x142)][_0x90c296(0xd0)](RegExp['$2']);this[_0x90c296(0x14d)](_0x61bb6d,_0x80fb9||0x0);}else{const _0x5f0cdb=this[_0x90c296(0x118)]();if(_0x8de086[_0x90c296(0x138)](/ELEMENT[ ]*(\d+(?:\s*,\s*\d+)*)/i)){const _0x459ea8=_0x3a9c27[_0x90c296(0x110)]('['+_0x3121df['$1'][_0x90c296(0x138)](/\d+/g)+']');return _0x5f0cdb[_0x90c296(0x131)](_0x19f576=>_0x459ea8['includes'](_0x19f576));}else{if(_0x4c2e74[_0x90c296(0x138)](/ELEMENT[ ](.*)/i)){const _0x4e54eb=_0x2dc8d3(_0x217072['$1'])['split'](','),_0x5f4888=_0x4e54eb[_0x90c296(0xda)](_0x4ef5f4=>_0x25ed15[_0x90c296(0xab)](_0x4ef5f4));return _0x5f0cdb['some'](_0x3eb4cc=>_0x5f4888[_0x90c296(0x122)](_0x3eb4cc));}}return![];}}if(_0x497ca9[_0x90c296(0x138)](_0x23cd05[_0x90c296(0xa2)])){if(_0x90c296(0xb3)===_0x90c296(0xb3)){const _0x12ca51=VisuMZ[_0x90c296(0x142)][_0x90c296(0xd0)](RegExp['$2']);this[_0x90c296(0x10d)](_0x61bb6d,_0x12ca51||0x0);}else{const _0x37128a=_0x20887a[_0x90c296(0x142)][_0x90c296(0xd0)](_0x195a11['$2']);this['setAntiDamageBarrierCancelOver'](_0x190b98,_0x37128a||0x0);}}if(_0x497ca9['match'](_0x23cd05[_0x90c296(0xac)])){const _0x279e5f=VisuMZ[_0x90c296(0x142)][_0x90c296(0xd0)](RegExp['$2']);this[_0x90c296(0x9e)](_0x61bb6d,_0x279e5f||0x0);}if(_0x497ca9[_0x90c296(0x138)](_0x23cd05[_0x90c296(0xb8)])){const _0x475e75=VisuMZ[_0x90c296(0x142)][_0x90c296(0xd0)](RegExp['$2']);this[_0x90c296(0x150)](_0x61bb6d,_0x475e75||0x0);}if(_0x497ca9['match'](_0x23cd05['MpBarrier'])){const _0x3eaf20=VisuMZ[_0x90c296(0x142)]['CalculateCharges'](RegExp['$2']);this[_0x90c296(0xd1)](_0x61bb6d,_0x3eaf20||0x0);}if(_0x497ca9[_0x90c296(0x138)](_0x23cd05[_0x90c296(0x117)])){if(_0x90c296(0x111)==='MTBHe'){const _0x53296e=VisuMZ[_0x90c296(0x142)]['CalculateCharges'](RegExp['$2']);this['setAntiDamageBarrierTp'](_0x61bb6d,_0x53296e||0x0);}else{const _0x57f951=_0x1ef43d(_0x3d2c7e['$1'])[_0x90c296(0x155)](','),_0x53af54=_0x57f951[_0x90c296(0xda)](_0x56cb0c=>_0x1f1c73[_0x90c296(0xab)](_0x56cb0c));return _0x5ce05e[_0x90c296(0x131)](_0x4fe56a=>_0x53af54[_0x90c296(0x122)](_0x4fe56a));}}VisuMZ[_0x90c296(0x142)][_0x90c296(0x84)]();},Game_Battler[_0x2585e8(0x12e)]['onAntiDamageBarrierEffect']=function(_0x1400d4,_0x2b5a02){const _0x15ef0d=_0x2585e8;if(!SceneManager[_0x15ef0d(0x149)]())return;const _0x4d33bc=VisuMZ['AntiDmgBarriers']['Settings'][_0x1400d4];if(!_0x4d33bc)return;const _0x2fed56=_0x2b5a02?_0x15ef0d(0xc2):_0x15ef0d(0x87);if(_0x4d33bc[_0x15ef0d(0xc0)[_0x15ef0d(0xae)](_0x2fed56)]>0x0){const _0x81b4ad=[this],_0x6278ea=_0x4d33bc[_0x15ef0d(0xc0)[_0x15ef0d(0xae)](_0x2fed56)];let _0x863d29=_0x4d33bc[_0x15ef0d(0x85)[_0x15ef0d(0xae)](_0x2fed56)];_0x4d33bc[_0x15ef0d(0x11e)['format'](_0x2fed56)]&&(_0x863d29=!_0x863d29);const _0x3d25c3=_0x4d33bc[_0x15ef0d(0xe6)['format'](_0x2fed56)];$gameTemp['requestFauxAnimation'](_0x81b4ad,_0x6278ea,_0x863d29,_0x3d25c3);}},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0x11d)]=function(_0x1e52f0){const _0x364f42=_0x2585e8;if(!_0x1e52f0)return;const _0x10099e=_0x1e52f0['id'],_0x4a9051=VisuMZ['AntiDmgBarriers'][_0x364f42(0xec)],_0x23ceb6=_0x1e52f0[_0x364f42(0x130)];this[_0x364f42(0x123)](_0x10099e);if(_0x23ceb6['match'](_0x4a9051['NullBarrier']))this['onAntiDamageBarrierEffect']('Nullify',![]);else{if(_0x23ceb6[_0x364f42(0x138)](_0x4a9051[_0x364f42(0xfa)]))_0x364f42(0xf6)===_0x364f42(0xf6)?this[_0x364f42(0x83)]('Cancel',![]):(_0x1afd20[_0x364f42(0x128)]=_0x127919[_0x364f42(0xd9)]||_0x435890,_0x2ed6f0['target']=_0x43e378,_0x1e79e8['a']=_0xe2bc76[_0x364f42(0x128)],_0x32e8de['b']=_0x1fa761[_0x364f42(0x139)]);else{if(_0x23ceb6[_0x364f42(0x138)](_0x4a9051[_0x364f42(0xa2)]))_0x364f42(0xb2)!==_0x364f42(0xb2)?(this['_antiDamageBarrierCancelOver']={},this[_0x364f42(0xb7)]={},this['_antiDamageBarrierReduction']={},this[_0x364f42(0xa1)]={},this[_0x364f42(0x154)]={}):this[_0x364f42(0x83)]('Cancel',![]);else{if(_0x23ceb6['match'](_0x4a9051[_0x364f42(0xac)])){if(_0x364f42(0xcc)==='XcmWj'){if(this[_0x364f42(0x14e)](_0x2a29c8))return _0x2a6f1a;if(this['applyCancelOverBarrier'](_0x466e3b,_0xc325c))return 0x0;if(this[_0x364f42(0xdb)](_0x4f618d,_0x251cc4))return 0x0;if(this['applyNullificationBarrier'](_0x40f3df))return 0x0;return _0x4d39e2;}else this[_0x364f42(0x83)](_0x364f42(0x8e),![]);}else{if(_0x23ceb6['match'](_0x4a9051['AbsorbBarrier'])){if(_0x364f42(0x94)===_0x364f42(0x12f))return _0x40e9ee[_0x364f42(0xa8)](_0x26274b),!![];else this['onAntiDamageBarrierEffect'](_0x364f42(0xf1),![]);}else{if(_0x23ceb6[_0x364f42(0x138)](_0x4a9051[_0x364f42(0xcd)]))this[_0x364f42(0x83)]('MP',![]);else _0x23ceb6[_0x364f42(0x138)](_0x4a9051[_0x364f42(0x117)])&&this[_0x364f42(0x83)]('TP',![]);}}}}}},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0xa8)]=function(_0x4abb77){const _0x11d7e0=_0x2585e8,_0x5be9cf=_0x4abb77['id'];let _0x129682=(Number(this[_0x11d7e0(0xc5)](_0x5be9cf))||0x0)-0x1;this[_0x11d7e0(0x150)](_0x5be9cf,_0x129682),_0x129682<=0x0&&this['removeState'](_0x5be9cf),this[_0x11d7e0(0x83)](_0x11d7e0(0x10f),_0x129682>0x0);},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0x119)]=function(_0x1de4ee){const _0x4705f3=_0x2585e8;this[_0x4705f3(0x83)](_0x4705f3(0xfc),!![]);},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0xce)]=function(){this['onAntiDamageBarrierEffect']('Reduce',!![]);},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0x102)]=function(_0x4857ed,_0x1bf159){const _0x2e42c5=_0x2585e8;if(!SceneManager[_0x2e42c5(0x149)]())return![];const _0x3f11a2=VisuMZ[_0x2e42c5(0x142)][_0x2e42c5(0x152)][_0x2e42c5(0xf1)];if(!_0x3f11a2)return;if(_0x3f11a2[_0x2e42c5(0xa0)]==='')return;const _0x3faa8f=_0x3f11a2[_0x2e42c5(0xa0)][_0x2e42c5(0xae)](_0x4857ed),_0x485fcd={'textColor':_0x3f11a2[_0x2e42c5(0x148)],'flashColor':_0x3f11a2[_0x2e42c5(0xe4)],'flashDuration':_0x3f11a2[_0x2e42c5(0x13a)]};this['setupTextPopup'](_0x3faa8f,_0x485fcd);},Game_Battler['prototype']['onAntiDamageAbsorptionBarrier']=function(_0x2bf145){const _0x2d7fb9=_0x2585e8,_0x464742=_0x2bf145['id'];let _0x5a7093=Number(this[_0x2d7fb9(0xc5)](_0x464742))||0x0;_0x5a7093<=0x0&&this['removeState'](_0x464742),this[_0x2d7fb9(0x83)](_0x2d7fb9(0xf1),_0x5a7093>0x0);},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0x145)]=function(_0x296a59){const _0x5f5bb9=_0x2585e8,_0x1ec67a=_0x296a59['id'];this['mp']<=0x0&&this['removeState'](_0x1ec67a),this[_0x5f5bb9(0x83)]('MP',this['mp']>0x0);},Game_Battler[_0x2585e8(0x12e)]['displayTpBarrierPopup']=function(_0x2a2116){const _0x32f4c6=_0x2585e8;if(!SceneManager['isSceneBattle']())return![];const _0x1f1863=VisuMZ['AntiDmgBarriers'][_0x32f4c6(0x152)]['TP'];if(!_0x1f1863)return;if(_0x1f1863[_0x32f4c6(0xa0)]==='')return;const _0x51d4e0=_0x1f1863[_0x32f4c6(0xa0)]['format'](_0x2a2116,TextManager['tp']),_0xdc6fe2={'textColor':_0x1f1863[_0x32f4c6(0x148)],'flashColor':_0x1f1863[_0x32f4c6(0xe4)],'flashDuration':_0x1f1863[_0x32f4c6(0x13a)]};this[_0x32f4c6(0x12d)](_0x51d4e0,_0xdc6fe2);},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0xc7)]=function(_0x1b1a56){const _0x16690c=_0x2585e8,_0x1da4a0=_0x1b1a56['id'];if(this['tp']<=0x0){if(_0x16690c(0x136)!==_0x16690c(0x136)){const _0x22f7ff=_0x79c361['id'];this['tp']<=0x0&&this[_0x16690c(0x123)](_0x22f7ff),this[_0x16690c(0x83)]('TP',this['tp']>0x0);}else this[_0x16690c(0x123)](_0x1da4a0);}this[_0x16690c(0x83)]('TP',this['tp']>0x0);},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0xbd)]=function(_0x2ee33c){const _0x566e75=_0x2585e8;if(!_0x2ee33c)return;if(!_0x2ee33c[_0x566e75(0xdf)]())return;let _0x18558b=[];for(const _0x12e535 of this[_0x566e75(0x12b)]()){if(!_0x12e535)continue;if(!this[_0x566e75(0xdc)](_0x12e535['id']))continue;if(VisuMZ[_0x566e75(0x142)][_0x566e75(0x8c)](_0x12e535,_0x2ee33c)){if(_0x566e75(0xb9)!==_0x566e75(0xb9)){const _0x3ee3ff=_0x27932f[_0x566e75(0x110)]('['+_0x129b90['$1']['match'](/\d+/g)+']');return _0x24b799[_0x566e75(0x131)](_0x551fb6=>_0x3ee3ff['includes'](_0x551fb6));}else _0x18558b['push'](_0x12e535['id']);}}for(const _0x57d060 of _0x18558b){const _0xa75ed0=$dataStates[_0x57d060];if(!_0xa75ed0)continue;this[_0x566e75(0x11d)](_0xa75ed0);}},VisuMZ[_0x2585e8(0x142)][_0x2585e8(0x8c)]=function(_0x1b4e5c,_0x57f2c1){const _0x5df163=_0x2585e8,_0x571e63=VisuMZ['AntiDmgBarriers']['RegExp'][_0x5df163(0x8f)],_0x505fa2=_0x1b4e5c[_0x5df163(0x130)][_0x5df163(0x138)](_0x571e63);if(_0x505fa2){if(_0x5df163(0xc3)===_0x5df163(0x14a)){const _0x268a1d=_0x52855c===_0x5df163(0xe1)&&this['isHpEffect']()&&_0x3e8745>0x0;return _0x268a1d&&_0x1379a0[_0x5df163(0xbd)](this),_0x268a1d&&(_0x470ede=this[_0x5df163(0x151)](_0x320687,_0x18d9d7)),_0x53d6a1=_0x29900a[_0x5df163(0x142)][_0x5df163(0x93)][_0x5df163(0xca)](this,_0x5de6b1,_0x96723c,_0x2518c2,_0x5a6ad9),_0x268a1d&&(_0x465c5b=this['applyPostAntiDamageBarriers'](_0x308f82,_0x35d5cc)),_0x1bbad8;}else for(const _0x3e82a1 of _0x505fa2){if(!_0x3e82a1)continue;_0x3e82a1['match'](_0x571e63);const _0x5c2112=String(RegExp['$1']);if(_0x57f2c1['matchesAntiDamageBarrierType'](_0x5c2112))return _0x5df163(0x86)==='JixgE'?!![]:(_0x350247['onAntiDamageCancelBarrier'](_0x3693ce),!![]);}}return![];},VisuMZ[_0x2585e8(0x142)]['Game_Battler_regenerateAll']=Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0xd5)],Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0xd5)]=function(){const _0x3d55a4=_0x2585e8;VisuMZ[_0x3d55a4(0x142)][_0x3d55a4(0xd3)][_0x3d55a4(0xca)](this),this['isAlive']()&&this[_0x3d55a4(0x114)]();},Game_Battler[_0x2585e8(0x12e)]['regenerateAntiDamageBarriers']=function(){const _0x480d11=_0x2585e8;VisuMZ[_0x480d11(0x142)][_0x480d11(0xc1)](this);const _0x529e62=VisuMZ['AntiDmgBarriers'][_0x480d11(0xec)];for(const _0x5eb31c of this[_0x480d11(0x12b)]()){if(_0x480d11(0x153)===_0x480d11(0xaf)){_0x1fcdf9[_0x480d11(0x138)](_0x36da8e);const _0x27d364=_0xcfa782(_0x280294['$1']);if(this['matchesAntiDamageBarrierType'](_0x27d364))return!![];}else{if(!_0x5eb31c)continue;const _0x61f464=_0x5eb31c[_0x480d11(0x130)];(_0x61f464[_0x480d11(0x138)](_0x529e62[_0x480d11(0x13e)])||_0x61f464['match'](_0x529e62[_0x480d11(0xb8)]))&&(_0x480d11(0x101)===_0x480d11(0x10c)?this[_0x480d11(0x83)]('MP',![]):this[_0x480d11(0x9d)](_0x5eb31c));}}VisuMZ['AntiDmgBarriers'][_0x480d11(0x84)]();},Game_Battler[_0x2585e8(0x12e)][_0x2585e8(0x9d)]=function(_0x20a1d8){const _0x2ea18c=_0x2585e8,_0x1b40d3=VisuMZ[_0x2ea18c(0x142)]['RegExp'],_0x4e2138=_0x20a1d8[_0x2ea18c(0x130)];let _0x28c965=0x0;_0x4e2138[_0x2ea18c(0x138)](_0x1b40d3[_0x2ea18c(0x89)])&&(_0x28c965-=VisuMZ[_0x2ea18c(0x142)][_0x2ea18c(0xd0)](RegExp['$1']));_0x4e2138[_0x2ea18c(0x138)](_0x1b40d3[_0x2ea18c(0x127)])&&(_0x28c965+=VisuMZ[_0x2ea18c(0x142)][_0x2ea18c(0xd0)](RegExp['$1']));let _0x456d45=Number(this[_0x2ea18c(0xc5)](_0x20a1d8['id']));_0x456d45+=_0x28c965,_0x456d45>0x0?_0x2ea18c(0x100)!=='mciJq'?(_0x39e1ea['log'](_0x32139f,_0x55004e),_0x4c4c00*=(0x1-_0x438319)['clamp'](0x0,0x1),_0x46c32a[_0x2ea18c(0xce)]()):this['setStateDisplay'](_0x20a1d8['id'],_0x456d45):this['processBreakStateEffect'](_0x20a1d8);};