//=============================================================================
// VisuStella MZ - Victory Aftermath
// VisuMZ_3_VictoryAftermath.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_3_VictoryAftermath = true;

var VisuMZ = VisuMZ || {};
VisuMZ.VictoryAftermath = VisuMZ.VictoryAftermath || {};
VisuMZ.VictoryAftermath.version = 1.11;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 3] [Version 1.11] [VictoryAftermath]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Victory_Aftermath_VisuStella_MZ
 * @base VisuMZ_1_BattleCore
 * @orderAfter VisuMZ_1_BattleCore
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Victory Aftermath plugin consolidates the rewards granted upon finishing
 * a battle successfully into one screen (or more if there are level ups).
 * This helps reduce the amount of button presses needed to display similar
 * information by default. The level up screens will also display parameter
 * changes and new skills acquired in addition to victory quotes.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Consolidates EXP, Gold, and Items acquired through battle rewards into one
 *   battle screen.
 * * EXP gauges for currently active battle party will be displayed on the same
 *   screen to indicate progress.
 * * Upon leveling up, individual screens can be shown (optionally) to display
 *   parameter changes, new skills acquired, and level up quotes.
 * * Plugin Commands can be used to clear/add new quotes at any time.
 * * Plugin Commands can be used by bypass certain parts of the Victory
 *   Aftermath segments or the entire thing completely.
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
 * Extra Features
 * ============================================================================
 *
 * There are some extra features found if other VisuStella MZ plugins are found
 * present in the Plugin Manager list.
 *
 * ---
 *
 * VisuMZ_0_CoreEngine
 *
 * - The EXP gauge colors will match the color settings found in the Core
 * Engine's Plugin Parameters instead of defaulting to specific colors.
 *
 * - The continue message will display any changed input keys designated by
 * the Core Engine's Plugin Parameters.
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 *
 * - Upon leveling up, the Menu Image will show up (optional) as a bust during
 * the quote segment.
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
 * <Level Up Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </Level Up Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up.
 * - The <New Quote> tag is used between the <Level Up Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up.
 * - If this notetag is not found inside an actor's notebox, a random level up
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   Level Up Quotes plugin parameter.
 *
 * ---
 *
 * <New Skill Quotes>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 *  <New Quote>
 *  text
 *  text
 *  text
 *  text
 * </New Skill Quotes>
 *
 * - Used for: Actor Notetags
 * - Description
 * - Replace 'text' with the text you'd want the actor to say when leveling up
 *   in addition to learning a new skill upon leveling up.
 * - The <New Quote> tag is used between the <New Skill Quotes> notetags to
 *   separate quotes.
 * - If an actor has multiple quotes (due to the <New Quote> notetag), then a
 *   random quote will be selected upon level up and learning a new skill.
 * - If this notetag is not found inside an actor's notebox, a random new skill
 *   quote will be selected from the Plugin Parameters => Level Up => Quotes =>
 *   New Skill Quotes plugin parameter.
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 * 
 * === Actor Plugin Commands ===
 * 
 * ---
 *
 * Actor: Add Level Up Quotes
 * - Add new entries target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's level up quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Add New Skill Quotes
 * - Add new entries target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to add quotes for.
 *
 *   New Quotes:
 *   - Add new entries to actor's new skill quotes.
 *   - Text codes allowed. %1 - Actor's Name
 *
 * ---
 *
 * Actor: Clear Level Up Quotes
 * - Clear target actor's level up quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 *
 * Actor: Clear New Skill Quotes
 * - Clear target actor's new skill quotes.
 *
 *   Actor ID:
 *   - Select ID of target actor to clear quotes for.
 *
 * ---
 * 
 * === System Plugin Commands ===
 * 
 * ---
 *
 * System: Bypass Victory Motion
 * - Bypass actors performing their victory motion?
 *
 *   Bypass?:
 *   - Bypass actors performing their victory motion?
 *
 * ---
 *
 * System: Bypass Victory Music
 * - Bypass playing the victory music?
 *
 *   Bypass?:
 *   - Bypass playing the victory music?
 *
 * ---
 *
 * System: Bypass Victory Phase
 * - Bypass the entire victory phase and all aspects about it?
 *
 *   Bypass?:
 *   - Bypass the entire victory phase and all aspects about it?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * The general settings Plugin Parameters control the overall settings found
 * within the main aspects of the Victory Aftermath sequence.
 *
 * ---
 *
 * General Settings
 * 
 *   Fade In Speed:
 *   - Fade in speed for the victory window.
 * 
 *   Hide Delay (MS):
 *   - Delay in milliseconds before hiding the UI Windows.
 * 
 *   Show Delay (MS):
 *   - Delay in milliseconds before showing the Victory Windows.
 * 
 *   Update Duration:
 *   - Duration in frames on updating actor EXP gauges.
 * 
 *   Auto Skip Auto Battle?:
 *   - Skip the Victory Aftermath sequence if the player has decided to use
 *     the party Auto Battle command?
 * 
 *   Mirror Contents?:
 *   - Mirror the positions of EXP, Gold, and Items?
 * 
 *   Show EXP Gauges?:
 *   - Show the EXP Gauges of the main party members for the first screen of
 *     the Victory Aftermath?
 *   - This is added for those with large parties and cannot fit everything
 *     into one screen for all party members and would prefer not showing any
 *     EXP Gauges at all instead.
 *
 * ---
 * 
 * Collapse Effect
 * 
 *   Normal Collapse Wait?:
 *   - Wait for the normal collapse effect to finish?
 * 
 *   Boss Collapse Wait?:
 *   - Wait for the boss collapse effect to finish?
 * 
 * ---
 * 
 * Victory Music
 * 
 *   Victory BGM:
 *   - Background music to play during the victory sequence.
 * 
 *   Volume:
 *   - Volume of the sound effect played.
 * 
 *   Pitch:
 *   - Pitch of the sound effect played.
 * 
 *   Pan:
 *   - Pan of the sound effect played.
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Reward Strips Settings
 * ============================================================================
 *
 * Reward strip settings that appear in the first screen of the Victory
 * Aftermath. These are used to let you have control over what rewards are
 * displayed at the end of each battle and can be used to display custom data
 * from other plugins as well.
 *
 * ---
 *
 * Reward Strip
 * 
 *   Label:
 *   - This one doesn't have any use other than being a label to  quickly
 *     determine what this one is for.
 * 
 *   JS: Show:
 *   - Code used to determine if the reward strip is shown.
 * 
 *   JS: Text:
 *   - Code used to determine if the text displayed as the category.
 * 
 *   JS: Data:
 *   - Code used to determine what data should be displayed in the
 *     reward strip.
 *
 * ---
 * 
 * The default parameters for this will be updated from time to time as more
 * VisuStella MZ plugins are released to add in extra displayed resources that
 * the party can gain from battle.
 *
 * ============================================================================
 * Plugin Parameters: Level Up Settings
 * ============================================================================
 *
 * When actors level up, extra screens will be displayed in the Victory
 * Aftermath sequence. Alter these settings to best fit your game.
 *
 * ---
 *
 * General
 * 
 *   Enable?:
 *   - Enable the Level Up portion of the Victory Aftermath phase?
 * 
 *   Show Face?:
 *   - Show the actor's face?
 * 
 *   Show Param Change?:
 *   - Show an extra column for parameter value differences?
 * 
 *     Hide Level?:
 *     - Hide the level change in the parameter value differences?
 * 
 *   Shown Max Skills:
 *   - The maximum amount of skills that are displayed.
 *   - This is due to limited screen space.
 * 
 *   Show Back Rectangles?:
 *   - Show back rectangles of darker colors to display information better?
 * 
 *     Back Rectangle Color:
 *     - Use #rrggbb for custom colors or regular numbers for text colors
 *       from the Window Skin.
 *
 * ---
 *
 * Quotes
 * 
 *   Level Up Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <Level Up Quote> notetags.
 *   - %1 - Actor Name
 * 
 *   New Skill Quotes:
 *   - A list of generic level up quotes for those who don't have the
 *     <New Skill Quote> notetags.
 *   - %1 - Actor Name
 *
 * ---
 *
 * VisuMZ_1_MainMenuCore
 * - The following Plugin Parameters require VisuMZ_1_MainMenuCore.
 * 
 *   Show Bust?:
 *   - Show the actor's menu image as a bust?
 * 
 *   Bust Position X:
 *   - Positon to center the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Position Y:
 *   - Positon to anchor the actor's menu image bust.
 *   - You may use JavaScript code.
 * 
 *   Bust Scale:
 *   - The amount to scale the actor's menu image bust.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * There's certain diction used in the Victory Aftermath plugin that's not set
 * anywhere else in the game. Change the settings to make it fit your game.
 *
 * ---
 *
 * Vocabulary
 * 
 *   Continue Format:
 *   - Text format for continue message.
 *   - %1 - OK key, %2 - Cancel key
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Level Format:
 *   - Text format for actor level.
 *   - %1 - Level
 * 
 *   Level Up:
 *   - Text format for reaching a level up.
 * 
 *   Sound Effect:
 *   - Sound effect played when a level up occurs.
 * 
 *     Volume:
 *     - Volume of the sound effect played.
 * 
 *     Pitch:
 *     - Pitch of the sound effect played.
 * 
 *     Pan:
 *     - Pan of the sound effect played.
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors
 *     from the Window Skin.
 * 
 *   New Skill Format:
 *   - Text format describing that a new skill has been learned.
 *   - %1 - Actor Name
 * 
 *   Reward Items:
 *   - Text displayed for items rewarded.
 * 
 *   Victory Title:
 *   - Text displayed at the top of the victory screen.
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
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.11: July 9, 2021
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * 
 * Version 1.10: March 12, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Olivia!
 * *** Plugin Parameters > General > Show EXP Gauges?
 * **** Show the EXP Gauges of the main party members for the first screen of
 *      the Victory Aftermath?
 * **** This is added for those with large parties and cannot fit everything
 *      into one screen for all party members and would prefer not showing any
 *      EXP Gauges at all instead.
 * 
 * Version 1.09: January 15, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Parameters added by Arisu!
 * *** Plugin Parameters > Vocab > Level Up > Volume
 * *** Plugin Parameters > Vocab > Level Up > Pitch
 * *** Plugin Parameters > Vocab > Level Up > Pan
 * **** For the people who want more control over the level up sound effect.
 * 
 * Version 1.08: December 11, 2020
 * * Compatibility Update
 * ** Added compatibility functionality for future plugins.
 * * Feature Updates!
 * ** The default Plugin Parameter for "Reward Strips" have been updated to
 *    contain compatibility for a future plugin.
 * 
 * Version 1.07: December 4, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Plugin Parameter added by Olivia:
 * ** Plugin Parameters > Level Up Settings > Hide Level?
 * *** Hide the level change in the parameter value differences when comparing
 *     the stat changes from the previous level to the next.
 * 
 * Version 1.06: November 29, 2020
 * * Bug Fixed!
 * ** The default reward strips Plugin Parameters data is now updated for the
 *    SP display costs to show the Skill Points data instead of Ability Points
 *    data. Fix made by Arisu.
 * 
 * Version 1.05: November 8, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Arisu.
 * *** Plugin Parameters > Reward Strips
 * **** Reward strip settings that appear in the first screen of the Victory
 *      Aftermath. These are used to let you have control over what rewards are
 *      displayed at the end of each battle and can be used to display custom
 *      data from other plugins as well.
 * 
 * Version 1.04: October 25, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New plugin parameter added by Olivia.
 * *** Plugin Parameters > General > Mirror Contents?
 * **** Mirror the positions of EXP, Gold, and Items?
 * 
 * Version 1.03: October 18, 2020
 * * Documentation Update!
 * ** Help file updated for new features.
 * * Feature Update!
 * ** BGM pitch plugin parameter is now uncapped.
 * * New Features!
 * ** New plugin parameters added by Yanfly.
 * *** Plugin Parameters > General > Collapse Effect > Normal Collapse Wait?
 * *** Plugin Parameters > General > Collapse Effect > Boss Collapse Wait?
 * **** These settings enable you to decide if you want the Victory Aftermath
 *      to wait until collapse effects are finished before continuing.
 * *** Plugin Parameters > General > Music > Volume
 * *** Plugin Parameters > General > Music > Pitch
 * *** Plugin Parameters > General > Music > Pan
 * **** Adjusts the volume, pitch, and pan of the victory music.
 * 
 * Version 1.02: September 13, 2020
 * * Feature Update!
 * ** Victory Aftermath windows now wait until all boss collapse effects are
 *    done before showing. Update added by Olivia.
 * * New Features!
 * ** New Plugin Parameter under General Settings: Auto Skip Auto Battle?
 * *** Skip the Victory Aftermath sequence if the player has decided to use the
 *     party Auto Battle command?
 * *** Feature added by Olivia
 * 
 * Version 1.01: September 6, 2020
 * * New Features!
 * ** New Plugin Parameters added in Level Up Settings for disabling
 *    the back rectangles and/or changing their colors.
 *
 * Version 1.00: August 26, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpAdd
 * @text Actor: Add Level Up Quotes
 * @desc Add new entries target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's level up quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillAdd
 * @text Actor: Add New Skill Quotes
 * @desc Add new entries target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to add quotes for.
 * @default 1
 *
 * @arg NewQuotes:arrayjson
 * @text New Quotes
 * @type note[]
 * @desc Add new entries to actor's new skill quotes.
 * Text codes allowed. %1 - Actor's Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Text\\\"\""]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesLevelUpClear
 * @text Actor: Clear Level Up Quotes
 * @desc Clear target actor's level up quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActorQuotesNewSkillClear
 * @text Actor: Clear New Skill Quotes
 * @desc Clear target actor's new skill quotes.
 *
 * @arg ActorID:num
 * @text Actor ID
 * @type actor
 * @desc Select ID of target actor to clear quotes for.
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMotion
 * @text System: Bypass Victory Motion
 * @desc Bypass actors performing their victory motion?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass actors performing their victory motion?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryMusic
 * @text System: Bypass Victory Music
 * @desc Bypass playing the victory music?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass playing the victory music?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemBypassVictoryPhase
 * @text System: Bypass Victory Phase
 * @desc Bypass the entire victory phase and all aspects about it?
 *
 * @arg Bypass:eval
 * @text Bypass?
 * @type boolean
 * @on Bypass
 * @off Normal
 * @desc Bypass the entire victory phase and all aspects about it?
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
 * @param VictoryAftermath
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
 * @text General Settings
 * @type struct<General>
 * @desc General settings pertaining to the Victory Aftermath phase.
 * @default {"General":"","FadeInSpeed:num":"8","HideDelayMS:num":"1500","ShowDelayMS:num":"2000","UpdateDuration:num":"180","AutoBattleAutoSkip:eval":"true","MirrorContents:eval":"false","Collapse":"","WaitRegularCollapse:eval":"true","WaitBossCollapse:eval":"true","Music":"","Bgm:str":"Ship3","volume:num":"90","pitch:num":"100","pan:num":"0"}
 *
 * @param Rewards:arraystruct
 * @text Reward Strips
 * @parent General:struct
 * @type struct<Rewards>[]
 * @desc Reward strip settings that appear in the first screen of the Victory Aftermath.
 * @default ["{\"Label\":\"EXP\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.exp;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.exp;\\\"\"}","{\"Label\":\"Gold\",\"Show:func\":\"\\\"return true;\\\"\",\"Text:func\":\"\\\"return TextManager.currencyUnit;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.gold;\\\"\"}","{\"Label\":\"AP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.AbilityPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.abilityPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.abilityPoints;\\\"\"}","{\"Label\":\"CP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.ClassPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.classPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.classPoints;\\\"\"}","{\"Label\":\"JP (Class Change System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_ClassChangeSystem &&\\\\n    VisuMZ.ClassChangeSystem.Settings.JobPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.jobPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.jobPoints;\\\"\"}","{\"Label\":\"SP (Skill Learn System)\",\"Show:func\":\"\\\"return Imported.VisuMZ_2_SkillLearnSystem &&\\\\n    VisuMZ.SkillLearnSystem.Settings.SkillPoints.ShowVictory;\\\"\",\"Text:func\":\"\\\"return TextManager.skillPointsAbbr;\\\"\",\"Data:func\":\"\\\"return BattleManager._rewards.skillPoints;\\\"\"}"]
 *
 * @param LevelUp:struct
 * @text Level Up Settings
 * @type struct<LevelUp>
 * @desc Settings pertaining to the Level Up portion of the Victory Aftermath phase.
 * @default {"General":"","Enable:eval":"true","ShowFace:eval":"false","ShowParamDiff:eval":"true","HideLevelDiff:eval":"false","MaxSkills:num":"8","DelayBuffer:num":"200","DrawBackRect:eval":"true","BackRectColor:str":"19","Quotes":"","LevelUpQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Alright! A level up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Yes! I've leveled up!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Oh? I've leveled up!?\\\\n This is awesome!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've become stronger!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I feel like I'm getting used to battle.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"The power! I can feel it!\\\\\\\"\\\"\"]","NewSkillQuotes:arrayjson":"[\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"Looks like I've acquired a new skill!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This new skill should come in handy.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"It seems I've learned something new!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I've acquired a new power!\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"This should be useful for future battles.\\\\\\\"\\\"\",\"\\\"\\\\\\\\c[6]%1\\\\\\\\c[0]\\\\n\\\\\\\"I wonder what this new skill is like?\\\\\\\"\\\"\"]","MainMenuCore":"","ShowBust:eval":"true","BustPosX:str":"Graphics.width * 0.25","BustPosY:str":"Graphics.height","BustScale:num":"1.20"}
 *
 * @param Vocab:struct
 * @text Vocabulary
 * @type struct<Vocab>
 * @desc The vocabulary used for this plugin and related settings.
 * @default {"ContinueFmt:str":"Press %1 or %2 to continue","KeyOK:str":"OK","KeyCancel:str":"Cancel","LvFmt:str":"LV %1","LvUp:str":"LEVEL UP!","LvUpSfx:str":"Up4","LvUpVolume:num":"90","LvUpPitch:num":"100","LvUpPan:num":"0","LvUpColor:str":"17","NewSkill:str":"%1 has learned:","RewardItems:str":"Items Obtained","Victory:str":"Victory!"}
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
 * General Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~General:
 *
 * @param General
 * 
 * @param FadeInSpeed:num
 * @text Fade In Speed
 * @parent General
 * @desc Fade in speed for the victory window.
 * @default 8
 *
 * @param HideDelayMS:num
 * @text Hide Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before hiding the UI Windows.
 * @default 1500
 *
 * @param ShowDelayMS:num
 * @text Show Delay (MS)
 * @parent General
 * @desc Delay in milliseconds before showing the Victory Windows.
 * @default 2000
 *
 * @param UpdateDuration:num
 * @text Update Duration
 * @parent General
 * @desc Duration in frames on updating actor EXP gauges.
 * @default 180
 *
 * @param AutoBattleAutoSkip:eval
 * @text Skip Auto Battle?
 * @parent General
 * @type boolean
 * @on Skip
 * @off Don't Skip
 * @desc Skip the Victory Aftermath sequence if the player has
 * decided to use the party Auto Battle command?
 * @default true
 *
 * @param MirrorContents:eval
 * @text Mirror Contents?
 * @parent General
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the positions of EXP, Gold, and Items?
 * @default false
 *
 * @param ShowExpGauges:eval
 * @text Show EXP Gauges?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the EXP Gauges of the main party members
 * for the first screen of the Victory Aftermath?
 * @default true
 * 
 * @param Collapse
 * @text Collapse Effect
 *
 * @param WaitRegularCollapse:eval
 * @text Normal Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the normal collapse effect to finish?
 * @default true
 *
 * @param WaitBossCollapse:eval
 * @text Boss Collapse Wait?
 * @parent Collapse
 * @type boolean
 * @on Wait
 * @off Don't Wait
 * @desc Wait for the boss collapse effect to finish?
 * @default true
 * 
 * @param Music
 * @text Victory Music
 *
 * @param Bgm:str
 * @text Victory BGM
 * @parent Music
 * @type file
 * @dir audio/bgm/
 * @desc Background music to play during the victory sequence.
 * @default Ship3
 *
 * @param volume:num
 * @text Volume
 * @parent Music
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param pitch:num
 * @text Pitch
 * @parent Music
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param pan:num
 * @text Pan
 * @parent Music
 * @desc Pan of the sound effect played.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * Rewards Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Rewards:
 *
 * @param Label
 * @desc This one doesn't have any use other than being a label to 
 * quickly determine what this one is for.
 * @default Untitled
 *
 * @param Show:func
 * @text JS: Show
 * @type note
 * @desc Code used to determine if the reward strip is shown.
 * @default "return true;"
 *
 * @param Text:func
 * @text JS: Text
 * @type note
 * @desc Code used to determine if the text displayed as the category.
 * @default "return 'Untitled';"
 *
 * @param Data:func
 * @text JS: Data
 * @type note
 * @desc Code used to determine what data should be displayed in the reward strip.
 * @default "return 0;"
 *
 */
/* ----------------------------------------------------------------------------
 * Level Up Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LevelUp:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable?
 * @parent General
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Enable the Level Up portion of the Victory Aftermath phase?
 * @default true
 *
 * @param ShowFace:eval
 * @text Show Face?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's face?
 * @default false
 *
 * @param ShowParamDiff:eval
 * @text Show Param Change?
 * @parent General
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show an extra column for parameter value differences?
 * @default true
 *
 * @param HideLevelDiff:eval
 * @text Hide Level?
 * @parent ShowParamDiff:eval
 * @type boolean
 * @on Hide
 * @off Normal
 * @desc Hide the level change in the parameter value differences?
 * @default false
 *
 * @param MaxSkills:num
 * @text Shown Max Skills
 * @parent General
 * @desc The maximum amount of skills that are displayed.
 * This is due to limited screen space.
 * @default 8
 *
 * @param DelayBuffer:num
 * @text Delay Buffer
 * @parent General
 * @type number
 * @desc How many milliseconds to wait in between playing
 * each level up sound effect?
 * @default 200
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent General
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Show back rectangles of darker colors to display information better?
 * @default true
 *
 * @param BackRectColor:str
 * @text Back Rectangle Color
 * @parent DrawBackRect:eval
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param Quotes
 *
 * @param LevelUpQuotes:arrayjson
 * @text Level Up Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <Level Up Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Alright! A level up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Yes! I've leveled up!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Oh? I've leveled up!?\\n This is awesome!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've become stronger!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I feel like I'm getting used to battle.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"The power! I can feel it!\\\"\""]
 *
 * @param NewSkillQuotes:arrayjson
 * @text New Skill Quotes
 * @parent Quotes
 * @type note[]
 * @desc A list of generic level up quotes for those who don't
 * have the <New Skill Quote> notetags. %1 - Actor Name
 * @default ["\"\\\\c[6]%1\\\\c[0]\\n\\\"Looks like I've acquired a new skill!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This new skill should come in handy.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"It seems I've learned something new!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I've acquired a new power!\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"This should be useful for future battles.\\\"\"","\"\\\\c[6]%1\\\\c[0]\\n\\\"I wonder what this new skill is like?\\\"\""]
 *
 * @param MainMenuCore
 * @text VisuMZ_1_MainMenuCore
 *
 * @param ShowBust:eval
 * @text Show Bust?
 * @parent MainMenuCore
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show the actor's menu image as a bust?
 * @default true
 *
 * @param BustPosX:str
 * @text Bust Position X
 * @parent MainMenuCore
 * @desc Positon to center the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.width * 0.25
 *
 * @param BustPosY:str
 * @text Bust Position Y
 * @parent MainMenuCore
 * @desc Positon to anchor the actor's menu image bust.
 * You may use JavaScript code.
 * @default Graphics.height
 *
 * @param BustScale:num
 * @text Bust Scale
 * @parent MainMenuCore
 * @desc The amount to scale the actor's menu image bust.
 * @default 1.20
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param ContinueFmt:str
 * @text Continue Format
 * @desc Text format for continue message.
 * %1 - OK key, %2 - Cancel key
 * @default Press %1 or %2 to continue
 *
 * @param KeyOK:str
 * @text OK Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param KeyCancel:str
 * @text Cancel Button
 * @parent ContinueFmt:str
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param LvFmt:str
 * @text Level Format
 * @desc Text format for actor level.
 * %1 - Level
 * @default LV %1
 *
 * @param LvUp:str
 * @text Level Up
 * @desc Text format for reaching a level up.
 * @default LEVEL UP!
 *
 * @param LvUpSfx:str
 * @text Sound Effect
 * @parent LvUp:str
 * @type file
 * @dir audio/se/
 * @desc Sound effect played when a level up occurs.
 * @default Up4
 *
 * @param LvUpVolume:num
 * @text Volume
 * @parent LvUpSfx:str
 * @type number
 * @max 100
 * @desc Volume of the sound effect played.
 * @default 90
 *
 * @param LvUpPitch:num
 * @text Pitch
 * @parent LvUpSfx:str
 * @type number
 * @desc Pitch of the sound effect played.
 * @default 100
 *
 * @param LvUpPan:num
 * @text Pan
 * @parent LvUpSfx:str
 * @desc Pan of the sound effect played.
 * @default 0
 *
 * @param LvUpColor:str
 * @text Text Color
 * @parent LvUp:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param NewSkill:str
 * @text New Skill Format
 * @desc Text format describing that a new skill has been learned.
 * %1 - Actor Name
 * @default %1 has learned:
 *
 * @param RewardItems:str
 * @text Reward Items
 * @desc Text displayed for items rewarded.
 * @default Items Obtained
 *
 * @param Victory:str
 * @text Victory Title
 * @desc Text displayed at the top of the victory screen.
 * @default Victory!
 *
 */
//=============================================================================

const _0x4f48=['cancel','_victoryTempActorsB','processVictoryAftermathRewards','2515gkYwMM','#%1','drawPartyExpGauges','drawParamDiffValue','filter','_victoryBgm','drawActorFace','VisuMZ_1_BattleCore','width','qVWZM','QonFp','DigitGroupingStandardText','PoirH','version','LevelUp','drawExpValues','ShowBust','ContinueFmt','EDXzR','91UQagju','round','split','Vocab','getVictoryAftermathBackColor','_actorSprite','center','nextLevelExp','weeiM','setActor','faceWidth','textSizeEx','victoryNameBitmap','paramchangeTextColor','bOVXF','registerCommand','initialize','isVictoryPhase','drawCurrencyValue','playSe','currencyUnit','bind','allowUpdateBattleAniSpeed','paramValueFontSize','gradientFillRect','playBgm','gaugeHeight','getQuoteText','BustPosY','drawParamBeforeValue','General','actor%1-gauge','VisuMZ_1_ItemsEquipsCore','KngXp','left','pan','toUpperCase','loadPicture','VisuMZ_1_OptionsCore','createVictoryStepRewards','earnedAbilityPoints','setBackgroundType','bypassVictoryMusic','_subWindow','playVictoryLevelUpSFX','_victoryAftermathLevelUpQuotes','_opacitySpeed','victoryNewSkillFmt','VisuMZ_X_Template','setupVictoryLevelUpNextActor','members','bypassVictoryPhase','setup','changeTextColor','aGPUW','name','newSkillQuotes','expGaugeColor2','drawNewLearnedSkills','isSceneBattle','expGaugeColor1','QpwhU','itemPadding','UPHAG','HideDelayMS','systemColor','drawNewLearnedSkillsBackground','createActorSprite','ShowFace','lineHeight','DrawBackRect','MessageWidth','VisuMZ_2_ClassChangeSystem','mainFontFace','zowMw','_victoryUpdateDuration','makeFontBigger','currentExp','map','EDEMi','dimColor2','ARRAYNUM','shift','WaitRegularCollapse','trim','SkillLearnSystem','currentLevelExp','EFSzD','processVictoryAftermath','placeActorGauges','paintOpacity','426228GQkkNY','LevelUpQuotes','select','makeDeepCopy','NewSkillQuotes','_currentlevel','ExtDisplayedParams','KeyOK','MaxSkills','_victoryLevelUpBuffer','makeRewards','paramValueByName','finishVictoryPhase','exit','_fullWidth','_rewards','Game_Actor_setup','UpdateDuration','isBusy','removeVictoryLevelUpBuffer','create','_victorySteps','LvUpPitch','_rewardSets','isFastForwarded','getQuoteWidth','items','drawRewardStrip','gainRewards','right','clear','updateVictoryPhase','setDelayDuration','ItemScene','getInputButtonString','isBypassVictoryAftermathMusic','makeVictoryCopy','replayBgmAndBgs','constructor','ActorQuotesLevelUpAdd','indexOf','volume','drawText','gaugeBackColor','NewSkill','Game_Actor_performVictory','gaugeColor1','_delayDuration','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','powerUpColor','dlvCo','battlerSprites','fontSize','playVictoryBgm','CoreEngine','earnedSkillPoints','done','Victory','Gaqvt','toLowerCase','setupVictoryAftermathQuotes','getColorDataFromPluginParameters','LvUpPan','quoteLevelSkill','processVictoryStep','isRepeated','drawLevelMessage','CnmOf','updateContentsOpacity','Settings','FUNC','_autoBattle','beforeActor','_phase','Sxiid','LvUpVolume','ARRAYSTRUCT','note','some','isBypassVictoryAftermathPhase','(%1)','hideSubInputWindows','_actor','QoL','_victoryLevelUpWindow','AbilityPoints','Template','processVictoryAftermathTransition','VLcFC','victoryRewardBitmap','max','laNYJ','victoryDisplayLvFmt','prototype','maxBattleMembers','format','rgba(0,\x200,\x200,\x200.4)','normalColor','MirrorContents','createVictoryContinueMessageWindow','Enable','contentsOpacity','ShowExpGauges','_showLevelUp','update','STR','SystemBypassVictoryPhase','battleMembers','isCollapsing','drawItemName','battleEnd','gaugeColor2','Scene_Battle_allowUpdateBattleAniSpeed','nemJd','_scene','Show','victoryDisplayItem','return\x200','victoryAftermathSettings','isActor','performVictory','isVictoryLevelUpPhaseEnabled','index','createBitmap','JobPoints','ARRAYFUNC','blt','push','_statusWindow','skillPointsFull','status','getMenuImage','lIJXI','skipVictoryAftermathTransition','SystemBypassVictoryMusic','ActorQuotesLevelUpClear','YkNLr','_duration','isMaxLevel','includes','BattleManager_isBusy','victoryContinueFmt','description','BustPosX','ConvertParams','measureTextWidth','VictoryAftermath','_autoBattleVictorySkip','_victoryTempActorsA','_spriteset','drawActorName','jobPointsFull','isPressed','RGmMU','ItemQuantityFmt','translucentOpacity','isVictoryContinueReady','createVictoryRewardsWindow','finalExpRate','fillRect','show','updateExpGain','ActorID','drawParamChanges','hideWindowsForVictoryAftermath','Game_Actor_isBattleMember','tqDLF','levelUpQuotes','BustScale','playVictoryMe','checkVictoryAftermathAutoBattleAutoSkip','1oLvoiZ','GroupDigits','shouldDisplayLevelUp','drawExpGauge','uZJiG','_victoryPhase','bossCollapse','drawItemNumber','_tempActorExpGain','makeItemList','_effectType','ActorQuotesNewSkillAdd','NLgxX','actorParams','(+%1)','_victoryLevelUpSFX','clearRect','floor','isContinueReady','contents','itemCount','drawCircle','createVictoryStepLevelUps','FvDxr','exp','mLqdk','drawLevelUpQuote','resetFontSettings','scale','MWSkN','rgba(0,\x200,\x200,\x201)','85028BwmViY','levelups','AftermathText','LvUp','ClassChangeSystem','GQaSz','length','_victoryWindows','Scene_Battle_update','victoryFullScreenWindowRect','bypassVictoryMotion','isBypassVictoryAftermathMotion','_data','697SIHRHo','isBattleMember','concat','prFHG','NUM','createGaugeSprite','drawItemGainTitle','Game_System_initialize','createVictoryAftermathWindows','parse','ActorQuotesNewSkillClear','_victoryRewardsWindow','updatePadding','_victoryContinueWindow','drawItemBackground','LvUpColor','initVictoryAftermath','isItem','omgep','boxWidth','rewards','isEnabled','oZPbW','textWidth','FadeInSpeed','tFxXg','MAX\x20LEVEL','FGoqr','drawTextEx','drawBackgroundElements','nextVictoryLevelUpActor','padding','Rewards','ueCvI','_showFace','Game_Actor_shouldDisplayLevelUp','bitmap','drawActorLevel','victoryDisplayLvUp','ClassPoints','processVictoryAftermathMusic','textColor','makeTempActors','nggGG','cAlLT','updateVictorySteps','maxCols','781RCfEnu','pop','_victoryActorIndex','713919Edheme','SkillPoints','addInnerChild','earnedClassPoints','victoryDisplayTitle','drawActorAdditionalRewards','sort','drawItemDarkRect','call','quoteLevelUp','victoryKeyCancel','ShowParamDiff','isArmor','maxLvGaugeColor1','VisuMZ_1_MainMenuCore','_index','x%1','getAdditionalRewardsText','match','getColor','NewQuotes','classPointsAbbr','actor','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','ItemsEquipsCore','RuoXn','expRate','Bjmho','clamp','isWeapon','_victoryStep','BackRectColor','drawNewLearnedSkillsList','processPostBattleCommonEvents','prepareVictoryAftermathTransition','LvFmt','_showBust','_victoryAftermathNewSkillQuotes','1129184ekBZjd','gainTempExp','_drawParamDiff','qAzwJ','earnedJobPoints','innerWidth','OemTm','HbGPc','victoryLevelUpColor','plHFc','drawActorNameStrip','OnINC','classPointsFull','XfzSe','findNewSkills','createSubWindow','_victoryAftermathSettings','SyzKQ','UsMgs','drawParamAfterValue','addChild','Bypass','_victoryAftermathCopy','BattleManager_initMembers','661748aEQAeg','removeBattleStates','STRUCT','VisuMZ_0_CoreEngine','OQzNV','min','initMembers','AutoBattleAutoSkip','jySQF','izZPZ','randomInt','drawParamName','pitch','createVictorySteps','rgba(0,\x200,\x200,\x200.8)','jobPointsAbbr','param','endBattle','level','WaitBossCollapse','abilityPointsFull','FmiQI','drawRewards','updateOpacity','onVictoryStepLevelUpMember','createVictoryLevelUpWindow','_actorId','mirrorContents','NTODB','AftermathActorDisplay','VisuMZ_3_VisualGoldDisplay','refresh','_mainWindow','LvUpSfx','victoryKeyOk','MessageCore','processVictoryAftermathParty','HideLevelDiff','setActionState','anchor','opacity','height','_colorCache'];const _0x597b48=_0x73ca;(function(_0x1f860d,_0x3fd95b){const _0x593227=_0x73ca;while(!![]){try{const _0x5e9310=-parseInt(_0x593227(0x23a))+-parseInt(_0x593227(0x1fc))+parseInt(_0x593227(0x381))*-parseInt(_0x593227(0x3a0))+parseInt(_0x593227(0x2d6))+-parseInt(_0x593227(0x1ca))*-parseInt(_0x593227(0x1f9))+-parseInt(_0x593227(0x27b))*parseInt(_0x593227(0x268))+parseInt(_0x593227(0x222));if(_0x5e9310===_0x3fd95b)break;else _0x1f860d['push'](_0x1f860d['shift']());}catch(_0x370ec0){_0x1f860d['push'](_0x1f860d['shift']());}}}(_0x4f48,0x64261));var label=_0x597b48(0x368),tier=tier||0x0,dependencies=[_0x597b48(0x26f)],pluginData=$plugins[_0x597b48(0x26c)](function(_0x1bfae9){const _0x4b50d0=_0x597b48;return _0x1bfae9[_0x4b50d0(0x358)]&&_0x1bfae9['description'][_0x4b50d0(0x361)]('['+label+']');})[0x0];VisuMZ[label][_0x597b48(0x31b)]=VisuMZ[label][_0x597b48(0x31b)]||{},VisuMZ[_0x597b48(0x366)]=function(_0x5f5374,_0x747a1b){const _0x5a5d7e=_0x597b48;for(const _0x3dd867 in _0x747a1b){if(_0x5a5d7e(0x38d)==='ekeKW'){const _0x4ba559=_0x193549[_0x5a5d7e(0x1e8)]();this[_0x5a5d7e(0x32a)][_0x5a5d7e(0x284)](_0x4ba559);}else{if(_0x3dd867['match'](/(.*):(.*)/i)){if(_0x5a5d7e(0x24f)!==_0x5a5d7e(0x24f))this[_0x5a5d7e(0x262)]=this[_0x5a5d7e(0x25a)]['contentsOpacity'];else{const _0x14b142=String(RegExp['$1']),_0x231e91=String(RegExp['$2'])[_0x5a5d7e(0x29f)]()[_0x5a5d7e(0x2cf)]();let _0x18023a,_0x4fe27d,_0x8ac79b;switch(_0x231e91){case _0x5a5d7e(0x1ce):_0x18023a=_0x747a1b[_0x3dd867]!==''?Number(_0x747a1b[_0x3dd867]):0x0;break;case _0x5a5d7e(0x2cc):_0x4fe27d=_0x747a1b[_0x3dd867]!==''?JSON[_0x5a5d7e(0x1d3)](_0x747a1b[_0x3dd867]):[],_0x18023a=_0x4fe27d['map'](_0x30501f=>Number(_0x30501f));break;case'EVAL':_0x18023a=_0x747a1b[_0x3dd867]!==''?eval(_0x747a1b[_0x3dd867]):null;break;case'ARRAYEVAL':_0x4fe27d=_0x747a1b[_0x3dd867]!==''?JSON[_0x5a5d7e(0x1d3)](_0x747a1b[_0x3dd867]):[],_0x18023a=_0x4fe27d[_0x5a5d7e(0x2c9)](_0x43498a=>eval(_0x43498a));break;case'JSON':_0x18023a=_0x747a1b[_0x3dd867]!==''?JSON['parse'](_0x747a1b[_0x3dd867]):'';break;case'ARRAYJSON':_0x4fe27d=_0x747a1b[_0x3dd867]!==''?JSON['parse'](_0x747a1b[_0x3dd867]):[],_0x18023a=_0x4fe27d[_0x5a5d7e(0x2c9)](_0x3f765f=>JSON['parse'](_0x3f765f));break;case _0x5a5d7e(0x31c):_0x18023a=_0x747a1b[_0x3dd867]!==''?new Function(JSON[_0x5a5d7e(0x1d3)](_0x747a1b[_0x3dd867])):new Function(_0x5a5d7e(0x34b));break;case _0x5a5d7e(0x353):_0x4fe27d=_0x747a1b[_0x3dd867]!==''?JSON[_0x5a5d7e(0x1d3)](_0x747a1b[_0x3dd867]):[],_0x18023a=_0x4fe27d['map'](_0x147e27=>new Function(JSON[_0x5a5d7e(0x1d3)](_0x147e27)));break;case _0x5a5d7e(0x33f):_0x18023a=_0x747a1b[_0x3dd867]!==''?String(_0x747a1b[_0x3dd867]):'';break;case'ARRAYSTR':_0x4fe27d=_0x747a1b[_0x3dd867]!==''?JSON['parse'](_0x747a1b[_0x3dd867]):[],_0x18023a=_0x4fe27d['map'](_0x24980d=>String(_0x24980d));break;case _0x5a5d7e(0x23c):_0x8ac79b=_0x747a1b[_0x3dd867]!==''?JSON['parse'](_0x747a1b[_0x3dd867]):{},_0x18023a=VisuMZ[_0x5a5d7e(0x366)]({},_0x8ac79b);break;case _0x5a5d7e(0x322):_0x4fe27d=_0x747a1b[_0x3dd867]!==''?JSON[_0x5a5d7e(0x1d3)](_0x747a1b[_0x3dd867]):[],_0x18023a=_0x4fe27d['map'](_0x4c0c5f=>VisuMZ[_0x5a5d7e(0x366)]({},JSON[_0x5a5d7e(0x1d3)](_0x4c0c5f)));break;default:continue;}_0x5f5374[_0x14b142]=_0x18023a;}}}}return _0x5f5374;},(_0xb4b01c=>{const _0x9098fa=_0x597b48,_0x1a06c7=_0xb4b01c[_0x9098fa(0x2b2)];for(const _0xac1db4 of dependencies){if(_0x9098fa(0x319)!==_0x9098fa(0x308)){if(!Imported[_0xac1db4]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x1a06c7,_0xac1db4)),SceneManager['exit']();break;}}else _0x1f2628['AutoBattleAutoSkip']=!![];}const _0x32d302=_0xb4b01c[_0x9098fa(0x364)];if(_0x32d302[_0x9098fa(0x20e)](/\[Version[ ](.*?)\]/i)){const _0x213848=Number(RegExp['$1']);_0x213848!==VisuMZ[label][_0x9098fa(0x275)]&&(_0x9098fa(0x22f)!==_0x9098fa(0x22f)?this[_0x9098fa(0x1ee)]=new _0x586aa0(this['_fullWidth'],this['lineHeight']()*0x2):(alert(_0x9098fa(0x306)[_0x9098fa(0x335)](_0x1a06c7,_0x213848)),SceneManager[_0x9098fa(0x2e3)]()));}if(_0x32d302[_0x9098fa(0x20e)](/\[Tier[ ](\d+)\]/i)){const _0x1fc341=Number(RegExp['$1']);_0x1fc341<tier?_0x9098fa(0x217)!=='Bjmho'?(this['drawItemDarkRect'](_0x59e6ad,_0x1476b0,_0x5c2069,_0x3aa4ea,_0x4c69b6),this[_0x9098fa(0x26b)](_0x334723,_0x2f3f25,_0x28d234,_0x9b60dc)):(alert(_0x9098fa(0x213)['format'](_0x1a06c7,_0x1fc341,tier)),SceneManager[_0x9098fa(0x2e3)]()):tier=Math['max'](_0x1fc341,tier);}VisuMZ[_0x9098fa(0x366)](VisuMZ[label][_0x9098fa(0x31b)],_0xb4b01c['parameters']);})(pluginData),PluginManager[_0x597b48(0x28a)](pluginData[_0x597b48(0x2b2)],_0x597b48(0x2fd),_0x54d1e3=>{const _0x401ee5=_0x597b48;VisuMZ[_0x401ee5(0x366)](_0x54d1e3,_0x54d1e3);const _0x30b6f6=$gameActors[_0x401ee5(0x212)](_0x54d1e3[_0x401ee5(0x378)]),_0x18908c=_0x54d1e3[_0x401ee5(0x210)];if(_0x30b6f6){if(_0x401ee5(0x1cd)!==_0x401ee5(0x331))while(_0x18908c[_0x401ee5(0x3a6)]>0x0){_0x30b6f6[_0x401ee5(0x37d)]()[_0x401ee5(0x355)](_0x18908c['shift']());}else return!![];}}),PluginManager[_0x597b48(0x28a)](pluginData['name'],_0x597b48(0x38c),_0x573760=>{const _0x214173=_0x597b48;VisuMZ['ConvertParams'](_0x573760,_0x573760);const _0x3550ba=$gameActors['actor'](_0x573760[_0x214173(0x378)]),_0x4327d8=_0x573760['NewQuotes'];if(_0x3550ba)while(_0x4327d8[_0x214173(0x3a6)]>0x0){_0x3550ba['newSkillQuotes']()['push'](_0x4327d8['shift']());}}),PluginManager[_0x597b48(0x28a)](pluginData['name'],_0x597b48(0x35d),_0x4d4826=>{const _0x39bf7c=_0x597b48;VisuMZ[_0x39bf7c(0x366)](_0x4d4826,_0x4d4826);const _0x3b3945=$gameActors[_0x39bf7c(0x212)](_0x4d4826['ActorID']);if(_0x3b3945)while(_0x3b3945[_0x39bf7c(0x37d)]()[_0x39bf7c(0x3a6)]>0x0){_0x3b3945[_0x39bf7c(0x37d)]()[_0x39bf7c(0x2cd)]();}}),PluginManager['registerCommand'](pluginData[_0x597b48(0x2b2)],_0x597b48(0x1d4),_0x4d2e49=>{const _0x22afb8=_0x597b48;VisuMZ[_0x22afb8(0x366)](_0x4d2e49,_0x4d2e49);const _0x217a52=$gameActors[_0x22afb8(0x212)](_0x4d2e49[_0x22afb8(0x378)]);if(_0x217a52){if(_0x22afb8(0x2b1)!==_0x22afb8(0x2b1))_0x4cda43[_0x22afb8(0x333)]['initialize'][_0x22afb8(0x204)](this,_0x8d3753),this[_0x22afb8(0x2a4)](0x2),this[_0x22afb8(0x33b)]=0x0,this[_0x22afb8(0x259)]();else while(_0x217a52['newSkillQuotes']()[_0x22afb8(0x3a6)]>0x0){_0x217a52[_0x22afb8(0x2b3)]()[_0x22afb8(0x2cd)]();}}}),PluginManager[_0x597b48(0x28a)](pluginData[_0x597b48(0x2b2)],'SystemBypassVictoryMotion',_0x54fb3f=>{const _0x2ea07e=_0x597b48;VisuMZ[_0x2ea07e(0x366)](_0x54fb3f,_0x54fb3f),$gameSystem[_0x2ea07e(0x34c)]()['bypassVictoryMotion']=_0x54fb3f['Bypass'];}),PluginManager[_0x597b48(0x28a)](pluginData[_0x597b48(0x2b2)],_0x597b48(0x35c),_0xf1e828=>{const _0x45036b=_0x597b48;VisuMZ['ConvertParams'](_0xf1e828,_0xf1e828),$gameSystem[_0x45036b(0x34c)]()[_0x45036b(0x2a5)]=_0xf1e828[_0x45036b(0x237)];}),PluginManager['registerCommand'](pluginData[_0x597b48(0x2b2)],_0x597b48(0x340),_0x519262=>{const _0x3c289f=_0x597b48;VisuMZ['ConvertParams'](_0x519262,_0x519262),$gameSystem[_0x3c289f(0x34c)]()['bypassVictoryPhase']=_0x519262['Bypass'];}),TextManager[_0x597b48(0x363)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x27e)][_0x597b48(0x279)],TextManager[_0x597b48(0x25c)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x27e)][_0x597b48(0x2dd)],TextManager[_0x597b48(0x206)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x27e)]['KeyCancel'],TextManager[_0x597b48(0x332)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x27e)][_0x597b48(0x21f)],TextManager['victoryDisplayLvUp']=VisuMZ[_0x597b48(0x368)]['Settings'][_0x597b48(0x27e)][_0x597b48(0x3a3)],TextManager[_0x597b48(0x34a)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x27e)]['RewardItems'],TextManager[_0x597b48(0x200)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x27e)][_0x597b48(0x30f)],TextManager[_0x597b48(0x2aa)]=VisuMZ['VictoryAftermath'][_0x597b48(0x31b)][_0x597b48(0x27e)][_0x597b48(0x302)],TextManager[_0x597b48(0x205)]=function(_0x3f377b){const _0x16b22b=_0x597b48,_0x52cbe2=VisuMZ[_0x16b22b(0x368)][_0x16b22b(0x31b)][_0x16b22b(0x276)][_0x16b22b(0x2d7)];if(!_0x3f377b)return _0x52cbe2[Math[_0x16b22b(0x244)](_0x52cbe2[_0x16b22b(0x3a6)])];if(!_0x3f377b[_0x16b22b(0x34d)]())return _0x52cbe2[Math[_0x16b22b(0x244)](_0x52cbe2['length'])];const _0xcd47e2=_0x3f377b[_0x16b22b(0x37d)]();if(_0xcd47e2[_0x16b22b(0x3a6)]>0x0)return _0xcd47e2[Math['randomInt'](_0xcd47e2[_0x16b22b(0x3a6)])];return _0x52cbe2[Math[_0x16b22b(0x244)](_0x52cbe2[_0x16b22b(0x3a6)])];},TextManager[_0x597b48(0x315)]=function(_0x115bd0){const _0x235792=_0x597b48,_0x3833ca=VisuMZ[_0x235792(0x368)][_0x235792(0x31b)][_0x235792(0x276)][_0x235792(0x2da)];if(!_0x115bd0)return _0x3833ca[Math['randomInt'](_0x3833ca[_0x235792(0x3a6)])];if(!_0x115bd0[_0x235792(0x34d)]())return _0x3833ca[Math[_0x235792(0x244)](_0x3833ca[_0x235792(0x3a6)])];const _0x5125ce=_0x115bd0[_0x235792(0x2b3)]();if(_0x5125ce[_0x235792(0x3a6)]>0x0)return _0x5125ce[Math[_0x235792(0x244)](_0x5125ce[_0x235792(0x3a6)])];return _0x3833ca[Math[_0x235792(0x244)](_0x3833ca[_0x235792(0x3a6)])];},ColorManager['getColorDataFromPluginParameters']=function(_0x2bfb0f,_0x2f1cd8){const _0x3e9f19=_0x597b48;return _0x2f1cd8=String(_0x2f1cd8),this[_0x3e9f19(0x264)]=this['_colorCache']||{},_0x2f1cd8[_0x3e9f19(0x20e)](/#(.*)/i)?this[_0x3e9f19(0x264)][_0x2bfb0f]=_0x3e9f19(0x269)[_0x3e9f19(0x335)](String(RegExp['$1'])):this[_0x3e9f19(0x264)][_0x2bfb0f]=this[_0x3e9f19(0x1f3)](Number(_0x2f1cd8)),this[_0x3e9f19(0x264)][_0x2bfb0f];},ColorManager[_0x597b48(0x20f)]=function(_0x1ee43b){const _0x2205ca=_0x597b48;_0x1ee43b=String(_0x1ee43b);if(_0x1ee43b[_0x2205ca(0x20e)](/#(.*)/i))return _0x2205ca(0x269)[_0x2205ca(0x335)](String(RegExp['$1']));else{if(_0x2205ca(0x289)===_0x2205ca(0x3a5))this[_0x2205ca(0x221)]=_0x5b97e5(_0xb683d2['$1'])[_0x2205ca(0x27d)](/<NEW QUOTE>[\r\n]+/i);else return this['textColor'](Number(_0x1ee43b));}},ColorManager[_0x597b48(0x22a)]=function(){const _0xb39da5=_0x597b48,_0x258f20='victory-level-up-color';this[_0xb39da5(0x264)]=this['_colorCache']||{};if(this[_0xb39da5(0x264)][_0x258f20])return this[_0xb39da5(0x264)][_0x258f20];const _0x455aad=VisuMZ[_0xb39da5(0x368)][_0xb39da5(0x31b)][_0xb39da5(0x27e)][_0xb39da5(0x1d9)];return this[_0xb39da5(0x313)](_0x258f20,_0x455aad);},SoundManager[_0x597b48(0x2a7)]=function(){const _0x3c7ac7=_0x597b48;if(this[_0x3c7ac7(0x2df)])return;if(!this[_0x3c7ac7(0x390)]){const _0x3b2358=VisuMZ['VictoryAftermath'][_0x3c7ac7(0x31b)][_0x3c7ac7(0x27e)];this['_victoryLevelUpSFX']={'name':_0x3b2358[_0x3c7ac7(0x25b)]||'','volume':_0x3b2358[_0x3c7ac7(0x321)]??0x5a,'pitch':_0x3b2358[_0x3c7ac7(0x2ec)]??0x64,'pan':_0x3b2358[_0x3c7ac7(0x314)]??0x0};}this[_0x3c7ac7(0x390)][_0x3c7ac7(0x2b2)]!==''&&(AudioManager[_0x3c7ac7(0x28e)](this[_0x3c7ac7(0x390)]),this[_0x3c7ac7(0x2df)]=!![],setTimeout(this[_0x3c7ac7(0x2e9)]['bind'](this),0xc8));},SoundManager[_0x597b48(0x2e9)]=function(){this['_victoryLevelUpBuffer']=![];},SoundManager[_0x597b48(0x30b)]=function(){const _0x4f573a=_0x597b48;if(!this['_victoryBgm']){if(_0x4f573a(0x36f)===_0x4f573a(0x256)){this['changeTextColor'](_0x25645f[_0x4f573a(0x2bc)]());let _0x1fae9f='';_0x38b54e===_0x4f573a(0x24c)?_0x1fae9f=_0x4fbd03[_0x4f573a(0x24c)]:_0x1fae9f=_0x13f95e[_0x4f573a(0x24a)](_0x45c02f),this[_0x4f573a(0x300)](_0x1fae9f,_0x56821e+this[_0x4f573a(0x2b9)](),_0x21ccbc,_0x2b0eb5-this[_0x4f573a(0x2b9)]()*0x2);}else{const _0x7f5b4c=VisuMZ['VictoryAftermath']['Settings'][_0x4f573a(0x299)];if(_0x7f5b4c[_0x4f573a(0x2ff)]===undefined)_0x7f5b4c[_0x4f573a(0x2ff)]=0x5a;if(_0x7f5b4c[_0x4f573a(0x246)]===undefined)_0x7f5b4c['pitch']=0x64;if(_0x7f5b4c['pan']===undefined)_0x7f5b4c['pan']=0x0;this['_victoryBgm']={'name':_0x7f5b4c['Bgm']||'','volume':_0x7f5b4c[_0x4f573a(0x2ff)]||0x0,'pitch':_0x7f5b4c[_0x4f573a(0x246)]||0x0,'pan':_0x7f5b4c[_0x4f573a(0x29e)]||0x0};}}this['_victoryBgm'][_0x4f573a(0x2b2)]!==''&&AudioManager[_0x4f573a(0x294)](this[_0x4f573a(0x26d)]);},BattleManager['_victoryUpdateDuration']=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)]['General'][_0x597b48(0x2e7)]||0x1,VisuMZ[_0x597b48(0x368)][_0x597b48(0x239)]=BattleManager[_0x597b48(0x240)],BattleManager['initMembers']=function(){const _0x4cd3ac=_0x597b48;VisuMZ['VictoryAftermath'][_0x4cd3ac(0x239)][_0x4cd3ac(0x204)](this),this['_victoryPhase']=![],this[_0x4cd3ac(0x1fb)]=-0x1,this[_0x4cd3ac(0x369)]=![];},VisuMZ[_0x597b48(0x368)][_0x597b48(0x362)]=BattleManager['isBusy'],BattleManager[_0x597b48(0x2e8)]=function(){const _0x2b69d5=_0x597b48;return this['isVictoryPhase']()?!![]:VisuMZ[_0x2b69d5(0x368)][_0x2b69d5(0x362)][_0x2b69d5(0x204)](this);},BattleManager['isVictoryPhase']=function(){const _0x47cf97=_0x597b48;return this[_0x47cf97(0x31f)]===_0x47cf97(0x344)&&this[_0x47cf97(0x386)];},BattleManager['processVictory']=function(){const _0x37c82e=_0x597b48;this['processBattleCoreJS']('BattleVictoryJS'),this[_0x37c82e(0x21d)](_0x37c82e(0x30f)),this['processVictoryAftermath']();},BattleManager[_0x597b48(0x2d3)]=function(){const _0x499266=_0x597b48;this[_0x499266(0x25e)](),this[_0x499266(0x1f2)](),this[_0x499266(0x267)](),this[_0x499266(0x21e)]();},BattleManager[_0x597b48(0x25e)]=function(){const _0x3ba0fe=_0x597b48;$gameParty[_0x3ba0fe(0x23b)](),$gameParty[_0x3ba0fe(0x34e)]();},BattleManager[_0x597b48(0x1f2)]=function(){const _0xa69320=_0x597b48;if(this[_0xa69320(0x2f9)]())return;this[_0xa69320(0x37f)](),SoundManager['playVictoryBgm']();},BattleManager[_0x597b48(0x2f9)]=function(){const _0x4d1568=_0x597b48;return $gameSystem['victoryAftermathSettings']()['bypassVictoryMusic']||$gameSystem['victoryAftermathSettings']()[_0x4d1568(0x2ae)];},BattleManager[_0x597b48(0x267)]=function(){const _0x1a9dfc=_0x597b48;this[_0x1a9dfc(0x1f4)](),this[_0x1a9dfc(0x2e0)](),this[_0x1a9dfc(0x2f2)]();},BattleManager[_0x597b48(0x1f4)]=function(){const _0x4029cc=_0x597b48;this[_0x4029cc(0x36a)]=$gameParty['battleMembers']()[_0x4029cc(0x2c9)](_0x502ed2=>_0x502ed2[_0x4029cc(0x2fa)]()),this[_0x4029cc(0x266)]=JsonEx[_0x4029cc(0x2d9)](this[_0x4029cc(0x36a)]);},BattleManager['prepareVictoryAftermathTransition']=function(){const _0x2dbff3=_0x597b48;this[_0x2dbff3(0x380)](),this[_0x2dbff3(0x24b)](0x0),this[_0x2dbff3(0x386)]=!![],this[_0x2dbff3(0x325)]()?this[_0x2dbff3(0x35b)]():this[_0x2dbff3(0x32d)]();},BattleManager[_0x597b48(0x380)]=function(){const _0x220f4b=_0x597b48,_0x457177=VisuMZ[_0x220f4b(0x368)]['Settings'][_0x220f4b(0x299)];_0x457177[_0x220f4b(0x241)]===undefined&&(_0x457177[_0x220f4b(0x241)]=!![]),_0x457177[_0x220f4b(0x241)]===!![]&&(this['_autoBattleVictorySkip']=this[_0x220f4b(0x31d)]);},BattleManager[_0x597b48(0x325)]=function(){const _0x4fae2a=_0x597b48;if(this[_0x4fae2a(0x369)])return!![];return $gameSystem[_0x4fae2a(0x34c)]()[_0x4fae2a(0x2ae)];},BattleManager['skipVictoryAftermathTransition']=function(){const _0x22d816=_0x597b48,_0x2130f3=VisuMZ['VictoryAftermath'][_0x22d816(0x31b)][_0x22d816(0x299)],_0x2a28fc=SceneManager[_0x22d816(0x348)];setTimeout(_0x2a28fc[_0x22d816(0x2e2)][_0x22d816(0x290)](_0x2a28fc),_0x2130f3['ShowDelayMS']);},BattleManager[_0x597b48(0x32d)]=function(){const _0xc81fcb=_0x597b48,_0x436610=VisuMZ[_0xc81fcb(0x368)][_0xc81fcb(0x31b)][_0xc81fcb(0x299)],_0x31011f=SceneManager[_0xc81fcb(0x348)];this[_0xc81fcb(0x389)]=this['_rewards']['exp']/(BattleManager[_0xc81fcb(0x2c6)]||0x1),Window_StatusBase['prototype']['loadFaceImages'](),setTimeout(_0x31011f['hideWindowsForVictoryAftermath']['bind'](_0x31011f),_0x436610[_0xc81fcb(0x2bb)]),setTimeout(_0x31011f[_0xc81fcb(0x1d2)][_0xc81fcb(0x290)](_0x31011f),_0x436610['ShowDelayMS']);},BattleManager[_0x597b48(0x1e8)]=function(){const _0x33a0c0=_0x597b48;for(;;){this[_0x33a0c0(0x1fb)]++;if(this[_0x33a0c0(0x1fb)]>=$gameParty[_0x33a0c0(0x334)]())return null;const _0x19363d=$gameParty[_0x33a0c0(0x341)]()[this[_0x33a0c0(0x1fb)]],_0x5d4f8c=this[_0x33a0c0(0x266)][this[_0x33a0c0(0x1fb)]];if(_0x19363d['level']!==_0x5d4f8c[_0x33a0c0(0x24c)])return _0x19363d;}return null;},VisuMZ[_0x597b48(0x368)][_0x597b48(0x1d1)]=Game_System['prototype']['initialize'],Game_System[_0x597b48(0x333)][_0x597b48(0x28b)]=function(){const _0x229020=_0x597b48;VisuMZ['VictoryAftermath'][_0x229020(0x1d1)][_0x229020(0x204)](this),this[_0x229020(0x1da)]();},Game_System['prototype'][_0x597b48(0x1da)]=function(){const _0x1f492d=_0x597b48;this[_0x1f492d(0x232)]={'bypassVictoryMusic':![],'bypassVictoryPhase':![],'bypassVictoryMotion':![]};},Game_System[_0x597b48(0x333)][_0x597b48(0x34c)]=function(){const _0x496d2b=_0x597b48;if(this[_0x496d2b(0x232)]===undefined)this[_0x496d2b(0x1da)]();return this['_victoryAftermathSettings'];},VisuMZ[_0x597b48(0x368)][_0x597b48(0x2e6)]=Game_Actor[_0x597b48(0x333)]['setup'],Game_Actor[_0x597b48(0x333)][_0x597b48(0x2af)]=function(_0x395e3d){const _0x5c7da5=_0x597b48;VisuMZ[_0x5c7da5(0x368)]['Game_Actor_setup'][_0x5c7da5(0x204)](this,_0x395e3d),this[_0x5c7da5(0x312)]();},Game_Actor['prototype'][_0x597b48(0x312)]=function(){const _0x529587=_0x597b48;this[_0x529587(0x2a8)]=[],this[_0x529587(0x221)]=[];const _0x5ac207=this[_0x529587(0x212)]()[_0x529587(0x323)];_0x5ac207[_0x529587(0x20e)](/<LEVEL UP (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/LEVEL UP (?:QUOTE|QUOTES)>/i)&&(this[_0x529587(0x2a8)]=String(RegExp['$1'])[_0x529587(0x27d)](/<NEW QUOTE>[\r\n]+/i)),_0x5ac207[_0x529587(0x20e)](/<NEW SKILL (?:QUOTE|QUOTES)>\s*([\s\S]*)\s*<\/NEW SKILL (?:QUOTE|QUOTES)>/i)&&(this[_0x529587(0x221)]=String(RegExp['$1'])[_0x529587(0x27d)](/<NEW QUOTE>[\r\n]+/i));},Game_Actor[_0x597b48(0x333)]['levelUpQuotes']=function(){const _0x1a1514=_0x597b48;if(this[_0x1a1514(0x2a8)]===undefined)this[_0x1a1514(0x312)]();return this['_victoryAftermathLevelUpQuotes'];},Game_Actor[_0x597b48(0x333)][_0x597b48(0x2b3)]=function(){const _0x4dc3e7=_0x597b48;if(this['_victoryAftermathNewSkillQuotes']===undefined)this[_0x4dc3e7(0x312)]();return this[_0x4dc3e7(0x221)];},Game_Actor['prototype'][_0x597b48(0x216)]=function(){const _0x3e1d16=_0x597b48;if(this[_0x3e1d16(0x360)]())return 0x1;const _0x282b62=this[_0x3e1d16(0x282)]()-this['currentLevelExp'](),_0xd29e71=this['currentExp']()-this['currentLevelExp']();return(_0xd29e71/_0x282b62)[_0x3e1d16(0x218)](0x0,0x1);},VisuMZ[_0x597b48(0x368)]['Game_Actor_shouldDisplayLevelUp']=Game_Actor[_0x597b48(0x333)][_0x597b48(0x383)],Game_Actor[_0x597b48(0x333)][_0x597b48(0x383)]=function(){const _0x36ebb7=_0x597b48;if(SceneManager[_0x36ebb7(0x2b6)]()){if('pYhoF'==='pYhoF')return![];else{if(_0x54ccc7[_0x36ebb7(0x28c)]())return![];return _0x4d8734[_0x36ebb7(0x368)][_0x36ebb7(0x346)][_0x36ebb7(0x204)](this);}}else return VisuMZ[_0x36ebb7(0x368)][_0x36ebb7(0x1ed)][_0x36ebb7(0x204)](this);},Game_Actor[_0x597b48(0x333)]['makeVictoryCopy']=function(){const _0x45d10f=_0x597b48,_0x283307=JsonEx['makeDeepCopy'](this);return _0x283307[_0x45d10f(0x238)]=!![],_0x283307;},VisuMZ[_0x597b48(0x368)][_0x597b48(0x37b)]=Game_Actor[_0x597b48(0x333)][_0x597b48(0x1cb)],Game_Actor[_0x597b48(0x333)]['isBattleMember']=function(){const _0x3ded09=_0x597b48;if(this[_0x3ded09(0x238)]){if(_0x3ded09(0x225)===_0x3ded09(0x242)){_0x9ba2e3[_0x3ded09(0x333)][_0x3ded09(0x259)][_0x3ded09(0x204)](this),this[_0x3ded09(0x394)][_0x3ded09(0x2f4)](),this[_0x3ded09(0x39c)]();if(!this['_actor'])return;this[_0x3ded09(0x318)](),this[_0x3ded09(0x379)](),this['drawNewLearnedSkills'](),this[_0x3ded09(0x39b)]();}else return!![];}else return VisuMZ[_0x3ded09(0x368)]['Game_Actor_isBattleMember'][_0x3ded09(0x204)](this);},VisuMZ['VictoryAftermath']['Game_Actor_performVictory']=Game_Actor['prototype']['performVictory'],Game_Actor[_0x597b48(0x333)]['performVictory']=function(){const _0x955871=_0x597b48;this[_0x955871(0x1c8)]()?_0x955871(0x22d)==='OnINC'?this[_0x955871(0x260)](_0x955871(0x30e)):(this[_0x955871(0x39c)](),_0x443b9e[_0x955871(0x214)]&&(this[_0x955871(0x394)][_0x955871(0x30a)]=_0x5c4d1f[_0x955871(0x333)][_0x955871(0x292)]()),this[_0x955871(0x203)](_0x4f5c5f,_0x20d68c,_0x48d47b,_0x480490,_0x3c6ae1),this['drawParamName'](_0x11f147,_0x4f82fb,_0x43bcaf,_0x16385b),this[_0x955871(0x203)](_0x1ce09a,_0x2e57ac,_0x5eb224,_0x5d73e6,_0x3e204f),this['drawParamBeforeValue'](_0x438bc0,_0x3cba13,_0xd2750b,_0x1135c7),this[_0x955871(0x203)](_0x36f1d5,_0x46c10a,_0x4337ef,_0x1183c2,_0x43d405),this['changeTextColor'](_0x55dd1b[_0x955871(0x2bc)]()),this[_0x955871(0x300)](_0x4c6c8b,_0x1ac3fb,_0x353347,_0x55d749,_0x955871(0x281)),this['drawItemDarkRect'](_0x59f03d,_0x46fe90,_0x2d70ea,_0x357291,_0x228878),this[_0x955871(0x235)](_0x464cab,_0x3e5488,_0x409b5b,_0x127ba2),_0x241081[_0x955871(0x224)]&&(this[_0x955871(0x203)](_0x175aee,_0x254fad,_0x5f53fe,_0x37131c,_0x355a04),this[_0x955871(0x26b)](_0x56f03c,_0x21a42c,_0x543ae1,_0x144014)),_0x3ba413+=_0x133fb8,_0x1a5ca3=_0x31ef99===0x2?0x1:0x2):VisuMZ[_0x955871(0x368)][_0x955871(0x303)]['call'](this);},Game_Actor[_0x597b48(0x333)][_0x597b48(0x1c8)]=function(){const _0x46c68c=_0x597b48;return $gameSystem[_0x46c68c(0x34c)]()[_0x46c68c(0x1c7)]||$gameSystem[_0x46c68c(0x34c)]()['bypassVictoryPhase'];},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x37a)]=function(){const _0x2fd92c=_0x597b48;if(this['_spriteset'][_0x2fd92c(0x342)]())return setTimeout(this[_0x2fd92c(0x37a)][_0x2fd92c(0x290)](this),0x7d0);if(!SceneManager[_0x2fd92c(0x2b6)]())return;this['setVisibleUI'](![]),this['closeCommandWindows'](),this[_0x2fd92c(0x327)](),this[_0x2fd92c(0x356)]['y']=Graphics['height']*0xa;},Scene_Battle['prototype'][_0x597b48(0x1d2)]=function(){const _0x3b9828=_0x597b48;if(this[_0x3b9828(0x36b)][_0x3b9828(0x342)]())return setTimeout(this[_0x3b9828(0x1d2)][_0x3b9828(0x290)](this),0x7d0);this[_0x3b9828(0x3a7)]=[],this[_0x3b9828(0x247)](),this[_0x3b9828(0x339)](),this[_0x3b9828(0x1f7)]();},Scene_Battle['prototype'][_0x597b48(0x247)]=function(){const _0x554c58=_0x597b48;this[_0x554c58(0x2eb)]=[],this[_0x554c58(0x2a2)](),this[_0x554c58(0x397)]();},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x2a2)]=function(){this['_victorySteps']['push']('rewards');},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x397)]=function(){const _0x3124d3=_0x597b48;if(!this[_0x3124d3(0x34f)]())return;for(const _0x47dce4 of $gameParty[_0x3124d3(0x341)]()){if(!_0x47dce4)continue;const _0x1484a3=BattleManager[_0x3124d3(0x36a)][_0x47dce4[_0x3124d3(0x350)]()];_0x47dce4[_0x3124d3(0x24c)]>_0x1484a3[_0x3124d3(0x24c)]&&this[_0x3124d3(0x252)](_0x47dce4);}},Scene_Battle['prototype']['onVictoryStepLevelUpMember']=function(_0x1d6bf3){const _0x538a7e=_0x597b48;Imported['VisuMZ_1_MainMenuCore']&&Window_VictoryLevelUp[_0x538a7e(0x220)]&&ImageManager['loadPicture'](_0x1d6bf3['getMenuImage']()),this[_0x538a7e(0x2eb)][_0x538a7e(0x355)](_0x538a7e(0x3a1));},Scene_Battle['prototype'][_0x597b48(0x34f)]=function(){const _0x3deef6=_0x597b48;return VisuMZ[_0x3deef6(0x368)][_0x3deef6(0x31b)]['LevelUp'][_0x3deef6(0x33a)];},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x1f7)]=function(){const _0x2e1237=_0x597b48;this[_0x2e1237(0x21a)]=this[_0x2e1237(0x2eb)][_0x2e1237(0x2cd)]()||'',this[_0x2e1237(0x316)]();},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x316)]=function(){const _0x1d12ce=_0x597b48;switch(this['_victoryStep'][_0x1d12ce(0x311)]()['trim']()){case _0x1d12ce(0x1de):this[_0x1d12ce(0x373)](),this[_0x1d12ce(0x1d7)][_0x1d12ce(0x2f6)](BattleManager[_0x1d12ce(0x2c6)]);break;case _0x1d12ce(0x3a1):this[_0x1d12ce(0x253)](),this['setupVictoryLevelUpNextActor'](),this[_0x1d12ce(0x1d7)][_0x1d12ce(0x2f6)](0x0);break;default:this['finishVictoryPhase']();break;}this['addChild'](this[_0x1d12ce(0x1d7)]);},Scene_Battle[_0x597b48(0x333)]['victoryContinueMessageWindowRect']=function(){const _0x16fe30=_0x597b48,_0x3566a7=Window_Base[_0x16fe30(0x333)][_0x16fe30(0x2c0)](),_0x556248=Math[_0x16fe30(0x27c)](Graphics[_0x16fe30(0x270)]/0x2)-0x64,_0x545728=Math[_0x16fe30(0x27c)](Graphics[_0x16fe30(0x263)]-_0x3566a7*1.25),_0x14af76=Math[_0x16fe30(0x27c)](Graphics[_0x16fe30(0x270)]/0x2),_0x35a929=_0x3566a7;return new Rectangle(_0x556248,_0x545728,_0x14af76,_0x35a929);},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x3a9)]=function(){const _0x32bc92=_0x597b48,_0x573890=0x0,_0x306811=0x0,_0x842680=Graphics[_0x32bc92(0x270)],_0x2f722a=Graphics[_0x32bc92(0x263)];return new Rectangle(_0x573890,_0x306811,_0x842680,_0x2f722a);},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x339)]=function(){const _0x6a6bd9=_0x597b48;if(this[_0x6a6bd9(0x1d7)])return;const _0x533b68=this['victoryContinueMessageWindowRect'](),_0x56e70a=new Window_VictoryContinueMessage(_0x533b68);this[_0x6a6bd9(0x236)](_0x56e70a),this[_0x6a6bd9(0x3a7)]['push'](_0x56e70a),this[_0x6a6bd9(0x1d7)]=_0x56e70a;},Scene_Battle['prototype']['createVictoryRewardsWindow']=function(){const _0x2e6fd7=_0x597b48;if(this[_0x2e6fd7(0x1d5)])return;const _0x303f4a=this[_0x2e6fd7(0x3a9)](),_0x35725d=new Window_VictoryRewards(_0x303f4a);this[_0x2e6fd7(0x236)](_0x35725d),this[_0x2e6fd7(0x3a7)][_0x2e6fd7(0x355)](_0x35725d),this['_victoryRewardsWindow']=_0x35725d;},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x253)]=function(){const _0x10cf38=_0x597b48;if(this[_0x10cf38(0x32a)])return;const _0x1a0d6c=this[_0x10cf38(0x3a9)](),_0x5c07eb=new Window_VictoryLevelUp(_0x1a0d6c);this[_0x10cf38(0x236)](_0x5c07eb),this['_victoryWindows']['push'](_0x5c07eb),this[_0x10cf38(0x32a)]=_0x5c07eb;},Scene_Battle['prototype'][_0x597b48(0x2ac)]=function(){const _0x1738dd=_0x597b48,_0x239d37=BattleManager['nextVictoryLevelUpActor']();this[_0x1738dd(0x32a)][_0x1738dd(0x284)](_0x239d37);},Scene_Battle[_0x597b48(0x333)][_0x597b48(0x2e2)]=function(){const _0x588301=_0x597b48;BattleManager[_0x588301(0x2fb)](),BattleManager[_0x588301(0x386)]=![];};Imported[_0x597b48(0x2a1)]&&(VisuMZ[_0x597b48(0x368)][_0x597b48(0x346)]=Scene_Battle[_0x597b48(0x333)]['allowUpdateBattleAniSpeed'],Scene_Battle[_0x597b48(0x333)]['allowUpdateBattleAniSpeed']=function(){const _0x4bae1b=_0x597b48;if(BattleManager[_0x4bae1b(0x28c)]())return![];return VisuMZ[_0x4bae1b(0x368)][_0x4bae1b(0x346)]['call'](this);});;Scene_Battle[_0x597b48(0x333)][_0x597b48(0x372)]=function(){const _0x21a4ed=_0x597b48;return this[_0x21a4ed(0x1d7)]&&this[_0x21a4ed(0x1d7)]['isContinueReady']();},VisuMZ[_0x597b48(0x368)][_0x597b48(0x3a8)]=Scene_Battle[_0x597b48(0x333)][_0x597b48(0x33e)],Scene_Battle[_0x597b48(0x333)][_0x597b48(0x33e)]=function(){const _0x3f8492=_0x597b48;VisuMZ[_0x3f8492(0x368)][_0x3f8492(0x3a8)][_0x3f8492(0x204)](this),this[_0x3f8492(0x2f5)]();},Scene_Battle['prototype'][_0x597b48(0x2f5)]=function(){const _0x13faaf=_0x597b48;if(!BattleManager[_0x13faaf(0x28c)]())return;if(!this[_0x13faaf(0x372)]())return;(Input[_0x13faaf(0x317)]('ok')||Input[_0x13faaf(0x317)]('cancel')||TouchInput['isRepeated']())&&(_0x13faaf(0x29c)===_0x13faaf(0x398)?_0x3907f5['newSkillQuotes']()[_0x13faaf(0x2cd)]():(Input[_0x13faaf(0x2f4)](),TouchInput[_0x13faaf(0x2f4)](),this[_0x13faaf(0x1f7)]()));},Sprite_Enemy['prototype'][_0x597b48(0x342)]=function(){const _0x4125d5=_0x597b48,_0x1adfe5=VisuMZ['VictoryAftermath'][_0x4125d5(0x31b)][_0x4125d5(0x299)];if(this[_0x4125d5(0x38b)]==='collapse'){if(_0x4125d5(0x310)!==_0x4125d5(0x310))this[_0x4125d5(0x36a)]=_0x160b7e[_0x4125d5(0x341)]()[_0x4125d5(0x2c9)](_0x2c7d89=>_0x2c7d89[_0x4125d5(0x2fa)]()),this[_0x4125d5(0x266)]=_0x2904c6[_0x4125d5(0x2d9)](this[_0x4125d5(0x36a)]);else{if(_0x1adfe5[_0x4125d5(0x2ce)]!==undefined)return _0x1adfe5[_0x4125d5(0x2ce)];}}else{if(this[_0x4125d5(0x38b)]===_0x4125d5(0x387)){if(_0x4125d5(0x271)!==_0x4125d5(0x271))_0x48e4d1['loadPicture'](_0x34c126[_0x4125d5(0x359)]());else{if(_0x1adfe5[_0x4125d5(0x24d)]!==undefined){if(_0x4125d5(0x2d2)===_0x4125d5(0x1e0)){for(;;){this[_0x4125d5(0x1fb)]++;if(this[_0x4125d5(0x1fb)]>=_0x1cecb8[_0x4125d5(0x334)]())return null;const _0xa7e0d4=_0x314c79[_0x4125d5(0x341)]()[this[_0x4125d5(0x1fb)]],_0x4f4903=this[_0x4125d5(0x266)][this[_0x4125d5(0x1fb)]];if(_0xa7e0d4[_0x4125d5(0x24c)]!==_0x4f4903[_0x4125d5(0x24c)])return _0xa7e0d4;}return null;}else return _0x1adfe5['WaitBossCollapse'];}}}}return['collapse',_0x4125d5(0x387)][_0x4125d5(0x361)]();},Sprite_Battler[_0x597b48(0x333)][_0x597b48(0x342)]=function(){return![];},Spriteset_Battle[_0x597b48(0x333)][_0x597b48(0x342)]=function(){const _0x2d95e0=_0x597b48;return this[_0x2d95e0(0x309)]()[_0x2d95e0(0x324)](_0x59fef3=>_0x59fef3[_0x2d95e0(0x342)]());};function Sprite_VictoryGauge(){const _0x361474=_0x597b48;this[_0x361474(0x28b)](...arguments);}Sprite_VictoryGauge[_0x597b48(0x333)]=Object[_0x597b48(0x2ea)](Sprite['prototype']),Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x2fc)]=Sprite_VictoryGauge,Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x28b)]=function(_0x404251,_0x366e2c,_0x5a5195){const _0x3fffb6=_0x597b48;this[_0x3fffb6(0x20b)]=_0x404251,this[_0x3fffb6(0x25a)]=_0x366e2c,this[_0x3fffb6(0x2e4)]=_0x5a5195,Sprite[_0x3fffb6(0x333)][_0x3fffb6(0x28b)][_0x3fffb6(0x204)](this),this[_0x3fffb6(0x240)](),this[_0x3fffb6(0x351)](),this[_0x3fffb6(0x259)](),this[_0x3fffb6(0x251)]();},Sprite_VictoryGauge['prototype'][_0x597b48(0x240)]=function(){const _0x53eb4b=_0x597b48;this[_0x53eb4b(0x35f)]=BattleManager[_0x53eb4b(0x2c6)],this[_0x53eb4b(0x2db)]=this['actor']()[_0x53eb4b(0x24c)],this['_showLevelUp']=![];},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x351)]=function(){const _0x5e6175=_0x597b48;this[_0x5e6175(0x1ee)]=new Bitmap(this[_0x5e6175(0x2e4)],this[_0x5e6175(0x2c0)]()*0x2);},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x2c0)]=function(){const _0x16704a=_0x597b48;return Window_Base[_0x16704a(0x333)][_0x16704a(0x2c0)]();},Sprite_VictoryGauge['prototype']['actor']=function(){const _0x2d37d3=_0x597b48;return BattleManager['_victoryTempActorsA'][this[_0x2d37d3(0x20b)]];},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x33e)]=function(){const _0xd1bfc5=_0x597b48;Sprite[_0xd1bfc5(0x333)][_0xd1bfc5(0x33e)][_0xd1bfc5(0x204)](this),this[_0xd1bfc5(0x377)](),this[_0xd1bfc5(0x251)]();},Sprite_VictoryGauge['prototype'][_0x597b48(0x377)]=function(){const _0xaafe41=_0x597b48;if(this[_0xaafe41(0x35f)]<=0x0)return;const _0x1b803d=this[_0xaafe41(0x212)]();this[_0xaafe41(0x35f)]--;this[_0xaafe41(0x2ee)]()&&(_0xaafe41(0x347)!=='gdjRw'?this[_0xaafe41(0x35f)]=0x0:(_0x25cff4[_0xaafe41(0x368)][_0xaafe41(0x346)]=_0x1283df[_0xaafe41(0x333)][_0xaafe41(0x291)],_0x4fead3[_0xaafe41(0x333)][_0xaafe41(0x291)]=function(){const _0x1e9628=_0xaafe41;if(_0x5b37fa[_0x1e9628(0x28c)]())return![];return _0x1c9413[_0x1e9628(0x368)]['Scene_Battle_allowUpdateBattleAniSpeed'][_0x1e9628(0x204)](this);}));if(this[_0xaafe41(0x35f)]<=0x0){const _0x2b6b11=$gameActors[_0xaafe41(0x212)](_0x1b803d[_0xaafe41(0x254)]);_0x1b803d['changeExp'](_0x2b6b11[_0xaafe41(0x2c8)](),![]);}else{if('xqBQO'===_0xaafe41(0x283))return _0x20d847[_0xaafe41(0x358)]&&_0x217343[_0xaafe41(0x364)][_0xaafe41(0x361)]('['+_0x28c1b8+']');else _0x1b803d['gainTempExp'](BattleManager['_tempActorExpGain']);}this['_currentlevel']!==_0x1b803d[_0xaafe41(0x24c)]&&(_0xaafe41(0x39e)!==_0xaafe41(0x2c5)?(this[_0xaafe41(0x2db)]=_0x1b803d['level'],this[_0xaafe41(0x33d)]=!![],SoundManager[_0xaafe41(0x2a7)]()):this[_0xaafe41(0x35f)]=0x0),this['refresh']();},Game_Actor[_0x597b48(0x333)][_0x597b48(0x223)]=function(_0x1b969e){const _0x116d0a=_0x597b48,_0x3c555b=this['currentExp']()+_0x1b969e*this['finalExpRate']();this['changeExp'](_0x3c555b,this[_0x116d0a(0x383)]());},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x2ee)]=function(){const _0x493f6f=_0x597b48;return SceneManager['_scene'][_0x493f6f(0x372)]();},Sprite_VictoryGauge[_0x597b48(0x333)]['updateOpacity']=function(){const _0x41d806=_0x597b48;this[_0x41d806(0x262)]=this[_0x41d806(0x25a)]['contentsOpacity'];},Sprite_VictoryGauge[_0x597b48(0x333)]['refresh']=function(){const _0x36c44e=_0x597b48;this['bitmap'][_0x36c44e(0x2f4)](),this[_0x36c44e(0x39c)](),this['drawActorName'](),this[_0x36c44e(0x1ef)](),this[_0x36c44e(0x201)](),this[_0x36c44e(0x384)](),this[_0x36c44e(0x277)]();},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x39c)]=function(){const _0x586683=_0x597b48;this[_0x586683(0x1ee)]['fontFace']=$gameSystem[_0x586683(0x2c4)](),this[_0x586683(0x1ee)][_0x586683(0x30a)]=$gameSystem['mainFontSize'](),this[_0x586683(0x1ee)][_0x586683(0x1f3)]=ColorManager[_0x586683(0x337)]();},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x36c)]=function(){const _0x39bf84=_0x597b48;this[_0x39bf84(0x39c)]();const _0x19620c=this[_0x39bf84(0x2c0)](),_0x217242=Math['round'](_0x19620c/0x2),_0x1b7dce=0x0,_0xcfe41e=this[_0x39bf84(0x1ee)]['width']-_0x19620c,_0x1a9185=_0x39bf84(0x29d),_0x6742d4=this[_0x39bf84(0x212)]()[_0x39bf84(0x2b2)]();this[_0x39bf84(0x1ee)][_0x39bf84(0x300)](_0x6742d4,_0x217242,_0x1b7dce,_0xcfe41e,_0x19620c,_0x1a9185);},Sprite_VictoryGauge[_0x597b48(0x333)]['drawActorLevel']=function(){const _0x1fad47=_0x597b48;this[_0x1fad47(0x39c)]();const _0x599dbb=this[_0x1fad47(0x2c0)](),_0x1a16c7=Math[_0x1fad47(0x27c)](_0x599dbb/0x2),_0xd27ac9=0x0,_0x52df9b=this['bitmap'][_0x1fad47(0x270)]-_0x599dbb,_0x250500=this[_0x1fad47(0x20d)]()===''?_0x1fad47(0x2f3):_0x1fad47(0x281),_0x1395d9=TextManager[_0x1fad47(0x332)][_0x1fad47(0x335)](this[_0x1fad47(0x212)]()[_0x1fad47(0x24c)]);this[_0x1fad47(0x33d)]&&(this['bitmap']['textColor']=ColorManager[_0x1fad47(0x307)]()),this[_0x1fad47(0x1ee)]['drawText'](_0x1395d9,_0x1a16c7,_0xd27ac9,_0x52df9b,_0x599dbb,_0x250500);},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x20d)]=function(){const _0x21cd44=_0x597b48,_0x1aa751=$gameParty[_0x21cd44(0x2ad)]()[this[_0x21cd44(0x20b)]];if(!_0x1aa751)return'';if(Imported[_0x21cd44(0x2ab)]&&VisuMZ[_0x21cd44(0x32c)]['Settings'][_0x21cd44(0x352)]['AftermathActorDisplay'])return VisuMZ[_0x21cd44(0x32c)][_0x21cd44(0x31b)][_0x21cd44(0x352)][_0x21cd44(0x3a2)]['format'](_0x1aa751[_0x21cd44(0x226)](),TextManager['jobPointsAbbr'],TextManager[_0x21cd44(0x36d)]);if(Imported[_0x21cd44(0x2c3)]){const _0x31a35e=VisuMZ[_0x21cd44(0x3a4)][_0x21cd44(0x31b)];if(_0x31a35e[_0x21cd44(0x1f1)]['AftermathActorDisplay']){if(_0x21cd44(0x228)!==_0x21cd44(0x1eb))return _0x31a35e[_0x21cd44(0x1f1)]['AftermathText']['format'](_0x1aa751[_0x21cd44(0x1ff)](),TextManager[_0x21cd44(0x211)],TextManager[_0x21cd44(0x22e)]);else this[_0x21cd44(0x1ee)][_0x21cd44(0x2f4)](),this[_0x21cd44(0x39c)](),this[_0x21cd44(0x36c)](),this[_0x21cd44(0x1ef)](),this['drawActorAdditionalRewards'](),this[_0x21cd44(0x384)](),this['drawExpValues']();}if(_0x31a35e[_0x21cd44(0x352)][_0x21cd44(0x257)]){if(_0x21cd44(0x233)!==_0x21cd44(0x1e5))return _0x31a35e[_0x21cd44(0x352)][_0x21cd44(0x3a2)][_0x21cd44(0x335)](_0x1aa751[_0x21cd44(0x226)](),TextManager[_0x21cd44(0x249)],TextManager[_0x21cd44(0x36d)]);else{let _0x5d754a=_0x21cd44(0x20c);_0x128e0a[_0x21cd44(0x29b)]&&(_0x5d754a=_0x1b1624['ItemsEquipsCore'][_0x21cd44(0x31b)][_0x21cd44(0x2f7)][_0x21cd44(0x370)]);let _0x3a898b=_0x5d754a[_0x21cd44(0x335)](this[_0x21cd44(0x395)](_0x448bce));this[_0x21cd44(0x300)](_0x3a898b,_0x55daff,_0x51eace,_0x1f20a9,_0x21cd44(0x2f3));}}}if(Imported['VisuMZ_2_SkillLearnSystem']){const _0x3afb87=VisuMZ[_0x21cd44(0x2d0)][_0x21cd44(0x31b)];if(_0x3afb87[_0x21cd44(0x32b)][_0x21cd44(0x257)])return'YCEBJ'!==_0x21cd44(0x229)?_0x3afb87[_0x21cd44(0x32b)]['AftermathText']['format'](_0x1aa751[_0x21cd44(0x2a3)](),TextManager['abilityPointsAbbr'],TextManager[_0x21cd44(0x24e)]):this[_0x21cd44(0x1d7)]&&this[_0x21cd44(0x1d7)][_0x21cd44(0x393)]();if(_0x3afb87[_0x21cd44(0x1fd)][_0x21cd44(0x257)]){if(_0x21cd44(0x37c)!==_0x21cd44(0x2b8))return _0x3afb87[_0x21cd44(0x1fd)][_0x21cd44(0x3a2)][_0x21cd44(0x335)](_0x1aa751[_0x21cd44(0x30d)](),TextManager['skillPointsAbbr'],TextManager[_0x21cd44(0x357)]);else{const _0x4edfa7=_0x463706(_0x5c1328['$1']);_0x4edfa7<_0x317454?(_0x57d5ae(_0x21cd44(0x213)['format'](_0xc9ad1f,_0x4edfa7,_0x4dc634)),_0xf6296d[_0x21cd44(0x2e3)]()):_0x1af807=_0x250472[_0x21cd44(0x330)](_0x4edfa7,_0x248843);}}}return'';},Sprite_VictoryGauge['prototype'][_0x597b48(0x201)]=function(){const _0x15d7db=_0x597b48;this[_0x15d7db(0x39c)]();const _0x418743=this[_0x15d7db(0x2c0)](),_0x1c8ae9=Math['round'](_0x418743/0x2),_0xe642b6=0x0,_0x31846a=this[_0x15d7db(0x1ee)][_0x15d7db(0x270)]-_0x418743,_0x4f96bc=_0x15d7db(0x2f3);let _0x3a0704=this[_0x15d7db(0x20d)]();this[_0x15d7db(0x1ee)][_0x15d7db(0x300)](_0x3a0704,_0x1c8ae9,_0xe642b6,_0x31846a,_0x418743,_0x4f96bc);},Sprite_VictoryGauge['prototype']['drawExpGauge']=function(){const _0x348315=_0x597b48,_0x188ef4=this[_0x348315(0x2c0)](),_0x5badbb=this[_0x348315(0x1ee)][_0x348315(0x270)]-_0x188ef4,_0x99e307=Sprite_Gauge['prototype'][_0x348315(0x295)](),_0x3077e2=Math['round'](_0x188ef4/0x2),_0x389ed7=_0x188ef4*0x2-_0x99e307-0x2,_0x3e5ff0=Math[_0x348315(0x392)]((_0x5badbb-0x2)*this['actor']()[_0x348315(0x216)]()),_0x573de7=_0x99e307-0x2,_0x3bcb7d=this[_0x348315(0x301)](),_0x40591d=this['gaugeColor1'](),_0x325235=this[_0x348315(0x345)]();this['bitmap'][_0x348315(0x375)](_0x3077e2,_0x389ed7,_0x5badbb,_0x99e307,_0x3bcb7d),this[_0x348315(0x1ee)][_0x348315(0x293)](_0x3077e2+0x1,_0x389ed7+0x1,_0x3e5ff0,_0x573de7,_0x40591d,_0x325235);},Sprite_VictoryGauge[_0x597b48(0x333)]['gaugeBackColor']=function(){const _0x24ac14=_0x597b48;return ColorManager[_0x24ac14(0x301)]();},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x304)]=function(){const _0xc9b0db=_0x597b48;return this['actor']()['isMaxLevel']()?Imported['VisuMZ_0_CoreEngine']?ColorManager[_0xc9b0db(0x209)]():ColorManager[_0xc9b0db(0x1f3)](0xe):Imported[_0xc9b0db(0x23d)]?ColorManager['expGaugeColor1']():ColorManager['textColor'](0x1e);},Sprite_VictoryGauge[_0x597b48(0x333)]['gaugeColor2']=function(){const _0x2db147=_0x597b48;return this[_0x2db147(0x212)]()[_0x2db147(0x360)]()?Imported[_0x2db147(0x23d)]?ColorManager['maxLvGaugeColor2']():ColorManager[_0x2db147(0x1f3)](0x6):Imported['VisuMZ_0_CoreEngine']?ColorManager[_0x2db147(0x2b4)]():ColorManager[_0x2db147(0x1f3)](0x1f);},Sprite_VictoryGauge[_0x597b48(0x333)][_0x597b48(0x277)]=function(){const _0x18a6b5=_0x597b48;this['resetFontSettings']();const _0x139d55=this[_0x18a6b5(0x2c0)](),_0x4ec225=_0x139d55,_0x3a9110=_0x139d55;let _0x23b28c=this[_0x18a6b5(0x1ee)][_0x18a6b5(0x270)]-_0x139d55*0x2;const _0x29483b=this['actor']();let _0x475595=Math['round'](_0x29483b[_0x18a6b5(0x2c8)]()-_0x29483b[_0x18a6b5(0x2d1)]()),_0xd6a499='/'+Math['round'](_0x29483b[_0x18a6b5(0x282)]()-_0x29483b[_0x18a6b5(0x2d1)]());if(Imported[_0x18a6b5(0x23d)]&&VisuMZ['CoreEngine']['Settings'][_0x18a6b5(0x329)][_0x18a6b5(0x273)]){if(_0x18a6b5(0x1dc)===_0x18a6b5(0x243))return _0x3d3b11[_0x18a6b5(0x23d)]?_0x4d5eb8[_0x18a6b5(0x2b7)]():_0x2e4318[_0x18a6b5(0x1f3)](0x1e);else _0x475595=VisuMZ[_0x18a6b5(0x382)](_0x475595),_0xd6a499=VisuMZ[_0x18a6b5(0x382)](_0xd6a499);}this['_showLevelUp']?(this[_0x18a6b5(0x1ee)]['textColor']=ColorManager[_0x18a6b5(0x22a)](),this[_0x18a6b5(0x1ee)][_0x18a6b5(0x300)](TextManager[_0x18a6b5(0x1f0)],_0x4ec225,_0x3a9110,_0x23b28c,_0x139d55,'left')):this[_0x18a6b5(0x1ee)][_0x18a6b5(0x300)](TextManager[_0x18a6b5(0x399)],_0x4ec225,_0x3a9110,_0x23b28c,_0x139d55,'left');this[_0x18a6b5(0x39c)]();if(_0x29483b[_0x18a6b5(0x360)]()){this[_0x18a6b5(0x1ee)][_0x18a6b5(0x300)](_0x18a6b5(0x1e4),_0x4ec225,_0x3a9110,_0x23b28c,_0x139d55,_0x18a6b5(0x2f3));return;}this[_0x18a6b5(0x1ee)]['fontSize']-=0x8,this[_0x18a6b5(0x1ee)][_0x18a6b5(0x1f3)]=ColorManager[_0x18a6b5(0x1f3)](0x8),this[_0x18a6b5(0x1ee)][_0x18a6b5(0x300)](_0xd6a499,_0x4ec225,_0x3a9110,_0x23b28c,_0x139d55,_0x18a6b5(0x2f3)),_0x23b28c-=this[_0x18a6b5(0x1ee)][_0x18a6b5(0x367)](_0xd6a499),this[_0x18a6b5(0x39c)](),this[_0x18a6b5(0x1ee)][_0x18a6b5(0x300)](_0x475595,_0x4ec225,_0x3a9110,_0x23b28c,_0x139d55,_0x18a6b5(0x2f3));};function Window_VictoryContinueMessage(){const _0x3808f0=_0x597b48;this[_0x3808f0(0x28b)](...arguments);}Window_VictoryContinueMessage[_0x597b48(0x333)]=Object[_0x597b48(0x2ea)](Window_Base[_0x597b48(0x333)]),Window_VictoryContinueMessage[_0x597b48(0x333)]['constructor']=Window_VictoryContinueMessage,Window_VictoryContinueMessage[_0x597b48(0x333)]['initialize']=function(_0x307639){const _0x4f7d53=_0x597b48;Window_Base[_0x4f7d53(0x333)][_0x4f7d53(0x28b)][_0x4f7d53(0x204)](this,_0x307639),this['setBackgroundType'](0x2),this[_0x4f7d53(0x259)]();},Window_VictoryContinueMessage[_0x597b48(0x333)]['setDelayDuration']=function(_0x210acc){const _0x4e2ef=_0x597b48;this[_0x4e2ef(0x305)]=_0x210acc,this[_0x4e2ef(0x33b)]=0x0;},Window_VictoryContinueMessage[_0x597b48(0x333)][_0x597b48(0x1d6)]=function(){const _0x424981=_0x597b48;this[_0x424981(0x1e9)]=0x0;},Window_VictoryContinueMessage[_0x597b48(0x333)][_0x597b48(0x33e)]=function(){const _0x23eba1=_0x597b48;Window_Base[_0x23eba1(0x333)][_0x23eba1(0x33e)][_0x23eba1(0x204)](this),this[_0x23eba1(0x31a)]();},Window_VictoryContinueMessage['prototype']['updateContentsOpacity']=function(){const _0x1d080b=_0x597b48;this[_0x1d080b(0x305)]>0x0&&this[_0x1d080b(0x2ee)]()&&(this['_delayDuration']=0x0,Input[_0x1d080b(0x2f4)](),TouchInput[_0x1d080b(0x2f4)]());if(this[_0x1d080b(0x305)]-->0x0)return;this['contentsOpacity']+=Window_VictoryRewards[_0x1d080b(0x2a9)];},Window_VictoryContinueMessage[_0x597b48(0x333)][_0x597b48(0x2ee)]=function(){const _0x2fcecf=_0x597b48;return Input[_0x2fcecf(0x36e)]('ok')||Input['isPressed'](_0x2fcecf(0x265))||TouchInput['isPressed']();},Window_VictoryContinueMessage[_0x597b48(0x333)][_0x597b48(0x259)]=function(){const _0xc27d63=_0x597b48;this['contents'][_0xc27d63(0x2f4)]();const _0x36272c=TextManager[_0xc27d63(0x363)];let _0x5ae7cd=TextManager[_0xc27d63(0x25c)],_0x3a2895=TextManager[_0xc27d63(0x206)];Imported[_0xc27d63(0x23d)]&&(_0x5ae7cd=TextManager[_0xc27d63(0x2f8)]('ok'),_0x3a2895=TextManager[_0xc27d63(0x2f8)](_0xc27d63(0x265)));const _0x2b945e=_0x36272c[_0xc27d63(0x335)](_0x5ae7cd,_0x3a2895),_0x10dc54=this[_0xc27d63(0x286)](_0x2b945e)['width'],_0x22c836=Math[_0xc27d63(0x27c)]((this[_0xc27d63(0x227)]-_0x10dc54)/0x2);this['drawTextEx'](_0x2b945e,_0x22c836,0x0,_0x10dc54);},Window_VictoryContinueMessage[_0x597b48(0x333)][_0x597b48(0x393)]=function(){const _0x282521=_0x597b48;return this[_0x282521(0x305)]<=0x0;};function Window_VictoryRewards(){const _0x45193d=_0x597b48;this[_0x45193d(0x28b)](...arguments);}Window_VictoryRewards[_0x597b48(0x2a9)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x299)][_0x597b48(0x1e2)],Window_VictoryRewards[_0x597b48(0x333)]=Object['create'](Window_StatusBase['prototype']),Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x2fc)]=Window_VictoryRewards,Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x28b)]=function(_0x36a38b){const _0x48e107=_0x597b48;Window_StatusBase[_0x48e107(0x333)][_0x48e107(0x28b)][_0x48e107(0x204)](this,_0x36a38b),this[_0x48e107(0x2a4)](0x2),this['contentsOpacity']=0x0,this[_0x48e107(0x259)]();},Window_VictoryRewards['prototype'][_0x597b48(0x1d6)]=function(){this['padding']=0x0;},Window_VictoryRewards[_0x597b48(0x333)]['update']=function(){const _0x421833=_0x597b48;Window_StatusBase[_0x421833(0x333)][_0x421833(0x33e)]['call'](this),this[_0x421833(0x31a)]();},Window_VictoryRewards[_0x597b48(0x333)]['updateContentsOpacity']=function(){const _0x4a1b76=_0x597b48;if(SceneManager[_0x4a1b76(0x348)][_0x4a1b76(0x21a)]==='rewards'){if(_0x4a1b76(0x385)==='jSSCf')return _0x4e6e65[_0x4a1b76(0x368)][_0x4a1b76(0x31b)][_0x4a1b76(0x276)][_0x4a1b76(0x33a)];else this[_0x4a1b76(0x33b)]+=Window_VictoryRewards[_0x4a1b76(0x2a9)];}else this[_0x4a1b76(0x33b)]-=Window_VictoryRewards['_opacitySpeed'];},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x255)]=function(){const _0x3d9402=_0x597b48;return VisuMZ['VictoryAftermath']['Settings'][_0x3d9402(0x299)][_0x3d9402(0x338)];},Window_VictoryRewards['prototype'][_0x597b48(0x259)]=function(){const _0x455db2=_0x597b48;Window_StatusBase[_0x455db2(0x333)]['refresh']['call'](this),this[_0x455db2(0x394)]['clear'](),this[_0x455db2(0x39c)](),this[_0x455db2(0x1e7)](),this[_0x455db2(0x250)](),this[_0x455db2(0x1d0)](),this['makeItemGainWindow'](),this[_0x455db2(0x26a)]();},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x1e7)]=function(){const _0x542b7b=_0x597b48,_0x5d1454=this[_0x542b7b(0x2c0)](),_0x168cd2=0x0,_0x5a3ed7=_0x5d1454*2.5,_0x5ca43c=_0x542b7b(0x248),_0x1fa60a=_0x542b7b(0x336),_0x36d0b5=ColorManager[_0x542b7b(0x337)]();this['contents'][_0x542b7b(0x293)](_0x168cd2,_0x5a3ed7,this[_0x542b7b(0x270)],this['height']-_0x5a3ed7-_0x5d1454*1.5,_0x5ca43c,_0x1fa60a),this[_0x542b7b(0x394)][_0x542b7b(0x375)](0x0,_0x5a3ed7-0x1,this[_0x542b7b(0x270)],0x2,_0x36d0b5),this[_0x542b7b(0x394)][_0x542b7b(0x375)](0x0,this['height']-_0x5d1454*1.5-0x1,this['width'],0x2,_0x36d0b5);const _0x5634c1=this[_0x542b7b(0x255)](),_0x1b0427=_0x5634c1?Math['round'](this['width']/0x2+0x28):0x64,_0x21cc1c=_0x5a3ed7-_0x5d1454*0.75,_0x539098=TextManager[_0x542b7b(0x200)];this[_0x542b7b(0x2c7)](),this[_0x542b7b(0x2c7)](),this[_0x542b7b(0x300)](_0x539098,_0x1b0427,_0x21cc1c,this['width']);},Window_VictoryRewards[_0x597b48(0x2ed)]=VisuMZ[_0x597b48(0x368)]['Settings'][_0x597b48(0x1ea)],Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x250)]=function(){const _0x41c13c=_0x597b48;this[_0x41c13c(0x39c)]();const _0x512c85=this[_0x41c13c(0x255)](),_0x3713e2=this[_0x41c13c(0x2c0)](),_0x5a2d14=Math[_0x41c13c(0x392)](_0x3713e2/0x2),_0x3da902=_0x512c85?Math[_0x41c13c(0x27c)](this['width']/0x2+0x28):0x64,_0x44c6e7=Math[_0x41c13c(0x27c)](_0x3713e2*3.5),_0x398ba8=Math['round'](this['width']/0x2-0x8c),_0x43602a=_0x398ba8-_0x5a2d14-0x50;let _0x584ab6=_0x44c6e7;for(const _0x307365 of Window_VictoryRewards[_0x41c13c(0x2ed)]){if(!_0x307365[_0x41c13c(0x349)]())continue;this['drawRewardStrip'](_0x3da902,_0x584ab6,_0x398ba8),this['changeTextColor'](ColorManager[_0x41c13c(0x2bc)]()),this[_0x41c13c(0x300)](_0x307365['Text'](),_0x3da902+_0x5a2d14,_0x584ab6,_0x43602a),this[_0x41c13c(0x2b0)](ColorManager[_0x41c13c(0x337)]());const _0x5d655f=_0x307365['Data']();Imported[_0x41c13c(0x258)]&&_0x307365['Text']()===TextManager[_0x41c13c(0x28f)]?_0x41c13c(0x215)==='RuoXn'?this[_0x41c13c(0x28d)](_0x5d655f,TextManager[_0x41c13c(0x28f)],_0x3da902+_0x5a2d14,_0x584ab6,_0x43602a):(_0x5b8c33=_0x59f1f5[_0x41c13c(0x24c)],_0x2c1f42=_0x2a3753[_0x41c13c(0x24c)]):'eMulR'==='eMulR'?this['drawText'](_0x5d655f,_0x3da902+_0x5a2d14,_0x584ab6,_0x43602a,_0x41c13c(0x2f3)):this[_0x41c13c(0x33b)]-=_0x5a698e[_0x41c13c(0x2a9)],_0x584ab6+=_0x3713e2;}},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x2f1)]=function(_0x3e7433,_0x5e748e,_0x5d2e18){const _0x452344=_0x597b48,_0x4e8188=this[_0x452344(0x2c0)]()-0x2,_0x2479bb=Math[_0x452344(0x392)](_0x4e8188/0x2),_0x2e8745='rgba(0,\x200,\x200,\x201)',_0x52bd32=ColorManager['dimColor2'](),_0x466d2d=0x50,_0x33f1af=_0x5d2e18-_0x2479bb-_0x466d2d;!ImageManager[_0x452344(0x32f)]&&(_0x452344(0x35e)!=='YkNLr'?this[_0x452344(0x33b)]=this[_0x452344(0x25a)][_0x452344(0x33b)]:(ImageManager[_0x452344(0x32f)]=new Bitmap(_0x5d2e18,_0x4e8188),ImageManager[_0x452344(0x32f)][_0x452344(0x2d5)]=this['translucentOpacity'](),ImageManager[_0x452344(0x32f)][_0x452344(0x396)](_0x2479bb,_0x2479bb,_0x2479bb,_0x2e8745),ImageManager[_0x452344(0x32f)][_0x452344(0x391)](_0x2479bb,0x0,_0x4e8188,_0x4e8188),ImageManager[_0x452344(0x32f)][_0x452344(0x375)](_0x2479bb,0x0,_0x33f1af,_0x4e8188,_0x2e8745),ImageManager['victoryRewardBitmap'][_0x452344(0x293)](_0x2479bb+_0x33f1af,0x0,_0x466d2d,_0x4e8188,_0x2e8745,_0x52bd32))),this[_0x452344(0x394)]['blt'](ImageManager[_0x452344(0x32f)],0x0,0x0,_0x5d2e18,_0x4e8188,_0x3e7433,_0x5e748e,_0x5d2e18,_0x4e8188);},Window_VictoryRewards['prototype'][_0x597b48(0x1d0)]=function(){const _0x1db678=_0x597b48;this[_0x1db678(0x39c)]();if(BattleManager['_rewards'][_0x1db678(0x2f0)][_0x1db678(0x3a6)]<=0x0)return;const _0x2f03b7=this[_0x1db678(0x255)](),_0x5dec41=this['lineHeight'](),_0x21da61=_0x2f03b7?0x8c:Math[_0x1db678(0x27c)](this['width']/0x2+0x28),_0x1738d4=Math['round'](_0x5dec41*0x3),_0x3f9d73=Math[_0x1db678(0x27c)](this[_0x1db678(0x270)]/0x2-0x8c),_0x34478f=TextManager[_0x1db678(0x34a)],_0x28f215=ColorManager[_0x1db678(0x337)]();this[_0x1db678(0x2c7)](),this[_0x1db678(0x300)](_0x34478f,_0x21da61,_0x1738d4,_0x3f9d73,'left');const _0x3e73f5=_0x2f03b7?0x64:Math['round'](this[_0x1db678(0x270)]/0x2),_0x582106=_0x1738d4+_0x5dec41*1.5,_0x2e13c5=Math['round'](this[_0x1db678(0x270)]/0x2)-0x64;this['contents'][_0x1db678(0x375)](_0x3e73f5,_0x582106,_0x2e13c5,0x2,_0x28f215);},Window_VictoryRewards[_0x597b48(0x333)]['makeItemGainWindow']=function(){const _0x18ded1=_0x597b48,_0x158ab4=this[_0x18ded1(0x255)](),_0x4bdb37=this[_0x18ded1(0x2c0)](),_0x1213ae=_0x158ab4?0x64:Math[_0x18ded1(0x27c)](this[_0x18ded1(0x270)]/0x2+0x28),_0x52ed70=Math[_0x18ded1(0x27c)](_0x4bdb37*0x5),_0xabecff=Math['round'](this[_0x18ded1(0x270)]/0x2-0x8c),_0x335b7e=this[_0x18ded1(0x263)]-_0x52ed70-_0x4bdb37*0x2,_0x1aa3d6=new Rectangle(_0x1213ae,_0x52ed70,_0xabecff,_0x335b7e);this['_itemGainWindow']=new Window_VictoryItem(_0x1aa3d6,this),this[_0x18ded1(0x236)](this['_itemGainWindow']);},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x26a)]=function(){const _0x4d1755=_0x597b48;this[_0x4d1755(0x39c)]();const _0x238f16=this[_0x4d1755(0x255)](),_0x25d5b4=this['lineHeight'](),_0x4477dd=$gameParty[_0x4d1755(0x334)](),_0x18e002=_0x238f16?Math[_0x4d1755(0x27c)](this['width']/0x2+0x28):0x64,_0x18a3e2=this['height']-1.5-_0x25d5b4*0x2*(_0x4477dd+0x1),_0x5d01c8=Math[_0x4d1755(0x27c)](this[_0x4d1755(0x270)]/0x2-0x8c);let _0x122783=_0x18a3e2;if(VisuMZ[_0x4d1755(0x368)][_0x4d1755(0x31b)][_0x4d1755(0x299)][_0x4d1755(0x33c)]??!![]){if(_0x4d1755(0x23e)==='OQzNV')for(let _0x2ac00b=0x0;_0x2ac00b<_0x4477dd;_0x2ac00b++){if(!$gameParty[_0x4d1755(0x2ad)]()[_0x2ac00b])continue;this[_0x4d1755(0x22c)](_0x18e002,_0x122783,_0x5d01c8),this['placeActorGauges'](_0x2ac00b,_0x18e002,_0x122783,_0x5d01c8),_0x122783+=_0x25d5b4*0x2;}else this['padding']=0x0;}},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x22c)]=function(_0x281a1a,_0x31734b,_0x29c968){const _0x406500=_0x597b48,_0x5d06ae=this[_0x406500(0x2c0)]()-0x2,_0x1f30d1=Math['floor'](_0x5d06ae/0x2),_0x13cffb=_0x406500(0x39f),_0x35e9e5=ColorManager[_0x406500(0x2cb)](),_0x2bd25b=_0x29c968-_0x5d06ae;!ImageManager[_0x406500(0x287)]&&(ImageManager[_0x406500(0x287)]=new Bitmap(_0x29c968,_0x5d06ae),ImageManager[_0x406500(0x287)][_0x406500(0x2d5)]=this['translucentOpacity'](),ImageManager[_0x406500(0x287)][_0x406500(0x396)](_0x1f30d1,_0x1f30d1,_0x1f30d1,_0x13cffb),ImageManager[_0x406500(0x287)][_0x406500(0x396)](_0x1f30d1+_0x2bd25b,_0x1f30d1,_0x1f30d1,_0x13cffb),ImageManager[_0x406500(0x287)]['clearRect'](_0x1f30d1,0x0,_0x2bd25b,_0x5d06ae),ImageManager[_0x406500(0x287)]['fillRect'](_0x1f30d1,0x0,_0x2bd25b,_0x5d06ae,_0x13cffb)),this[_0x406500(0x394)][_0x406500(0x354)](ImageManager['victoryNameBitmap'],0x0,0x0,_0x29c968,_0x5d06ae,_0x281a1a,_0x31734b,_0x29c968,_0x5d06ae);},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x2d4)]=function(_0x3a1825,_0x440ce5,_0x146413,_0x59bd68){const _0x1d260d=_0x597b48,_0x382100=_0x1d260d(0x29a)['format'](_0x3a1825),_0x38372e=this[_0x1d260d(0x1cf)](_0x382100,_0x3a1825,_0x59bd68);_0x38372e['move'](_0x440ce5,_0x146413),_0x38372e[_0x1d260d(0x376)]();},Window_VictoryRewards[_0x597b48(0x333)][_0x597b48(0x1cf)]=function(_0x3130b7,_0x40e057,_0x56ef8c){const _0x244395=_0x597b48,_0x41c6bd=this['_additionalSprites'];if(_0x41c6bd[_0x3130b7]){if('yJpKo'===_0x244395(0x1f5)){const _0x41dad2=this[_0x244395(0x328)][_0x244395(0x350)]();return _0x4c745c['_victoryTempActorsB'][_0x41dad2];}else return _0x41c6bd[_0x3130b7];}else{if(_0x244395(0x22b)===_0x244395(0x22b)){const _0x208024=new Sprite_VictoryGauge(_0x40e057,this,_0x56ef8c);return _0x41c6bd[_0x3130b7]=_0x208024,this[_0x244395(0x1fe)](_0x208024),_0x208024;}else this[_0x244395(0x203)](_0x5d62a1,_0x2af08e,_0x579807,_0x2f497a,_0x1e1bd7),this['drawParamDiffValue'](_0x244395(0x24c),_0x5c8103,_0x53237c,_0x1758e2);}};function _0x73ca(_0x58ea97,_0x4e9d9b){return _0x73ca=function(_0x4f48cc,_0x73cabe){_0x4f48cc=_0x4f48cc-0x1c7;let _0x44be4f=_0x4f48[_0x4f48cc];return _0x44be4f;},_0x73ca(_0x58ea97,_0x4e9d9b);}function Window_VictoryItem(){const _0x54dd3f=_0x597b48;this[_0x54dd3f(0x28b)](...arguments);}Window_VictoryItem[_0x597b48(0x333)]=Object[_0x597b48(0x2ea)](Window_ItemList[_0x597b48(0x333)]),Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x2fc)]=Window_VictoryItem,Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x28b)]=function(_0x2200ec,_0x49c90c){const _0x59c3a2=_0x597b48;this['_mainWindow']=_0x49c90c,Window_ItemList[_0x59c3a2(0x333)][_0x59c3a2(0x28b)]['call'](this,_0x2200ec),this['setBackgroundType'](0x2),this['refresh'](),this[_0x59c3a2(0x31a)](),this[_0x59c3a2(0x1c9)]['length']>this['maxVisibleItems']()&&(this['activate'](),this[_0x59c3a2(0x2d8)](0x0));},Window_VictoryItem['prototype']['itemHeight']=function(){const _0x4d0d3c=_0x597b48;return Window_Base[_0x4d0d3c(0x333)]['itemHeight'][_0x4d0d3c(0x204)](this);},Window_VictoryItem[_0x597b48(0x333)]['updatePadding']=function(){const _0x55ce5c=_0x597b48;this[_0x55ce5c(0x1e9)]=0x0;},Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x1f8)]=function(){return 0x1;},Window_VictoryItem[_0x597b48(0x333)]['colSpacing']=function(){return 0x0;},Window_VictoryItem['prototype'][_0x597b48(0x33e)]=function(){const _0x4e9fc8=_0x597b48;Window_ItemList[_0x4e9fc8(0x333)][_0x4e9fc8(0x33e)][_0x4e9fc8(0x204)](this),this[_0x4e9fc8(0x31a)]();},Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x31a)]=function(){const _0xf58d08=_0x597b48;this['contentsOpacity']=this[_0xf58d08(0x25a)][_0xf58d08(0x33b)];},Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x38a)]=function(){const _0x44b6ad=_0x597b48,_0x1cdf0a=BattleManager['_rewards'][_0x44b6ad(0x2f0)];_0x1cdf0a[_0x44b6ad(0x202)]((_0x51b606,_0x1166b9)=>_0x51b606['id']-_0x1166b9['id']);const _0x11566c=_0x1cdf0a[_0x44b6ad(0x26c)](_0x5c9d6c=>DataManager[_0x44b6ad(0x1db)](_0x5c9d6c)),_0x253ca9=_0x1cdf0a[_0x44b6ad(0x26c)](_0x13dea6=>DataManager[_0x44b6ad(0x219)](_0x13dea6)),_0x13c437=_0x1cdf0a[_0x44b6ad(0x26c)](_0x563f07=>DataManager[_0x44b6ad(0x208)](_0x563f07));this['_data']=_0x11566c[_0x44b6ad(0x1cc)](_0x253ca9)['concat'](_0x13c437),this[_0x44b6ad(0x1c9)]=this[_0x44b6ad(0x1c9)][_0x44b6ad(0x26c)]((_0x10c471,_0x30c772,_0x2b27a0)=>_0x2b27a0[_0x44b6ad(0x2fe)](_0x10c471)===_0x30c772);},Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x1df)]=function(_0x2aa0cb){return!![];},Window_VictoryItem['prototype']['isShowNew']=function(){return![];},Window_VictoryItem['prototype'][_0x597b48(0x395)]=function(_0x59b3c3){const _0x3c81b5=_0x597b48;return BattleManager[_0x3c81b5(0x2e5)][_0x3c81b5(0x2f0)][_0x3c81b5(0x26c)](_0x156963=>_0x156963===_0x59b3c3)[_0x3c81b5(0x3a6)];},Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x1d8)]=function(_0x57019f){},Window_VictoryItem[_0x597b48(0x333)][_0x597b48(0x388)]=function(_0x588e47,_0x1907e7,_0xc95019,_0x3ff0d2){const _0x5b1db2=_0x597b48;let _0x2fc615='x%1';Imported[_0x5b1db2(0x29b)]&&(_0x2fc615=VisuMZ[_0x5b1db2(0x214)][_0x5b1db2(0x31b)]['ItemScene'][_0x5b1db2(0x370)]);let _0x21fed3=_0x2fc615[_0x5b1db2(0x335)](this[_0x5b1db2(0x395)](_0x588e47));this[_0x5b1db2(0x300)](_0x21fed3,_0x1907e7,_0xc95019,_0x3ff0d2,'right');};function Window_VictoryLevelUp(){const _0x544851=_0x597b48;this[_0x544851(0x28b)](...arguments);}Window_VictoryLevelUp[_0x597b48(0x2a9)]=Window_VictoryRewards[_0x597b48(0x2a9)],Window_VictoryLevelUp[_0x597b48(0x220)]=VisuMZ[_0x597b48(0x368)]['Settings'][_0x597b48(0x276)][_0x597b48(0x278)],Window_VictoryLevelUp[_0x597b48(0x333)]=Object[_0x597b48(0x2ea)](Window_StatusBase['prototype']),Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x2fc)]=Window_VictoryLevelUp,Window_VictoryLevelUp[_0x597b48(0x333)]['initialize']=function(_0x54b537){const _0x2bb31e=_0x597b48;Window_StatusBase[_0x2bb31e(0x333)][_0x2bb31e(0x28b)]['call'](this,_0x54b537),this[_0x2bb31e(0x2a4)](0x2),this[_0x2bb31e(0x33b)]=0x0,this['refresh'](),this[_0x2bb31e(0x2be)](),this[_0x2bb31e(0x231)]();},Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x1d6)]=function(){this['padding']=0x0;},Window_VictoryLevelUp[_0x597b48(0x333)]['update']=function(){const _0x200c53=_0x597b48;Window_StatusBase[_0x200c53(0x333)]['update'][_0x200c53(0x204)](this),this[_0x200c53(0x31a)]();},Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x31a)]=function(){const _0x20c30f=_0x597b48;SceneManager['_scene'][_0x20c30f(0x21a)]==='levelups'?this[_0x20c30f(0x33b)]+=Window_VictoryLevelUp[_0x20c30f(0x2a9)]:this[_0x20c30f(0x33b)]-=Window_VictoryLevelUp[_0x20c30f(0x2a9)],this[_0x20c30f(0x280)]&&(_0x20c30f(0x274)!==_0x20c30f(0x1f6)?this[_0x20c30f(0x280)][_0x20c30f(0x262)]=this['contentsOpacity']:(_0x509e1a[_0x20c30f(0x333)]['update']['call'](this),this[_0x20c30f(0x377)](),this[_0x20c30f(0x251)]()));},Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x259)]=function(){const _0x273903=_0x597b48;Window_StatusBase['prototype'][_0x273903(0x259)][_0x273903(0x204)](this),this[_0x273903(0x394)][_0x273903(0x2f4)](),this[_0x273903(0x39c)](),this[_0x273903(0x1e7)]();},Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x1e7)]=function(){const _0x2f2725=_0x597b48,_0x1b2938=this[_0x2f2725(0x2c0)](),_0x163a67=_0x2f2725(0x248),_0x4c7f79=_0x2f2725(0x336),_0x96352d=ColorManager[_0x2f2725(0x337)](),_0x39999c=SceneManager['_scene'][_0x2f2725(0x1d7)]['x'],_0x42c6bb=Math['round'](this[_0x2f2725(0x270)]/0x2);this[_0x2f2725(0x394)][_0x2f2725(0x293)](_0x39999c,0x0,_0x42c6bb,this['height'],_0x4c7f79,_0x163a67,!![]),this['contents'][_0x2f2725(0x375)](_0x39999c-0x1,0x0,0x2,this[_0x2f2725(0x263)],_0x96352d),this['contents'][_0x2f2725(0x375)](_0x39999c+_0x42c6bb-0x1,0x0,0x2,this[_0x2f2725(0x263)],_0x96352d);const _0x212a6d=_0x1b2938,_0xf61774=_0x1b2938*0x1;this[_0x2f2725(0x394)]['gradientFillRect'](0x0,_0x212a6d,this[_0x2f2725(0x270)],_0xf61774,_0x163a67,_0x4c7f79),this[_0x2f2725(0x394)][_0x2f2725(0x375)](0x0,_0x212a6d-0x1,this[_0x2f2725(0x270)],0x2,_0x96352d),this[_0x2f2725(0x394)][_0x2f2725(0x375)](0x0,_0x212a6d+_0xf61774-0x1,this[_0x2f2725(0x270)],0x2,_0x96352d);const _0x42c760=this[_0x2f2725(0x263)]-_0x1b2938*5.5,_0x4f910d=_0x1b2938*0x4;this[_0x2f2725(0x394)]['gradientFillRect'](0x0,_0x42c760,this[_0x2f2725(0x270)],_0x4f910d,_0x163a67,_0x4c7f79),this[_0x2f2725(0x394)]['gradientFillRect'](0x0,_0x42c760,this['width'],_0x4f910d,_0x4c7f79,_0x163a67),this['contents']['fillRect'](0x0,_0x42c760-0x2,this[_0x2f2725(0x270)],0x2,_0x96352d),this[_0x2f2725(0x394)][_0x2f2725(0x375)](0x0,_0x42c760+_0x4f910d,this['width'],0x2,_0x96352d);},Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x2be)]=function(){const _0xed3966=_0x597b48,_0x38550d=VisuMZ[_0xed3966(0x368)]['Settings'][_0xed3966(0x276)];this[_0xed3966(0x280)]=new Sprite(),this[_0xed3966(0x280)][_0xed3966(0x261)]['x']=0.5,this[_0xed3966(0x280)][_0xed3966(0x261)]['y']=0x1,this[_0xed3966(0x280)]['opacity']=0x0,this[_0xed3966(0x280)]['x']=Math[_0xed3966(0x27c)](eval(_0x38550d[_0xed3966(0x365)])),this['_actorSprite']['y']=Math['round'](eval(_0x38550d[_0xed3966(0x297)])),this[_0xed3966(0x280)]['scale']['x']=_0x38550d[_0xed3966(0x37e)],this[_0xed3966(0x280)][_0xed3966(0x39d)]['y']=_0x38550d[_0xed3966(0x37e)],this['addChildToBack'](this[_0xed3966(0x280)]);},Window_VictoryLevelUp[_0x597b48(0x333)][_0x597b48(0x231)]=function(){const _0x1c9fdd=_0x597b48,_0x4760e1=new Rectangle(0x0,0x0,this[_0x1c9fdd(0x270)],this[_0x1c9fdd(0x263)]);this['_subWindow']=new Window_VictoryLevelUpActor(_0x4760e1,this),this[_0x1c9fdd(0x236)](this[_0x1c9fdd(0x2a6)]);},Window_VictoryLevelUp[_0x597b48(0x333)]['setActor']=function(_0x445bf4){const _0x1c044f=_0x597b48;Imported[_0x1c044f(0x20a)]&&Window_VictoryLevelUp[_0x1c044f(0x220)]&&(this[_0x1c044f(0x280)][_0x1c044f(0x1ee)]=ImageManager[_0x1c044f(0x2a0)](_0x445bf4[_0x1c044f(0x359)]())),SoundManager['playVictoryLevelUpSFX'](),this['_subWindow'][_0x1c044f(0x284)](_0x445bf4);};function Window_VictoryLevelUpActor(){this['initialize'](...arguments);}Window_VictoryLevelUpActor[_0x597b48(0x2a9)]=Window_VictoryRewards[_0x597b48(0x2a9)],Window_VictoryLevelUpActor[_0x597b48(0x224)]=VisuMZ[_0x597b48(0x368)]['Settings']['LevelUp'][_0x597b48(0x207)],Window_VictoryLevelUpActor[_0x597b48(0x1ec)]=VisuMZ[_0x597b48(0x368)][_0x597b48(0x31b)][_0x597b48(0x276)][_0x597b48(0x2bf)],Window_VictoryLevelUpActor[_0x597b48(0x333)]=Object[_0x597b48(0x2ea)](Window_StatusBase[_0x597b48(0x333)]),Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x2fc)]=Window_VictoryLevelUpActor,Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x28b)]=function(_0x171f9c,_0x4f5a9c){const _0x2616b3=_0x597b48;this['_mainWindow']=_0x4f5a9c,Window_StatusBase[_0x2616b3(0x333)][_0x2616b3(0x28b)][_0x2616b3(0x204)](this,_0x171f9c),this[_0x2616b3(0x2a4)](0x2),this[_0x2616b3(0x33b)]=0x0,this[_0x2616b3(0x328)]=null,this[_0x2616b3(0x259)]();},Window_VictoryLevelUpActor[_0x597b48(0x333)]['updatePadding']=function(){const _0x12fcaa=_0x597b48;this[_0x12fcaa(0x1e9)]=0x0;},Window_VictoryLevelUpActor[_0x597b48(0x333)]['update']=function(){const _0x94c21e=_0x597b48;Window_StatusBase['prototype'][_0x94c21e(0x33e)]['call'](this),this[_0x94c21e(0x31a)]();},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x31a)]=function(){const _0x1047ae=_0x597b48;this[_0x1047ae(0x33b)]=this['_mainWindow'][_0x1047ae(0x33b)];},Window_VictoryLevelUpActor['prototype'][_0x597b48(0x284)]=function(_0x5504b5){const _0x4a6420=_0x597b48;this[_0x4a6420(0x328)]=_0x5504b5,this[_0x4a6420(0x259)]();},Window_VictoryLevelUpActor[_0x597b48(0x333)]['beforeActor']=function(){const _0x2f1e00=_0x597b48,_0x287b24=this[_0x2f1e00(0x328)][_0x2f1e00(0x350)]();return BattleManager[_0x2f1e00(0x266)][_0x287b24];},Window_VictoryLevelUpActor[_0x597b48(0x333)]['afterActor']=function(){const _0x86e72b=_0x597b48,_0x32bfa1=this['_actor']['index']();return BattleManager[_0x86e72b(0x36a)][_0x32bfa1];},Window_VictoryLevelUpActor['prototype'][_0x597b48(0x259)]=function(){const _0x29e9b4=_0x597b48;Window_StatusBase[_0x29e9b4(0x333)][_0x29e9b4(0x259)][_0x29e9b4(0x204)](this),this[_0x29e9b4(0x394)][_0x29e9b4(0x2f4)](),this[_0x29e9b4(0x39c)]();if(!this[_0x29e9b4(0x328)])return;this[_0x29e9b4(0x318)](),this[_0x29e9b4(0x379)](),this[_0x29e9b4(0x2b5)](),this[_0x29e9b4(0x39b)]();},Window_VictoryLevelUpActor[_0x597b48(0x333)]['drawLevelMessage']=function(){const _0x33eff1=_0x597b48,_0xa52f4a=this[_0x33eff1(0x2c0)](),_0x120807=TextManager['levelUp']['format'](this['_actor']['name'](),TextManager[_0x33eff1(0x24c)],this[_0x33eff1(0x328)]['level']),_0x12de0a=this['textSizeEx'](_0x120807)[_0x33eff1(0x270)],_0x3d8ea8=SceneManager[_0x33eff1(0x348)][_0x33eff1(0x1d7)]['x']+Math['round']((this[_0x33eff1(0x270)]/0x2-_0x12de0a)/0x2),_0x432731=_0xa52f4a;this[_0x33eff1(0x1e6)](_0x120807,_0x3d8ea8,_0x432731,_0x12de0a);},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x203)]=function(_0x10bead,_0x260d66,_0xfd53a9,_0x5b3a49,_0x4aa4d9){const _0x5e74ac=_0x597b48;if(VisuMZ[_0x5e74ac(0x368)][_0x5e74ac(0x31b)]['LevelUp'][_0x5e74ac(0x2c1)]===![])return;_0x4aa4d9=Math[_0x5e74ac(0x330)](_0x4aa4d9||0x1,0x1);while(_0x4aa4d9--){_0x5b3a49=_0x5b3a49||this[_0x5e74ac(0x2c0)](),this['contents']['paintOpacity']=0xa0;const _0x579ace=ColorManager[_0x5e74ac(0x27f)]();this['contents'][_0x5e74ac(0x375)](_0x10bead+0x1,_0x260d66+0x1,_0xfd53a9-0x2,_0x5b3a49-0x2,_0x579ace),this[_0x5e74ac(0x394)]['paintOpacity']=0xff;}},ColorManager[_0x597b48(0x27f)]=function(){const _0x17ef67=_0x597b48,_0x230cd1=VisuMZ['VictoryAftermath'][_0x17ef67(0x31b)][_0x17ef67(0x276)];let _0x3579c5=_0x230cd1[_0x17ef67(0x21b)]!==undefined?_0x230cd1['BackRectColor']:0x13;return ColorManager['getColor'](_0x3579c5);},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x379)]=function(){const _0x2b6ddc=_0x597b48,_0x1c37c6=this[_0x2b6ddc(0x2c0)](),_0x1c7bfb='→',_0x566343=this[_0x2b6ddc(0x38e)](),_0x5e4c34=_0x1c37c6*0x2,_0x17f3ff=this[_0x2b6ddc(0x263)]-_0x1c37c6*5.5,_0x47d0fc=this[_0x2b6ddc(0x1e1)](_0x1c7bfb)+this[_0x2b6ddc(0x2b9)]()*0x2,_0x2b2b49=Window_VictoryLevelUpActor['_drawParamDiff']?0x4:0x3,_0x5d73b5=Math[_0x2b6ddc(0x27c)]((this[_0x2b6ddc(0x270)]/0x2-_0x47d0fc-this[_0x2b6ddc(0x2b9)]()*0x2)/_0x2b2b49),_0x56e66d=_0x17f3ff-_0x5e4c34,_0x1e407a=VisuMZ[_0x2b6ddc(0x368)][_0x2b6ddc(0x31b)][_0x2b6ddc(0x276)][_0x2b6ddc(0x25f)],_0x13b5a9=SceneManager[_0x2b6ddc(0x348)][_0x2b6ddc(0x1d7)]['x']+this['itemPadding'](),_0x1396c1=_0x13b5a9+_0x5d73b5,_0x7ecccd=_0x1396c1+_0x5d73b5,_0x52e5b4=_0x7ecccd+_0x47d0fc,_0x23c859=_0x52e5b4+_0x5d73b5;let _0x49a520=Math[_0x2b6ddc(0x27c)](_0x5e4c34+(_0x56e66d-(_0x566343[_0x2b6ddc(0x3a6)]+(_0x1e407a?0x0:0x1))*_0x1c37c6)/0x2),_0x17e350=0x2;!_0x1e407a&&(this[_0x2b6ddc(0x39c)](),VisuMZ[_0x2b6ddc(0x214)]&&(this[_0x2b6ddc(0x394)][_0x2b6ddc(0x30a)]=Window_EquipStatus[_0x2b6ddc(0x333)][_0x2b6ddc(0x292)]()),this['drawItemDarkRect'](_0x13b5a9,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x245)](_0x2b6ddc(0x24c),_0x13b5a9,_0x49a520,_0x5d73b5),this['drawItemDarkRect'](_0x1396c1,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x298)]('level',_0x1396c1,_0x49a520,_0x5d73b5),this[_0x2b6ddc(0x203)](_0x7ecccd,_0x49a520,_0x47d0fc,_0x1c37c6,_0x17e350),this['changeTextColor'](ColorManager[_0x2b6ddc(0x2bc)]()),this[_0x2b6ddc(0x300)](_0x1c7bfb,_0x7ecccd,_0x49a520,_0x47d0fc,_0x2b6ddc(0x281)),this['drawItemDarkRect'](_0x52e5b4,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x235)](_0x2b6ddc(0x24c),_0x52e5b4,_0x49a520,_0x5d73b5),Window_VictoryLevelUpActor[_0x2b6ddc(0x224)]&&(this['drawItemDarkRect'](_0x23c859,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x26b)](_0x2b6ddc(0x24c),_0x23c859,_0x49a520,_0x5d73b5)),_0x49a520+=_0x1c37c6,_0x17e350=_0x17e350===0x2?0x1:0x2);for(const _0x394082 of _0x566343){this[_0x2b6ddc(0x39c)](),VisuMZ[_0x2b6ddc(0x214)]&&(_0x2b6ddc(0x35a)!=='HupDm'?this[_0x2b6ddc(0x394)]['fontSize']=Window_EquipStatus['prototype']['paramValueFontSize']():(_0x221e65[_0x2b6ddc(0x287)]=new _0x4c35ae(_0xc3742f,_0x43bc43),_0x107210[_0x2b6ddc(0x287)][_0x2b6ddc(0x2d5)]=this[_0x2b6ddc(0x371)](),_0x5097f8[_0x2b6ddc(0x287)][_0x2b6ddc(0x396)](_0x1cf01e,_0x24912c,_0x5ee7b8,_0x52d03e),_0x40ba62[_0x2b6ddc(0x287)][_0x2b6ddc(0x396)](_0x533d1+_0x99c013,_0x3dac0e,_0x16b4b4,_0x42e2a8),_0x4dd7ac['victoryNameBitmap'][_0x2b6ddc(0x391)](_0x1d24f3,0x0,_0x170b25,_0xbf70b4),_0x112774[_0x2b6ddc(0x287)][_0x2b6ddc(0x375)](_0x251a85,0x0,_0x47c37f,_0x3d2bce,_0x3d7b15))),this[_0x2b6ddc(0x203)](_0x13b5a9,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x245)](_0x394082,_0x13b5a9,_0x49a520,_0x5d73b5),this[_0x2b6ddc(0x203)](_0x1396c1,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this['drawParamBeforeValue'](_0x394082,_0x1396c1,_0x49a520,_0x5d73b5),this[_0x2b6ddc(0x203)](_0x7ecccd,_0x49a520,_0x47d0fc,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x2b0)](ColorManager[_0x2b6ddc(0x2bc)]()),this[_0x2b6ddc(0x300)](_0x1c7bfb,_0x7ecccd,_0x49a520,_0x47d0fc,'center'),this[_0x2b6ddc(0x203)](_0x52e5b4,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this['drawParamAfterValue'](_0x394082,_0x52e5b4,_0x49a520,_0x5d73b5),Window_VictoryLevelUpActor[_0x2b6ddc(0x224)]&&(this[_0x2b6ddc(0x203)](_0x23c859,_0x49a520,_0x5d73b5,_0x1c37c6,_0x17e350),this[_0x2b6ddc(0x26b)](_0x394082,_0x23c859,_0x49a520,_0x5d73b5)),_0x49a520+=_0x1c37c6,_0x17e350=_0x17e350===0x2?0x1:0x2;}},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x38e)]=function(){const _0x4eb5fd=_0x597b48;if(Imported['VisuMZ_0_CoreEngine']){if('GXibd'===_0x4eb5fd(0x2ba)){const _0x41061c=this[_0x4eb5fd(0x2c0)]()-0x2,_0x2f4a8c=_0x35baa6[_0x4eb5fd(0x392)](_0x41061c/0x2),_0x2a869a=_0x4eb5fd(0x39f),_0x54f58b=_0x263dae[_0x4eb5fd(0x2cb)](),_0x40e253=0x50,_0x598add=_0x65065b-_0x2f4a8c-_0x40e253;!_0x2f9a57[_0x4eb5fd(0x32f)]&&(_0x3ec79d[_0x4eb5fd(0x32f)]=new _0x1b33a5(_0x25415a,_0x41061c),_0x312564[_0x4eb5fd(0x32f)][_0x4eb5fd(0x2d5)]=this[_0x4eb5fd(0x371)](),_0x5a0cbc['victoryRewardBitmap']['drawCircle'](_0x2f4a8c,_0x2f4a8c,_0x2f4a8c,_0x2a869a),_0x1e88cd[_0x4eb5fd(0x32f)]['clearRect'](_0x2f4a8c,0x0,_0x41061c,_0x41061c),_0x4ef3ea[_0x4eb5fd(0x32f)][_0x4eb5fd(0x375)](_0x2f4a8c,0x0,_0x598add,_0x41061c,_0x2a869a),_0x4789b0[_0x4eb5fd(0x32f)][_0x4eb5fd(0x293)](_0x2f4a8c+_0x598add,0x0,_0x40e253,_0x41061c,_0x2a869a,_0x54f58b)),this['contents']['blt'](_0x41df13[_0x4eb5fd(0x32f)],0x0,0x0,_0x4c5a07,_0x41061c,_0x591f6e,_0x57af77,_0x8f8872,_0x41061c);}else return VisuMZ[_0x4eb5fd(0x30c)][_0x4eb5fd(0x31b)]['Param'][_0x4eb5fd(0x2dc)];}else{if('oAoKp'==='uWeqZ')_0x2dca67=_0x550598[_0x4eb5fd(0x24c)];else return[0x0,0x1,0x2,0x3,0x4,0x5,0x6,0x7];}},Window_VictoryLevelUpActor[_0x597b48(0x333)]['drawParamName']=function(_0x26e770,_0x3ad01e,_0x3fceae,_0x145e49){const _0x50c83f=_0x597b48;this['changeTextColor'](ColorManager['systemColor']());let _0x4fe764='';_0x26e770==='level'?_0x4fe764=TextManager[_0x50c83f(0x24c)]:_0x4fe764=TextManager['param'](_0x26e770),this[_0x50c83f(0x300)](_0x4fe764,_0x3ad01e+this[_0x50c83f(0x2b9)](),_0x3fceae,_0x145e49-this['itemPadding']()*0x2);},Window_VictoryLevelUpActor['prototype'][_0x597b48(0x298)]=function(_0x2df4c6,_0x49ae11,_0xa0f461,_0x5bd09b){const _0xc67425=_0x597b48,_0x347ed0=this[_0xc67425(0x31e)]();let _0x28a9d6='';_0x2df4c6===_0xc67425(0x24c)?_0x28a9d6=_0x347ed0[_0xc67425(0x24c)]:_0xc67425(0x32e)!==_0xc67425(0x32e)?this[_0xc67425(0x35b)]():_0x28a9d6=Imported[_0xc67425(0x23d)]?_0x347ed0[_0xc67425(0x2e1)](_0x2df4c6,!![]):_0x347ed0[_0xc67425(0x24a)](_0x2df4c6),this[_0xc67425(0x2b0)](ColorManager['normalColor']()),this[_0xc67425(0x300)](_0x28a9d6,_0x49ae11+this['itemPadding'](),_0xa0f461,_0x5bd09b-this['itemPadding']()*0x2,'right');},Window_VictoryLevelUpActor['prototype'][_0x597b48(0x235)]=function(_0x392e53,_0x412da8,_0x8e75d2,_0x18cc5e){const _0x1ff29c=_0x597b48,_0x250e24=this[_0x1ff29c(0x31e)](),_0x1ee325=this[_0x1ff29c(0x328)];let _0x2ed1dc=0x0,_0x436bfc=0x0;_0x392e53==='level'?(_0x2ed1dc=_0x250e24[_0x1ff29c(0x24c)],_0x436bfc=_0x1ee325[_0x1ff29c(0x24c)]):(_0x2ed1dc=Imported['VisuMZ_0_CoreEngine']?_0x250e24[_0x1ff29c(0x2e1)](_0x392e53,![]):_0x250e24[_0x1ff29c(0x24a)](_0x392e53),_0x436bfc=Imported[_0x1ff29c(0x23d)]?_0x1ee325[_0x1ff29c(0x2e1)](_0x392e53,![]):_0x1ee325[_0x1ff29c(0x24a)](_0x392e53));let _0x2d5718=_0x436bfc;const _0x163465=_0x436bfc-_0x2ed1dc;this['changeTextColor'](ColorManager[_0x1ff29c(0x288)](_0x163465)),this[_0x1ff29c(0x300)](_0x2d5718,_0x412da8+this['itemPadding'](),_0x8e75d2,_0x18cc5e-this[_0x1ff29c(0x2b9)]()*0x2,_0x1ff29c(0x2f3));},Window_VictoryLevelUpActor[_0x597b48(0x333)]['drawParamDiffValue']=function(_0x4e8e7a,_0x7e232a,_0x4b0ec5,_0x30bce5){const _0x45e2ee=_0x597b48,_0x2ccdb9=this[_0x45e2ee(0x31e)](),_0x3f1aa9=this['_actor'];let _0x4522e8=0x0,_0x51e96f=0x0;if(_0x4e8e7a===_0x45e2ee(0x24c)){if(_0x45e2ee(0x27a)===_0x45e2ee(0x272))return this[_0x45e2ee(0x305)]<=0x0;else _0x4522e8=_0x2ccdb9[_0x45e2ee(0x24c)],_0x51e96f=_0x3f1aa9[_0x45e2ee(0x24c)];}else'Sxiid'===_0x45e2ee(0x320)?(_0x4522e8=Imported[_0x45e2ee(0x23d)]?_0x2ccdb9['paramValueByName'](_0x4e8e7a,![]):_0x2ccdb9[_0x45e2ee(0x24a)](_0x4e8e7a),_0x51e96f=Imported[_0x45e2ee(0x23d)]?_0x3f1aa9[_0x45e2ee(0x2e1)](_0x4e8e7a,![]):_0x3f1aa9['param'](_0x4e8e7a)):this[_0x45e2ee(0x394)][_0x45e2ee(0x30a)]=_0x3c152f[_0x45e2ee(0x333)]['paramValueFontSize']();const _0x56a518=_0x51e96f-_0x4522e8;let _0x256c6d=_0x56a518;if(_0x4522e8%0x1!==0x0)_0x256c6d=Math['round'](_0x56a518*0x64)+'%';if(_0x56a518!==0x0){if(_0x45e2ee(0x1e3)!==_0x45e2ee(0x1e3))return _0x219ac6[_0x45e2ee(0x23d)]?_0x2eac56['maxLvGaugeColor1']():_0x18b34c[_0x45e2ee(0x1f3)](0xe);else this[_0x45e2ee(0x2b0)](ColorManager[_0x45e2ee(0x288)](_0x56a518)),_0x256c6d=(_0x56a518>=0x0?_0x45e2ee(0x38f):_0x45e2ee(0x326))[_0x45e2ee(0x335)](_0x256c6d),this[_0x45e2ee(0x300)](_0x256c6d,_0x7e232a+this['itemPadding'](),_0x4b0ec5,_0x30bce5-this[_0x45e2ee(0x2b9)]()*0x2,_0x45e2ee(0x29d));}},Window_VictoryLevelUpActor[_0x597b48(0x333)]['drawNewLearnedSkills']=function(){const _0x255e3a=_0x597b48;this[_0x255e3a(0x39c)]();const _0x3ecee6=this[_0x255e3a(0x230)]();if(_0x3ecee6[_0x255e3a(0x3a6)]<=0x0)return;const _0xd14993=VisuMZ[_0x255e3a(0x368)][_0x255e3a(0x31b)][_0x255e3a(0x276)][_0x255e3a(0x2de)];while(_0x3ecee6[_0x255e3a(0x3a6)]>_0xd14993){_0x3ecee6[_0x255e3a(0x1fa)]();}this['drawNewLearnedSkillsBackground'](_0x3ecee6),this[_0x255e3a(0x21c)](_0x3ecee6);},Window_VictoryLevelUpActor['prototype'][_0x597b48(0x230)]=function(){const _0xa11fed=_0x597b48,_0x150b88=this['beforeActor']()['skills']();return this[_0xa11fed(0x328)][_0xa11fed(0x230)](_0x150b88);},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x2bd)]=function(_0x3ca960){const _0x183d80=_0x597b48,_0x4556d0=this['lineHeight'](),_0x4acf31=_0x183d80(0x248),_0x2bb9aa=_0x183d80(0x336),_0x32bc52=ColorManager[_0x183d80(0x337)](),_0x593ef8=Math[_0x183d80(0x27c)](this[_0x183d80(0x270)]/0x2)-0x64-_0x4556d0*0x2,_0x23192d=(_0x3ca960['length']+0x1)*_0x4556d0,_0x1dabcb=_0x4556d0,_0x56db76=this['height']-_0x4556d0*6.5-_0x23192d;this[_0x183d80(0x394)]['fillRect'](_0x1dabcb-0x2,_0x56db76-0x2,_0x593ef8+0x4,_0x23192d+0x4,_0x32bc52),this[_0x183d80(0x394)][_0x183d80(0x391)](_0x1dabcb,_0x56db76,_0x593ef8,_0x23192d),this[_0x183d80(0x394)][_0x183d80(0x293)](_0x1dabcb,_0x56db76,_0x593ef8,_0x23192d,_0x4acf31,_0x2bb9aa);},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x21c)]=function(_0x5312e4){const _0x59d973=_0x597b48,_0x14a253=this[_0x59d973(0x2c0)](),_0x3ade5b=_0x59d973(0x248),_0x3ec0b4=_0x59d973(0x336),_0x1f0cef=ColorManager[_0x59d973(0x337)](),_0xdf4898=Math[_0x59d973(0x27c)](this[_0x59d973(0x270)]/0x2)-0x64-(_0x14a253+this[_0x59d973(0x2b9)]())*0x2,_0x435d38=(_0x5312e4[_0x59d973(0x3a6)]+0x1)*_0x14a253;let _0x4cd99d=_0x14a253+this[_0x59d973(0x2b9)](),_0x3098e1=this[_0x59d973(0x263)]-_0x14a253*6.5-_0x435d38;const _0x4042f0=TextManager['victoryNewSkillFmt']['format'](this[_0x59d973(0x328)]['name']()),_0x4accf9=this[_0x59d973(0x286)](_0x4042f0)[_0x59d973(0x270)],_0x3048e7=Math['round'](_0x4cd99d+(_0xdf4898-_0x4accf9)/0x2);this[_0x59d973(0x1e6)](_0x4042f0,_0x3048e7,_0x3098e1,_0x4accf9),_0x3098e1+=_0x14a253,this[_0x59d973(0x394)][_0x59d973(0x375)](_0x4cd99d,_0x3098e1-0x1,_0xdf4898,0x2,_0x1f0cef);for(const _0x1df123 of _0x5312e4){if(_0x59d973(0x2ca)==='EDEMi'){if(!_0x1df123)continue;this[_0x59d973(0x39c)](),this[_0x59d973(0x343)](_0x1df123,_0x4cd99d+this[_0x59d973(0x2b9)](),_0x3098e1,_0xdf4898-this[_0x59d973(0x2b9)]()*0x2),_0x3098e1+=_0x14a253;}else{const _0x399efc=this['currentExp']()+_0x1689e3*this[_0x59d973(0x374)]();this['changeExp'](_0x399efc,this[_0x59d973(0x383)]());}}},Window_VictoryLevelUpActor[_0x597b48(0x333)][_0x597b48(0x39b)]=function(){const _0x575f71=_0x597b48,_0x2640e8=this[_0x575f71(0x2c0)](),_0x4ee150=Window_VictoryLevelUpActor[_0x575f71(0x1ec)],_0x3c369b=this[_0x575f71(0x2ef)](),_0x531651=_0x2640e8*0x4,_0x45b88d=Math[_0x575f71(0x27c)]((this[_0x575f71(0x270)]-_0x3c369b)/0x2),_0x4af21c=_0x45b88d+(_0x4ee150?ImageManager['faceWidth']+0x14:0x0),_0x27eaf3=this['height']-_0x2640e8*5.5;let _0x528eea=this['getQuoteText']();_0x4ee150&&this[_0x575f71(0x26e)](this['_actor'],_0x45b88d,_0x27eaf3,ImageManager[_0x575f71(0x285)],ImageManager['faceHeight']),this[_0x575f71(0x1e6)](_0x528eea,_0x4af21c,_0x27eaf3,_0x3c369b-_0x4af21c);},Window_VictoryLevelUpActor[_0x597b48(0x333)]['getQuoteWidth']=function(){const _0x5eadbc=_0x597b48;let _0x2710de=Graphics[_0x5eadbc(0x1dd)];return Imported['VisuMZ_1_MessageCore']&&(_0x2710de=Math[_0x5eadbc(0x23f)](_0x2710de,VisuMZ[_0x5eadbc(0x25d)][_0x5eadbc(0x31b)]['General'][_0x5eadbc(0x2c2)])),_0x2710de-this[_0x5eadbc(0x2b9)]()*0x2;},Window_VictoryLevelUpActor['prototype'][_0x597b48(0x296)]=function(){const _0x1cbf4f=_0x597b48;return this[_0x1cbf4f(0x230)]()[_0x1cbf4f(0x3a6)]>0x0?_0x1cbf4f(0x39a)!==_0x1cbf4f(0x234)?TextManager[_0x1cbf4f(0x315)](this['_actor'])[_0x1cbf4f(0x335)](this['_actor'][_0x1cbf4f(0x2b2)]()):_0xa0c2a1[_0x1cbf4f(0x368)][_0x1cbf4f(0x1ed)]['call'](this):TextManager[_0x1cbf4f(0x205)](this[_0x1cbf4f(0x328)])[_0x1cbf4f(0x335)](this[_0x1cbf4f(0x328)][_0x1cbf4f(0x2b2)]());};