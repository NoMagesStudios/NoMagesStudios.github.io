//=============================================================================
// VisuStella MZ - Battle A.I.
// VisuMZ_3_BattleAI.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_BattleAI = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleAI = VisuMZ.BattleAI || {};
VisuMZ.BattleAI.version = 1.17;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.17] [BattleAI]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_AI_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * This Battle A.I. plugin changes up how enemies and any Auto Battle actors
 * behave by implementing many new key components to their decision making
 * process in battle. These new compotents are: A.I. Styles, A.I. Levels, 
 * Rating Variance, A.I. Conditions, and Influencing TGR Weight.
 *
 * With these new key components put together, you can transform RPG Maker MZ's
 * highly primitive A.I. into something more intelligent. Auto Battle actors
 * can also base their A.I. patterns off an enemy's A.I. in order to behave in
 * more desirable ways during battle as well.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Different A.I. Styles to allow for various ways to setup enemy A.I.
 * * Set A.I. Levels for enemies and Auto Battle actors.
 * * A.I. Levels can be set on a global scale or individual scale.
 * * Set rating variance levels to prioritize actions or randomize them.
 * * These include notetags to change them on a per individual basis.
 * * Create action conditions to make certain skills usable by the A.I. under
 *   specific circumstances.
 * * Action conditions are split between 'ALL' and 'ANY' types which require
 *   either all conditions to be met or at least one condition to be met.
 * * A large selection of condition notetags to use to help customize the best
 *   case situations on when to use a skill and which target to pick.
 * * Default condition settings can be made in the Plugin Parameters to make an
 *   entire database of skills become conditional for A.I. usage.
 * * Influence TGR weight to make certain targets more desirable for specific
 *   types of actions.
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
 * - VisuMZ_1_BattleCore
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
 * Major Changes
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Auto Battle A.I. for Actors
 *
 * - With this plugin, there is an option to let certain classes reference
 * specific enemy A.I. patterns to decide which skills to use during battle.
 * If the reference option is not used, the actor will use default Auto Battle
 * evaluations to determine which skills to use instead.
 *
 * ---
 * 
 * A.I. Styles
 * 
 * - There are currently four different A.I. Styles. Actors and enemies can
 * default to a different one globally, or changed individually using notetags.
 * Read more about them in the A.I. Styles section.
 * 
 * ---
 *
 * A.I. Levels
 *
 * - Enemies and actors can be given different A.I. Levels. The higher one's
 * A.I. Level, the more they are to follow conditions. With Level 100 A.I.
 * Level, an A.I. will never disobey a condition. On the other hand, lower
 * A.I. Levels may possibly ignore certain conditions and act as if they are
 * fulfilled.
 *
 * ---
 *
 * A.I. Rating Variance
 *
 * - In the RPG Maker database editor, when deciding an enemy's Action Patterns
 * you can decide on the action's "rating". The rating is a value from 1 to 9
 * where 9 gets the highest priority and 1 gets the lowest. RPG Maker, by
 * default, will sometimes dip the rating a few levels lower to allow lower
 * ratings and bypass the priority system.
 *
 * - This plugin allows you to set the variance level through Plugin Parameters
 * on a global scale or notetags on an individual basis to allow for larger,
 * smaller, or no variance on ratings at all.
 *
 * ---
 *
 * A.I. Conditions for Skill Usage
 *
 * - Enemies and any actors that use Auto Battle A.I. with a reference can only
 * use certain skills as long as specific conditions have been met. These
 * conditions are split between 'ALL' condition sets and 'ANY' condition sets.
 *
 * - 'ALL' condition sets require all of the set's conditions to be met in
 * order for the skill to be used by the A.I.
 *
 * - 'ANY' condition sets require at least one of the set's conditions to be
 * met in order for the skill to be used by the A.I.
 *
 * - A variety of conditions can be inserted into each condition set to make
 * for some very specific usage conditions. These will also help filter out
 * which targets to pick from, too.
 *
 * ---
 *
 * TGR Weight on A.I. Target Selection
 *
 * - TGR is a special parameter in RPG Maker MZ that represents "Target Rate".
 * The higher one's TGR, the more likely they are to become the target of an
 * attack. This plugin allows various things to influence the TGR weight to
 * make certain targets more likely to be targets for attack.
 *
 * - Elemental influence rates on the TGR weight mean that if a target receives
 * more damage from an elemental attack, the TGR weight becomes higher for that
 * skill when determining a target. The higher the elemental damage received,
 * the more the TGR weight shifts upward.
 *
 * - Evasion and Magic Evasion rates do the opposite. The higher a potential
 * target's evasion and magic evasion rate is (for physical and magical skills)
 * the lower the TGR weight becomes for that potential target.
 *
 * - By default Plugin Parameter settings, TGR weight shifting requires the
 * enemy troop to have "knowledge" on the party's element rates, evasion, and
 * magic evasion properties. Enemy troops would have to hit actors with element
 * based attacks to learn the actor's resistance levels, physical attacks to
 * learn the actor's evasion, and magical attacks to learn the actor's magic
 * evasion levels.
 *
 * ---
 *
 * ============================================================================
 * A.I. Styles
 * ============================================================================
 * 
 * There are currently four different A.I. Styles. These determine how the
 * A.I. acts and behaves. You can change the A.I. Style used globally through
 * the Plugin Parameters or individually for classes and enemies through the
 * usage of notetags.
 * 
 * Read below to understand each style and its rules:
 * 
 * ---
 * 
 * Classic Style
 * 
 * "Classic" style is the traditional and default RPG Maker MZ A.I. style.
 * It puts emphasis on the Rating system, where skills with higher ratings are
 * given more priority than skills with lower ratings within variance.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions with higher Ratings.
 * - Rating variance will be determined by Plugin Parameters and/or notetags.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - After applying Ratings, Rating Variances, and A.I. Conditions, if there
 *   are still multiple actions to choose from, pick from the remaining actions
 *   randomly.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Gambit Style
 * 
 * - "Gambit" style is the style from Yanfly Engine Plugin's Battle A.I. Core.
 * It goes down the list of skills and uses them in order as long as they meet
 * the Action Pattern conditions and A.I. conditions. Ratings will be ignored.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - Priority is given towards actions located higher on the list.
 * - Actions towards the bottom of the list will have lower priority.
 * - Ratings and Rating Variance has no bearing on whether or not an action
 *   will be picked.
 * - A.I. Level can affect whether or not A.I. Conditions would be ignored.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Casual Style
 * 
 * - "Casual" style takes a lighter approach to A.I. It ignores the Ratings
 * system and doesn't care about the order of actions either. Instead, the
 * only thing this A.I. Style cares about are the A.I. Conditions. All valid
 * actions after that are randomly picked from.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions must be met.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
 * 
 * ---
 * 
 * Random Style
 * 
 * - "Random" style simply does not care about ratings or order. It only cares
 * if the skill's can be used (can pay for the cost) and Action Pattern
 * conditions. It does not care about A.I. Conditions, Ratings, or Order.
 * 
 * - Action Pattern conditions must be met.
 * - Skill must be usable (able to pay its cost and it isn't disabled).
 * - Skill A.I. conditions are ignored.
 * - There is no priority system for Ratings or Order.
 * - A.I. Level does not matter here.
 * - A random action will be selected from a group of remaining valid actions.
 * - If no actions are valid, then do nothing.
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
 * === General A.I. Settings Notetags ===
 *
 * These notetags set the general A.I. related settings for enemies and any
 * actors that use A.I. (requires Auto Battle and has a reference A.I.).
 *
 * ---
 * 
 * <AI Style: x>
 * 
 * - Used for: Class, Enemy Notetags
 * - Replace 'x' with 'Classic', 'Gambit', 'Casual', or 'Random' without the
 *   quotes. Example: <AI Style: Gambit>
 * - Determines the A.I. style used. Refer to the A.I. Styles section on the
 *   various types of styles.
 * - For actors, place this inside the associated class's notebox instead.
 * - For actors, this does not apply if there is no referenced enemy A.I. list.
 * - Setup the reference enemy through either the Plugin Parameters or by using
 *   the <Reference AI: Enemy id> notetag found below.
 * 
 * ---
 *
 * <AI Level: x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Designates the unit's A.I. level if A.I. is to be used.
 * - Replace 'x' with a number from 0 to 100.
 * - Units with higher A.I. Levels will be more strict about conditions.
 * - Units with lower A.I. Levels will be more lax about conditions.
 *
 * ---
 *
 * <AI Rating Variance: x>
 * 
 * - Used for: Actor, Enemy Notetags
 * - Sets the variance amount when determining A.I. actions by rating.
 * - Replace 'x' with a number between 0 and 9.
 * - 0 for no variance.
 * - Lower numbers for less variance.
 * - Higher numbers for more variance.
 *
 * ---
 *
 * <Reference AI: Enemy id>
 * <Reference AI: name>
 *
 * - Used for: Class Notetags
 * - Causes any actor using this class that has the Auto Battle trait to use
 *   a specific enemy's attack pattern (ratings, conditions, etc.) to determine
 *   which skill to use in battle.
 * - Replace 'id' with a number representing the enemy's ID to reference.
 * - Replace 'name' with the name the enemy to reference.
 * - Actors are only able to use skills they would normally have access to.
 *   - Actors need to have LEARNED the skill.
 *   - Actors need to be able to access the skill's SKILL TYPE.
 *   - Actors need to have the RESOURCES to pay for the skill.
 * - If you cannot figure out why an auto battle actor cannot use a specific
 *   skill, turn OFF auto battle and see if you can use the skill normally.
 *
 * ---
 *
 * <No Reference AI>
 *
 * - Used for: Class Notetags
 * - Prevents the class from using any enemies as their reference A.I. pattern
 *   (including the one set in the Plugin Parameters).
 *
 * ---
 *
 * === Skill A.I. Condition Notetags ===
 *
 * Insert these notetags into the noteboxes of skills that you'd like to give
 * custom A.I. conditions for. The 'All' version of the notetags require every
 * condition to be met while the 'Any' version of the notetags require only one
 * of the conditions to be met. 
 *
 * If both are used together, then the 'All' conditions must be completely
 * fulfilled while the 'Any' conditions need only one to be fulfilled.
 *
 * ---
 *
 * <All AI Conditions>
 *  condition
 *  condition
 *  condition
 * </All AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - All conditions must be met in order for this to become a valid skill for
 *   the AI to use.
 * - This can be used together with <Any AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'All' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <Any AI Conditions>
 *  condition
 *  condition
 *  condition
 * </Any AI Conditions>
 * 
 * - Used for: Skill
 * - Add/remove as many conditions as needed for the skill.
 * - As long as one condition is met, this becomes a valid skill for the AI
 *   to use. If none of them are met, this skill becomes invalid for AI use.
 * - This can be used together with <All AI Conditions>. If either of these
 *   notetags exist, do not use the Plugin Parameter defaul conditions.
 * - This will not inherit default 'Any' conditions in the Plugin Parameters.
 * - Replace 'condition' with any of the following Condition List below.
 *
 * ---
 *
 * <No AI Conditions>
 * 
 * - Used for: Skill
 * - Removes any default 'All' and 'Any' conditions for this skill.
 * 
 * ---
 *
 * -=-=- Condition List -=-=-
 *
 * Replace 'condition' in the notetags in the above section with any of the
 * following to make conditions. These conditions are also used in the Plugin
 * Parameters for the default conditions, too.
 *
 * ---
 *
 * x >= y
 * x > y
 * x === y
 * x !== y
 * x < y
 * x <= y
 *
 * - Replace 'x' and 'y' with any of the following:
 *
 * - A numeric value representing a hard number.
 * - '50%' or any other percentile number to represent a rate.
 * - '0.5' or any other float number to represent a rate.
 *
 * - 'Variable x' (replace 'x' with a number) for variable x's current value.
 *
 * - 'HP%', 'MP%', 'TP%' for HP, MP, and TP rates respectively.
 * - 'MaxHP', 'MaxMP', 'MaxTP' for the potential target's respective values.
 * - 'Level' for the potential target's level. Requires VisuMZ_0_CoreEngine for
 *   this to affect enemies.
 * - 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK' for the potential target's total
 *   parameter value.
 *
 * - 'param Buff Stacks' for the potential target's current Buff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 * - 'param Debuff Stacks' for the potential target's current Debuff stacks.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * - 'param Buff Turns' for potential target's current buff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that buff.
 * - 'param Debuff Turns' for potential target's current debuff turn duration.
 *   - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *   - Returns 0 if the potential target is not affected by that debuff.
 *
 * - 'State id Turns' or 'State name Turns' for potential target's current turn
 *   duration on that particular state.
 *   - Replace 'id' with a number representing the ID of the state.
 *   - Replace 'name' with the state's name.
 *   - Returns 0 if the potential target is not affected by that state.
 *   - Returns the max safe number value if the potential target is has that
 *     state as a passive state.
 *
 * - 'Element id Rate', 'Element name Rate', 'name Element Rate'
 *   - Returns a (float) value of the potential target's element's rate.
 *   - Replace 'id' with the ID of the element whose rate is to be checked.
 *   - Replace 'name' with the name of the element whose rate is to be checked.
 *     - Ignore any text codes in the element name.
 *
 * - 'Team Alive Members'
 *   - Returns a number value indicating how many alive members there are on
 *     the potential target's team.
 *
 * - 'Team Dead Members'
 *   - Returns a number value indicating how many dead members there are on
 *     the potential target's team.
 * 
 * - When no keyword matches are found, the comparison value will be
 *   interpreted as JavaScript code. If the JavaScript code fails, it will
 *   default to a 0 value.
 * 
 *   *NOTE* JavaScript cannot be used without comparison operators to reduce
 *   error. This means if you want to check if a switch is on or not, don't
 *   simply use "$gameSwitches.value(42)" as it does not have any comparison
 *   operators. Instead, use "$gameSwitches.value(42) === true" to check.
 *
 *   *NOTE* To make any of these conditions base off of the user instead, add
 *   the word 'user' before the condition as such:
 *
 *   user hp% >= 0.50
 *   user atk buff stacks === 2
 *   user team alive members < 3
 *
 * ---
 *
 * Always
 *
 * - Going to be valid no matter what.
 *
 * ---
 *
 * x% Chance
 * 
 * - Replace 'x' with a number value representing the percent chance this skill
 *   would pass as valid.
 *
 * ---
 *
 * Switch x On
 * Switch x Off
 *
 * - Replace 'x' with the ID of the switch to check as ON/OFF.
 *
 * ---
 *
 * User is Actor
 * User is Enemy
 * Target is Actor
 * Target is Enemy
 *
 * - Requires the user or potential target to be an actor/enemy.
 *
 * ---
 *
 * User Has State id
 * User Has State name
 * Target Has State id
 * Target Has State name
 *
 * - Replace 'id' with the ID of the state the user or potential target needs
 *   to have.
 * - Replace 'name' with the name of the state the target needs to have.
 *
 * ---
 *
 * User Not State id
 * User Not State name
 * Target Not State id
 * Target Not State name
 *
 * - Replace 'id' with the ID of the state the user or potential target
 *   cannot have.
 * - Replace 'name' with the name of the state the target cannot have.
 *
 * ---
 *
 * User Has param Buff 
 * User Has param Debuff 
 * Target Has param Buff 
 * Target Has param Debuff 
 *
 * - Requires user or potential target to have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Has param Max Buff 
 * User Has param Max Debuff
 * Target Has param Max Buff 
 * Target Has param Max Debuff
 *
 * - Requires potential user or target to have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Buff 
 * User Not param Debuff 
 * Target Not param Buff 
 * Target Not param Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at any stack level.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * User Not param Max Buff 
 * User Not param Max Debuff 
 * Target Not param Max Buff 
 * Target Not param Max Debuff 
 *
 * - Requires user or potential target to not have the associated parameter 
 *   buff/debuff at maxed out stacks.
 * - Replace 'param' with 'ATK', 'DEF', 'MAT', 'MDF', 'AGI', 'LUK'
 *
 * ---
 *
 * === A.I. => TGR Weight Notetags ===
 *
 * You can set how much influence on TGR weights actors and enemies will place
 * when determining valid targets for their actions.
 *
 * ---
 *
 * <AI Element Rate Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the element rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI Element Rate Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in element rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI EVA Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the EVA rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI EVA Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in EVA rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 *
 * <AI MEV Influence: x.x>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets how much TGR weight influence is given based on the MEV rate.
 * - Replace 'x.x' with a numberic value representing the influence rate.
 *
 * ---
 *
 * <Bypass AI MEV Influence>
 *
 * - Used for: Actor, Enemy Notetags
 * - Makes the actor/enemy not factor in MEV rates when calculating TGR
 *   weights to determine action targets.
 *
 * ---
 * 
 * === Specific A.I. Targeting Notetags ===
 * 
 * Specific A.I. targeting means the user will ignore any TGR influences when
 * it comes to pick out of a group of valid candidates to come down to one
 * target. This only affects skills where the user must select a specific
 * target, meaning it will ignore the effects of random and AoE scopes.
 * 
 * ---
 *
 * <AI Target: type>
 *
 * - Used for: Skill Notetags
 * - Bypasses TGR influence in favor of picking a specific target out of a
 *   group of valid targets (does not pick from outside the valid target group)
 *   for a skill target.
 * - Replace 'type' with any of the following:
 * 
 *   ----------------------------   -------------------------------------------
 *   Type                           Description
 *   ----------------------------   -------------------------------------------
 *   User                           Always picks the user if available
 *   First                          Always picks the first valid candidate
 *   Last                           Always picks the last valid candidate
 *   ----------------------------   -------------------------------------------
 *   Highest Level                  Picks candidate with highest level
 *   ----------------------------   -------------------------------------------
 *   Highest MaxHP                  Picks candidate with highest MaxHP
 *   Highest HP                     Picks candidate with highest current HP
 *   Highest HP%                    Picks candidate with highest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxMP                  Picks candidate with highest MaxMP
 *   Highest MP                     Picks candidate with highest current MP
 *   Highest MP%                    Picks candidate with highest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest MaxTP                  Picks candidate with highest MaxTP
 *   Highest TP                     Picks candidate with highest current TP
 *   Highest TP%                    Picks candidate with highest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Highest ATK                    Picks candidate with highest ATK parameter
 *   Highest DEF                    Picks candidate with highest DEF parameter
 *   Highest MAT                    Picks candidate with highest MAT parameter
 *   Highest MDF                    Picks candidate with highest MDF parameter
 *   Highest AGI                    Picks candidate with highest AGI parameter
 *   Highest LUK                    Picks candidate with highest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Highest HIT                    Picks candidate with highest HIT parameter
 *   Highest EVA                    Picks candidate with highest EVA parameter
 *   Highest CRI                    Picks candidate with highest CRI parameter
 *   Highest CEV                    Picks candidate with highest CEV parameter
 *   Highest MEV                    Picks candidate with highest MEV parameter
 *   Highest MRF                    Picks candidate with highest MRF parameter
 *   Highest CNT                    Picks candidate with highest CNT parameter
 *   Highest HRG                    Picks candidate with highest HRG parameter
 *   Highest MRG                    Picks candidate with highest MRG parameter
 *   Highest TRG                    Picks candidate with highest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Highest TGR                    Picks candidate with highest TGR parameter
 *   Highest GRD                    Picks candidate with highest GRD parameter
 *   Highest REC                    Picks candidate with highest REC parameter
 *   Highest PHA                    Picks candidate with highest PHA parameter
 *   Highest MCR                    Picks candidate with highest MCR parameter
 *   Highest TCR                    Picks candidate with highest TCR parameter
 *   Highest PDR                    Picks candidate with highest PDR parameter
 *   Highest MDR                    Picks candidate with highest MDR parameter
 *   Highest FDR                    Picks candidate with highest FDR parameter
 *   Highest EXR                    Picks candidate with highest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Highest State Count            Picks candidate with most states (any)
 *   Highest Positive State Count   Picks candidate with most positive states
 *   Highest Negative State Count   Picks candidate with most negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 *   Lowest Level                   Picks candidate with lowest level
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxHP                   Picks candidate with lowest MaxHP
 *   Lowest HP                      Picks candidate with lowest current HP
 *   Lowest HP%                     Picks candidate with lowest HP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxMP                   Picks candidate with lowest MaxMP
 *   Lowest MP                      Picks candidate with lowest current MP
 *   Lowest MP%                     Picks candidate with lowest MP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest MaxTP                   Picks candidate with lowest MaxTP
 *   Lowest TP                      Picks candidate with lowest current TP
 *   Lowest TP%                     Picks candidate with lowest TP ratio
 *   ----------------------------   -------------------------------------------
 *   Lowest ATK                     Picks candidate with lowest ATK parameter
 *   Lowest DEF                     Picks candidate with lowest DEF parameter
 *   Lowest MAT                     Picks candidate with lowest MAT parameter
 *   Lowest MDF                     Picks candidate with lowest MDF parameter
 *   Lowest AGI                     Picks candidate with lowest AGI parameter
 *   Lowest LUK                     Picks candidate with lowest LUK parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest HIT                     Picks candidate with lowest HIT parameter
 *   Lowest EVA                     Picks candidate with lowest EVA parameter
 *   Lowest CRI                     Picks candidate with lowest CRI parameter
 *   Lowest CEV                     Picks candidate with lowest CEV parameter
 *   Lowest MEV                     Picks candidate with lowest MEV parameter
 *   Lowest MRF                     Picks candidate with lowest MRF parameter
 *   Lowest CNT                     Picks candidate with lowest CNT parameter
 *   Lowest HRG                     Picks candidate with lowest HRG parameter
 *   Lowest MRG                     Picks candidate with lowest MRG parameter
 *   Lowest TRG                     Picks candidate with lowest TRG parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest TGR                     Picks candidate with lowest TGR parameter
 *   Lowest GRD                     Picks candidate with lowest GRD parameter
 *   Lowest REC                     Picks candidate with lowest REC parameter
 *   Lowest PHA                     Picks candidate with lowest PHA parameter
 *   Lowest MCR                     Picks candidate with lowest MCR parameter
 *   Lowest TCR                     Picks candidate with lowest TCR parameter
 *   Lowest PDR                     Picks candidate with lowest PDR parameter
 *   Lowest MDR                     Picks candidate with lowest MDR parameter
 *   Lowest FDR                     Picks candidate with lowest FDR parameter
 *   Lowest EXR                     Picks candidate with lowest EXR parameter
 *   ----------------------------   -------------------------------------------
 *   Lowest State Count             Picks candidate with least states (any)
 *   Lowest Positive State Count    Picks candidate with least positive states
 *   Lowest Negative State Count    Picks candidate with least negative states
 *   *Note: These require VisuMZ_1_SkillsStatesCore
 *   ----------------------------   -------------------------------------------
 * 
 * ---
 *
 * ============================================================================
 * Regarding $gameTroop.turnCount() for A.I. Conditions
 * ============================================================================
 * 
 * ---
 * 
 * Short Answer:
 *
 * Battle A.I. conditions do NOT support the conditions $gameTroop.turnCount()
 * or user.turnCount() or target.turnCount() for A.I. Conditions.
 * 
 * Instead, use RPG Maker MZ's built-in action editor's turn requirement to
 * make do with the same effect.
 *
 * ---
 * 
 * Long Answer:
 * 
 * The turnCount() functions are not valid for A.I. Conditions and disabled due
 * to all the problems they cause. The reason being is because actions are
 * determined before the turn count increases. This is how RPG Maker MZ handles
 * it by default.
 * 
 * The reason why this does not work is due to the following code found in
 * RPG Maker MZ's core scripts:
 * 
 *   Game_Battler.prototype.turnCount = function() {
 *       if (BattleManager.isTpb()) {
 *           return this._tpbTurnCount;
 *       } else {
 *           return $gameTroop.turnCount() + 1;
 *       }
 *   };
 * 
 * What that means the turn count will always be off by 1. So upon determining
 * the action initially, the match would come off as correct. However, as the
 * turn actually starts and reaches the enemy or actor's turn, the turn count
 * check would read differently and return incorrect information, causing the
 * battler to forfeit their actions.
 * 
 * This facet of RPG Maker MZ can be updated and changed, but it is better that
 * it doesn't in order to maintain compatibility with the rest of the plugins
 * available that utilize the turn counter.
 * 
 * The work around to this problem is, instead, to use the enemy database tab's
 * action editor and apply a Turn Condition to match the required turn instead.
 * You know, the thing with Skill and Rating, where you select which skill for
 * the enemy to use instead.
 * 
 * HOWEVER!
 * 
 * If you are willing to use an "Experimental" feature, aka one that is not
 * heavily tested and may potentially result in unintended side effects, go to:
 * 
 *  Plugin Parameters > A.I. General Settings > Experimental > On-The-Spot A.I.
 * 
 * And set that to "true" without the quotes. This will forcefully remove the
 * +1 towards the count and forcefully make enemies re-evaluate actions upon
 * the start of the string of their actions. This comes with some side effects
 * that will potentially give A.I. advantages or disadvantages depending on the
 * battle system type. Action Speed becomes something that can be abused as it
 * is normally something that is determined based on the queued actions. A.I.
 * can pick a high speed weak action and then switch it for a slow speed strong
 * action. There is no proper fix to this due to how on-the-spot A.I. works as
 * it is ill-fitted for speed-relative battle systems. You have been warned.
 * 
 * In the event that this Plugin Parameter IS enabled, then using the turnCount
 * JavaScript code should work again due to the normalization of how the turn
 * property is calculated.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. General Settings
 * ============================================================================
 *
 * These settings determine the global settings for general Battle A.I. usage.
 *
 * ---
 * 
 * A.I. Style
 * 
 *   Actor Style:
 *   - Which A.I. style do you want for referenced actors to use?
 *   - This does not apply to non-referenced actors.
 * 
 *   Enemy Style:
 *   - Which A.I. style do you want for enemies to use?
 * 
 *   Refer to the A.I. Styles list for a list of valid styles.
 * 
 * ---
 *
 * A.I. Level
 * 
 *   Actor A.I. Level:
 *   - Default A.I. level used for actor A.I.
 *   - Levels: 0-100. Higher is stricter.
 * 
 *   Enemy A.I. Level:
 *   - Default A.I. level used for enemy A.I.
 *   - Levels: 0-100. Higher is stricter.
 *
 * ---
 *
 * A.I. Ratings
 * 
 *   Actor Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 * 
 *   Enemy Rating Variance:
 *   - How much to allow variance from the A.I. rating by?
 *   - 0 for no variance. Higher numbers for more variance.
 *
 * ---
 *
 * Reference
 * 
 *   Actor => AI Reference:
 *   - Which enemy A.I. should the actor reference by default?
 *   - Use 0 for no references.
 *
 * ---
 *
 * Knowledge
 * 
 *   Learn Knowledge:
 *   - Requires enemies/actors to test the knowledge of the opponents before
 *     using specific conditions.
 * 
 *   Unknown Element Rate:
 *   - What should A.I. treat unknown element rates as?
 *
 * ---
 * 
 * Experimental
 * 
 *   On-The-Spot A.I.:
 *   - A.I. enemies/actors determine actions on the spot when it's their turn.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. Default Conditions
 * ============================================================================
 *
 * You can set certain conditions to be used as defaults for all skills that
 * lack the <All AI Conditions> and <Any AI Conditions>. If either of those
 * notetags exist, none of these defaults will be used for those skills. These
 * settings will allow you to set both 'All' and 'Any' conditions for defaults.
 *
 * ---
 *
 * Enable?
 * 
 *   All Conditions:
 *   - Create default 'ALL' conditions for all skills without any AI notetags?
 * 
 *   Any Conditions:
 *   - Create default 'ANY' conditions for all skills without any AI notetags?
 *
 * ---
 *
 * HP Damage
 * MP Damage
 * HP Recover
 * MP Recover
 * HP Drain
 * MP Drain
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *
 * ---
 *
 * Add State
 * Remove State
 * 
 *   All Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 * 
 *   Any Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * Add Buff
 * Remove Buff
 * Add Debuff
 * Remove Debuff
 * 
 *   All Conditions:
 *   - Default 'ANY' conditions used for related skills.
 *   - %1 - Dynamic values (ie param's).
 * 
 *   Any Conditions:
 *   - Default 'ALL' conditions used for related skills.
 *   - %1 - Dynamic values (ie state ID's).
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: A.I. => TGR Weight Settings
 * ============================================================================
 *
 * These Plugin Parameters allow you to set whether or not you'd like for 
 * weight influence when deciding targets for actions and how much to influence
 * the TGR weight by.
 *
 * ---
 *
 * Weight
 * 
 *   Element Rate => TGR:
 *   - Makes all A.I. consider elemental rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence elemental rates have on
 *       TGR weight.
 * 
 *   EVA Rate => TGR:
 *   - Makes all A.I. consider EVA rates when considering TGR weight
 *     by default?
 * 
 *     Influence Rate:
 *     - This determines the default level of influence EVA rates have on
 *       TGR weight.
 * 
 *   MEV Rate => TGR:
 *   - Makes all A.I. consider MEV rates when considering TGR weight
 *     by default?
 * 
 *   Influence Rate:
 *   - This determines the default level of influence MEV rates have on
 *     TGR weight.
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
 * Version 1.17: May 12, 2022
 * * Feature Update!
 * ** Better RNG calculation when using the x% Chance conditional. Update made
 *    by Arisu.
 * 
 * Version 1.16: February 24, 2022
 * * Feature Update!
 * ** Randomization between zero variance A.I. is now better.
 * ** A.I. will no longer keep unusable skills in a skill queue and replace
 *    them with new ones.
 * 
 * Version 1.15: December 2, 2021
 * * Compatibility Update!
 * ** AI for skills and items should now work if their scope is
 *    <Target: All Allies But User>. Update made by Irina.
 * 
 * Version 1.14: October 21, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * ** Notetag section "Condition List" updated with the following:
 * *** *NOTE* JavaScript cannot be used without comparison operators to reduce
 *     error. This means if you want to check if a switch is on or not, don't
 *     simply use "$gameSwitches.value(42)" as it does not have any comparison
 *     operators. Instead, use "$gameSwitches.value(42) === true" to check.
 * ** Updated section "Regarding $gameTroop.turnCount() for A.I. Conditions"
 * * New Experimental Feature!
 * ** New Plugin Parameter added by Yanfly:
 * *** A.I. General Settings > Experimental > On-The-Spot A.I.
 * **** A.I. enemies/actors determine actions on the spot when it's their turn.
 * **** Functions akin to YEP's Battle A.I. Core where enemies determine new
 *      actions on the spot. Doing so will forcefully change the way the Turn
 *      Count is handled for Game_Battler to not utilize the +1.
 * **** This will forcefully remove the +1 towards the count and forcefully
 *      make enemies re-evaluate actions upon the start of the string of their
 *      actions. This comes with some side effects that will potentially give
 *      A.I. advantages or disadvantages depending on the battle system type.
 *      Action Speed becomes something that can be abused as it is normally
 *      something that is determined based on the queued actions. A.I. can pick
 *      a high speed weak action and then switch it for a slow speed strong
 *      action. There is no proper fix to this due to how on-the-spot A.I.
 *      works as it is ill-fitted for speed-relative battle systems. You have
 *      been warned.
 * **** In the event that this Plugin Parameter IS enabled, then using the
 *      turnCount JavaScript code should work again due to the normalization of
 *      how the turn property is calculated.
 * * Optimization Update!
 * ** Updated last version's newest change to be more optimized and occur upon
 *    each iteration of a new subject being determined to account for better
 *    check timing. Update made by Yanfly.
 * 
 * Version 1.13: October 13, 2021
 * * Feature Update!
 * ** A.I. Battlers with no currently determined actions, upon the start of the
 *    time frame for what would be their action, will have one more chance of
 *    determining a new action to use as to not waste their turns.
 * ** This does NOT mean that the A.I. Battlers will adjust their actions for
 *    one with a higher rating. The readjustment will only occur if there are
 *    no actions determined for that instance and only a one time window upon
 *    the start of the time frame for what would be their action.
 * ** Update made by Arisu.
 * 
 * Version 1.12: October 7, 2021
 * * Documentation Update!
 * ** Added section "Regarding $gameTroop.turnCount() for A.I. Conditions".
 * * Feature Update!
 * ** Any A.I. Conditions found with "turnCount()" will be automatically
 *    disabled in order to reduce confusion. This is due to how turnCount()
 *    functions do not accurately depict the current Turn Count depending on
 *    when the function runs. Update made by Olivia.
 * 
 * Version 1.11: September 30, 2021
 * * Bug Fixes!
 * ** Patched up a rare occurance of predetermined actions still having
 *    priority despite having no valid targets. Fix made by Olivia.
 * 
 * Version 1.10: September 23, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Olivia.
 * 
 * Version 1.09: July 9, 2021
 * * Bug Fixes!
 * ** Fixed a bug that caused "highest" and "lowest" target schemes to be
 *    inverted. Fix made by Arisu.
 * 
 * Version 1.08: April 16, 2021
 * * Feature Update!
 * ** Cached randomization seeds should no longer conflict with certain scope
 *    types. Update made by Irina.
 * * Optimization Update!
 * ** Plugin should run more optimized.
 * 
 * Version 1.07: January 22, 2021
 * * Bug Fixes!
 * ** <AI Target: x> notetags should no longer crashes. Fix made by Irina.
 * 
 * Version 1.06: January 8, 2021
 * * Feature Update!
 * ** For those using classic mode with a variance level of 0, action lists
 *    will be better shuffled to provide more variation between selected
 *    skills. Update made by Irina.
 * 
 * Version 1.05: December 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New notetag added by Yanfly!
 * *** <AI Target: type>
 * **** Bypasses TGR influence in favor of picking a specific target out of a
 *      group of valid targets (does not pick from outside the valid target
 *      group) for a skill target. Read documentation to see targeting types.
 * 
 * Version 1.04: December 18, 2020
 * * Documentation Update!
 * ** Added documentation for notetag <Reference AI: Enemy id>
 * *** - Actors are only able to use skills they would normally have access to.
 *       - Actors need to have LEARNED the skill.
 *       - Actors need to be able to access the skill's SKILL TYPE.
 *       - Actors need to have the RESOURCES to pay for the skill.
 *     - If you cannot figure out why an auto battle actor cannot use a
 *       specific skill, turn OFF auto battle and see if you can use the skill
 *       normally.
 * 
 * Version 1.03: December 4, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.02: November 1, 2020
 * * Bug Fixes!
 * ** Charmed battlers will no longer vanish when attack one another. Fix made
 *    by Yanfly.
 * 
 * Version 1.01: October 18, 2020
 * * Bug Fixes!
 * ** <All AI Conditiosn> and <Any AI Conditions> notetags are now fixed and
 *    should work properly. Fix made by Yanfly.
 *
 * Version 1.00: September 30, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleAI
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param General:struct
 * @text A.I. General Settings
 * @type struct<General>
 * @desc General settings pertaining to A.I.
 * @default {"AIStyle":"","ActorStyleAI:str":"classic","EnemyStyleAI:str":"classic","AILevel":"","ActorAILevel:num":"100","EnemyAILevel:num":"100","AIRating":"","ActorRatingVariance:num":"1","EnemyRatingVariance:num":"3","Reference":"","ActorAIReference:num":"0","Knowledge":"","LearnKnowledge:eval":"true","UnknownElementRate:num":"1.00"}
 *
 * @param Default:struct
 * @text A.I. Default Conditions
 * @type struct<Default>
 * @desc Give certain types of skills default conditions.
 * @default {"Enable?":"","EnableAllCon:eval":"true","EnableAnyCon:eval":"true","HpDamage":"","HpDamageAll:json":"\"\"","HpDamageAny:json":"\"Always\"","MpDamage":"","MpDamageAll:json":"\"Target MP > 0\"","MpDamageAny:json":"\"\"","HpRecover":"","HpRecoverAll:json":"\"\"","HpRecoverAny:json":"\"Target HP < Target MaxHP\"","MpRecover":"","MpRecoverAll:json":"\"\"","MpRecoverAny:json":"\"Target MP < Target MaxMP\"","HpDrain":"","HpDrainAll:json":"\"\"","HpDrainAny:json":"\"User HP < User MaxHP\"","MpDrain":"","MpDrainAll:json":"\"Target MP > 0\"","MpDrainAny:json":"\"\"","AddState":"","AddStateAll:json":"\"\"","AddStateAny:json":"\"Target Not State %1\\nTarget State %1 Turns <= 1\"","RemoveState":"","RemoveStateAll:json":"\"\"","RemoveStateAny:json":"\"Target Has State %1\"","AddBuff":"","AddBuffAll:json":"\"\"","AddBuffAny:json":"\"Target Not %1 Max Buff\\nTarget %1 Buff Turns <= 1\"","RemoveBuff":"","RemoveBuffAll:json":"\"\"","RemoveBuffAny:json":"\"Target Has %1 Buff\"","AddDebuff":"","AddDebuffAll:json":"\"\"","AddDebuffAny:json":"\"Target Not %1 Max Debuff\\nTarget %1 Debuff Turns <= 1\"","RemoveDebuff":"","RemoveDebuffAll:json":"\"\"","RemoveDebuffAny:json":"\"Target Has %1 Debuff\""}
 *
 * @param Weight:struct
 * @text A.I. => TGR Weight
 * @type struct<Weight>
 * @desc How do certain properties translate to TGR weight?
 * @default {"ElementTgr:eval":"true","ElementTgrRate:num":"1.25","EvaTgr:eval":"true","EvaTgrRate:num":"1.50","MevTgr:eval":"true","MevTgrRate:num":"2.00"}
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
 * A.I. General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param AIStyle
 * @text A.I. Style
 *
 * @param ActorStyleAI:str
 * @text Actor Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for referenced actors to use?
 * This does not apply to non-referenced actors.
 * @default classic
 *
 * @param EnemyStyleAI:str
 * @text Enemy Style
 * @parent AIStyle
 * @type select
 * @option Classic (Rating-Based with Rating Variance)
 * @value classic
 * @option Gambit (Order-Based, Ignores Rating System)
 * @value gambit
 * @option Casual (Random but follows A.I. Conditions)
 * @value casual
 * @option Random (Pure Random, ignores A.I. Conditions)
 * @value random
 * @desc Which A.I. style do you want for enemies to use?
 * @default classic
 *
 * @param AILevel
 * @text A.I. Level
 *
 * @param ActorAILevel:num
 * @text Actor A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for actor A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param EnemyAILevel:num
 * @text Enemy A.I. Level
 * @parent AILevel
 * @type number
 * @min 0
 * @max 100
 * @desc Default A.I. level used for enemy A.I.
 * Levels: 0-100. Higher is stricter.
 * @default 100
 *
 * @param AIRating
 * @text A.I. Ratings
 *
 * @param ActorRatingVariance:num
 * @text Actor Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 1
 *
 * @param EnemyRatingVariance:num
 * @text Enemy Rating Variance
 * @parent AIRating
 * @type number
 * @min 0
 * @max 9
 * @desc How much to allow variance from the A.I. rating by?
 * 0 for no variance. Higher numbers for more variance.
 * @default 3
 *
 * @param Reference
 *
 * @param ActorAIReference:num
 * @text Actor => AI Reference
 * @parent Reference
 * @type enemy
 * @desc Which enemy A.I. should the actor reference by default?
 * Use 0 for no references.
 * @default 0
 *
 * @param Knowledge
 *
 * @param LearnKnowledge:eval
 * @text Learn Knowledge
 * @parent Knowledge
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Requires enemies/actors to test the knowledge of
 * the opponents before using specific conditions.
 * @default true
 *
 * @param UnknownElementRate:num
 * @text Unknown Element Rate
 * @parent LearnKnowledge:eval
 * @desc What should A.I. treat unknown element rates as?
 * @default 1.00
 * 
 * @param Experimental
 * 
 * @param OnSpotAI:eval
 * @text On-The-Spot A.I.
 * @parent Experimental
 * @type boolean
 * @on Enabled
 * @off Disabled
 * @desc A.I. enemies/actors determine actions on the
 * spot when it's their turn.
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. Default Conditions
 * ----------------------------------------------------------------------------
 */
/*~struct~Default:
 *
 * @param Enable?
 *
 * @param EnableAllCon:eval
 * @text All Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ALL' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param EnableAnyCon:eval
 * @text Any Conditions
 * @parent Enable?
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Create default 'ANY' conditions for all skills
 * without any AI notetags?
 * @default true
 *
 * @param HpDamage
 * @text HP Damage
 * 
 * @param HpDamageAll:json
 * @text All Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ALL' conditions used for HP damage skills.
 * @default ""
 * 
 * @param HpDamageAny:json
 * @text Any Conditions
 * @parent HpDamage
 * @type note
 * @desc Default 'ANY' conditions used for HP damage skills.
 * @default "Always"
 *
 * @param MpDamage
 * @text MP Damage
 * 
 * @param MpDamageAll:json
 * @text All Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ALL' conditions used for MP damage skills.
 * @default "Target MP > 0"
 *
 * @param MpDamageAny:json
 * @text Any Conditions
 * @parent MpDamage
 * @type note
 * @desc Default 'ANY' conditions used for MP damage skills.
 * @default ""
 *
 * @param HpRecover
 * @text HP Recover
 * 
 * @param HpRecoverAll:json
 * @text All Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ALL' conditions used for HP recovery skills.
 * @default ""
 *
 * @param HpRecoverAny:json
 * @text Any Conditions
 * @parent HpRecover
 * @type note
 * @desc Default 'ANY' conditions used for HP recovery skills.
 * @default "Target HP < Target MaxHP"
 *
 * @param MpRecover
 * @text MP Recover
 * 
 * @param MpRecoverAll:json
 * @text All Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ALL' conditions used for MP recovery skills.
 * @default ""
 *
 * @param MpRecoverAny:json
 * @text Any Conditions
 * @parent MpRecover
 * @type note
 * @desc Default 'ANY' conditions used for MP recovery skills.
 * @default "Target MP < Target MaxMP"
 *
 * @param HpDrain
 * @text HP Drain
 * 
 * @param HpDrainAll:json
 * @text All Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ALL' conditions used for HP drain skills.
 * @default ""
 *
 * @param HpDrainAny:json
 * @text Any Conditions
 * @parent HpDrain
 * @type note
 * @desc Default 'ANY' conditions used for HP drain skills.
 * @default "User HP < User MaxHP"
 *
 * @param MpDrain
 * @text MP Drain
 * 
 * @param MpDrainAll:json
 * @text All Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ALL' conditions used for MP drain skills.
 * @default "Target MP > 0"
 *
 * @param MpDrainAny:json
 * @text Any Conditions
 * @parent MpDrain
 * @type note
 * @desc Default 'ANY' conditions used for MP drain skills.
 * @default ""
 *
 * @param AddState
 * @text Add State
 * 
 * @param AddStateAll:json
 * @text All Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ALL' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddStateAny:json
 * @text Any Conditions
 * @parent AddState
 * @type note
 * @desc Default 'ANY' conditions used for adding states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not State %1\nTarget State %1 Turns <= 1"
 *
 * @param RemoveState
 * @text Remove State
 * 
 * @param RemoveStateAll:json
 * @text All Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ALL' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveStateAny:json
 * @text Any Conditions
 * @parent RemoveState
 * @type note
 * @desc Default 'ANY' conditions used for removing states.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has State %1"
 *
 * @param AddBuff
 * @text Add Buff
 * 
 * @param AddBuffAll:json
 * @text All Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ALL' conditions used for adding buffs.
 * %1 - Dynamic values (ie param names).
 * @default ""
 *
 * @param AddBuffAny:json
 * @text Any Conditions
 * @parent AddBuff
 * @type note
 * @desc Default 'ANY' conditions used for adding buffs.
 * %1 - Dynamic values (ie param's).
 * @default "Target Not %1 Max Buff\nTarget %1 Buff Turns <= 1"
 *
 * @param RemoveBuff
 * @text Remove Buff
 * 
 * @param RemoveBuffAll:json
 * @text All Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ALL' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveBuffAny:json
 * @text Any Conditions
 * @parent RemoveBuff
 * @type note
 * @desc Default 'ANY' conditions used for removing buffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Buff"
 *
 * @param AddDebuff
 * @text Add Debuff
 * 
 * @param AddDebuffAll:json
 * @text All Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ALL' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param AddDebuffAny:json
 * @text Any Conditions
 * @parent AddDebuff
 * @type note
 * @desc Default 'ANY' conditions used for adding debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Not %1 Max Debuff\nTarget %1 Debuff Turns <= 1"
 *
 * @param RemoveDebuff
 * @text Remove Debuff
 * 
 * @param RemoveDebuffAll:json
 * @text All Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ALL' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default ""
 *
 * @param RemoveDebuffAny:json
 * @text Any Conditions
 * @parent RemoveDebuff
 * @type note
 * @desc Default 'ANY' conditions used for removing debuffs.
 * %1 - Dynamic values (ie state ID's).
 * @default "Target Has %1 Debuff"
 *
 */
/* ----------------------------------------------------------------------------
 * A.I. => TGR Weight Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Weight:
 *
 * @param ElementTgr:eval
 * @text Element Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider elemental rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param ElementTgrRate:num
 * @text Influence Rate
 * @parent ElementTgr:eval
 * @desc This determines the default level of influence elemental
 * rates have on TGR weight.
 * @default 1.25
 *
 * @param EvaTgr:eval
 * @text EVA Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider EVA rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param EvaTgrRate:num
 * @text Influence Rate
 * @parent EvaTgr:eval
 * @desc This determines the default level of influence EVA
 * rates have on TGR weight.
 * @default 1.50
 *
 * @param MevTgr:eval
 * @text MEV Rate => TGR
 * @type boolean
 * @on Influence
 * @off Normal
 * @desc Makes all A.I. consider MEV rates when considering
 * TGR weight by default?
 * @default true
 *
 * @param MevTgrRate:num
 * @text Influence Rate
 * @parent MevTgr:eval
 * @desc This determines the default level of influence MEV
 * rates have on TGR weight.
 * @default 2.00
 *
 */
//=============================================================================

const _0x4ed6ae=_0x3e5b;(function(_0x23af4d,_0x3f28e0){const _0x11dd65=_0x3e5b,_0x27cbee=_0x23af4d();while(!![]){try{const _0x26801a=-parseInt(_0x11dd65(0x214))/0x1+-parseInt(_0x11dd65(0x305))/0x2*(-parseInt(_0x11dd65(0x2f4))/0x3)+-parseInt(_0x11dd65(0x303))/0x4+-parseInt(_0x11dd65(0x323))/0x5*(-parseInt(_0x11dd65(0x328))/0x6)+parseInt(_0x11dd65(0x324))/0x7+parseInt(_0x11dd65(0x25c))/0x8+-parseInt(_0x11dd65(0x1cb))/0x9;if(_0x26801a===_0x3f28e0)break;else _0x27cbee['push'](_0x27cbee['shift']());}catch(_0x2d7dde){_0x27cbee['push'](_0x27cbee['shift']());}}}(_0x3c37,0x38c24));var label=_0x4ed6ae(0x1f1),tier=tier||0x0,dependencies=[_0x4ed6ae(0x313)],pluginData=$plugins[_0x4ed6ae(0x336)](function(_0x43cc85){const _0x4d0c8d=_0x4ed6ae;return _0x43cc85[_0x4d0c8d(0x20a)]&&_0x43cc85[_0x4d0c8d(0x341)]['includes']('['+label+']');})[0x0];function _0x3e5b(_0x33a2cc,_0x2605f7){const _0x3c378d=_0x3c37();return _0x3e5b=function(_0x3e5bed,_0x213cc3){_0x3e5bed=_0x3e5bed-0x1ae;let _0x198ead=_0x3c378d[_0x3e5bed];return _0x198ead;},_0x3e5b(_0x33a2cc,_0x2605f7);}function _0x3c37(){const _0xd61090=['version','actor','getStateIdWithName','zYTNA','TRG','aiEvaTgr','isAutoBattle','EFFECT_RECOVER_MP','MAXTP','Yzebf','isForEveryone','_buffTurns','setSkill','_aiTgrInfluence','value1','reduce','isForFriend','isPlaytest','XJzsg','MP%','skillId','EVA','numActions','semve','MAX_SAFE_INTEGER','_bypassAiValidCheck','elementInfluence','actorId','JNkFl','startAction','EnableAnyCon','ARRAYNUM','CmzGl','orqZF','hasValidTargets','EFFECT_REMOVE_BUFF','actions','item','REC','createFilterTarget','indexOf','TaVWU','isActor','bQoMD','_regexp','JSON','General','attackElements','2447384tCaJUQ','AZCJB','The\x20following\x20line\x20is\x20not\x20supported\x20by\x20Battle\x20A.I.:\x0a\x0a','umYUC','remove','IkixH','ZlaCq','MVzFt','turnCount','opponentsUnit','KJuVq','isPhysical','currentAction','aiStyle','AGI','attackSkillId','doesTargetMeetAnyConditions','UifXx','aiApplyElementalTgrInfluenceRate','note','randomInt','tdOFv','Shacj','EXR','MEV','aiElementTgr','meetsCondition','sxzHw','getAnyConditions','elementId','exit','makeDeepCopy','randomTarget','hpRate','debuff','MijhY','ySiOq','vxGZu','sparam','LUK','For\x20more\x20information,\x20view\x20the\x20help\x20file.','EnemyAILevel','makeAutoBattleActions','HRG','getEnemyIdWithName','EFFECT_ADD_BUFF','Default','dataId','meetsSwitchCondition','statesByCategory','determineActionByAIisStillValid','POSITIVE','wFpCN','initialize','gEPZY','ZGHct','checkSkillTargets','xlNmu','EVLWh','aiApplyEvaTgrInfluenceRate','clearAiTgrInfluence','canAttack','osBXB','evaRates','ARRAYJSON','isActionValid','initBattleAI','JTeJA','aiTgrInfluence','MDF','Game_Enemy_isActionValid','makeDefaultConditions','kIwDn','elementRate','log','rXfIT','parse','ImNcE','charAt','YZVio','KEEHD','EvaTgr','xparam','_aiKnowledge','dORMe','canUse','meetsStateCondition','BattleManager_getNextSubject','KnbwC','trim','ARRAYEVAL','clamp','cblPV','EKGxd','ATK','Game_Actor_makeAutoBattleActions','isConditionalAI','passesAILevel','ConvertParams','BfetQ','wEgwp','VuRfY','determineLineValue','TP%','elementRates','xCxVp','rating','isAggroAffected','MpDrain%1','currentClass','BQCVz','length','concat','isStateAffected','Settings','TCR','endAction','enemy','EFFECT_RECOVER_HP','EvaTgrRate','isMagical','determineNewValidAIAction','ActorStyleAI','addElementAIKnowledge','itemTargetCandidates','forceValidTargets','doesTargetMeetAllConditions','enemyId','getNextSubject','action','toUpperCase','MAXHP','EnableAllCon','bypassElementTgr','MDR','getDefaultAnyConditions','KtOnf','EMabE','aliveMembers','prototype','clearAIKnowledge','aiLevel','MANPn','mpRate','parameters','Game_Unit_initialize','fTkxX','buff','hSkYH','value','effects','Game_Battler_turnCount','237qnCmSz','bypassEvaTgr','match','EFFECT_ADD_DEBUFF','EVAL','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','LearnKnowledge','pvdJs','jtjtL','maxTp','LEVEL','elements','isForDeadFriend','_subject','aiMevTgr','1244364iVyesc','JxqzA','3932SMOQIP','elementInfluenceRate','Ykukl','The\x20reason\x20is\x20due\x20to\x20the\x20turnCount()\x20function.\x0a','ActorAILevel','HP%','anyCondition','name','LwIUT','tpRate','map','aiRatingVariance','nWVAJ','selectAllActions','VisuMZ_1_BattleCore','SHTOc','Any','mev','HpRecover%1','split','OJyBw','FTYvi','doesAIApplyMevTgrInfluence','floor','ilOBI','isEnemy','RemoveDebuff%1','VisuMZ_4_AggroControl','upTFV','NEGATIVE\x20STATE\x20COUNT','63395Yrlsxh','1959321fjVRkv','deadMembers','XqFJj','fXTfE','6BJmbNQ','This\x20is\x20a\x20static\x20class','CRI','HGAJi','MAXMP','keEys','OnSpotAI','friendsUnit','max','EFFECT_ADD_STATE','hbnbn','aiApplyMevTgrInfluenceRate','_stateIDs','odUgq','filter','BattleManager_endAction','ActorAIReference','PrbnY','getAllConditions','hasElementAIKnowledge','MpRecover%1','EFFECT_REMOVE_DEBUFF','setEnemyAction','cMfaU','isDetermineActionByAI','description','referenceEnemyForAI','VisuMZ_1_SkillsStatesCore','isForOpponent','ARRAYSTR','FIRST','wGYYi','evaInfluenceRate','format','states','GRD','MRF','PHA','ljeEb','push','ARRAYSTRUCT','forcedTargets','gambit','filterForcedTargeting','Game_Temp_initialize','determineTargetActionByAIisStillValid','AddState%1','DCUSh','_elementIDs','xwtrx','DPmLp','LAST','CNT','AI\x20Manager\x20could\x20not\x20determine\x20this\x20value:\x20%1','ALWAYS','makeAutoBattleActionsWithEnemyAI','toLowerCase','makeActions','POSITIVE\x20STATE\x20COUNT','meetsPartyLevelCondition','hasXParamAIKnowledge','aiTarget','clearActions','mevRates','PDR','zpSuB','RemoveState%1','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','TYpck','value2','slice','classic','HpDrain%1','addAIKnowledge','replace','hasForcedTargets','TEqHB','_stateTurns','doesAIApplyElementalTgrInfluence','Game_Action_makeTargets','Aorhc','VisuMZ_1_ElementStatusCore','includes','IbuAT','isMax%1Affected','allCondition','Game_Unit_randomTarget','selectAllActionsGambit','pjKqL','1826064Xgimju','xkQmx','Game_BattlerBase_sparam','TGR','EnemyRatingVariance','_rngChance','param','clearForcedTargets','mhp','_alertTurnCount','MpDamage%1','Plicr','jCdjQ','IJowq','UnknownElementRate','MRG','Game_Action_itemTargetCandidates','isSkill','aiKnowledge','DuSGp','qphdP','goSfq','applyBattleAI','isConfused','mevInfluenceRate','MAT','MhdUR','IouZX','%1\x20%2\x20%3','doesAIApplyEvaTgrInfluence','YVExr','isDebuffAffected','meetsHpCondition','code','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','elementIds','user','meetsTurnCondition','BattleAI','ShuffleArray','rRboZ','DEF','SHTvL','IMItw','applyBattleAiTgrInfluences','GWNLM','setup','type','call','ReFYA','doesTargetMeetCondition','selectAction','IFgFr','getElementIdWithName','JkPAd','selectAllActionsClassic','JIszY','DGRvw','casual','NUM','isBuffAffected','Game_Troop_setup','noCondition','status','oDTDo','FUNC','highestTgrMember','AI\x20Manager\x20condition\x20cannot\x20be\x20met:\x20%1','RemoveBuff%1','guardSkillId','getDefaultAllConditions','addXParamAIKnowledge','HdRMl','7348vSTuls','EFFECT_REMOVE_STATE','HIT','VisuMZ_2_AggroControlSystem','RvSUL','Game_Unit_aliveMembers','elementKnowledgeRate','Weight','random','level','makeTargets','_forceValidTargets','makeValidTargets','meetsMpCondition','eva','needsSelection','aFOPA','_applyAIForcedTargetFilters','is%1Affected','HpDamage%1','apply','damage','yasOF','subject'];_0x3c37=function(){return _0xd61090;};return _0x3c37();}VisuMZ[label]['Settings']=VisuMZ[label][_0x4ed6ae(0x2ce)]||{},VisuMZ[_0x4ed6ae(0x2be)]=function(_0x430ff3,_0x364537){const _0x43506a=_0x4ed6ae;for(const _0x294aa8 in _0x364537){if(_0x294aa8[_0x43506a(0x2f6)](/(.*):(.*)/i)){if(_0x43506a(0x1d6)===_0x43506a(0x290)){const _0xc5691d=this[_0x43506a(0x256)]()?this['actor']()['note']:this[_0x43506a(0x2d1)]()[_0x43506a(0x26f)];if(_0xc5691d[_0x43506a(0x2f6)](_0x477e5b[_0x43506a(0x258)][_0x43506a(0x302)]))return _0x236553(_0x4356e8['$1']);}else{const _0x10aa3e=String(RegExp['$1']),_0x18a41c=String(RegExp['$2'])[_0x43506a(0x2de)]()['trim']();let _0x2a8d2a,_0xfda222,_0x543bd4;switch(_0x18a41c){case _0x43506a(0x206):_0x2a8d2a=_0x364537[_0x294aa8]!==''?Number(_0x364537[_0x294aa8]):0x0;break;case _0x43506a(0x24b):_0xfda222=_0x364537[_0x294aa8]!==''?JSON[_0x43506a(0x2a8)](_0x364537[_0x294aa8]):[],_0x2a8d2a=_0xfda222[_0x43506a(0x30f)](_0x5366e3=>Number(_0x5366e3));break;case _0x43506a(0x2f8):_0x2a8d2a=_0x364537[_0x294aa8]!==''?eval(_0x364537[_0x294aa8]):null;break;case _0x43506a(0x2b6):_0xfda222=_0x364537[_0x294aa8]!==''?JSON['parse'](_0x364537[_0x294aa8]):[],_0x2a8d2a=_0xfda222[_0x43506a(0x30f)](_0x3d43dc=>eval(_0x3d43dc));break;case _0x43506a(0x259):_0x2a8d2a=_0x364537[_0x294aa8]!==''?JSON[_0x43506a(0x2a8)](_0x364537[_0x294aa8]):'';break;case _0x43506a(0x29c):_0xfda222=_0x364537[_0x294aa8]!==''?JSON['parse'](_0x364537[_0x294aa8]):[],_0x2a8d2a=_0xfda222[_0x43506a(0x30f)](_0x2752a7=>JSON[_0x43506a(0x2a8)](_0x2752a7));break;case _0x43506a(0x20c):_0x2a8d2a=_0x364537[_0x294aa8]!==''?new Function(JSON[_0x43506a(0x2a8)](_0x364537[_0x294aa8])):new Function('return\x200');break;case'ARRAYFUNC':_0xfda222=_0x364537[_0x294aa8]!==''?JSON['parse'](_0x364537[_0x294aa8]):[],_0x2a8d2a=_0xfda222[_0x43506a(0x30f)](_0x57d548=>new Function(JSON[_0x43506a(0x2a8)](_0x57d548)));break;case'STR':_0x2a8d2a=_0x364537[_0x294aa8]!==''?String(_0x364537[_0x294aa8]):'';break;case _0x43506a(0x345):_0xfda222=_0x364537[_0x294aa8]!==''?JSON[_0x43506a(0x2a8)](_0x364537[_0x294aa8]):[],_0x2a8d2a=_0xfda222[_0x43506a(0x30f)](_0x314721=>String(_0x314721));break;case'STRUCT':_0x543bd4=_0x364537[_0x294aa8]!==''?JSON['parse'](_0x364537[_0x294aa8]):{},_0x2a8d2a=VisuMZ[_0x43506a(0x2be)]({},_0x543bd4);break;case _0x43506a(0x350):_0xfda222=_0x364537[_0x294aa8]!==''?JSON['parse'](_0x364537[_0x294aa8]):[],_0x2a8d2a=_0xfda222[_0x43506a(0x30f)](_0x5deb1e=>VisuMZ['ConvertParams']({},JSON[_0x43506a(0x2a8)](_0x5deb1e)));break;default:continue;}_0x430ff3[_0x10aa3e]=_0x2a8d2a;}}}return _0x430ff3;},(_0x35a90c=>{const _0x1e7fc1=_0x4ed6ae,_0x4c4e9d=_0x35a90c[_0x1e7fc1(0x30c)];for(const _0x22ed7b of dependencies){if(!Imported[_0x22ed7b]){alert(_0x1e7fc1(0x2f9)['format'](_0x4c4e9d,_0x22ed7b)),SceneManager[_0x1e7fc1(0x27a)]();break;}}const _0x18a8c5=_0x35a90c[_0x1e7fc1(0x341)];if(_0x18a8c5[_0x1e7fc1(0x2f6)](/\[Version[ ](.*?)\]/i)){const _0x5bfe78=Number(RegExp['$1']);_0x5bfe78!==VisuMZ[label][_0x1e7fc1(0x22c)]&&(alert(_0x1e7fc1(0x1b5)['format'](_0x4c4e9d,_0x5bfe78)),SceneManager['exit']());}if(_0x18a8c5[_0x1e7fc1(0x2f6)](/\[Tier[ ](\d+)\]/i)){if(_0x1e7fc1(0x1f6)===_0x1e7fc1(0x1f6)){const _0x3e0302=Number(RegExp['$1']);if(_0x3e0302<tier)alert(_0x1e7fc1(0x1ed)[_0x1e7fc1(0x349)](_0x4c4e9d,_0x3e0302,tier)),SceneManager['exit']();else{if(_0x1e7fc1(0x357)!==_0x1e7fc1(0x357)){const _0x4d9c32=_0x1d169a(_0x3826a6['$1'])[_0x1e7fc1(0x2f6)](/(?:USER|SUBJECT)/i)?_0x111e8b:_0x1767bb;return _0x4d9c32[_0x1e7fc1(0x256)]();}else tier=Math[_0x1e7fc1(0x330)](_0x3e0302,tier);}}else _0x46c377[_0x1e7fc1(0x212)](_0x1e7fc1(0x29b),this);}VisuMZ[_0x1e7fc1(0x2be)](VisuMZ[label][_0x1e7fc1(0x2ce)],_0x35a90c[_0x1e7fc1(0x2ec)]);})(pluginData);function AIManager(){const _0x17f384=_0x4ed6ae;throw new Error(_0x17f384(0x329));}AIManager[_0x4ed6ae(0x258)]={'noCondition':/<NO AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'allCondition':/<ALL AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ALL AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'anyCondition':/<ANY AI (?:TARGETS|CONDITION|CONDITIONS)>\s*([\s\S]*)\s*<\/ANY AI (?:TARGETS|CONDITION|CONDITIONS)>/i,'bypassElementTgr':/<(?:NO|BYPASS) AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE>/i,'bypassEvaTgr':/<(?:NO|BYPASS) AI (?:EVA|EVASION) INFLUENCE>/i,'bypassMevTgr':/<(?:NO|BYPASS) AI (?:MEV|MAGIC EVASION) INFLUENCE>/i,'aiElementTgr':/<AI (?:ELEMENT|ELEMENTAL|ELEMENT RATE) INFLUENCE: (.*)>/i,'aiEvaTgr':/<AI (?:EVA|EVASION) INFLUENCE: (.*)>/i,'aiMevTgr':/<AI (?:MEV|MAGIC EVASION) INFLUENCE: (.*)>/i,'aiLevel':/<AI LEVEL: (\d+)>/i,'aiRatingVariance':/<AI RATING VARIANCE: (\d+)>/i,'aiTarget':/<AI (?:TARGET|TARGETS):[ ](.*)>/i,'aiStyle':/<AI STYLE:[ ](.*)>/i},AIManager['isConditionalAI']=function(_0x27c8c6){const _0x30b9ac=_0x4ed6ae;if(!_0x27c8c6)return![];return this[_0x30b9ac(0x33a)](_0x27c8c6)[_0x30b9ac(0x2cb)]>0x0||this[_0x30b9ac(0x278)](_0x27c8c6)['length']>0x0;},AIManager[_0x4ed6ae(0x33a)]=function(_0x26675e){const _0x3530aa=_0x4ed6ae;if(_0x26675e[_0x3530aa(0x26f)][_0x3530aa(0x2f6)](AIManager['_regexp']['noCondition'])){if('HGAJi'!==_0x3530aa(0x32b)){const _0x370505=_0x425a43['indexOf'](_0x3f6218(_0x430d82['$2'])[_0x3530aa(0x2de)]()[_0x3530aa(0x2b5)]()),_0x1c99a2=_0x31e248(_0x367883['$3'])[_0x3530aa(0x360)]()[_0x3530aa(0x2b5)](),_0x28f589=_0x33816f(_0x45ab1f['$1'])[_0x3530aa(0x2f6)](/(?:USER|SUBJECT)/i)?_0x5d0a1e:_0x35bf70,_0x24da22='isMax%1Affected'['format'](_0x1c99a2[_0x3530aa(0x2aa)](0x0)[_0x3530aa(0x2de)]()+_0x1c99a2[_0x3530aa(0x1b8)](0x1));return!_0x28f589[_0x24da22](_0x370505);}else return[];}else return _0x26675e['note'][_0x3530aa(0x2f6)](AIManager[_0x3530aa(0x258)][_0x3530aa(0x1c7)])?String(RegExp['$1'])['split'](/[\r\n]+/)[_0x3530aa(0x260)](''):this[_0x3530aa(0x211)](_0x26675e);},AIManager['getAnyConditions']=function(_0x35e1ab){const _0x2a0919=_0x4ed6ae;if(_0x35e1ab[_0x2a0919(0x26f)][_0x2a0919(0x2f6)](AIManager['_regexp']['noCondition']))return[];else return _0x35e1ab['note'][_0x2a0919(0x2f6)](AIManager['_regexp'][_0x2a0919(0x30b)])?String(RegExp['$1'])[_0x2a0919(0x318)](/[\r\n]+/)[_0x2a0919(0x260)](''):this[_0x2a0919(0x2e3)](_0x35e1ab);},AIManager['getDefaultAllConditions']=function(_0x1eceea){const _0x4b7228=_0x4ed6ae;if(!VisuMZ[_0x4b7228(0x1f1)][_0x4b7228(0x2ce)]['Default'][_0x4b7228(0x2e0)])return[];if(_0x1eceea['note']['match'](AIManager[_0x4b7228(0x258)][_0x4b7228(0x30b)]))return[];return this[_0x4b7228(0x2a3)](_0x1eceea,'All');},AIManager[_0x4ed6ae(0x2e3)]=function(_0x1a6523){const _0x545eea=_0x4ed6ae;if(!VisuMZ[_0x545eea(0x1f1)][_0x545eea(0x2ce)][_0x545eea(0x28a)][_0x545eea(0x24a)])return[];if(_0x1a6523[_0x545eea(0x26f)][_0x545eea(0x2f6)](AIManager[_0x545eea(0x258)][_0x545eea(0x1c7)]))return[];return this['makeDefaultConditions'](_0x1a6523,_0x545eea(0x315));},AIManager['makeDefaultConditions']=function(_0x480fbb,_0x470c9a){const _0x39a3c1=_0x4ed6ae;if(!_0x480fbb)return[];const _0x5183fe=VisuMZ[_0x39a3c1(0x1f1)][_0x39a3c1(0x2ce)][_0x39a3c1(0x28a)],_0x438550=[_0x39a3c1(0x2df),_0x39a3c1(0x32c),_0x39a3c1(0x2ba),_0x39a3c1(0x1f4),_0x39a3c1(0x1e4),_0x39a3c1(0x2a1),_0x39a3c1(0x26a),'LUK'],_0x1bbe4c=_0x480fbb[_0x39a3c1(0x229)][_0x39a3c1(0x1fa)],_0x589491=_0x480fbb[_0x39a3c1(0x2f2)];let _0x1052f3=[],_0x452e8b='',_0x4363a6='';switch(_0x1bbe4c){case 0x1:_0x452e8b=_0x39a3c1(0x227)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case 0x2:_0x452e8b=_0x39a3c1(0x1d5)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3['concat'](_0x4363a6['split'](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case 0x3:_0x452e8b=_0x39a3c1(0x317)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case 0x4:_0x452e8b=_0x39a3c1(0x33c)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case 0x5:_0x452e8b=_0x39a3c1(0x1ba)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3['concat'](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case 0x6:_0x452e8b=_0x39a3c1(0x2c8)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)['remove'](''));break;}for(const _0x3efeb1 of _0x589491){if(_0x39a3c1(0x307)==='VQOkf')return _0x31e378(_0x27356b);else{if(!_0x3efeb1)continue;switch(_0x3efeb1[_0x39a3c1(0x1ec)]){case Game_Action[_0x39a3c1(0x2d2)]:if(_0x3efeb1[_0x39a3c1(0x23a)]>0x0||_0x3efeb1[_0x39a3c1(0x1b7)]>0x0)_0x452e8b='HpRecover%1'[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3['concat'](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));else{if(_0x3efeb1[_0x39a3c1(0x23a)]<0x0||_0x3efeb1[_0x39a3c1(0x1b7)]<0x0){if(_0x39a3c1(0x1e5)!==_0x39a3c1(0x1e5))return 0x0;else _0x452e8b=_0x39a3c1(0x227)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));}}break;case Game_Action[_0x39a3c1(0x233)]:if(_0x3efeb1[_0x39a3c1(0x23a)]>0x0||_0x3efeb1[_0x39a3c1(0x1b7)]>0x0)_0x452e8b=_0x39a3c1(0x33c)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)['remove'](''));else(_0x3efeb1[_0x39a3c1(0x23a)]<0x0||_0x3efeb1[_0x39a3c1(0x1b7)]<0x0)&&(_0x452e8b=_0x39a3c1(0x1d5)['format'](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b],_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)]('')));break;case Game_Action[_0x39a3c1(0x331)]:if(_0x3efeb1['dataId']===0x0)continue;_0x452e8b=_0x39a3c1(0x356)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b][_0x39a3c1(0x349)](_0x3efeb1[_0x39a3c1(0x28b)]),_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case Game_Action[_0x39a3c1(0x215)]:_0x452e8b=_0x39a3c1(0x1b4)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b]['format'](_0x3efeb1['dataId']),_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case Game_Action[_0x39a3c1(0x289)]:_0x452e8b='AddBuff%1'[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b][_0x39a3c1(0x349)](_0x438550[_0x3efeb1['dataId']]),_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case Game_Action[_0x39a3c1(0x2f7)]:_0x452e8b='AddDebuff%1'[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b]['format'](_0x438550[_0x3efeb1[_0x39a3c1(0x28b)]]),_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6['split'](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;case Game_Action[_0x39a3c1(0x24f)]:_0x452e8b=_0x39a3c1(0x20f)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b][_0x39a3c1(0x349)](_0x438550[_0x3efeb1[_0x39a3c1(0x28b)]]),_0x1052f3=_0x1052f3['concat'](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)['remove'](''));break;case Game_Action[_0x39a3c1(0x33d)]:_0x452e8b=_0x39a3c1(0x31f)[_0x39a3c1(0x349)](_0x470c9a),_0x4363a6=_0x5183fe[_0x452e8b][_0x39a3c1(0x349)](_0x438550[_0x3efeb1[_0x39a3c1(0x28b)]]),_0x1052f3=_0x1052f3[_0x39a3c1(0x2cc)](_0x4363a6[_0x39a3c1(0x318)](/[\r\n]+/)[_0x39a3c1(0x260)](''));break;}}}return _0x1052f3;},AIManager[_0x4ed6ae(0x2d9)]=function(_0x304699,_0x110c2b){const _0x1174c0=_0x4ed6ae;this[_0x1174c0(0x21f)]=this[_0x1174c0(0x220)](_0x304699,_0x110c2b);},AIManager[_0x4ed6ae(0x1d2)]=function(){const _0x50f69a=_0x4ed6ae;this[_0x50f69a(0x21f)]=[];},AIManager[_0x4ed6ae(0x351)]=function(){const _0x55f589=_0x4ed6ae;return this[_0x55f589(0x21f)]=this[_0x55f589(0x21f)]||[],this[_0x55f589(0x21f)];},AIManager[_0x4ed6ae(0x1bd)]=function(){const _0x4b137a=_0x4ed6ae;return this['forcedTargets']()[_0x4b137a(0x2cb)]>0x0;},AIManager[_0x4ed6ae(0x24e)]=function(_0x40f73d,_0x1b54c8){const _0x25ccc3=_0x4ed6ae;if(!_0x40f73d)return![];if(!_0x1b54c8)return![];if(!DataManager['isSkill'](_0x1b54c8))return;if(this[_0x25ccc3(0x2bc)](_0x1b54c8))return'IJowq'!==_0x25ccc3(0x1d8)?_0x52bf83['hpRate']():this[_0x25ccc3(0x220)](_0x40f73d,_0x1b54c8)[_0x25ccc3(0x2cb)]>=0x1;else{if(_0x25ccc3(0x204)!==_0x25ccc3(0x204))this['_applyAIForcedTargetFilters']=![],this[_0x25ccc3(0x2e8)]();else return!![];}},AIManager[_0x4ed6ae(0x220)]=function(_0x2058e8,_0x3cd34c){const _0x414e12=_0x4ed6ae;let _0x4ce4f9=[];if(this[_0x414e12(0x2bc)](_0x3cd34c)){if(_0x414e12(0x29f)!==_0x414e12(0x1b3)){const _0x2f32a9=this[_0x414e12(0x33a)](_0x3cd34c),_0x20f1c0=this[_0x414e12(0x278)](_0x3cd34c),_0x2a2523=new Game_Action(_0x2058e8);_0x2a2523[_0x414e12(0x238)](_0x3cd34c['id']);let _0xeaa4b5=AIManager[_0x414e12(0x294)](_0x2058e8,_0x2a2523);this[_0x414e12(0x1d0)]=Math['random'](),_0x4ce4f9=_0xeaa4b5[_0x414e12(0x336)](_0x11fc58=>this['doesTargetMeetAIConditions'](_0x2058e8,_0x11fc58,_0x3cd34c,_0x2f32a9,_0x20f1c0));}else return _0x50383e(_0x20df54['$1']);}return _0x4ce4f9;},AIManager[_0x4ed6ae(0x294)]=function(_0x42eac2,_0x5b3431){const _0x7c2b4f=_0x4ed6ae;let _0x4f30fc=[];if(Imported[_0x7c2b4f(0x217)]&&_0x5b3431[_0x7c2b4f(0x2c7)]()){const _0x42ed00=_0x5b3431['isForOpponent']()?_0x42eac2[_0x7c2b4f(0x265)]():_0x42eac2[_0x7c2b4f(0x32f)]();_0x4f30fc=[_0x42ed00[_0x7c2b4f(0x20d)]()];}else{if(_0x5b3431[_0x7c2b4f(0x236)]()){if(_0x7c2b4f(0x20b)!==_0x7c2b4f(0x20b))return _0x5abd46['prototype'][_0x7c2b4f(0x1fe)][_0x7c2b4f(0x1fb)](this,_0x5436c1,_0x39d81e);else _0x4f30fc=$gameParty[_0x7c2b4f(0x2e6)]()['concat']($gameTroop['aliveMembers']());}else{if(_0x5b3431[_0x7c2b4f(0x344)]()){if('QqRkO'===_0x7c2b4f(0x1de)){const _0x2f260d=_0x1e1e0f[_0x58931e];return _0x2f260d&&_0x2f260d['autoRemovalTiming']===0x0?_0x562396[_0x7c2b4f(0x244)]:_0x469627[_0x7c2b4f(0x1bf)][_0xfd6d5]||0x0;}else _0x4f30fc=_0x42eac2['opponentsUnit']()[_0x7c2b4f(0x2e6)]();}else{if(_0x5b3431[_0x7c2b4f(0x300)]())_0x4f30fc=_0x42eac2[_0x7c2b4f(0x32f)]()[_0x7c2b4f(0x325)]();else{if(_0x5b3431[_0x7c2b4f(0x23c)]()&&!_0x5b3431['isForDeadFriend']()){if(_0x7c2b4f(0x2ee)===_0x7c2b4f(0x33f)){if(this[_0x7c2b4f(0x256)]()||this[_0x7c2b4f(0x31e)]()){const _0x11a894=this[_0x7c2b4f(0x256)]()?this[_0x7c2b4f(0x22d)]()[_0x7c2b4f(0x26f)]:this['enemy']()[_0x7c2b4f(0x26f)];if(_0x11a894[_0x7c2b4f(0x2f6)](_0x36bb68[_0x7c2b4f(0x258)]['bypassMevTgr']))return![];else{if(_0x11a894[_0x7c2b4f(0x2f6)](_0x4beb70[_0x7c2b4f(0x258)][_0x7c2b4f(0x302)]))return this[_0x7c2b4f(0x333)]()>0x0;}}return _0x11cb62[_0x7c2b4f(0x1f1)][_0x7c2b4f(0x2ce)][_0x7c2b4f(0x21b)][_0x7c2b4f(0x2ad)];}else _0x4f30fc=_0x42eac2[_0x7c2b4f(0x32f)]()[_0x7c2b4f(0x2e6)]();}}}}}return _0x4f30fc;},AIManager['doesTargetMeetAIConditions']=function(_0x372a27,_0x464e06,_0x7b1207,_0x178fef,_0x46eed9){const _0x3162a1=_0x4ed6ae;return this[_0x3162a1(0x2da)](_0x372a27,_0x464e06,_0x7b1207,_0x178fef)&&this[_0x3162a1(0x26c)](_0x372a27,_0x464e06,_0x7b1207,_0x46eed9);},AIManager[_0x4ed6ae(0x2da)]=function(_0x247632,_0x1ebad3,_0x567e8b,_0x36c7e0){const _0x284716=_0x4ed6ae;if(_0x36c7e0[_0x284716(0x2cb)]<=0x0)return!![];for(const _0x48cb22 of _0x36c7e0){if(!_0x48cb22)continue;if(_0x48cb22[_0x284716(0x2cb)]<=0x0)continue;if(!this['passesAILevel'](_0x247632))return!![];if(!this['doesTargetMeetCondition'](_0x247632,_0x1ebad3,_0x567e8b,_0x48cb22))return![];}return!![];},AIManager[_0x4ed6ae(0x26c)]=function(_0x4827a9,_0x5228d1,_0x48ba62,_0x10ec73){const _0x27c767=_0x4ed6ae;if(_0x10ec73[_0x27c767(0x2cb)]<=0x0)return!![];for(const _0x40384e of _0x10ec73){if(_0x27c767(0x326)!==_0x27c767(0x326)){const _0x1aae8a=this[_0x27c767(0x22b)](),_0x523e5d=this[_0x27c767(0x251)]();let _0x2e0c74=_0x5bb16a[_0x27c767(0x1f1)][_0x27c767(0x1db)][_0x27c767(0x1fb)](this);if(_0x1aae8a['isDetermineActionByAI']()&&_0x498826[_0x27c767(0x24e)](_0x1aae8a,_0x523e5d)){let _0x2e5ce7=_0x1edcb7['makeValidTargets'](_0x1aae8a,_0x523e5d);_0x2e0c74=_0x2e0c74[_0x27c767(0x336)](_0x4f7c17=>_0x2e5ce7[_0x27c767(0x1c4)](_0x4f7c17));}return _0x2e0c74;}else{if(!_0x40384e)continue;if(_0x40384e[_0x27c767(0x2cb)]<=0x0)continue;if(!this[_0x27c767(0x2bd)](_0x4827a9))return!![];if(this[_0x27c767(0x1fd)](_0x4827a9,_0x5228d1,_0x48ba62,_0x40384e))return!![];}}return![];},AIManager[_0x4ed6ae(0x2bd)]=function(_0x102159){const _0x1196f4=_0x4ed6ae,_0x5b4210=_0x102159['aiLevel']();return Math[_0x1196f4(0x270)](0x64)<_0x5b4210;},AIManager[_0x4ed6ae(0x1fd)]=function(_0x2cb6a0,_0x2e5f28,_0x5d11a4,_0xa204e2){const _0xd72913=_0x4ed6ae,_0x3c7ec5=[_0xd72913(0x2df),_0xd72913(0x32c),'ATK',_0xd72913(0x1f4),_0xd72913(0x1e4),_0xd72913(0x2a1),_0xd72913(0x26a),'LUK'];if(_0xa204e2[_0xd72913(0x2de)]()[_0xd72913(0x2b5)]()===_0xd72913(0x35e))return!![];const _0x3a8943=_0x2cb6a0;if(!VisuMZ[_0xd72913(0x1f1)]['Settings'][_0xd72913(0x25a)][_0xd72913(0x32e)]){if(_0xa204e2['match'](/turnCount\(\)/i)){if($gameTemp[_0xd72913(0x23d)]()&&!this[_0xd72913(0x1d4)]){let _0x561f30=_0xd72913(0x25e);_0x561f30+=_0xa204e2+'\x0a\x0a',_0x561f30+=_0xd72913(0x308),_0x561f30+=_0xd72913(0x284),alert(_0x561f30),this[_0xd72913(0x1d4)]=!![];}return![];}}if(_0xa204e2[_0xd72913(0x2f6)](/(.*) (\>=|\>|===|!==|\<|\<=) (.*)/i)){const _0xc18b47=[String(RegExp['$1']),String(RegExp['$2']),String(RegExp['$3'])],_0x8b399c=this[_0xd72913(0x2c2)](_0x2cb6a0,_0x2e5f28,_0x5d11a4,_0xc18b47[0x0]),_0x20b8b0=_0xc18b47[0x1],_0x267d82=this[_0xd72913(0x2c2)](_0x2cb6a0,_0x2e5f28,_0x5d11a4,_0xc18b47[0x2]);window[_0xd72913(0x1ef)]=window['a']=window['b']=undefined;const _0x2e7cf4=_0xd72913(0x1e7)['format'](_0x8b399c,_0x20b8b0,_0x267d82);try{return eval(_0x2e7cf4);}catch(_0x17670f){if($gameTemp['isPlaytest']()){if(_0xd72913(0x201)==='JkPAd')console[_0xd72913(0x2a6)](_0xd72913(0x20e)[_0xd72913(0x349)](_0xa204e2)),console[_0xd72913(0x2a6)](_0x17670f);else{const _0x441c2b=this['isActor']()?this[_0xd72913(0x22d)]()[_0xd72913(0x26f)]:this['enemy']()[_0xd72913(0x26f)];if(_0x441c2b['match'](_0x453f7f[_0xd72913(0x258)][_0xd72913(0x310)]))return _0x11daf7(_0x2b9c2b['$1'])['clamp'](0x0,0x9);else{if(this[_0xd72913(0x256)]())return _0x3c5769['ActorRatingVariance'][_0xd72913(0x2b7)](0x0,0x9);else{if(this[_0xd72913(0x31e)]())return _0x1aa292[_0xd72913(0x1cf)]['clamp'](0x0,0x9);}}}}return!![];}}else{if(_0xa204e2[_0xd72913(0x2f6)](/(\d+\.?\d*)([%％]) CHANCE/i)){if(_0xd72913(0x271)!==_0xd72913(0x2c5)){const _0x1e3182=Number(RegExp['$1'])*0.01;return this[_0xd72913(0x1d0)]<_0x1e3182;}else this[_0xd72913(0x312)](_0x589d44);}else{if(_0xa204e2[_0xd72913(0x2f6)](/SWITCH (\d+) (ON|OFF|TRUE|FALSE)/i)){if(_0xd72913(0x1cc)!==_0xd72913(0x1cc)){const _0x887a46=_0x37c92d[_0x2bdbc9[_0xd72913(0x22e)](_0x5f4df2['$2'])],_0x192f03=_0x331f38(_0x17fec1['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x2bf0e9:_0x11d5a5;return _0x192f03[_0xd72913(0x34a)]()[_0xd72913(0x1c4)](_0x887a46);}else{const _0x5f5891=Number(RegExp['$1']),_0x303225=String(RegExp['$2'])[_0xd72913(0x360)](),_0x3f6510=_0x303225[_0xd72913(0x2f6)](/ON|TRUE/i);return $gameSwitches[_0xd72913(0x2f1)](_0x5f5891)===_0x3f6510;}}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) IS ACTOR/i)){if('GCIBZ'!==_0xd72913(0x266)){const _0x549a13=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28;return _0x549a13[_0xd72913(0x256)]();}else{_0x2a80e8=this[_0xd72913(0x21f)][0x0];for(const _0x1f3d85 of this[_0xd72913(0x21f)]){if(_0x292e5c&&_0x1f3d85[_0xd72913(0x2eb)]()>_0x254bf1[_0xd72913(0x2eb)]())_0x4fae8f=_0x1f3d85;if(_0x4e3fe7&&_0x1f3d85[_0xd72913(0x2eb)]()<_0x104fd7[_0xd72913(0x2eb)]())_0x1563bf=_0x1f3d85;}return _0x4717cf;}}else{if(_0xa204e2['match'](/(.*) IS ENEMY/i)){const _0x54d60b=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28;return _0x54d60b[_0xd72913(0x31e)]();}else{if(_0xa204e2['match'](/(.*) HAS STATE (\d+)/i)){const _0x1e3a86=$dataStates[Number(RegExp['$2'])],_0x3a6c55=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28;return _0x3a6c55[_0xd72913(0x34a)]()[_0xd72913(0x1c4)](_0x1e3a86);}else{if(_0xa204e2['match'](/(.*) HAS STATE (.*)/i)){const _0x276031=$dataStates[DataManager[_0xd72913(0x22e)](RegExp['$2'])],_0x37b22d=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28;return _0x37b22d[_0xd72913(0x34a)]()['includes'](_0x276031);}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) NOT STATE (\d+)/i)){const _0x1c827f=$dataStates[Number(RegExp['$2'])],_0x5d8c76=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28;return!_0x5d8c76[_0xd72913(0x34a)]()[_0xd72913(0x1c4)](_0x1c827f);}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) NOT STATE (.*)/i)){const _0x4ef57b=$dataStates[DataManager[_0xd72913(0x22e)](RegExp['$2'])],_0x20ae25=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28;return!_0x20ae25['states']()[_0xd72913(0x1c4)](_0x4ef57b);}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){const _0xe31f7=_0x3c7ec5[_0xd72913(0x254)](String(RegExp['$2'])[_0xd72913(0x2de)]()[_0xd72913(0x2b5)]()),_0x547a98=String(RegExp['$3'])['toLowerCase']()[_0xd72913(0x2b5)](),_0xa55a69=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28,_0x890a87='is%1Affected'[_0xd72913(0x349)](_0x547a98[_0xd72913(0x2aa)](0x0)[_0xd72913(0x2de)]()+_0x547a98[_0xd72913(0x1b8)](0x1));return _0xa55a69[_0x890a87](_0xe31f7);}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) HAS (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x12c09d=_0x3c7ec5['indexOf'](String(RegExp['$2'])['toUpperCase']()[_0xd72913(0x2b5)]()),_0x1388d8=String(RegExp['$3'])['toLowerCase']()[_0xd72913(0x2b5)](),_0x88d492=String(RegExp['$1'])['match'](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28,_0x5f12cc=_0xd72913(0x1c6)['format'](_0x1388d8[_0xd72913(0x2aa)](0x0)[_0xd72913(0x2de)]()+_0x1388d8[_0xd72913(0x1b8)](0x1));return _0x88d492[_0x5f12cc](_0x12c09d);}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF)/i)){if(_0xd72913(0x1c5)==='OKqoW'){const _0x1517ae=_0x4cdc10['aiLevel']();return _0x58a463[_0xd72913(0x270)](0x64)<_0x1517ae;}else{const _0x253a8a=_0x3c7ec5[_0xd72913(0x254)](String(RegExp['$2'])[_0xd72913(0x2de)]()['trim']()),_0xf9577=String(RegExp['$3'])[_0xd72913(0x360)]()[_0xd72913(0x2b5)](),_0x59d6ca=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28,_0x3f3f6d=_0xd72913(0x226)[_0xd72913(0x349)](_0xf9577['charAt'](0x0)[_0xd72913(0x2de)]()+_0xf9577[_0xd72913(0x1b8)](0x1));return!_0x59d6ca[_0x3f3f6d](_0x253a8a);}}else{if(_0xa204e2[_0xd72913(0x2f6)](/(.*) NOT (MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) MAX (BUFF|DEBUFF)/i)){const _0x5ea3c3=_0x3c7ec5[_0xd72913(0x254)](String(RegExp['$2'])[_0xd72913(0x2de)]()['trim']()),_0x52e34e=String(RegExp['$3'])['toLowerCase']()[_0xd72913(0x2b5)](),_0x24c09c=String(RegExp['$1'])[_0xd72913(0x2f6)](/(?:USER|SUBJECT)/i)?_0x3a8943:_0x2e5f28,_0x523d74=_0xd72913(0x1c6)[_0xd72913(0x349)](_0x52e34e[_0xd72913(0x2aa)](0x0)[_0xd72913(0x2de)]()+_0x52e34e[_0xd72913(0x1b8)](0x1));return!_0x24c09c[_0x523d74](_0x5ea3c3);}}}}}}}}}}}}}return!![];},AIManager['determineLineValue']=function(_0x52dbc6,_0x37c4c,_0x16d154,_0x5c095e){const _0x542428=_0x4ed6ae,_0x219798=[_0x542428(0x2df),_0x542428(0x32c),_0x542428(0x2ba),_0x542428(0x1f4),_0x542428(0x1e4),_0x542428(0x2a1),_0x542428(0x26a),'LUK'];window[_0x542428(0x1ef)]=_0x52dbc6,window['a']=user,window['b']=_0x37c4c;const _0x59ddbc=_0x5c095e,_0x8dc536=user['opponentsUnit']();let _0x28448e=_0x5c095e[_0x542428(0x2f6)](/(?:USER|SUBJECT)/i)?user:_0x37c4c;_0x5c095e=_0x5c095e[_0x542428(0x1bc)](/\b(\d+)([%％])/gi,(_0x4b1f25,_0x35d38c)=>Number(_0x35d38c)*0.01);if(_0x5c095e[_0x542428(0x2f6)](/(?:VAR|VARIABLE) (\d+)/i))return'kJwlQ'!==_0x542428(0x2fb)?$gameVariables[_0x542428(0x2f1)](Number(RegExp['$1'])):_0x3ba245[_0x542428(0x309)];if(_0x5c095e[_0x542428(0x2f6)](/TEAM ALIVE MEMBERS/i))return _0x28448e[_0x542428(0x32f)]()['aliveMembers']()['length'];if(_0x5c095e[_0x542428(0x2f6)](/TEAM DEAD MEMBERS/i))return _0x28448e[_0x542428(0x32f)]()[_0x542428(0x325)]()[_0x542428(0x2cb)];if(_0x5c095e[_0x542428(0x2f6)](/ELEMENT (\d+) RATE/i)){if(_0x542428(0x293)!==_0x542428(0x34e)){const _0x19b0c5=Number(RegExp['$1']);return this['elementKnowledgeRate'](_0x52dbc6,_0x37c4c,_0x28448e,_0x19b0c5);}else return _0x389ee7[_0x542428(0x2eb)]();}else{if(_0x5c095e[_0x542428(0x2f6)](/ELEMENT (.*) RATE/i)){if(_0x542428(0x2ab)===_0x542428(0x24d))return _0x26de21[_0x542428(0x237)][_0x4d8812];else{const _0x556e26=DataManager[_0x542428(0x200)](String(RegExp['$1']));return this[_0x542428(0x21a)](_0x52dbc6,_0x37c4c,_0x28448e,_0x556e26);}}else{if(_0x5c095e[_0x542428(0x2f6)](/(.*) ELEMENT RATE/i)){if(_0x542428(0x339)===_0x542428(0x277))return _0x20c175[_0x542428(0x1cf)][_0x542428(0x2b7)](0x0,0x9);else{const _0x42a784=DataManager['getElementIdWithName'](String(RegExp['$1']));return this[_0x542428(0x21a)](_0x52dbc6,_0x37c4c,_0x28448e,_0x42a784);}}}}if(_0x5c095e[_0x542428(0x2f6)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:LEVEL|STACK|STACKS)/i)){if(_0x542428(0x292)!==_0x542428(0x292)){_0x280e49=_0x51fa04[_0x542428(0x1f1)][_0x542428(0x1f2)](_0x2a451e);const _0x40b1e9=this['selectAction'](_0x50ac59,_0x49dd7f);this[_0x542428(0x2dd)](_0x2b10c2)[_0x542428(0x33e)](_0x40b1e9);}else{const _0x4d5464=_0x219798['indexOf'](String(RegExp['$1'])[_0x542428(0x2de)]()[_0x542428(0x2b5)]()),_0x147085=String(RegExp['$2'])['toLowerCase']()[_0x542428(0x2b5)]();return _0x28448e[_0x542428(0x2ef)](_0x4d5464)*(_0x147085===_0x542428(0x2ef)?0x1:-0x1);}}if(_0x5c095e[_0x542428(0x2f6)](/(MAXHP|MAXMP|ATK|DEF|MAT|MDF|AGI|LUK) (BUFF|DEBUFF) (?:TURN|TURNS)/i)){if(_0x542428(0x1f3)===_0x542428(0x1f3)){const _0x2c88b8=_0x219798[_0x542428(0x254)](String(RegExp['$1'])['toUpperCase']()[_0x542428(0x2b5)]()),_0x2b23e1=String(RegExp['$2'])[_0x542428(0x360)]()['trim']();if(_0x2b23e1===_0x542428(0x2ef)&&_0x28448e[_0x542428(0x207)](_0x2c88b8)){if(_0x542428(0x1df)!=='umwkY')return _0x28448e[_0x542428(0x237)][_0x2c88b8];else{if(this[_0x542428(0x256)]()||this[_0x542428(0x31e)]()){const _0x2a7efc=this[_0x542428(0x256)]()?this[_0x542428(0x22d)]()['note']:this[_0x542428(0x2d1)]()[_0x542428(0x26f)];if(_0x2a7efc[_0x542428(0x2f6)](_0x59e9de['_regexp'][_0x542428(0x231)]))return _0x397f31(_0x1b9a2e['$1']);}return _0x1d1518[_0x542428(0x1f1)][_0x542428(0x2ce)][_0x542428(0x21b)][_0x542428(0x2d3)];}}else{if(_0x2b23e1===_0x542428(0x27e)&&_0x28448e[_0x542428(0x1ea)](_0x2c88b8))return _0x28448e[_0x542428(0x237)][_0x2c88b8];}return 0x0;}else return _0x2f6d18[_0x542428(0x2fd)]();}if(_0x5c095e[_0x542428(0x2f6)](/STATE (\d+) (?:TURN|TURNS)/i)){const _0x1b6843=Number(RegExp['$1']);if(_0x28448e[_0x542428(0x2cd)](_0x1b6843)){if(_0x542428(0x2ac)===_0x542428(0x281))return _0x3f04f9;else{const _0x80329f=$dataStates[_0x1b6843];if(_0x80329f&&_0x80329f['autoRemovalTiming']===0x0){if(_0x542428(0x327)===_0x542428(0x327))return Number['MAX_SAFE_INTEGER'];else{const _0x5d0916=_0x157a99['currentAction']();if(!_0x5d0916||_0x5d0916&&!_0x5d0916[_0x542428(0x251)]())_0x1a74a3[_0x542428(0x361)]();else _0x4cce27[_0x542428(0x1f1)][_0x542428(0x2ce)][_0x542428(0x25a)][_0x542428(0x32e)]&&_0x102300[_0x542428(0x361)]();}}else return _0x28448e['_stateTurns'][_0x1b6843]||0x0;}}else return _0x28448e[_0x542428(0x34a)]()[_0x542428(0x1c4)]($dataStates[_0x1b6843])?Number[_0x542428(0x244)]:0x0;}else{if(_0x5c095e['match'](/STATE (.*) (?:TURN|TURNS)/i)){const _0x5c2b60=DataManager[_0x542428(0x22e)](RegExp['$1']);if(_0x28448e[_0x542428(0x2cd)](_0x5c2b60)){const _0x222678=$dataStates[_0x5c2b60];if(_0x222678&&_0x222678['autoRemovalTiming']===0x0)return _0x542428(0x2fc)===_0x542428(0x2fc)?Number[_0x542428(0x244)]:_0x4f4aee['BattleAI']['Game_Battler_turnCount'][_0x542428(0x1fb)](this);else{if(_0x542428(0x335)===_0x542428(0x1e6))_0x5113fc=this[_0x542428(0x22b)]()[_0x542428(0x25b)]();else return _0x28448e[_0x542428(0x1bf)][_0x5c2b60]||0x0;}}else return _0x28448e[_0x542428(0x34a)]()['includes']($dataStates[_0x5c2b60])?Number['MAX_SAFE_INTEGER']:0x0;}}if(_0x5c095e[_0x542428(0x2f6)](/\bHP([%％])/i)){if(_0x542428(0x314)!=='SHTOc'){let _0x3c8771=_0x4187ce[_0x542428(0x220)](_0x4ebe09,_0x1c10c8);_0x24699e=_0xe85c6b[_0x542428(0x336)](_0x3bf415=>_0x3c8771[_0x542428(0x1c4)](_0x3bf415));}else return _0x28448e[_0x542428(0x27d)]();}else{if(_0x5c095e[_0x542428(0x2f6)](/\bMP([%％])/i))return _0x28448e[_0x542428(0x2eb)]();else{if(_0x5c095e['match'](/\bTP([%％])/i)){if(_0x542428(0x263)!==_0x542428(0x2b8))return _0x28448e['tpRate']();else{this[_0x542428(0x1dd)]()[_0x54de6a]=this[_0x542428(0x1dd)]()[_0x307da6]||[];const _0x46180a=_0x50f7aa['isActor']()?_0x16207e[_0x542428(0x247)]():_0x38aeab[_0x542428(0x2db)]();!this[_0x542428(0x1dd)]()[_0x2f5cfd][_0x542428(0x1c4)](_0x46180a)&&this['aiKnowledge']()[_0x20f7fd]['push'](_0x46180a);}}else{if(_0x5c095e[_0x542428(0x2f6)](/\b(?:MAXHP|MAX HP|MHP)\b/i))return _0x28448e[_0x542428(0x1d3)];else{if(_0x5c095e[_0x542428(0x2f6)](/\b(?:MAXMP|MAX MP|MMP)\b/i))return _0x28448e['mmp'];else{if(_0x5c095e['match'](/\b(?:MAXTP|MAX TP|MTP)\b/i))return _0x28448e['maxTp']();}}}}}if(_0x5c095e[_0x542428(0x2f6)](/\b(LEVEL|HP|MP|TP|ATK|DEF|MAT|MDF|AGI|LUK)\b/i))return _0x28448e[String(RegExp['$1'])['toLowerCase']()[_0x542428(0x2b5)]()];try{return eval(_0x5c095e);}catch(_0x255e2d){return $gameTemp[_0x542428(0x23d)]()&&(console[_0x542428(0x2a6)](_0x542428(0x35d)[_0x542428(0x349)](_0x59ddbc)),console[_0x542428(0x2a6)](_0x255e2d)),0x0;}},AIManager[_0x4ed6ae(0x21a)]=function(_0x442ba6,_0x4633db,_0x2fd829,_0x30ce41){const _0x1eba59=_0x4ed6ae;if(_0x442ba6['isActor']()===_0x2fd829[_0x1eba59(0x256)]())return _0x2fd829[_0x1eba59(0x2a5)](_0x30ce41);else{if(_0x2fd829[_0x1eba59(0x265)]()[_0x1eba59(0x33b)](_0x30ce41,_0x2fd829)){if('TEqHB'===_0x1eba59(0x1be))return _0x2fd829[_0x1eba59(0x2a5)](_0x30ce41);else _0x243cd6*=this['applyBattleAiTgrInfluences']();}else return VisuMZ[_0x1eba59(0x1f1)][_0x1eba59(0x2ce)][_0x1eba59(0x25a)][_0x1eba59(0x1d9)];}},AIManager[_0x4ed6ae(0x353)]=function(_0x40e13c,_0x367630){const _0x490d12=_0x4ed6ae;if(!_0x367630)return;if(!_0x367630[_0x490d12(0x26f)][_0x490d12(0x2f6)](AIManager[_0x490d12(0x258)][_0x490d12(0x1af)]))return;const _0x117f7e=String(RegExp['$1'])[_0x490d12(0x2de)]()[_0x490d12(0x2b5)]();let _0x3b56dc=this[_0x490d12(0x253)](_0x40e13c,_0x117f7e);if(_0x3b56dc){if('xwtrx'===_0x490d12(0x359))this[_0x490d12(0x21f)]=[_0x3b56dc];else{let _0x5ad5d2=_0x1bdad0[_0x490d12(0x270)](_0x2786b8);for(const _0x5439a7 of _0x174def){_0x5ad5d2-=_0x5439a7[_0x490d12(0x2c6)]-_0x5eb40d;if(_0x5ad5d2<=0x0)return _0x5439a7;}}}},AIManager[_0x4ed6ae(0x253)]=function(_0x516da5,_0x5f382c){const _0x504ea6=_0x4ed6ae,_0x2b133a=[_0x504ea6(0x2df),'MAXMP',_0x504ea6(0x2ba),'DEF',_0x504ea6(0x1e4),_0x504ea6(0x2a1),_0x504ea6(0x26a),_0x504ea6(0x283)],_0x23e2b8=[_0x504ea6(0x216),_0x504ea6(0x241),_0x504ea6(0x32a),'CEV',_0x504ea6(0x274),_0x504ea6(0x34c),_0x504ea6(0x35c),_0x504ea6(0x287),_0x504ea6(0x1da),_0x504ea6(0x230)],_0x28327d=[_0x504ea6(0x1ce),_0x504ea6(0x34b),_0x504ea6(0x252),_0x504ea6(0x34d),'MCR',_0x504ea6(0x2cf),_0x504ea6(0x1b2),_0x504ea6(0x2e2),'FDR',_0x504ea6(0x273)];let _0x562056=null;if(_0x5f382c==='USER'){if(this[_0x504ea6(0x21f)][_0x504ea6(0x1c4)](_0x516da5))return _0x516da5;}else{if(_0x5f382c===_0x504ea6(0x346)){if('ZsDIw'===_0x504ea6(0x23e)){const _0x41eaae=_0xf8ac02[_0x504ea6(0x254)](_0x595d57(_0x4a7154['$2'])[_0x504ea6(0x2de)]()[_0x504ea6(0x2b5)]()),_0x3206ca=_0x4c6421(_0x21f512['$3'])[_0x504ea6(0x360)]()[_0x504ea6(0x2b5)](),_0x21ed9e=_0x2c215c(_0x15891f['$1'])[_0x504ea6(0x2f6)](/(?:USER|SUBJECT)/i)?_0x5ded22:_0x87453f,_0x5a5c24=_0x504ea6(0x1c6)[_0x504ea6(0x349)](_0x3206ca[_0x504ea6(0x2aa)](0x0)['toUpperCase']()+_0x3206ca['slice'](0x1));return _0x21ed9e[_0x5a5c24](_0x41eaae);}else return this[_0x504ea6(0x21f)][0x0];}else{if(_0x5f382c===_0x504ea6(0x35b)){if(_0x504ea6(0x35a)!==_0x504ea6(0x332))return this[_0x504ea6(0x21f)][this[_0x504ea6(0x21f)][_0x504ea6(0x2cb)]-0x1];else{const _0x58023d=_0x4ed112[_0x504ea6(0x254)](_0x2b2009);_0x473add=this['_forceValidTargets'][0x0];for(const _0xf101e9 of this['_forceValidTargets']){if(_0x21c92b&&_0xf101e9[_0x504ea6(0x1d1)](_0x58023d)>_0xa82b6e[_0x504ea6(0x1d1)](_0x58023d))_0x235a5f=_0xf101e9;if(_0x4f1e08&&_0xf101e9[_0x504ea6(0x1d1)](_0x58023d)<_0x3ab41a['param'](_0x58023d))_0x56f7ec=_0xf101e9;}return _0x462883;}}else{if(_0x5f382c[_0x504ea6(0x2f6)](/(HIGHEST|LOWEST)[ ](.*)/i)){const _0x272030=String(RegExp['$1'])[_0x504ea6(0x2de)]()['trim']()==='HIGHEST',_0x531e3f=!_0x272030,_0x3dbe33=String(RegExp['$2'])['toUpperCase']()[_0x504ea6(0x2b5)]();if(_0x2b133a[_0x504ea6(0x1c4)](_0x3dbe33)){if(_0x504ea6(0x235)===_0x504ea6(0x235)){const _0xb1d787=_0x2b133a[_0x504ea6(0x254)](_0x3dbe33);_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x32bb58 of this[_0x504ea6(0x21f)]){if(_0x504ea6(0x1e0)!=='goSfq')return this[_0x504ea6(0x220)](_0x5cab7e,_0x5c1752)[_0x504ea6(0x2cb)]>=0x1;else{if(_0x272030&&_0x32bb58[_0x504ea6(0x1d1)](_0xb1d787)>_0x562056[_0x504ea6(0x1d1)](_0xb1d787))_0x562056=_0x32bb58;if(_0x531e3f&&_0x32bb58[_0x504ea6(0x1d1)](_0xb1d787)<_0x562056[_0x504ea6(0x1d1)](_0xb1d787))_0x562056=_0x32bb58;}}return _0x562056;}else _0x5f3fe9=_0x504ea6(0x1d5)[_0x504ea6(0x349)](_0x1dfee4),_0x4e0f05=_0x4ed227[_0x3b240d],_0x264b10=_0x4a4e28[_0x504ea6(0x2cc)](_0x57be91[_0x504ea6(0x318)](/[\r\n]+/)[_0x504ea6(0x260)](''));}if(_0x23e2b8[_0x504ea6(0x1c4)](_0x3dbe33)){const _0x10f8d5=_0x23e2b8[_0x504ea6(0x254)](_0x3dbe33);_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x4c8962 of this[_0x504ea6(0x21f)]){if('Aoouh'==='DMeFm'){var _0x5b1041,_0xf3f517,_0x9bb867;for(_0x9bb867=_0x261050[_0x504ea6(0x2cb)]-0x1;_0x9bb867>0x0;_0x9bb867--){_0x5b1041=_0x3f060e[_0x504ea6(0x31c)](_0x254689['random']()*(_0x9bb867+0x1)),_0xf3f517=_0x17a800[_0x9bb867],_0x1c1417[_0x9bb867]=_0xe7f491[_0x5b1041],_0x395dcc[_0x5b1041]=_0xf3f517;}return _0x2edde0;}else{if(_0x272030&&_0x4c8962[_0x504ea6(0x2ae)](_0x10f8d5)>_0x562056[_0x504ea6(0x2ae)](_0x10f8d5))_0x562056=_0x4c8962;if(_0x531e3f&&_0x4c8962['xparam'](_0x10f8d5)<_0x562056[_0x504ea6(0x2ae)](_0x10f8d5))_0x562056=_0x4c8962;}}return _0x562056;}if(_0x28327d[_0x504ea6(0x1c4)](_0x3dbe33)){const _0x187598=_0x28327d[_0x504ea6(0x254)](_0x3dbe33);_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0xaffce1 of this[_0x504ea6(0x21f)]){if(_0x272030&&_0xaffce1[_0x504ea6(0x282)](_0x187598)>_0x562056[_0x504ea6(0x282)](_0x187598))_0x562056=_0xaffce1;if(_0x531e3f&&_0xaffce1[_0x504ea6(0x282)](_0x187598)<_0x562056[_0x504ea6(0x282)](_0x187598))_0x562056=_0xaffce1;}return _0x562056;}if(_0x3dbe33==='HP'){_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x46b069 of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x46b069['hp']>_0x562056['hp'])_0x562056=_0x46b069;if(_0x531e3f&&_0x46b069['hp']<_0x562056['hp'])_0x562056=_0x46b069;}return _0x562056;}if(_0x3dbe33===_0x504ea6(0x30a)){if(_0x504ea6(0x22f)!=='zYTNA')return this[_0x504ea6(0x21f)][this['_forceValidTargets'][_0x504ea6(0x2cb)]-0x1];else{_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0xcdb1f5 of this[_0x504ea6(0x21f)]){if('KRadf'===_0x504ea6(0x319)){const _0x347fa0=_0x943e0d(_0x55db20['$1']);return this[_0x504ea6(0x21a)](_0x3099dc,_0x3f4e7c,_0x28ef79,_0x347fa0);}else{if(_0x272030&&_0xcdb1f5['hpRate']()>_0x562056[_0x504ea6(0x27d)]())_0x562056=_0xcdb1f5;if(_0x531e3f&&_0xcdb1f5[_0x504ea6(0x27d)]()<_0x562056['hpRate']())_0x562056=_0xcdb1f5;}}return _0x562056;}}if(_0x3dbe33==='MP'){_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x1b2e36 of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x1b2e36['mp']>_0x562056['mp'])_0x562056=_0x1b2e36;if(_0x531e3f&&_0x1b2e36['mp']<_0x562056['mp'])_0x562056=_0x1b2e36;}return _0x562056;}if(_0x3dbe33===_0x504ea6(0x23f)){if(_0x504ea6(0x2b4)!==_0x504ea6(0x2b4)){if(this['_aiTgrInfluence']===_0x5c55a3)this[_0x504ea6(0x298)]();return this['_aiTgrInfluence'];}else{_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x4eb5fd of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x4eb5fd[_0x504ea6(0x2eb)]()>_0x562056[_0x504ea6(0x2eb)]())_0x562056=_0x4eb5fd;if(_0x531e3f&&_0x4eb5fd['mpRate']()<_0x562056[_0x504ea6(0x2eb)]())_0x562056=_0x4eb5fd;}return _0x562056;}}if(_0x3dbe33==='TP'){_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x2d88e2 of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x2d88e2['tp']>_0x562056['tp'])_0x562056=_0x2d88e2;if(_0x531e3f&&_0x2d88e2['tp']<_0x562056['tp'])_0x562056=_0x2d88e2;}return _0x562056;}if(_0x3dbe33===_0x504ea6(0x2c3)){_0x562056=this['_forceValidTargets'][0x0];for(const _0x20466d of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x20466d[_0x504ea6(0x30e)]()>_0x562056['tpRate']())_0x562056=_0x20466d;if(_0x531e3f&&_0x20466d[_0x504ea6(0x30e)]()<_0x562056['tpRate']())_0x562056=_0x20466d;}return _0x562056;}if(_0x3dbe33===_0x504ea6(0x234)){if(_0x504ea6(0x262)===_0x504ea6(0x261))_0x467175[_0x504ea6(0x2d7)](_0x5014c8,this);else{_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x386658 of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x386658[_0x504ea6(0x2fd)]()>_0x562056[_0x504ea6(0x2fd)]())_0x562056=_0x386658;if(_0x531e3f&&_0x386658['maxTp']()<_0x562056['maxTp']())_0x562056=_0x386658;}return _0x562056;}}if(_0x3dbe33===_0x504ea6(0x2fe)){_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x199b29 of this[_0x504ea6(0x21f)]){if(_0x272030&&(_0x199b29[_0x504ea6(0x21d)]||0x0)>(_0x562056[_0x504ea6(0x21d)]||0x0))_0x562056=_0x199b29;if(_0x531e3f&&(_0x199b29[_0x504ea6(0x21d)]||0x0)<(_0x562056[_0x504ea6(0x21d)]||0x0))_0x562056=_0x199b29;}return _0x562056;}if(_0x3dbe33==='STATE\x20COUNT'&&Imported[_0x504ea6(0x343)]){_0x562056=this[_0x504ea6(0x21f)][0x0];for(const _0x497d74 of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x497d74[_0x504ea6(0x34a)]()['length']>_0x562056[_0x504ea6(0x34a)]()['length'])_0x562056=_0x497d74;if(_0x531e3f&&_0x497d74[_0x504ea6(0x34a)]()['length']<_0x562056['states']()['length'])_0x562056=_0x497d74;}return _0x562056;}if(_0x3dbe33===_0x504ea6(0x362)&&Imported[_0x504ea6(0x343)]){_0x562056=this[_0x504ea6(0x21f)][0x0];const _0xe7113f=_0x504ea6(0x28f);for(const _0x36a4cc of this[_0x504ea6(0x21f)]){if(_0x504ea6(0x2ea)===_0x504ea6(0x296)){if(_0x3f4210&&_0x54e270[_0x504ea6(0x30e)]()>_0x272e00[_0x504ea6(0x30e)]())_0x41908f=_0xb40e93;if(_0xe8a3d2&&_0x24f5f8[_0x504ea6(0x30e)]()<_0x332e4a[_0x504ea6(0x30e)]())_0x4e10eb=_0x46fd36;}else{if(_0x272030&&_0x36a4cc[_0x504ea6(0x28d)](_0xe7113f)['length']>_0x562056[_0x504ea6(0x28d)](_0xe7113f)[_0x504ea6(0x2cb)])_0x562056=_0x36a4cc;if(_0x531e3f&&_0x36a4cc['statesByCategory'](_0xe7113f)['length']<_0x562056[_0x504ea6(0x28d)](_0xe7113f)[_0x504ea6(0x2cb)])_0x562056=_0x36a4cc;}}return _0x562056;}if(_0x3dbe33===_0x504ea6(0x322)&&Imported[_0x504ea6(0x343)]){_0x562056=this[_0x504ea6(0x21f)][0x0];const _0x575e39='NEGATIVE';for(const _0x6aaefd of this[_0x504ea6(0x21f)]){if(_0x272030&&_0x6aaefd[_0x504ea6(0x28d)](_0x575e39)[_0x504ea6(0x2cb)]>_0x562056[_0x504ea6(0x28d)](_0x575e39)[_0x504ea6(0x2cb)])_0x562056=_0x6aaefd;if(_0x531e3f&&_0x6aaefd['statesByCategory'](_0x575e39)[_0x504ea6(0x2cb)]<_0x562056['statesByCategory'](_0x575e39)[_0x504ea6(0x2cb)])_0x562056=_0x6aaefd;}return _0x562056;}}}}}return null;},DataManager[_0x4ed6ae(0x200)]=function(_0x2248dc){const _0xa64616=_0x4ed6ae;_0x2248dc=_0x2248dc['toUpperCase']()[_0xa64616(0x2b5)](),this[_0xa64616(0x358)]=this[_0xa64616(0x358)]||{};if(this[_0xa64616(0x358)][_0x2248dc])return this[_0xa64616(0x358)][_0x2248dc];let _0x5da5d1=0x1;for(const _0x9615ee of $dataSystem['elements']){if(!_0x9615ee)continue;let _0x4640a5=_0x9615ee[_0xa64616(0x2de)]();_0x4640a5=_0x4640a5[_0xa64616(0x1bc)](/\x1I\[(\d+)\]/gi,''),_0x4640a5=_0x4640a5[_0xa64616(0x1bc)](/\\I\[(\d+)\]/gi,''),this['_elementIDs'][_0x4640a5]=_0x5da5d1,_0x5da5d1++;}return this['_elementIDs'][_0x2248dc]||0x0;},DataManager[_0x4ed6ae(0x22e)]=function(_0x39f112){const _0x54a313=_0x4ed6ae;_0x39f112=_0x39f112[_0x54a313(0x2de)]()[_0x54a313(0x2b5)](),this[_0x54a313(0x334)]=this[_0x54a313(0x334)]||{};if(this[_0x54a313(0x334)][_0x39f112])return this[_0x54a313(0x334)][_0x39f112];for(const _0x3af45f of $dataStates){if(!_0x3af45f)continue;this[_0x54a313(0x334)][_0x3af45f[_0x54a313(0x30c)][_0x54a313(0x2de)]()[_0x54a313(0x2b5)]()]=_0x3af45f['id'];}return this[_0x54a313(0x334)][_0x39f112]||0x0;},VisuMZ[_0x4ed6ae(0x1f1)][_0x4ed6ae(0x2b3)]=BattleManager[_0x4ed6ae(0x2dc)],BattleManager[_0x4ed6ae(0x2dc)]=function(){const _0x349741=_0x4ed6ae,_0x476971=VisuMZ['BattleAI']['BattleManager_getNextSubject']['call'](this);if(_0x476971&&_0x476971[_0x349741(0x340)]()){const _0x5f5204=_0x476971[_0x349741(0x268)]();if(!_0x5f5204||_0x5f5204&&!_0x5f5204['item']()){if(_0x349741(0x280)!=='ySiOq'){const _0x287203=_0x134f64(_0x1feb80['$1'])[_0x349741(0x2f6)](/(?:USER|SUBJECT)/i)?_0x48633c:_0x3f0f65;return _0x287203[_0x349741(0x31e)]();}else _0x476971[_0x349741(0x361)]();}else VisuMZ[_0x349741(0x1f1)][_0x349741(0x2ce)]['General'][_0x349741(0x32e)]&&_0x476971[_0x349741(0x361)]();}return _0x476971;},VisuMZ[_0x4ed6ae(0x1f1)]['BattleManager_startAction']=BattleManager[_0x4ed6ae(0x249)],BattleManager['startAction']=function(){const _0x4c3293=_0x4ed6ae;this[_0x4c3293(0x28e)]();if(this[_0x4c3293(0x301)][_0x4c3293(0x268)]())VisuMZ[_0x4c3293(0x1f1)]['BattleManager_startAction'][_0x4c3293(0x1fb)](this);else{if('WjPjr'!=='WjPjr')return 0x0;else this[_0x4c3293(0x2d0)]();}},VisuMZ[_0x4ed6ae(0x1f1)]['BattleManager_endAction']=BattleManager[_0x4ed6ae(0x2d0)],BattleManager[_0x4ed6ae(0x2d0)]=function(){const _0x24bc5b=_0x4ed6ae;this['determineActionByAIisStillValid'](),VisuMZ[_0x24bc5b(0x1f1)][_0x24bc5b(0x337)][_0x24bc5b(0x1fb)](this);},BattleManager[_0x4ed6ae(0x28e)]=function(){const _0x5d6e7a=_0x4ed6ae;this[_0x5d6e7a(0x355)](this[_0x5d6e7a(0x301)]);},BattleManager[_0x4ed6ae(0x355)]=function(_0x469882){const _0x13696f=_0x4ed6ae;if(!_0x469882)return;if(_0x469882[_0x13696f(0x269)]()==='random')return;if(!_0x469882[_0x13696f(0x340)]())return;const _0x52d432=_0x469882['currentAction']();if(!_0x52d432)return;const _0x296f0f=_0x52d432[_0x13696f(0x251)]();if(_0x469882[_0x13696f(0x245)])return;if(AIManager['hasValidTargets'](_0x469882,_0x296f0f)&&_0x469882[_0x13696f(0x2b1)](_0x296f0f))return;_0x469882[_0x13696f(0x2d5)]();},VisuMZ[_0x4ed6ae(0x1f1)][_0x4ed6ae(0x354)]=Game_Temp['prototype']['initialize'],Game_Temp['prototype']['initialize']=function(){const _0x51b79d=_0x4ed6ae;VisuMZ[_0x51b79d(0x1f1)][_0x51b79d(0x354)][_0x51b79d(0x1fb)](this),this[_0x51b79d(0x298)]();},Game_Temp[_0x4ed6ae(0x2e7)]['clearAiTgrInfluence']=function(){const _0x2397ce=_0x4ed6ae;this[_0x2397ce(0x239)]={'action':null,'elementInfluence':![],'elementInfluenceRate':0x0,'elementIds':[],'evaInfluenceRate':0x0,'mevInfluenceRate':0x0};},Game_Temp['prototype'][_0x4ed6ae(0x2a0)]=function(){const _0x477d9f=_0x4ed6ae;if(this[_0x477d9f(0x239)]===undefined)this['clearAiTgrInfluence']();return this[_0x477d9f(0x239)];},Game_Temp[_0x4ed6ae(0x2e7)]['setAiTgrInfluences']=function(_0x23494a,_0x3017b0){const _0x4e1178=_0x4ed6ae;this[_0x4e1178(0x298)]();const _0x239e3a=this[_0x4e1178(0x2a0)]();_0x239e3a[_0x4e1178(0x2dd)]=_0x3017b0;if(_0x23494a[_0x4e1178(0x1c0)]()){_0x239e3a[_0x4e1178(0x246)]=!![],_0x239e3a[_0x4e1178(0x306)]=_0x23494a['aiApplyElementalTgrInfluenceRate'](),_0x239e3a[_0x4e1178(0x1ee)]=[];if(Imported[_0x4e1178(0x1c3)]){if(_0x4e1178(0x2c0)===_0x4e1178(0x25d)){if(!_0x22e60f)return;if(!_0x4b9718[_0x4e1178(0x26f)][_0x4e1178(0x2f6)](_0x370b7b[_0x4e1178(0x258)][_0x4e1178(0x1af)]))return;const _0x52c067=_0x4206d7(_0x5bb33e['$1'])[_0x4e1178(0x2de)]()['trim']();let _0x188e73=this['createFilterTarget'](_0x435563,_0x52c067);_0x188e73&&(this[_0x4e1178(0x21f)]=[_0x188e73]);}else _0x239e3a[_0x4e1178(0x1ee)]=_0x239e3a[_0x4e1178(0x1ee)][_0x4e1178(0x2cc)](_0x3017b0[_0x4e1178(0x2ff)]());}else{if(_0x3017b0[_0x4e1178(0x251)]()['damage']['elementId']<0x0){if(_0x4e1178(0x255)!==_0x4e1178(0x1b6))_0x239e3a['elementIds']=_0x239e3a[_0x4e1178(0x1ee)][_0x4e1178(0x2cc)](_0x23494a[_0x4e1178(0x25b)]());else return _0x9f9840[_0x37cf4f(_0x22a6ae['$1'])[_0x4e1178(0x360)]()[_0x4e1178(0x2b5)]()];}else{if('ImNcE'!==_0x4e1178(0x2a9)){if(_0x441b30&&_0x21f4ee['mp']>_0xf070be['mp'])_0x317ecb=_0x2b88a8;if(_0x1a6542&&_0x433dc7['mp']<_0x19e038['mp'])_0x273457=_0x3e857a;}else _0x239e3a[_0x4e1178(0x1ee)][_0x4e1178(0x34f)](_0x3017b0[_0x4e1178(0x251)]()[_0x4e1178(0x229)][_0x4e1178(0x279)]);}}}_0x3017b0[_0x4e1178(0x267)]()&&_0x23494a[_0x4e1178(0x1e8)]()&&(_0x239e3a['evaInfluenceRate']=_0x23494a[_0x4e1178(0x297)]());if(_0x3017b0[_0x4e1178(0x2d4)]()&&_0x23494a[_0x4e1178(0x31b)]()){if(_0x4e1178(0x1ff)===_0x4e1178(0x1ff))_0x239e3a['mevInfluenceRate']=_0x23494a[_0x4e1178(0x333)]();else{if(_0x596763&&_0x511382[_0x4e1178(0x27d)]()>_0x15d040[_0x4e1178(0x27d)]())_0x3fd944=_0x184c52;if(_0x1f6540&&_0x336ff3[_0x4e1178(0x27d)]()<_0x4e7b8b['hpRate']())_0x4e5cb7=_0x4ecf6d;}}},VisuMZ[_0x4ed6ae(0x1f1)][_0x4ed6ae(0x1c1)]=Game_Action[_0x4ed6ae(0x2e7)]['makeTargets'],Game_Action[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x21e)]=function(){const _0x4ed083=_0x4ed6ae;if(this[_0x4ed083(0x1dc)]()&&this[_0x4ed083(0x22b)]()['isDetermineActionByAI']()){if('nJcLs'!=='MKjGh')AIManager[_0x4ed083(0x2d9)](this[_0x4ed083(0x22b)](),this[_0x4ed083(0x251)]()),this[_0x4ed083(0x223)]()&&(_0x4ed083(0x2f0)!==_0x4ed083(0x2e5)?AIManager[_0x4ed083(0x353)](this[_0x4ed083(0x22b)](),this[_0x4ed083(0x251)]()):this['_forceValidTargets']=[]);else return _0x24d4ac[_0x4ed083(0x2e7)]['meetsCondition'][_0x4ed083(0x1fb)](this,_0x2d13c6);}$gameTemp['setAiTgrInfluences'](this[_0x4ed083(0x22b)](),this);const _0x27ccb4=VisuMZ[_0x4ed083(0x1f1)][_0x4ed083(0x1c1)][_0x4ed083(0x1fb)](this);return $gameTemp[_0x4ed083(0x298)](),AIManager[_0x4ed083(0x1d2)](),_0x27ccb4;},VisuMZ['BattleAI'][_0x4ed6ae(0x1db)]=Game_Action[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2d8)],Game_Action[_0x4ed6ae(0x2e7)]['itemTargetCandidates']=function(){const _0x333bec=_0x4ed6ae,_0x3a9f77=this['subject'](),_0xb09559=this[_0x333bec(0x251)]();let _0x2034d1=VisuMZ['BattleAI']['Game_Action_itemTargetCandidates'][_0x333bec(0x1fb)](this);if(_0x3a9f77[_0x333bec(0x340)]()&&AIManager[_0x333bec(0x24e)](_0x3a9f77,_0xb09559)){let _0xe43d5a=AIManager[_0x333bec(0x220)](_0x3a9f77,_0xb09559);_0x2034d1=_0x2034d1[_0x333bec(0x336)](_0x30d334=>_0xe43d5a['includes'](_0x30d334));}return _0x2034d1;},VisuMZ[_0x4ed6ae(0x1f1)]['Game_Action_apply']=Game_Action[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x228)],Game_Action[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x228)]=function(_0x186562){const _0x13918e=_0x4ed6ae;VisuMZ['BattleAI']['Game_Action_apply'][_0x13918e(0x1fb)](this,_0x186562),this['applyBattleAI'](_0x186562);},Game_Action[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1e1)]=function(_0x14307a){const _0x285275=_0x4ed6ae;if(!_0x14307a)return;if(this[_0x285275(0x22b)]()[_0x285275(0x256)]()===_0x14307a[_0x285275(0x256)]())return;let _0x1d17a8=[];if(Imported[_0x285275(0x1c3)])_0x1d17a8=this[_0x285275(0x2ff)]();else{if(this[_0x285275(0x251)]()[_0x285275(0x229)][_0x285275(0x279)]<0x0){if(_0x285275(0x1ca)!==_0x285275(0x26d))_0x1d17a8=this['subject']()['attackElements']();else return _0x6531fe['_buffTurns'][_0x2648b4];}else _0x1d17a8=[this[_0x285275(0x251)]()[_0x285275(0x229)]['elementId']];}_0x14307a[_0x285275(0x1bb)](_0x1d17a8,this['isPhysical'](),this[_0x285275(0x2d4)]());},VisuMZ['BattleAI'][_0x4ed6ae(0x1cd)]=Game_BattlerBase[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x282)],Game_BattlerBase[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x282)]=function(_0x4610d8){const _0x4efd7b=_0x4ed6ae;let _0x3d0960=VisuMZ['BattleAI']['Game_BattlerBase_sparam'][_0x4efd7b(0x1fb)](this,_0x4610d8);if(_0x4610d8===0x0){if(_0x4efd7b(0x31a)===_0x4efd7b(0x1f8)){_0x57cd10-=_0x342b28[_0x4efd7b(0x2c6)]-_0x43dd9f;if(_0x54d6e5<=0x0)return _0x22fe2b;}else _0x3d0960*=this[_0x4efd7b(0x1f7)]();}return _0x3d0960;},Game_BattlerBase[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1f7)]=function(){const _0x1187f3=_0x4ed6ae,_0x420a4d=$gameTemp[_0x1187f3(0x2a0)](),_0x24e144=this['opponentsUnit']();if(Imported[_0x1187f3(0x320)]){if(_0x1187f3(0x272)!=='RKOje'){if(_0x420a4d[_0x1187f3(0x2dd)]&&_0x420a4d[_0x1187f3(0x2dd)][_0x1187f3(0x2c7)]())return 0x1;}else return null;}let _0x3cb12d=0x1;if(_0x420a4d[_0x1187f3(0x246)])for(const _0x39d2a6 of _0x420a4d[_0x1187f3(0x1ee)]){if('RYApK'!==_0x1187f3(0x295))_0x24e144['hasElementAIKnowledge'](_0x39d2a6,this)&&(_0x3cb12d*=this['elementRate'](_0x39d2a6)*_0x420a4d[_0x1187f3(0x306)]);else return _0x1a10da(_0x5d8d6d['$1'])[_0x1187f3(0x318)](/[\r\n]+/)[_0x1187f3(0x260)]('');}if(_0x24e144[_0x1187f3(0x1ae)](_0x1187f3(0x222),this)){if(_0x1187f3(0x2b0)!==_0x1187f3(0x32d))_0x3cb12d*=0x1-this['eva']*_0x420a4d['evaInfluenceRate'];else return _0x260684[_0x1187f3(0x2e7)]['meetsMpCondition'][_0x1187f3(0x1fb)](this,_0x5b532,_0x370d4f);}if(_0x24e144['hasXParamAIKnowledge'](_0x1187f3(0x316),this)){if(_0x1187f3(0x203)!==_0x1187f3(0x30d))_0x3cb12d*=0x1-this[_0x1187f3(0x316)]*_0x420a4d['mevInfluenceRate'];else{if(!_0x5c0be0[_0x1187f3(0x1f1)][_0x1187f3(0x2a2)]['call'](this,_0x45263a))return![];if(this[_0x1187f3(0x269)]()==='random')return!![];return _0x5f5189[_0x1187f3(0x24e)](this,_0x3372b4[_0x1839a1[_0x1187f3(0x240)]]);}}return _0x3cb12d[_0x1187f3(0x2b7)](0.001,0x3e8);},Game_BattlerBase[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x269)]=function(){const _0x1b6f5b=_0x4ed6ae;return _0x1b6f5b(0x1b9);},Game_Battler['prototype'][_0x4ed6ae(0x340)]=function(){const _0x140be2=_0x4ed6ae;if(this[_0x140be2(0x1e2)]())return![];return!![];},Game_Battler['prototype'][_0x4ed6ae(0x2d5)]=function(){},Game_Battler[_0x4ed6ae(0x2e7)]['doesAIApplyElementalTgrInfluence']=function(){const _0x28d374=_0x4ed6ae;if(this[_0x28d374(0x256)]()||this[_0x28d374(0x31e)]()){if('aFOPA'!==_0x28d374(0x224))_0x1cbfd3[_0x28d374(0x1e3)]=_0xe6abdd[_0x28d374(0x333)]();else{const _0x6a478=this['isActor']()?this['actor']()[_0x28d374(0x26f)]:this[_0x28d374(0x2d1)]()['note'];if(_0x6a478[_0x28d374(0x2f6)](AIManager[_0x28d374(0x258)][_0x28d374(0x2e1)]))return![];else{if(_0x6a478[_0x28d374(0x2f6)](AIManager[_0x28d374(0x258)][_0x28d374(0x275)]))return this['aiApplyElementalTgrInfluenceRate']()>0x0;}}}return VisuMZ[_0x28d374(0x1f1)][_0x28d374(0x2ce)][_0x28d374(0x21b)]['ElementTgr'];},Game_Battler[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x26e)]=function(){const _0x55e750=_0x4ed6ae;if(this['isActor']()||this[_0x55e750(0x31e)]()){const _0x8fe70b=this['isActor']()?this['actor']()[_0x55e750(0x26f)]:this[_0x55e750(0x2d1)]()[_0x55e750(0x26f)];if(_0x8fe70b[_0x55e750(0x2f6)](AIManager[_0x55e750(0x258)]['aiElementTgr']))return eval(RegExp['$1']);}return VisuMZ[_0x55e750(0x1f1)]['Settings'][_0x55e750(0x21b)]['ElementTgrRate'];},Game_Battler['prototype']['doesAIApplyEvaTgrInfluence']=function(){const _0x496695=_0x4ed6ae;if(this[_0x496695(0x256)]()||this[_0x496695(0x31e)]()){const _0x3bccb3=this[_0x496695(0x256)]()?this['actor']()[_0x496695(0x26f)]:this[_0x496695(0x2d1)]()[_0x496695(0x26f)];if(_0x3bccb3[_0x496695(0x2f6)](AIManager[_0x496695(0x258)][_0x496695(0x2f5)]))return![];else{if(_0x3bccb3[_0x496695(0x2f6)](AIManager['_regexp']['aiEvaTgr']))return this['aiApplyEvaTgrInfluenceRate']()>0x0;}}return VisuMZ[_0x496695(0x1f1)]['Settings'][_0x496695(0x21b)][_0x496695(0x2ad)];},Game_Battler[_0x4ed6ae(0x2e7)]['aiApplyEvaTgrInfluenceRate']=function(){const _0x27c53e=_0x4ed6ae;if(this[_0x27c53e(0x256)]()||this['isEnemy']()){const _0x327a29=this[_0x27c53e(0x256)]()?this[_0x27c53e(0x22d)]()[_0x27c53e(0x26f)]:this[_0x27c53e(0x2d1)]()[_0x27c53e(0x26f)];if(_0x327a29[_0x27c53e(0x2f6)](AIManager[_0x27c53e(0x258)][_0x27c53e(0x231)]))return eval(RegExp['$1']);}return VisuMZ[_0x27c53e(0x1f1)][_0x27c53e(0x2ce)][_0x27c53e(0x21b)][_0x27c53e(0x2d3)];},Game_Battler['prototype'][_0x4ed6ae(0x31b)]=function(){const _0x30d14d=_0x4ed6ae;if(this['isActor']()||this[_0x30d14d(0x31e)]()){const _0x42f4bf=this['isActor']()?this[_0x30d14d(0x22d)]()[_0x30d14d(0x26f)]:this['enemy']()[_0x30d14d(0x26f)];if(_0x42f4bf[_0x30d14d(0x2f6)](AIManager[_0x30d14d(0x258)]['bypassMevTgr']))return![];else{if(_0x42f4bf[_0x30d14d(0x2f6)](AIManager['_regexp']['aiMevTgr']))return this['aiApplyMevTgrInfluenceRate']()>0x0;}}return VisuMZ[_0x30d14d(0x1f1)][_0x30d14d(0x2ce)][_0x30d14d(0x21b)]['EvaTgr'];},Game_Battler['prototype']['aiApplyMevTgrInfluenceRate']=function(){const _0xf1f753=_0x4ed6ae;if(this[_0xf1f753(0x256)]()||this['isEnemy']()){if(_0xf1f753(0x2a7)!==_0xf1f753(0x2a7))_0x21c313[_0x2aa74d]['push'](_0x2bdc37);else{const _0x19ed5e=this[_0xf1f753(0x256)]()?this[_0xf1f753(0x22d)]()[_0xf1f753(0x26f)]:this['enemy']()[_0xf1f753(0x26f)];if(_0x19ed5e[_0xf1f753(0x2f6)](AIManager[_0xf1f753(0x258)][_0xf1f753(0x302)]))return _0xf1f753(0x27f)!==_0xf1f753(0x1e9)?eval(RegExp['$1']):this['aiApplyMevTgrInfluenceRate']()>0x0;}}return VisuMZ[_0xf1f753(0x1f1)][_0xf1f753(0x2ce)][_0xf1f753(0x21b)][_0xf1f753(0x2d3)];},Game_Battler[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2e9)]=function(){const _0x1f3d0b=_0x4ed6ae,_0x4ca009=VisuMZ[_0x1f3d0b(0x1f1)]['Settings'][_0x1f3d0b(0x25a)];if(this[_0x1f3d0b(0x256)]()||this['isEnemy']()){const _0x58a2b5=this[_0x1f3d0b(0x256)]()?this[_0x1f3d0b(0x22d)]()['note']:this['enemy']()[_0x1f3d0b(0x26f)];if(_0x58a2b5['match'](AIManager[_0x1f3d0b(0x258)][_0x1f3d0b(0x2e9)])){if(_0x1f3d0b(0x2bf)!==_0x1f3d0b(0x1f5))return Number(RegExp['$1'])[_0x1f3d0b(0x2b7)](0x0,0x64);else{const _0x421baa=_0x363a14[_0x1f3d0b(0x254)](_0x341186(_0x1eea5c['$2'])[_0x1f3d0b(0x2de)]()[_0x1f3d0b(0x2b5)]()),_0x448417=_0x6fb971(_0x1248d8['$3'])['toLowerCase']()[_0x1f3d0b(0x2b5)](),_0x4e31af=_0x28aaa4(_0x283b4c['$1'])[_0x1f3d0b(0x2f6)](/(?:USER|SUBJECT)/i)?_0x378a6a:_0x14da56,_0x131ea9=_0x1f3d0b(0x226)['format'](_0x448417[_0x1f3d0b(0x2aa)](0x0)[_0x1f3d0b(0x2de)]()+_0x448417[_0x1f3d0b(0x1b8)](0x1));return!_0x4e31af[_0x131ea9](_0x421baa);}}else{if(this[_0x1f3d0b(0x256)]()){if(_0x1f3d0b(0x1d7)!==_0x1f3d0b(0x218))return _0x4ca009[_0x1f3d0b(0x309)];else this[_0x1f3d0b(0x2af)]={'evaRates':[],'mevRates':[],'elementRates':{}};}else{if(this['isEnemy']())return _0x4ca009[_0x1f3d0b(0x285)];}}}return _0x4ca009[_0x1f3d0b(0x285)];},Game_Battler[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1bb)]=function(_0x26ae75,_0xb62785,_0x53ec7f){const _0x48f950=_0x4ed6ae,_0x46164b=this['opponentsUnit']();if(_0x26ae75&&_0x26ae75[_0x48f950(0x2cb)]>0x0){if(_0x48f950(0x2e4)===_0x48f950(0x1c2)){if(_0x2b70e9&&(_0x3c0c35['level']||0x0)>(_0x596d48['level']||0x0))_0xe04f88=_0x27da78;if(_0x52d7b0&&(_0x2d863a['level']||0x0)<(_0x5213bf[_0x48f950(0x21d)]||0x0))_0x1313db=_0xbd623d;}else for(const _0x4841a8 of _0x26ae75){_0x46164b[_0x48f950(0x2d7)](_0x4841a8,this);}}_0xb62785&&_0x46164b[_0x48f950(0x212)]('evaRates',this),_0x53ec7f&&_0x46164b[_0x48f950(0x212)](_0x48f950(0x1b1),this);},Game_Battler[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1ae)]=function(_0x41f21c){const _0x422d96=_0x4ed6ae,_0x167b6c=this[_0x422d96(0x265)]();return _0x167b6c['hasXParamAIKnowledge'](_0x41f21c,this);},Game_Battler['prototype'][_0x4ed6ae(0x310)]=function(){const _0x14953a=_0x4ed6ae,_0x1460e9=VisuMZ['BattleAI'][_0x14953a(0x2ce)][_0x14953a(0x25a)];if(this[_0x14953a(0x256)]()||this[_0x14953a(0x31e)]()){const _0x28d6dc=this[_0x14953a(0x256)]()?this[_0x14953a(0x22d)]()[_0x14953a(0x26f)]:this[_0x14953a(0x2d1)]()['note'];if(_0x28d6dc[_0x14953a(0x2f6)](AIManager[_0x14953a(0x258)][_0x14953a(0x310)]))return _0x14953a(0x31d)===_0x14953a(0x2c1)?(this[_0x14953a(0x21f)]=this['_forceValidTargets']||[],this[_0x14953a(0x21f)]):Number(RegExp['$1'])[_0x14953a(0x2b7)](0x0,0x9);else{if(this[_0x14953a(0x256)]())return _0x1460e9['ActorRatingVariance'][_0x14953a(0x2b7)](0x0,0x9);else{if(this[_0x14953a(0x31e)]())return _0x1460e9['EnemyRatingVariance'][_0x14953a(0x2b7)](0x0,0x9);}}}return _0x1460e9[_0x14953a(0x1cf)][_0x14953a(0x2b7)](0x0,0x9);},VisuMZ[_0x4ed6ae(0x1f1)]['Game_Battler_turnCount']=Game_Battler[_0x4ed6ae(0x2e7)]['turnCount'],Game_Battler[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x264)]=function(){const _0x1c2375=_0x4ed6ae;if(VisuMZ['BattleAI'][_0x1c2375(0x2ce)]['General'][_0x1c2375(0x32e)]&&!BattleManager['isTpb']()){if(_0x1c2375(0x2ca)!==_0x1c2375(0x2ca))_0x1baa0f*=0x1-this['eva']*_0xff0218[_0x1c2375(0x348)];else return $gameTroop[_0x1c2375(0x264)]();}else{if('Ysblw'!=='hElhd')return VisuMZ['BattleAI'][_0x1c2375(0x2f3)][_0x1c2375(0x1fb)](this);else{if(_0x4d6fc3&&_0x2c226f[_0x1c2375(0x2eb)]()>_0x4fa9ec[_0x1c2375(0x2eb)]())_0x2a5afb=_0x5931b4;if(_0x28a1ef&&_0x1b6551[_0x1c2375(0x2eb)]()<_0x574f4f[_0x1c2375(0x2eb)]())_0x5cf41b=_0x3b4442;}}},Game_Actor[_0x4ed6ae(0x2e7)]['isDetermineActionByAI']=function(){const _0x31cb27=_0x4ed6ae;if(this[_0x31cb27(0x1e2)]())return![];return this[_0x31cb27(0x232)]()&&this[_0x31cb27(0x342)]();},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x342)]=function(){const _0x329a79=_0x4ed6ae,_0x3ccd57=this[_0x329a79(0x2c9)]()[_0x329a79(0x26f)];if(_0x3ccd57[_0x329a79(0x2f6)](/<NO REFERENCE AI>/i))return null;else{if(_0x3ccd57[_0x329a79(0x2f6)](/<REFERENCE AI: ENEMY (\d+)>/i))return $dataEnemies[Number(RegExp['$1'])];else{if(_0x3ccd57[_0x329a79(0x2f6)](/<REFERENCE AI: (.*)>/i))return'upTFV'!==_0x329a79(0x321)?_0x469394[_0x329a79(0x32f)]()['aliveMembers']()[_0x329a79(0x2cb)]:$dataEnemies[DataManager[_0x329a79(0x288)](String(RegExp['$1']))];}}return $dataEnemies[VisuMZ[_0x329a79(0x1f1)][_0x329a79(0x2ce)]['General'][_0x329a79(0x338)]];},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x269)]=function(){const _0x37aa4f=_0x4ed6ae,_0x3e6b56=this[_0x37aa4f(0x2c9)]()[_0x37aa4f(0x26f)];if(_0x3e6b56['match'](AIManager[_0x37aa4f(0x258)][_0x37aa4f(0x269)]))return String(RegExp['$1'])[_0x37aa4f(0x360)]()[_0x37aa4f(0x2b5)]();return VisuMZ[_0x37aa4f(0x1f1)]['Settings']['General'][_0x37aa4f(0x2d6)];},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2d5)]=function(){const _0x5f0a16=_0x4ed6ae;Game_Battler[_0x5f0a16(0x2e7)]['determineNewValidAIAction'][_0x5f0a16(0x1fb)](this),this[_0x5f0a16(0x286)]();},VisuMZ[_0x4ed6ae(0x1f1)][_0x4ed6ae(0x2bb)]=Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x286)],Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x286)]=function(){const _0x4363ea=_0x4ed6ae;if(this[_0x4363ea(0x340)]()){if(_0x4363ea(0x311)==='nWVAJ')this[_0x4363ea(0x35f)]();else{if(_0x523c06[_0x4363ea(0x23d)]()&&!this['_alertTurnCount']){let _0x3a56d1=_0x4363ea(0x25e);_0x3a56d1+=_0x3f3c98+'\x0a\x0a',_0x3a56d1+=_0x4363ea(0x308),_0x3a56d1+=_0x4363ea(0x284),_0x399c23(_0x3a56d1),this[_0x4363ea(0x1d4)]=!![];}return![];}}else{if(_0x4363ea(0x2a4)!==_0x4363ea(0x347))VisuMZ[_0x4363ea(0x1f1)]['Game_Actor_makeAutoBattleActions'][_0x4363ea(0x1fb)](this);else{if(_0x2776ea&&_0x2e3be2['sparam'](_0x17cdc6)>_0x1a4d6f[_0x4363ea(0x282)](_0x198dfd))_0x5e32f0=_0xfcbb0;if(_0x319994&&_0x34c9d5[_0x4363ea(0x282)](_0x3c79b6)<_0x43bd0f[_0x4363ea(0x282)](_0xb13de5))_0x5934fe=_0x428845;}}},Game_Actor['prototype']['makeAutoBattleActionsWithEnemyAI']=function(){const _0x4dd440=_0x4ed6ae;if(this['numActions']()>0x0){const _0x3f06b4=this['usableSkills']();if(this[_0x4dd440(0x299)]())_0x3f06b4[_0x4dd440(0x34f)]($dataSkills[this[_0x4dd440(0x26b)]()]);if(this['canGuard']())_0x3f06b4[_0x4dd440(0x34f)]($dataSkills[this[_0x4dd440(0x210)]()]);const _0x6760=this[_0x4dd440(0x342)](),_0x278444=JsonEx[_0x4dd440(0x27b)](_0x6760[_0x4dd440(0x250)]);for(const _0x54ebf0 of _0x278444){if(_0x54ebf0[_0x4dd440(0x240)]===0x1)_0x54ebf0[_0x4dd440(0x240)]=this[_0x4dd440(0x26b)]();if(_0x54ebf0['skillId']===0x2)_0x54ebf0['skillId']=this[_0x4dd440(0x210)]();}const _0x5e3e07=_0x278444[_0x4dd440(0x336)](_0x51ffbb=>this[_0x4dd440(0x29d)](_0x51ffbb)&&_0x3f06b4[_0x4dd440(0x1c4)]($dataSkills[_0x51ffbb['skillId']]));if(_0x5e3e07[_0x4dd440(0x2cb)]>0x0){if(_0x4dd440(0x243)!==_0x4dd440(0x248)){this[_0x4dd440(0x312)](_0x5e3e07);return;}else{if(!_0x3a5a01[_0x4dd440(0x1f1)][_0x4dd440(0x2ce)][_0x4dd440(0x25a)][_0x4dd440(0x2fa)])return!![];this[_0x4dd440(0x1dd)]()[_0x4dd440(0x2c4)]=this[_0x4dd440(0x1dd)]()[_0x4dd440(0x2c4)]||{};const _0x4946b6=this[_0x4dd440(0x1dd)]()[_0x4dd440(0x2c4)];_0x4946b6[_0x4275a8]=_0x4946b6[_0x47eb12]||[];const _0x5d3f19=_0x628e1f[_0x4dd440(0x256)]()?_0x4a9366['actorId']():_0x5d29a6[_0x4dd440(0x2db)]();return _0x4946b6[_0x3e929a][_0x4dd440(0x1c4)](_0x5d3f19);}}}VisuMZ[_0x4dd440(0x1f1)][_0x4dd440(0x2bb)][_0x4dd440(0x1fb)](this);},Game_Actor['prototype'][_0x4ed6ae(0x276)]=function(_0x5d0141){const _0x2641ff=_0x4ed6ae;return Game_Enemy[_0x2641ff(0x2e7)][_0x2641ff(0x276)][_0x2641ff(0x1fb)](this,_0x5d0141);},Game_Actor[_0x4ed6ae(0x2e7)]['meetsTurnCondition']=function(_0x3db020,_0x4a483f){const _0xddb0ae=_0x4ed6ae;return Game_Enemy[_0xddb0ae(0x2e7)][_0xddb0ae(0x1f0)][_0xddb0ae(0x1fb)](this,_0x3db020,_0x4a483f);},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1eb)]=function(_0x3ed845,_0x598fe0){const _0x4c739d=_0x4ed6ae;return Game_Enemy[_0x4c739d(0x2e7)][_0x4c739d(0x1eb)]['call'](this,_0x3ed845,_0x598fe0);},Game_Actor['prototype'][_0x4ed6ae(0x221)]=function(_0x4e84a0,_0x37c4df){const _0x3e097c=_0x4ed6ae;return Game_Enemy[_0x3e097c(0x2e7)][_0x3e097c(0x221)]['call'](this,_0x4e84a0,_0x37c4df);},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2b2)]=function(_0x283aba){const _0x199475=_0x4ed6ae;return Game_Enemy['prototype']['meetsStateCondition'][_0x199475(0x1fb)](this,_0x283aba);},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x363)]=function(_0x150930){const _0x65cb45=_0x4ed6ae;return Game_Enemy[_0x65cb45(0x2e7)][_0x65cb45(0x363)][_0x65cb45(0x1fb)](this,_0x150930);},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x28c)]=function(_0x5c3f0a){const _0x48a905=_0x4ed6ae;return Game_Enemy[_0x48a905(0x2e7)][_0x48a905(0x28c)]['call'](this,_0x5c3f0a);},Game_Enemy[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x269)]=function(){const _0x3985fc=_0x4ed6ae,_0x7e2239=this[_0x3985fc(0x2d1)]()[_0x3985fc(0x26f)];if(_0x7e2239['match'](AIManager['_regexp'][_0x3985fc(0x269)]))return String(RegExp['$1'])[_0x3985fc(0x360)]()[_0x3985fc(0x2b5)]();return VisuMZ[_0x3985fc(0x1f1)][_0x3985fc(0x2ce)][_0x3985fc(0x25a)]['EnemyStyleAI'];},VisuMZ['BattleAI']['Game_Enemy_isActionValid']=Game_Enemy['prototype']['isActionValid'],Game_Enemy[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x29d)]=function(_0x1f6720){const _0x19d400=_0x4ed6ae;if(!VisuMZ[_0x19d400(0x1f1)]['Game_Enemy_isActionValid']['call'](this,_0x1f6720))return![];if(this[_0x19d400(0x269)]()==='random')return!![];return AIManager[_0x19d400(0x24e)](this,$dataSkills[_0x1f6720[_0x19d400(0x240)]]);},Game_Actor['prototype'][_0x4ed6ae(0x29d)]=function(_0x3b18fb){const _0x5430a3=_0x4ed6ae;return Game_Enemy['prototype'][_0x5430a3(0x29d)][_0x5430a3(0x1fb)](this,_0x3b18fb);},Game_Enemy['prototype'][_0x4ed6ae(0x1fe)]=function(_0x34ea33,_0x196bd2){const _0x513b73=_0x4ed6ae,_0x269a04=_0x34ea33[_0x513b73(0x23b)]((_0x489dcb,_0x5697ab)=>_0x489dcb+_0x5697ab['rating']-_0x196bd2,0x0);if(_0x269a04>=0x0){let _0x1da927=Math['randomInt'](_0x269a04);for(const _0x3d7a48 of _0x34ea33){_0x1da927-=_0x3d7a48[_0x513b73(0x2c6)]-_0x196bd2;if(_0x1da927<=0x0)return _0x3d7a48;}}else{if(_0x513b73(0x1fc)!==_0x513b73(0x29a))return null;else{if(_0x13c3f4['note'][_0x513b73(0x2f6)](_0x2561ab[_0x513b73(0x258)][_0x513b73(0x209)]))return[];else return _0x4de400[_0x513b73(0x26f)][_0x513b73(0x2f6)](_0x593ebb['_regexp'][_0x513b73(0x30b)])?_0x494fc9(_0x41b004['$1'])[_0x513b73(0x318)](/[\r\n]+/)[_0x513b73(0x260)](''):this[_0x513b73(0x2e3)](_0x2383d5);}}},Game_Actor[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1fe)]=function(_0x317673,_0x21e9b5){const _0x3601b9=_0x4ed6ae;return Game_Enemy[_0x3601b9(0x2e7)][_0x3601b9(0x1fe)]['call'](this,_0x317673,_0x21e9b5);},Game_Enemy[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x312)]=function(_0x4ded3a){const _0x17e59b=_0x4ed6ae,_0x544260=String(this[_0x17e59b(0x269)]())[_0x17e59b(0x360)]()['trim']();if([_0x17e59b(0x21c),_0x17e59b(0x205)][_0x17e59b(0x1c4)](_0x544260))this['selectAllActionsRandom'](_0x4ded3a);else _0x544260===_0x17e59b(0x352)?this[_0x17e59b(0x1c9)](_0x4ded3a):this[_0x17e59b(0x202)](_0x4ded3a);},Game_Actor['prototype'][_0x4ed6ae(0x312)]=function(_0x10334c){const _0x1874a8=_0x4ed6ae;Game_Enemy['prototype'][_0x1874a8(0x312)][_0x1874a8(0x1fb)](this,_0x10334c);},Game_Battler[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x202)]=function(_0x3ee793){const _0x24e573=_0x4ed6ae,_0x4326e6=Math[_0x24e573(0x330)](..._0x3ee793[_0x24e573(0x30f)](_0x15fa23=>_0x15fa23['rating'])),_0x5ee68b=_0x4326e6-this[_0x24e573(0x310)](),_0x537a1f=this[_0x24e573(0x242)]();_0x3ee793=_0x3ee793['filter'](_0x9db042=>_0x9db042[_0x24e573(0x2c6)]>=_0x5ee68b);for(let _0x20e5c5=0x0;_0x20e5c5<_0x537a1f;_0x20e5c5++){_0x3ee793=VisuMZ['BattleAI'][_0x24e573(0x1f2)](_0x3ee793);const _0x1f748d=this[_0x24e573(0x1fe)](_0x3ee793,_0x5ee68b);this[_0x24e573(0x2dd)](_0x20e5c5)[_0x24e573(0x33e)](_0x1f748d);}},VisuMZ['BattleAI'][_0x4ed6ae(0x1f2)]=function(_0x367271){const _0x461ea8=_0x4ed6ae;var _0x4dcfed,_0x4a38ff,_0x16e263;for(_0x16e263=_0x367271[_0x461ea8(0x2cb)]-0x1;_0x16e263>0x0;_0x16e263--){if(_0x461ea8(0x22a)!==_0x461ea8(0x213))_0x4dcfed=Math[_0x461ea8(0x31c)](Math['random']()*(_0x16e263+0x1)),_0x4a38ff=_0x367271[_0x16e263],_0x367271[_0x16e263]=_0x367271[_0x4dcfed],_0x367271[_0x4dcfed]=_0x4a38ff;else{if(_0xf78db3[_0x461ea8(0x26f)]['match'](_0x7b2bb8[_0x461ea8(0x258)]['noCondition']))return[];else return _0xb7ecbf[_0x461ea8(0x26f)][_0x461ea8(0x2f6)](_0x30a182[_0x461ea8(0x258)][_0x461ea8(0x1c7)])?_0x38da2b(_0x47fca0['$1'])[_0x461ea8(0x318)](/[\r\n]+/)[_0x461ea8(0x260)](''):this['getDefaultAllConditions'](_0x23c281);}}return _0x367271;},Game_Battler[_0x4ed6ae(0x2e7)]['selectAllActionsGambit']=function(_0x1cd73e){const _0x204355=_0x4ed6ae;for(let _0x1efcd3=0x0;_0x1efcd3<this[_0x204355(0x242)]();_0x1efcd3++){const _0x2a3ca9=_0x1cd73e[0x0];this[_0x204355(0x2dd)](_0x1efcd3)[_0x204355(0x33e)](_0x2a3ca9);}},Game_Battler[_0x4ed6ae(0x2e7)]['selectAllActionsRandom']=function(_0x5dadc4){const _0x21c1cf=_0x4ed6ae;for(let _0x2e2215=0x0;_0x2e2215<this[_0x21c1cf(0x242)]();_0x2e2215++){const _0x35e078=_0x5dadc4[Math[_0x21c1cf(0x270)](_0x5dadc4[_0x21c1cf(0x2cb)])];this[_0x21c1cf(0x2dd)](_0x2e2215)['setEnemyAction'](_0x35e078);}},Game_Enemy['prototype'][_0x4ed6ae(0x2d5)]=function(){const _0x516a00=_0x4ed6ae;Game_Battler[_0x516a00(0x2e7)][_0x516a00(0x2d5)][_0x516a00(0x1fb)](this);if(this['numActions']()>0x0){if(_0x516a00(0x24c)===_0x516a00(0x25f))_0x47385b[_0x516a00(0x2e7)][_0x516a00(0x312)]['call'](this,_0xbe8d28);else{const _0xa467e5=this[_0x516a00(0x2d1)]()[_0x516a00(0x250)][_0x516a00(0x336)](_0x2436be=>this[_0x516a00(0x29d)](_0x2436be));if(_0xa467e5[_0x516a00(0x2cb)]>0x0)this[_0x516a00(0x312)](_0xa467e5);else{if('JxqzA'===_0x516a00(0x304))this[_0x516a00(0x1b0)]();else{const _0x558cff=_0xaf328b[_0x516a00(0x200)](_0x33a99f(_0x465e9a['$1']));return this['elementKnowledgeRate'](_0x18ac27,_0xacddd8,_0x1c9572,_0x558cff);}}}}},VisuMZ['BattleAI'][_0x4ed6ae(0x2ed)]=Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x291)],Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x291)]=function(){const _0x4165fe=_0x4ed6ae;VisuMZ[_0x4165fe(0x1f1)][_0x4165fe(0x2ed)][_0x4165fe(0x1fb)](this),this[_0x4165fe(0x29e)]();},Game_Unit['prototype'][_0x4ed6ae(0x29e)]=function(){const _0xdc8fe6=_0x4ed6ae;this[_0xdc8fe6(0x225)]=![],this[_0xdc8fe6(0x2e8)]();},VisuMZ['BattleAI'][_0x4ed6ae(0x219)]=Game_Unit['prototype'][_0x4ed6ae(0x2e6)],Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2e6)]=function(){const _0x16de65=_0x4ed6ae;let _0x530bc2=VisuMZ[_0x16de65(0x1f1)]['Game_Unit_aliveMembers'][_0x16de65(0x1fb)](this);if(this[_0x16de65(0x225)]){const _0x1f18a1=AIManager[_0x16de65(0x351)]();_0x530bc2=_0x530bc2['filter'](_0x2a18da=>_0x1f18a1[_0x16de65(0x1c4)](_0x2a18da));}return _0x530bc2;},VisuMZ[_0x4ed6ae(0x1f1)][_0x4ed6ae(0x1c8)]=Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x27c)],Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x27c)]=function(){const _0x26612d=_0x4ed6ae;AIManager[_0x26612d(0x1bd)]()&&('FxptT'!==_0x26612d(0x2b9)?this[_0x26612d(0x225)]=!![]:this[_0x26612d(0x355)](this[_0x26612d(0x301)]));const _0x1227a6=VisuMZ['BattleAI'][_0x26612d(0x1c8)]['call'](this);return this[_0x26612d(0x225)]=![],_0x1227a6;},Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2e8)]=function(){const _0x2f4573=_0x4ed6ae;this[_0x2f4573(0x2af)]={'evaRates':[],'mevRates':[],'elementRates':{}};},Game_Unit['prototype']['aiKnowledge']=function(){const _0x2c15a4=_0x4ed6ae;if(this[_0x2c15a4(0x2af)]===undefined)this['clearAIKnowledge']();return this[_0x2c15a4(0x2af)];},Game_Unit['prototype']['addXParamAIKnowledge']=function(_0x2d264f,_0x1660b5){const _0x57b232=_0x4ed6ae;this[_0x57b232(0x1dd)]()[_0x2d264f]=this[_0x57b232(0x1dd)]()[_0x2d264f]||[];const _0x2938bf=_0x1660b5['isActor']()?_0x1660b5[_0x57b232(0x247)]():_0x1660b5[_0x57b232(0x2db)]();!this['aiKnowledge']()[_0x2d264f][_0x57b232(0x1c4)](_0x2938bf)&&this[_0x57b232(0x1dd)]()[_0x2d264f][_0x57b232(0x34f)](_0x2938bf);},Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1ae)]=function(_0x26b424,_0x5a7302){const _0xf37bb3=_0x4ed6ae;if(!VisuMZ['BattleAI'][_0xf37bb3(0x2ce)][_0xf37bb3(0x25a)][_0xf37bb3(0x2fa)])return!![];const _0x4dfbcf=_0x26b424[_0xf37bb3(0x2f6)](/EVA/i)?_0xf37bb3(0x29b):_0xf37bb3(0x1b1);this[_0xf37bb3(0x1dd)]()[_0x4dfbcf]=this[_0xf37bb3(0x1dd)]()[_0x4dfbcf]||[];const _0x8c39ea=_0x5a7302[_0xf37bb3(0x256)]()?_0x5a7302['actorId']():_0x5a7302[_0xf37bb3(0x2db)]();return this[_0xf37bb3(0x1dd)]()[_0x4dfbcf][_0xf37bb3(0x1c4)](_0x8c39ea);},Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x2d7)]=function(_0x30ea6c,_0x57444f){const _0x1ef06c=_0x4ed6ae;this[_0x1ef06c(0x1dd)]()[_0x1ef06c(0x2c4)]=this[_0x1ef06c(0x1dd)]()[_0x1ef06c(0x2c4)]||{};const _0x4dc7fb=this['aiKnowledge']()[_0x1ef06c(0x2c4)];_0x4dc7fb[_0x30ea6c]=_0x4dc7fb[_0x30ea6c]||[];const _0x3f8b6b=_0x57444f['isActor']()?_0x57444f[_0x1ef06c(0x247)]():_0x57444f[_0x1ef06c(0x2db)]();!_0x4dc7fb[_0x30ea6c][_0x1ef06c(0x1c4)](_0x3f8b6b)&&(_0x1ef06c(0x257)===_0x1ef06c(0x257)?_0x4dc7fb[_0x30ea6c][_0x1ef06c(0x34f)](_0x3f8b6b):this['_forceValidTargets']=this['makeValidTargets'](_0x115d6b,_0x19ec69));},Game_Unit[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x33b)]=function(_0x103d0f,_0x3b2fc0){const _0x151d09=_0x4ed6ae;if(!VisuMZ[_0x151d09(0x1f1)]['Settings'][_0x151d09(0x25a)][_0x151d09(0x2fa)])return!![];this['aiKnowledge']()[_0x151d09(0x2c4)]=this[_0x151d09(0x1dd)]()[_0x151d09(0x2c4)]||{};const _0x3ddd49=this[_0x151d09(0x1dd)]()[_0x151d09(0x2c4)];_0x3ddd49[_0x103d0f]=_0x3ddd49[_0x103d0f]||[];const _0x1f3bcb=_0x3b2fc0['isActor']()?_0x3b2fc0[_0x151d09(0x247)]():_0x3b2fc0[_0x151d09(0x2db)]();return _0x3ddd49[_0x103d0f][_0x151d09(0x1c4)](_0x1f3bcb);},VisuMZ[_0x4ed6ae(0x1f1)][_0x4ed6ae(0x208)]=Game_Troop[_0x4ed6ae(0x2e7)][_0x4ed6ae(0x1f9)],Game_Troop['prototype']['setup']=function(_0x2dd4ce){const _0x408c7a=_0x4ed6ae;VisuMZ[_0x408c7a(0x1f1)][_0x408c7a(0x208)][_0x408c7a(0x1fb)](this,_0x2dd4ce),this['clearAIKnowledge']();};