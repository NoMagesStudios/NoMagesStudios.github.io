//=============================================================================
// VisuStella MZ - Party System
// VisuMZ_2_PartySystem.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_2_PartySystem = true;

var VisuMZ = VisuMZ || {};
VisuMZ.PartySystem = VisuMZ.PartySystem || {};
VisuMZ.PartySystem.version = 1.14;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 2] [Version 1.14] [PartySystem]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Party_System_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * RPG Maker MZ only gives game projects the ability to switch party members
 * within the main menu and nothing more. There's no inherent functionality to
 * lock party members, make party members required, and/or give players the
 * ability to switch party members mid-battle.
 *
 * This plugin will add in all of those functions as well as a dedicated scene
 * for switching party members. Party switching will allow party members to be
 * removed, swapped, and sorted. Through the usage of Plugin Commands, party
 * members can also be locked and/or required for party presence.
 *
 * Those using the VisuStella MZ Battle Core will also have access to features
 * in this plugin that aren't available otherwise. These features give players
 * the functionality to switch out the whole party lineup mid-battle and/or
 * individual party member switching.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Custom scene dedicated to party management.
 * * Change the maximum number of party members that can participate in battle.
 * * Plugin Commands to lock party members.
 * * Plugin Commands to make certain party members required.
 * * Added functionality with Battle Core to switch party members mid-battle.
 * * This comes in the form of changing either the whole party at once.
 * * Or switching individual members out one at a time.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 2 ------
 *
 * This plugin is a Tier 2 plugin. Place it under other plugins of lower tier
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
 * Main Menu Formation Command
 *
 * - This command is now changed to send the player to Scene_Party for the
 * player to have a dedicated scene for changing the party.
 *
 * ---
 *
 * Battle Members Array
 *
 * - Previously, the battle members are decided by which actors are lined up
 * first in the party roster. This has been changed to give players the freedom
 * to have a party size less than the maximum. This change is made by changing
 * the way the battle members are determined by using a new array. However, any
 * and all functions utilize the $gameParty.battleMembers() function will still
 * behave as normal.
 *
 * ---
 *
 * Formation Change OK Function
 *
 * - RPG Maker MZ did not do anything with the Game_Actor.isFormationChangeOk
 * function so this plugin overwrote it completely to allow for the new
 * lock and require features to work.
 *
 * ---
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
 * VisuMZ_1_BattleCore
 *
 * - If the VisuStella MZ Battle Core plugin is present, players are able to 
 * access party switching functionality mid-battle at will. This can be in the
 * form of switching out the entire active party roster at once or individually
 * for each actor.
 *
 * - Switching Entire Rosters: This can be done by going into this plugin's
 * Plugin Parameters => General => Party Command Window => Add Party Command.
 * If the Party Command Window is accessible, the player will be able to see
 * the option between 'Auto Battle' and 'Options'.
 *
 * - Individual Member Switching: This requires going to VisuMZ_1_BattleCore's
 * Plugin Parameters => Actor Command Window => Battle Commands => Command List
 * and add in the "party" option. The "party" option can also be added to the
 * <Battle Commands> notetag.
 *
 * ---
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
 * === Party Plugin Commands ===
 * 
 * ---
 *
 * Party: Call Party Scene
 * - Calls the party changing scene.
 *
 * ---
 *
 * Party: Change Max Battle Members
 * - Changes the number of max battle members possible.
 * - Cannot be use mid-battle.
 *
 *   Max Members:
 *   - Changes the number of max battle members possible.
 *   - Use 0 for the game's default number.
 *
 * ---
 *
 * Party: Lock/Unlock Member(s)
 * - Allows you to lock/unlock a party member.
 * - Locked actors cannot change their party position.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to lock/unlock.
 *   - Locked actors cannot change their party position.
 *
 *   Lock?:
 *   - Lock the selected actor(s)?
 *
 * ---
 * 
 * Party: Move Actor(s) to Active
 * - Map Only.
 * - Moves an actor to the active party if there is room.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the active party if there is room.
 * 
 * ---
 * 
 * Party: Move Actor(s) to Reserve
 * - Map Only.
 * - Moves an actor to the reserve party.
 * - Must be 1 actor left.
 * - The actor needs to have joined the party.
 * 
 *   Actor ID(s):
 *   - Select which actor(s) to move to the reserve party.
 * 
 * ---
 * 
 * Party: Move Party Index to Reserve
 * - Map only.
 * - Moves an actor in a specific party index to reserve.
 * - Must be 1 actor left.
 * 
 *   Index:
 *   - Type in which index to move.
 *   - Index values start at 0.
 *   - You may use JavaScript code.
 * 
 * ---
 * 
 * Party: Move Random Reserve to Active
 * - Map only.
 * - Moves a random actor from the reserve party to active.
 * - Must be enough space in active party.
 * 
 * ---
 *
 * Party: Require Member(s)
 * - Allows you to require/free a party member.
 * - Required actors must be in the party to exit the scene.
 *
 *   Actor ID(s):
 *   - Select which actor(s) to require/free.
 *   - Required actors must be in the party to exit the scene.
 *
 *   Require?:
 *   - Make the selected actor(s) required?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Settings
 * ============================================================================
 *
 * These Plugin Parameters control the overall behaviors pertaining to the
 * Party System added with this plugin. These behaviors range from the maximum
 * number of members that can participate in battle to the availability of the
 * party switching mechanics.
 *
 * ---
 *
 * General
 * 
 *   Max Battle Members:
 *   - Maximum number of battle members.
 *
 * ---
 *
 * Party Scene
 * 
 *   Add Remove Command:
 *   - Add the 'Remove' command to the party scene?
 * 
 *   Locked Member Icon:
 *   - Icon used for a locked party member.
 * 
 *   Requiured Member Icon:
 *   - Icon used for a required party member.
 *
 * ---
 *
 * Party Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Party Command:
 *   - Add the 'Party' command to the Party Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 *
 * ---
 *
 * Actor Command Window
 * - These require VisuMZ_1_BattleCore!
 * 
 *   Add Switch Command:
 *   - Add the 'Switch' command to the Actor Command Window?
 * 
 *   Command Cooldown:
 *   - Cooldown (in turns) for this command to be available again.
 * 
 *   Switch Out Animation?:
 *   - Show the sprites switching out when using individual party
 *     member switching?
 * 
 *   TPB: Immediate Action:
 *   - Allow actors to immediate act upon switching in for TPB battle systems?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Vocabulary Settings
 * ============================================================================
 *
 * These Plugin Parameters control the text that you see in-game related to the
 * Party System plugin.
 *
 * ---
 *
 * General
 * 
 *   Active Party:
 *   - Vocabulary used to represent the Active Party.
 * 
 *   Reserve Party:
 *   - Vocabulary used to represent the Reserve Party.
 * 
 *   Status:
 *   - Vocabulary used to represent the Status Window.
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
 * Party Scene > Windows
 * 
 *   Empty:
 *   - For the party and status windows when no actor is selected.
 * 
 *   Remove:
 *   - For the remove option.
 *
 * ---
 *
 * Party Scene > Button Assist
 * 
 *   Swap Positions:
 *   - Button assist text for the page up/down commands.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Remove:
 *   - Button assist text for the removal command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Sort:
 *   - Button assist text for the sort command.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap In:
 *   - Button assist text for swapping in actors.
 *   - Requires VisuMZ_0_CoreEngine!
 * 
 *   Swap Out:
 *   - Button assist text for swapping out actors.
 *   - Requires VisuMZ_0_CoreEngine!
 *
 * ---
 *
 * Battle Scene
 * 
 *   Party Command:
 *   - Command text for entering Party Scene.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Formation:
 *   - Help text for Formation command.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Queue Message:
 *   - Message to say the Party Scene is queued.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Switch Command:
 *   - Command text for switching out members.
 *   - Requires VisuMZ_1_BattleCore!
 * 
 *   Help: Switch:
 *   - Help text for Switch command.
 *   - Requires VisuMZ_1_BattleCore!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Background Settings
 * ============================================================================
 *
 * Background settings for Scene_Party.
 *
 * ---
 *
 * Background Settings
 * 
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 * 
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 * 
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * If you don't like the locations of the windows in Scene_Party, change them
 * up with these Plugin Parameters, provided that you have an understanding of
 * JavaScript code.
 *
 * ---
 *
 * Active Party Label
 * Active Party Window
 * Reserve Party Label
 * Reserve Party Window
 * Status Label
 * Status Window
 * Battle Switch Window
 * 
 *   Background Type:
 *   - Select background type for this window.
 * 
 *   Columns:
 *   - Available only for the Reserve Party Window.
 *   - How many columns do you want there to be for the window?
 * 
 *   Actor Graphic:
 *   - Available only for Active Party Window and Reserve Party Window.
 *   - Choose how the actor graphics appear in the specific windows.
 *     - Face
 *     - Map Sprite
 *     - Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * 
 *     Map Sprite:
 *     Sideview Battler:
 * 
 *       Offset X:
 *       Offset Y:
 *       - If showing map sprites, offset the x or y coordinates.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
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
 * Version 1.14: February 5, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Party Index to Reserve
 * **** Moves an actor in a specific party index to reserve.
 *      Map only. Must be 1 actor left. You may use code.
 * *** Party: Move Random Reserve to Active
 * **** Moves a random actor from the reserve party to active.
 *      Map only. Must be enough space in active party.
 * 
 * Version 1.13: January 29, 2021
 * * Documentation Update!
 * ** Help file updated for new features.
 * * New Features!
 * ** New Plugin Commands added by Arisu!
 * *** Party: Move Actor(s) to Active
 * **** Map only. Moves an actor to the active party if there is room.
 * *** Party: Move Actor(s) to Reserve
 * **** Map only. Moves an actor to the reserve party.
 * 
 * Version 1.12: January 15, 2021
 * * Bug Fixes!
 * ** For battle testing, if the number of battle test members exceeds the
 *    maximum battle member slots, trim them until they match. Fix by Olivia.
 * 
 * Version 1.11: January 1, 2021
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.10: December 25, 2020
 * * Compatibility Update
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.09: December 18, 2020
 * * Bug Fixes!
 * ** Removing party members in the active party by event command will now be
 *    properly removed from the party. Fix made by Yanfly.
 * 
 * Version 1.08: December 4, 2020
 * * Bug Fixes!
 * ** With TPB battle systems, after switching out party members, the battle
 *    system will no longer carry over any previous active battle members in
 *    the command window. Fix made by Yanfly.
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.07: November 22, 2020
 * * Bug Fixes!
 * ** With Active TPB, switching out a party member mid-action is no longer
 *    possible to prevent bugs. Intead, there party switching action will be
 *    queued and take effect after the action has been completed. Fix made by
 *    Yanfly.
 * * Compatibility Update!
 * ** Game_Party.swapOrder function now works with this plugin. However, keep
 *    in mind that due to how this party system plugin allows you have empty
 *    slots in the active battle party, this function will fill in the empty
 *    slots upon usage. Update made by Yanfly.
 *
 * Version 1.06: November 1, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.05: October 25, 2020
 * * Bug Fixes!
 * ** Plugin Command "Party: Change Max Battle Members" now works again.
 *    Fix made by Arisu.
 *
 * Version 1.04: October 18, 2020
 * * Compatibility Update!
 * ** Plugins should be more compatible with one another.
 * 
 * Version 1.03: October 11, 2020
 * * Bug Fixes!
 * ** Adding party members during battle through the party window command will
 *    no longer cause crashes after they input an action. Fix made by Yanfly.
 * 
 * Version 1.02: October 4, 2020
 * * Bug Fixes!
 * ** Adding party members during test play should now work again.
 *    Fix made by Irina.
 * ** Changing party members mid-battle through the actor command should now
 *    refresh the party followers afterwards. Fix made by Yanfly.
 * * New Features!
 * ** New Plugin Parameter added by Arisu!
 * *** General > Party Command Window > TPB: Immediate Action
 * **** Allow actors to immediate act upon switching in for TPB battle systems?
 * 
 * Version 1.01: September 27, 2020
 * * Bug Fixes!
 * ** When switching actors with states, buffs, and/or debuffs already applied,
 *    the state icons found in the status window will now switch over properly,
 *    too. Fix made by Arisu.
 *
 * Version 1.00: September 7, 2020
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command CallPartyScene
 * @text Party: Call Party Scene
 * @desc Calls the party changing scene.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ChangeMaxBattleMembers
 * @text Party: Change Max Battle Members
 * @desc Changes the number of max battle members possible.
 * Cannot be use mid-battle.
 *
 * @arg Value:eval
 * @text Max Members
 * @desc Changes the number of max battle members possible.
 * Use 0 for the game's default number.
 * @default 4
 *
 * @ --------------------------------------------------------------------------
 *
 * @command LockPartyMembers
 * @text Party: Lock/Unlock Member(s)
 * @desc Allows you to lock/unlock a party member.
 * Locked actors cannot change their party position.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to lock/unlock.
 * Locked actors cannot change their party position.
 * @default ["1"]
 * 
 * @arg Lock:eval
 * @text Lock?
 * @type boolean
 * @on Lock
 * @off Unlock
 * @desc Lock the selected actor(s)?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToActive
 * @text Party: Move Actor(s) to Active
 * @desc Moves an actor to the active party if there is room.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the active party if there is room.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveActorsToReserve
 * @text Party: Move Actor(s) to Reserve
 * @desc Moves an actor to the reserve party. Must be 1 actor left.
 * Map only. The actor needs to have joined the party.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to move to the reserve party.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MovePartyIndexToReserve
 * @text Party: Move Party Index to Reserve
 * @desc Moves an actor in a specific party index to reserve.
 * Map only. Must be 1 actor left.
 *
 * @arg Index:eval
 * @text Party Index
 * @desc Type in which index to move. Index values start at 0.
 * You may use JavaScript code.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command MoveRandomToActive
 * @text Party: Move Random Reserve to Active
 * @desc Moves a random actor from the reserve party to active.
 * Map only. Must be enough space in active party.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command RequirePartyMembers
 * @text Party: Require Member(s)
 * @desc Allows you to require/free a party member.
 * Required actors must be in the party to exit the scene.
 *
 * @arg Actors:arraynum
 * @text Actor ID(s)
 * @type actor[]
 * @desc Select which actor(s) to require/free.
 * Required actors must be in the party to exit the scene.
 * @default ["1"]
 * 
 * @arg Require:eval
 * @text Require?
 * @type boolean
 * @on Require
 * @off Don't Require
 * @desc Make the selected actor(s) required?
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
 * @param PartySystem
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
 * @desc General settings pertaining to Party-related mechanics.
 * @default {"General":"","MaxBattleMembers:num":"4","PartyScene":"","AddRemoveCmd:eval":"true","LockIcon:num":"195","RequireIcon:num":"87","DrawBackRect:eval":"true","BackRectColor:str":"19","PartyCmdWin":"","PartyCmdWinAddParty:eval":"false","PartyCmdCooldown:num":"1","tpbImmediateAction:eval":"true","ActorCmdWin":"","ActorCmdWinAddParty:eval":"true","ActorCmdCooldown:num":"1","SwitchOutAnimation:eval":"true"}
 *
 * @param Vocab:struct
 * @text Vocabulary Settings
 * @type struct<Vocab>
 * @desc These settings let you adjust the text displayed for this plugin.
 * @default {"General":"","ActiveParty:str":"Active Party","ReserveParty:str":"Reserve Party","Status:str":"Status","PartyScene":"","Windows":"","Empty:str":"- Empty -","Remove:str":"Remove","ButtonAssist":"","AssistSwapPosition:str":"Quick Swap","AssistRemove:str":"Remove","AssistSort:str":"Sort","AssistSwapIn:str":"Swap In","AssistSwapOut:str":"Swap Out","BattleScene":"","BattlePartyCmd:str":"Party","BattleHelpFormation:json":"\"Change up your party formation.\"","QueuePartyScene:str":"%1 Menu queued after action is complete.","BattleSwitchOut:str":"Switch","BattleHelpSwitch:json":"\"Switch out this party member with another.\""}
 *
 * @param BgSettings:struct
 * @text Background Settings
 * @type struct<BgSettings>
 * @desc Background settings for Scene_Party.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc These settings let you control how the windows appear in Scene_Party.
 * @default {"ActivePartyLabel":"","ActivePartyLabelBgType:num":"0","ActivePartyLabelRect:func":"\"const wx = 0;\\nconst wy = this.mainAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ActivePartyWindow":"","ActivePartyWindowBgType:num":"0","ActivePartyGraphic:str":"face","ActivePartyMapSprite":"","ActiveSpriteOffsetX:num":"0","ActiveSpriteOffsetY:num":"4","ActivePartySvBattler":"","ActiveBattlerOffsetX:num":"0","ActiveBattlerOffsetY:num":"4","ActivePartyWindowRect:func":"\"const wx = 0;\\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\\nconst ww = Graphics.boxWidth;\\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyLabel":"","ReservePartyLabelBgType:num":"0","ReservePartyLabelRect:func":"\"const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","ReservePartyWindow":"","ReservePartyWindowBgType:num":"0","ReserveItemThickness:num":"2","ReservePartyGraphic:str":"face","ReservePartyMapSprite":"","ReserveSpriteOffsetX:num":"24","ReserveSpriteOffsetY:num":"4","ReservePartySvBattler":"","ReserveBattlerOffsetX:num":"48","ReserveBattlerOffsetY:num":"4","ReservePartyWindowRect:func":"\"const ww = this._reservePartyLabel.width;\\nconst wx = this._reservePartyLabel.x;\\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusLabel":"","StatusLabelBgType:num":"0","StatusLabelRect:func":"\"const ww = Graphics.boxWidth - this._reservePartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\\nconst wh = Window_Base.prototype.lineHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","StatusWindow":"","StatusWindowBgType:num":"0","StatusWindowDraw:func":"\"// Draw Empty\\nif (!this._actor) {\\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\\n    this.changeTextColor(ColorManager.systemColor());\\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\\n    return;\\n}\\n\\n// Draw Face and Simple Status\\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\\n\\n// Declare Constants\\nconst lineHeight = this.lineHeight();\\nconst params = this.actorParams();\\nconst paramWidth = Math.round(this.innerWidth / 2);\\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\\nconst baseX = 0;\\nlet x = 0;\\nlet y = ImageManager.faceHeight + lineHeight / 2;\\n\\n// Draw Parameters\\nfor (const param of params) {\\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\\n    this.drawParamName(param, x, y, paramWidth);\\n    this.drawParamValue(param, x, y, paramWidth);\\n\\n    if (x === baseX) {\\n        x += paramWidth;\\n    } else {\\n        x = baseX;\\n        y += lineHeight;\\n    }\\n}\"","StatusWindowRect:func":"\"const ww = this._statusPartyLabel.width;\\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\\nconst wy = this._reservePartyWindow.y;\\nconst wh = this._reservePartyWindow.height;\\nreturn new Rectangle(wx, wy, ww, wh);\"","BattleSwitchWindow":"","BattleSwitchWindowBgType:num":"0","BattleSwitchWindowRect:func":"\"const padding = $gameSystem.windowPadding() * 2;\\nlet ww = 516 + padding;\\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\\nreturn new Rectangle(wx, wy, ww, wh);\""}
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
 * @param MaxBattleMembers:num
 * @text Max Battle Members
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of battle members.
 * @default 4
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param AddRemoveCmd:eval
 * @text Add Remove Command
 * @parent PartyScene
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Remove' command to the party scene?
 * @default true
 *
 * @param LockIcon:num
 * @text Locked Member Icon
 * @parent PartyScene
 * @desc Icon used for a locked party member.
 * @default 195
 *
 * @param RequireIcon:num
 * @text Requiured Member Icon
 * @parent PartyScene
 * @desc Icon used for a required party member.
 * @default 87
 *
 * @param DrawBackRect:eval
 * @text Show Back Rectangles?
 * @parent PartyScene
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
 * @param PartyCmdWin
 * @text Party Command Window
 *
 * @param PartyCmdWinAddParty:eval
 * @text Add Party Command
 * @parent PartyCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Party' command to the Party Command Window?
 * @default false
 *
 * @param PartyCmdCooldown:num
 * @text Command Cooldown
 * @parent PartyCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param ActorCmdWin
 * @text Actor Command Window
 *
 * @param ActorCmdWinAddParty:eval
 * @text Add Switch Command
 * @parent ActorCmdWin
 * @type boolean
 * @on Add Command
 * @off Don't Add
 * @desc Add the 'Switch' command to the Actor Command Window?
 * @default true
 *
 * @param ActorCmdCooldown:num
 * @text Command Cooldown
 * @parent ActorCmdWin
 * @desc Cooldown (in turns) for this command to be available again.
 * @default 1
 *
 * @param SwitchOutAnimation:eval
 * @text Switch Out Animation?
 * @parent ActorCmdWin
 * @type boolean
 * @on Show
 * @off Don't
 * @desc Show the sprites switching out when using individual party member switching?
 * @default true
 *
 * @param tpbImmediateAction:eval
 * @text TPB: Immediate Action
 * @parent ActorCmdWin
 * @type boolean
 * @on Immediate Action
 * @off Empty Gauge
 * @desc Allow actors to immediate act upon switching in for TPB battle systems?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Vocabulary Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Vocab:
 *
 * @param General
 *
 * @param ActiveParty:str
 * @text Active Party
 * @parent General
 * @desc Vocabulary used to represent the Active Party.
 * @default Active Party
 *
 * @param ReserveParty:str
 * @text Reserve Party
 * @parent General
 * @desc Vocabulary used to represent the Reserve Party.
 * @default Reserve Party
 *
 * @param Status:str
 * @text Status
 * @parent General
 * @desc Vocabulary used to represent the Status Window.
 * @default Status
 *
 * @param PartyScene
 * @text Party Scene
 *
 * @param Windows
 * @parent PartyScene
 *
 * @param Empty:str
 * @text Empty
 * @parent Windows
 * @desc For the party and status windows when no actor is selected.
 * @default - Empty -
 *
 * @param Remove:str
 * @text Remove
 * @parent Windows
 * @desc For the remove option.
 * @default Remove
 *
 * @param ButtonAssist
 * @text Button Assist
 * @parent PartyScene
 *
 * @param AssistSwapPosition:str
 * @text Swap Positions
 * @parent ButtonAssist
 * @desc Button assist text for the page up/down commands.
 * Requires VisuMZ_0_CoreEngine!
 * @default Quick Swap
 *
 * @param AssistRemove:str
 * @text Remove
 * @parent ButtonAssist
 * @desc Button assist text for the removal command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Remove
 *
 * @param AssistSort:str
 * @text Sort
 * @parent ButtonAssist
 * @desc Button assist text for the sort command.
 * Requires VisuMZ_0_CoreEngine!
 * @default Sort
 *
 * @param AssistSwapIn:str
 * @text Swap In
 * @parent ButtonAssist
 * @desc Button assist text for swapping in actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap In
 *
 * @param AssistSwapOut:str
 * @text Swap Out
 * @parent ButtonAssist
 * @desc Button assist text for swapping out actors.
 * Requires VisuMZ_0_CoreEngine!
 * @default Swap Out
 *
 * @param BattleScene
 * @text Battle Scene
 *
 * @param BattlePartyCmd:str
 * @text Party Command
 * @parent BattleScene
 * @desc Command text for entering Party Scene.
 * Requires VisuMZ_1_BattleCore!
 * @default Party
 *
 * @param BattleHelpFormation:json
 * @text Help: Formation
 * @parent BattlePartyCmd:str
 * @type note
 * @desc Help text for Formation command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Change up your party formation."
 *
 * @param QueuePartyScene:str
 * @text Queue Message
 * @parent BattlePartyCmd:str
 * @desc Message to say the Party Scene is queued.
 * Requires VisuMZ_1_BattleCore!
 * @default %1 Menu queued after action is complete.
 *
 * @param BattleSwitchOut:str
 * @text Switch Command
 * @parent BattleScene
 * @desc Command text for switching out members.
 * Requires VisuMZ_1_BattleCore!
 * @default Switch
 *
 * @param BattleHelpSwitch:json
 * @text Help: Switch
 * @parent BattleSwitchOut:str
 * @type note
 * @desc Help text for Switch command.
 * Requires VisuMZ_1_BattleCore!
 * @default "Switch out this party member with another."
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param ActivePartyLabel
 * @text Active Party Label
 *
 * @param ActivePartyLabelBgType:num
 * @text Background Type
 * @parent ActivePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.mainAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ActivePartyWindow
 * @text Active Party Window
 *
 * @param ActivePartyWindowBgType:num
 * @text Background Type
 * @parent ActivePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActivePartyGraphic:str
 * @text Actor Graphic
 * @parent ActivePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the active party menu.
 * @default face
 *
 * @param ActivePartyMapSprite
 * @text Map Sprite
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveSpriteOffsetX:num
 * @text Offset X
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveSpriteOffsetY:num
 * @text Offset Y
 * @parent ActivePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartySvBattler
 * @text Sideview Battler
 * @parent ActivePartyGraphic:str
 *
 * @param ActiveBattlerOffsetX:num
 * @text Offset X
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from center.
 * @default 0
 *
 * @param ActiveBattlerOffsetY:num
 * @text Offset Y
 * @parent ActivePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ActivePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ActivePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this._activePartyLabel.y + this._activePartyLabel.height;\nconst ww = Graphics.boxWidth;\nconst wh = ImageManager.faceHeight + $gameSystem.windowPadding() * 2 + 2;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyLabel
 * @text Reserve Party Label
 *
 * @param ReservePartyLabelBgType:num
 * @text Background Type
 * @parent ReservePartyLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReservePartyLabelRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Math.max(240, Math.min(Graphics.boxWidth - 576, Math.round(Graphics.boxWidth / 2)));\nconst wx = this.isRightInputMode() ? (Graphics.boxWidth - ww) : 0;\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param ReservePartyWindow
 * @text Reserve Party Window
 *
 * @param ReservePartyWindowBgType:num
 * @text Background Type
 * @parent ReservePartyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ReserveCol:num
 * @text Columns
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many columns do you want there to be for the window?
 * @default 1
 *
 * @param ReserveItemThickness:num
 * @text Row Thickness
 * @parent ReservePartyWindow
 * @type number
 * @min 1
 * @desc How many rows thick do you want selectable items to be?
 * @default 2
 *
 * @param ReservePartyGraphic:str
 * @text Actor Graphic
 * @parent ReservePartyWindow
 * @type select
 * @option None
 * @value none
 * @option Face
 * @value face
 * @option Map Sprite
 * @value sprite
 * @option Sideview Battler (Requires VisuMZ_1_MainMenuCore)
 * @value svbattler
 * @desc Choose how the actor graphics appear in the reserve party menu.
 * @default face
 *
 * @param ReservePartyMapSprite
 * @text Map Sprite
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveSpriteOffsetX:num
 * @text Offset X
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the x coordinate here from left.
 * @default 24
 *
 * @param ReserveSpriteOffsetY:num
 * @text Offset Y
 * @parent ReservePartyMapSprite
 * @desc If showing map sprites, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartySvBattler
 * @text Sideview Battler
 * @parent ReservePartyGraphic:str
 *
 * @param ReserveBattlerOffsetX:num
 * @text Offset X
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the x coordinate here from left.
 * @default 48
 *
 * @param ReserveBattlerOffsetY:num
 * @text Offset Y
 * @parent ReservePartySvBattler
 * @desc If showing sideview battlers, offset the y coordinate here from bottom.
 * @default 4
 *
 * @param ReservePartyWindowRect:func
 * @text JS: X, Y, W, H
 * @parent ReservePartyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._reservePartyLabel.width;\nconst wx = this._reservePartyLabel.x;\nconst wy = this._reservePartyLabel.y + this._reservePartyLabel.height;\nconst wh = this.mainAreaHeight() - this._reservePartyLabel.height - this._activePartyWindow.height - this._activePartyLabel.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusLabel
 * @text Status Label
 *
 * @param StatusLabelBgType:num
 * @text Background Type
 * @parent StatusLabel
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusLabelRect:func
 * @text JS: X, Y, W, H
 * @parent StatusLabel
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = Graphics.boxWidth - this._reservePartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._activePartyWindow.y + this._activePartyWindow.height;\nconst wh = Window_Base.prototype.lineHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusWindowBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusWindowDraw:func
 * @text JS: Draw Data
 * @parent StatusWindow
 * @type note
 * @desc Code used to draw the display data in the Status Window.
 * @default "// Draw Empty\nif (!this._actor) {\n    this.drawItemDarkRect(0, 0, this.innerWidth, this.innerHeight);\n    const y = Math.round((this.innerHeight - this.lineHeight()) / 2);\n    this.changeTextColor(ColorManager.systemColor());\n    this.drawText(TextManager.emptyPartyMember, 0, y, this.innerWidth, 'center');\n    return;\n}\n\n// Draw Face and Simple Status\nthis.drawActorFace(this._actor, 1, 0, ImageManager.faceWidth, ImageManager.faceHeight);\nthis.drawActorSimpleStatus(this._actor, ImageManager.faceWidth + 36, 0);\n\n// Declare Constants\nconst lineHeight = this.lineHeight();\nconst params = this.actorParams();\nconst paramWidth = Math.round(this.innerWidth / 2);\nconst paramHeight = Math.ceil(params.length / 2) * lineHeight;\nconst baseX = 0;\nlet x = 0;\nlet y = ImageManager.faceHeight + lineHeight / 2;\n\n// Draw Parameters\nfor (const param of params) {\n    this.drawItemDarkRect(x, y, paramWidth, lineHeight);\n    this.drawParamName(param, x, y, paramWidth);\n    this.drawParamValue(param, x, y, paramWidth);\n\n    if (x === baseX) {\n        x += paramWidth;\n    } else {\n        x = baseX;\n        y += lineHeight;\n    }\n}"
 *
 * @param StatusWindowRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const ww = this._statusPartyLabel.width;\nconst wx = this.isRightInputMode() ? 0 : (Graphics.boxWidth - ww);\nconst wy = this._reservePartyWindow.y;\nconst wh = this._reservePartyWindow.height;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param BattleSwitchWindow
 * @text Battle Switch Window
 *
 * @param BattleSwitchWindowBgType:num
 * @text Background Type
 * @parent BattleSwitchWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BattleSwitchWindowRect:func
 * @text JS: X, Y, W, H
 * @parent BattleSwitchWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * Does not apply to Border Battle Layout style.
 * @default "const padding = $gameSystem.windowPadding() * 2;\nlet ww = 516 + padding;\nlet wh = Window_PartyBattleSwitch.prototype.itemHeight() * 4 + padding;\nlet wx = Math.round(Graphics.boxWidth - ww) / 2;\nlet wy = Math.round(Graphics.boxHeight - wh - this._statusWindow.height) / 2;\nwy = wy.clamp(0, Graphics.boxHeight - wh - this._statusWindow.height);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 */
//=============================================================================

const _0x1d36=['text','MaxBattleMembers','getPartySystemBackColor','111739bdyBcK','AddRemoveCmd','isPlaytest','reservePartyLabelRect','isPreviousSceneBattleTransitionable','loadPartyImages','contents','anyRequiredPartyMembersInReserve','constructor','setupStartingMembers','Empty','actor%1-stateIcon','statusParty','callUpdateHelp','remove','ActivePartyWindowBgType','pop','maxBattleMembers','isEnabled','stepForward','_bypassAutoSavePartySystem','isNextSceneBattleTransitionable','param','assistRemovePartyMember','Scene_Battle_createAllWindows','Game_Troop_increaseTurn','ReserveCol','createCustomBackgroundImages','uiInputPosition','centerSprite','Actors','Game_Battler_onBattleStart','Scene_Base_isAutosaveEnabled','battlePartySwitchCmd','addWindow','update','prototype','ReservePartyLabelBgType','326roCSOV','loadFaceImages','assistSwapOutPartyMember','cursorPagedown','createActivePartyWindow','openness','drawItemImageFace','makeActions','isShiftShortcutEnabled','deselect','battlerName','lockPartyMemberIcon','active','applyBattlePartySwitchCooldown','sortActors','BattleSwitchWindowBgType','getBackgroundOpacity','ActorCmdCooldown','checkShiftRemoveShortcut','_spriteset','actorParams','updateTurnOrderCTB','setStatusWindow','_clickHandler','ReserveBattlerOffsetY','ActivePartyLabelRect','updateBattleProcess','drawActorPartyIconsHorz','terminate','assistSortPartyMembers','match','getInputButtonString','createPartySwitchWindow','popScene','select','_pagedownButton','_actors','isPreviousScene','processCursorMove','rawBattleMembers','setPartyRequirement','BattleSwitchWindowRect','isTimeActive','EVAL','%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.','updatePartySwitch','processShiftSortShortcut','AssistSwapOut','addPartyCommand','ensureCursorVisible','battlePartyChangeCmdHelp','requiredPartyMemberIcon','selectActor','activePartyLabelRect','swapOrder','VisuMZ_0_CoreEngine','refresh','filter','drawActorFace','name','commandStyle','_actorGraphic','setBackgroundType','clearPartySwitchCommandCooldown','swapOrderPartySystemPlugin','testBattlers','dimColor2','_helpWindow','deactivate','round','version','gaugeBackColor','ARRAYSTR','isRightInputMode','Param','_actorCommandWindow','commandPartyMemberSwitch','hpColor','open','Window_PartyCommand_updateHelp','_lastIndex','BackRectColor','Settings','Require','cursorPageup','BgFilename1','setupBattleTestMembers','iconHeight','pendingIndex','drawActorPartyIcons','drawParamName','StatusWindowBgType','ActivePartyGraphic','getParamValue','QueuePartyScene','BattleSwitchOut','svbattler','_backSprite1','drawItemDarkRect','_actor','partySwitchWindowRectStandard','padding','ActiveTpbFormationMessage','ReserveSpriteOffsetY','canSwitchPartyInBattle','removeActor','Window','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','sort','createPageButtons','battleLayoutStyle','_tpbSceneChangeCacheActor','setBackgroundOpacity','create','callFormation','callPartyMemberSwitch','reselect','parse','sprite','createActivePartyLabel','random','LockPartyMembers','rearrangePartyActors','shift','clear','VisuMZ_2_BattleSystemSTB','recoverAll','_partySwitchTargetActor','toLowerCase','Status','cursorUp','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','updatePadding','SwitchOutAnimation','VisuMZ_1_BattleCore','paintOpacity','_partyRequired','addChild','updateBattlePartySwitchCooldown','_battleSystemIncompatibilityError','onReserveOk','Game_Party_removeActor','indexOf','charged','_reservePartyLabel','width','preparePartySwitchMember','BgSettings','addNonBattleTestMembers','isTpb','changePaintOpacity','isQueueFormationMenu','faceName','maxCols','MoveRandomToActive','AssistRemove','SceneManager_isPreviousSceneBattleTransitionable','playEquip','loadFace','1916300lxoSJM','StatusLabelBgType','buttonAssistKey3','processCancel','smoothSelect','_partySwitchBattleCommandCooldown','onPartySwitchCancel','VisuMZ_2_BattleSystemFTB','ActivePartyWindowRect','STRUCT','ReservePartyGraphic','map','activeParty','isFormationEnabled','Scene_Battle_isTimeActive','windowPadding','changeTextColor','Scene_Battle_createActorCommandWindow','buttonAssistText1','onBattlePartySwitch','activePartyWindowRect','assistSwapPositions','_partySystemBattleCommandCooldown','createInnerSprite','reservePartyWindowRect','onBattleStart','SceneManager_isNextSceneBattleTransitionable','activate','ReserveBattlerOffsetX','Scene_Battle_updateBattleProcess','PartyCmdWinAddParty','setup','isNextScene','Game_Battler_regenerateAll','drawItemImageSvActor','commandFormation','changeMaxBattleMembers','isOkEnabled','Scene_Battle_isAnyInputWindowActive','makeActionOrders','battlePartyChangeIcon','Game_Party_addActor','isSceneMap','_inputting','followers','addRemoveCommand','drawItemImageSprite','postPartySwitchMenuTurnBased','cursorVisible','bitmap','1oDeLnR','isShowPartySwitchOutAnimation','#%1','ReserveSpriteOffsetX','PartySystem','index','ARRAYJSON','_statusPartyWindow','trim','statusLabelRect','addText','ReservePartyWindowBgType','placeBasicGauges','drawIcon','_activePartyWindow','isAlive','BattleHelpSwitch','close','partyChangeRefresh','playCursorSound','drawSvActor','AssistSort','_partyLocked','setBattler','removeActorFromBattleMembers','Window_ActorCommand_updateHelp','defaultMaxBattleMembers','Vocab','drawDarkRect','_tpbState','processDrawItem','isSceneBattle','130021DEHZRA','exit','reserveParty','BgFilename2','isCTB','members','_currentActor','createAllWindows','refreshOG','createPartyCommandWindowBattleCore','initPartySystem','dimColor1','onReserveCancel','addActor','Game_Party_swapOrder','ceil','createReservePartyLabel','Game_Unit_inBattle','battleMembers','addActorToBattleMembers','isImmediateTpb','drawText','setBattlePartySwitchCooldown','itemLineRect','createBackground','quickSwap','ActiveSpriteOffsetX','startSwitchInAnimation','CoreEngine','call','_subject','onActiveOk','clearTpbChargeTime','General','lineHeight','nameStartPosition','faceHeight','emptyPartyMember','innerHeight','actor','drawActorCharacter','drawActorName','itemHeight','VisuMZ_2_BattleSystemBTB','_pageupButton','battlePartySwitchCooldown','format','isRequiredInParty','buttonAssistText3','textColor','isFormationChangeOk','allMembers','VisuMZ_1_MainMenuCore','currentActor','sortActionOrdersBTB','formation','_statusWindow','1052683Iwvihs','processPartySwitchMember','startMove','RequirePartyMembers','actorId','drawActorClass','initEquips','_partyMemberSwitchWindow','ReservePartyWindowRect','systemColor','uiMenuStyle','1246NyBqqX','_callPartyMemberSwitch','inBattle','itemRect','statusWindowRect','StatusWindowDraw','playOkSound','_callSceneParty','createStatusLabel','characterName','min','paramValueByName','ReserveItemThickness','hasBattleSystemIncompatibilities','644965UCxRsy','push','bind','DisplayedParams','AssistSwapPosition','BattleManager_setup','initBattleMembers','Game_Party_setupStartingMembers','RequireIcon','checkInitBattleMembers','isAppeared','ConvertParams','_partySystemSwitchOut','tpbImmediateAction','adjustSprite','cancel','\x5cI[%1]%2','LockIcon','buttonAssistText4','regenerateAll','gradientFillRect','registerCommand','drawItemStatus','ActiveBattlerOffsetY','isAutosaveEnabled','maxItems','Game_Party_setupBattleTest','_reservePartyWindow','getColor','startSwitchOutAnimation','_windowLayer','includes','reserveTransfer','createStatusWindow','_partySwitchDuration','isPartyCommandAdded','setActor','drawItemEmpty','direction','postPartySwitchMenuTpb','addActorToBattleMembersAtIndex','snapForBackground','Game_Actor_setup','initialize','iconWidth','Sprite_Actor_update','description','drawItem','ARRAYSTRUCT','isCurrentItemEnabled','status','increaseTurn','currentSymbol','setHandler','level','StatusLabelRect','isAnyInputWindowActive','VisuMZ_2_BattleSystemCTB','fillRect','drawActorSimpleStatus','isSTB','Scene_Battle_createPartyCommandWindowBattleCore','length','drawRemoveCommand','_actionBattlers','createReservePartyWindow','assistSwapInPartyMember','reserveMembers','ChangeMaxBattleMembers','return\x200','clearPartyBattleCommandCooldown','isSceneParty','40586sGckQW','equips','MovePartyIndexToReserve','_backSprite2','setupBattleTest','center','Game_Party_initialize','checkShiftSortShortcut','updateHelp','onPartySwitchOk','faceWidth','_rowThickness','isTriggered','_partyCommandWindow','1ibEcTx','skillItemWindowRectBorderStyle','setText','processShiftRemoveShortcut','JSON','resetFontSettings','setPartyLock','_statusPartyLabel','STR','face','Index','battler','isShiftRemoveShortcutEnabled','ARRAYFUNC','isFormationCommandEnabled','_activePartyLabel','addLoadListener','ActiveSpriteOffsetY','ARRAYEVAL','Lock','_scene','addFormationCommand','isActiveTpb','visible','_battleMaxSize','innerWidth','battlePartyChangeCmd','itemPadding','isActor','toUpperCase','partySwitchWindowRect','drawActorPartyIconsVert','createActorCommandWindow','parameters','height','max','refreshAllWindows','helpAreaHeight','partySwitchWindowRectBorder','_logWindow','loadSvActor','FUNC','3GtWnPV','removePartyMember','drawItemImage','initMaxBattleMembers','_battleMembers','concat'];const _0xc0df=function(_0x1448fa,_0x101d0a){_0x1448fa=_0x1448fa-0x1e2;let _0x1d36b1=_0x1d36[_0x1448fa];return _0x1d36b1;};const _0xc96ba8=_0xc0df;(function(_0x1441ea,_0x4902ee){const _0x4d2083=_0xc0df;while(!![]){try{const _0x33f48d=parseInt(_0x4d2083(0x2bc))*parseInt(_0x4d2083(0x2b3))+parseInt(_0x4d2083(0x21a))+-parseInt(_0x4d2083(0x225))*-parseInt(_0x4d2083(0x2e2))+parseInt(_0x4d2083(0x289))*parseInt(_0x4d2083(0x3d3))+parseInt(_0x4d2083(0x233))+-parseInt(_0x4d2083(0x27b))*parseInt(_0x4d2083(0x3b3))+-parseInt(_0x4d2083(0x381));if(_0x33f48d===_0x4902ee)break;else _0x1441ea['push'](_0x1441ea['shift']());}catch(_0x5cea6d){_0x1441ea['push'](_0x1441ea['shift']());}}}(_0x1d36,0x95764));var label=_0xc96ba8(0x3b7),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x49e9be){const _0x3d570f=_0xc96ba8;return _0x49e9be[_0x3d570f(0x265)]&&_0x49e9be['description'][_0x3d570f(0x252)]('['+label+']');})[0x0];VisuMZ[label][_0xc96ba8(0x334)]=VisuMZ[label][_0xc96ba8(0x334)]||{},VisuMZ[_0xc96ba8(0x23e)]=function(_0x10d4ec,_0x16d287){const _0x6dd824=_0xc96ba8;for(const _0x444769 in _0x16d287){if(_0x444769[_0x6dd824(0x300)](/(.*):(.*)/i)){const _0x1191f6=String(RegExp['$1']),_0x4e945e=String(RegExp['$2'])[_0x6dd824(0x2a6)]()[_0x6dd824(0x3bb)]();let _0x3d547c,_0x251847,_0x487f8f;switch(_0x4e945e){case'NUM':_0x3d547c=_0x16d287[_0x444769]!==''?Number(_0x16d287[_0x444769]):0x0;break;case'ARRAYNUM':_0x251847=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):[],_0x3d547c=_0x251847[_0x6dd824(0x38c)](_0x1460c2=>Number(_0x1460c2));break;case _0x6dd824(0x30d):_0x3d547c=_0x16d287[_0x444769]!==''?eval(_0x16d287[_0x444769]):null;break;case _0x6dd824(0x29b):_0x251847=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):[],_0x3d547c=_0x251847[_0x6dd824(0x38c)](_0x573e22=>eval(_0x573e22));break;case _0x6dd824(0x28d):_0x3d547c=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):'';break;case _0x6dd824(0x3b9):_0x251847=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):[],_0x3d547c=_0x251847['map'](_0x16110e=>JSON['parse'](_0x16110e));break;case _0x6dd824(0x2b2):_0x3d547c=_0x16d287[_0x444769]!==''?new Function(JSON[_0x6dd824(0x357)](_0x16d287[_0x444769])):new Function(_0x6dd824(0x278));break;case _0x6dd824(0x296):_0x251847=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):[],_0x3d547c=_0x251847[_0x6dd824(0x38c)](_0x517630=>new Function(JSON[_0x6dd824(0x357)](_0x517630)));break;case _0x6dd824(0x291):_0x3d547c=_0x16d287[_0x444769]!==''?String(_0x16d287[_0x444769]):'';break;case _0x6dd824(0x32a):_0x251847=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):[],_0x3d547c=_0x251847[_0x6dd824(0x38c)](_0x5dc123=>String(_0x5dc123));break;case _0x6dd824(0x38a):_0x487f8f=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):{},_0x3d547c=VisuMZ['ConvertParams']({},_0x487f8f);break;case _0x6dd824(0x263):_0x251847=_0x16d287[_0x444769]!==''?JSON[_0x6dd824(0x357)](_0x16d287[_0x444769]):[],_0x3d547c=_0x251847[_0x6dd824(0x38c)](_0x313f6b=>VisuMZ[_0x6dd824(0x23e)]({},JSON[_0x6dd824(0x357)](_0x313f6b)));break;default:continue;}_0x10d4ec[_0x1191f6]=_0x3d547c;}}return _0x10d4ec;},(_0x2cb175=>{const _0x3baa15=_0xc96ba8,_0xa06862=_0x2cb175[_0x3baa15(0x31d)];for(const _0xcbbbe3 of dependencies){if(!Imported[_0xcbbbe3]){alert(_0x3baa15(0x30e)[_0x3baa15(0x20f)](_0xa06862,_0xcbbbe3)),SceneManager[_0x3baa15(0x1e2)]();break;}}const _0x379f5a=_0x2cb175[_0x3baa15(0x261)];if(_0x379f5a[_0x3baa15(0x300)](/\[Version[ ](.*?)\]/i)){const _0x1bedc0=Number(RegExp['$1']);_0x1bedc0!==VisuMZ[label][_0x3baa15(0x328)]&&(alert(_0x3baa15(0x365)[_0x3baa15(0x20f)](_0xa06862,_0x1bedc0)),SceneManager[_0x3baa15(0x1e2)]());}if(_0x379f5a['match'](/\[Tier[ ](\d+)\]/i)){const _0x259757=Number(RegExp['$1']);_0x259757<tier?(alert(_0x3baa15(0x34d)[_0x3baa15(0x20f)](_0xa06862,_0x259757,tier)),SceneManager['exit']()):tier=Math[_0x3baa15(0x2ac)](_0x259757,tier);}VisuMZ[_0x3baa15(0x23e)](VisuMZ[label][_0x3baa15(0x334)],_0x2cb175[_0x3baa15(0x2aa)]);})(pluginData),PluginManager[_0xc96ba8(0x248)](pluginData[_0xc96ba8(0x31d)],'CallPartyScene',_0x3381b2=>{const _0x163161=_0xc96ba8;SceneManager[_0x163161(0x234)](Scene_Party);}),PluginManager[_0xc96ba8(0x248)](pluginData[_0xc96ba8(0x31d)],_0xc96ba8(0x277),_0x24a30e=>{const _0x407d61=_0xc96ba8;if($gameParty[_0x407d61(0x227)]())return;VisuMZ[_0x407d61(0x23e)](_0x24a30e,_0x24a30e);const _0x53bffd=_0x24a30e['Value'];$gameParty[_0x407d61(0x3a5)](_0x53bffd);}),PluginManager[_0xc96ba8(0x248)](pluginData[_0xc96ba8(0x31d)],'MoveActorsToActive',_0x1fa054=>{const _0x58e317=_0xc96ba8;if(!SceneManager[_0x58e317(0x3ab)]())return;VisuMZ['ConvertParams'](_0x1fa054,_0x1fa054);const _0x2344c0=_0x1fa054['Actors'];for(const _0x5b036f of _0x2344c0){$gameParty['addActorToBattleMembers'](_0x5b036f);}$gamePlayer[_0x58e317(0x31a)]();}),PluginManager[_0xc96ba8(0x248)](pluginData[_0xc96ba8(0x31d)],'MoveActorsToReserve',_0x7139dd=>{const _0x42bd9d=_0xc96ba8;if(!SceneManager[_0x42bd9d(0x3ab)]())return;VisuMZ[_0x42bd9d(0x23e)](_0x7139dd,_0x7139dd);const _0x1026a4=_0x7139dd[_0x42bd9d(0x2da)];for(const _0x11c40e of _0x1026a4){if($gameParty[_0x42bd9d(0x1f3)]()[_0x42bd9d(0x271)]<=0x1)break;$gameParty[_0x42bd9d(0x3cb)](_0x11c40e);}$gamePlayer['refresh']();}),PluginManager[_0xc96ba8(0x248)](pluginData['name'],_0xc96ba8(0x27d),_0x50df10=>{const _0x35d86b=_0xc96ba8;if(!SceneManager[_0x35d86b(0x3ab)]())return;if($gameParty[_0x35d86b(0x1f3)]()[_0x35d86b(0x271)]<=0x1)return;if(!$gameParty[_0x35d86b(0x2b7)])return;if($gameParty[_0x35d86b(0x2b7)]['length']<=0x0)return;VisuMZ[_0x35d86b(0x23e)](_0x50df10,_0x50df10);const _0x4fde63=_0x50df10[_0x35d86b(0x293)],_0x144dd9=$gameParty[_0x35d86b(0x2b7)][_0x4fde63];$gameParty['removeActorFromBattleMembers'](_0x144dd9),$gamePlayer[_0x35d86b(0x31a)]();}),PluginManager[_0xc96ba8(0x248)](pluginData[_0xc96ba8(0x31d)],_0xc96ba8(0x37c),_0x451a5d=>{const _0x4f4f0c=_0xc96ba8;if(!SceneManager[_0x4f4f0c(0x3ab)]())return;if($gameParty[_0x4f4f0c(0x1f3)]()[_0x4f4f0c(0x271)]>=$gameParty[_0x4f4f0c(0x2cd)]())return;if($gameParty[_0x4f4f0c(0x276)]()['length']<=0x0)return;const _0x327a28=$gameParty['reserveMembers'](),_0x1cab43=_0x327a28[Math['floor'](Math[_0x4f4f0c(0x35a)]()*_0x327a28['length'])],_0x180930=_0x1cab43['actorId']();$gameParty[_0x4f4f0c(0x1f4)](_0x180930),$gamePlayer[_0x4f4f0c(0x31a)]();}),PluginManager[_0xc96ba8(0x248)](pluginData[_0xc96ba8(0x31d)],_0xc96ba8(0x35b),_0x2b230b=>{const _0x1f78d1=_0xc96ba8;VisuMZ[_0x1f78d1(0x23e)](_0x2b230b,_0x2b230b);const _0x1ca38e=_0x2b230b[_0x1f78d1(0x2da)][_0x1f78d1(0x38c)](_0x243e1a=>$gameActors[_0x1f78d1(0x208)](_0x243e1a))[_0x1f78d1(0x2ca)](null),_0x42484c=_0x2b230b[_0x1f78d1(0x29c)];for(const _0x321553 of _0x1ca38e){if(!_0x321553)continue;_0x321553[_0x1f78d1(0x28f)](_0x42484c);}}),PluginManager['registerCommand'](pluginData['name'],_0xc96ba8(0x21d),_0x1a6e64=>{const _0x118b47=_0xc96ba8;VisuMZ[_0x118b47(0x23e)](_0x1a6e64,_0x1a6e64);const _0x374bdb=_0x1a6e64[_0x118b47(0x2da)][_0x118b47(0x38c)](_0x37c50f=>$gameActors[_0x118b47(0x208)](_0x37c50f))[_0x118b47(0x2ca)](null),_0x54a279=_0x1a6e64[_0x118b47(0x335)];for(const _0x249eeb of _0x374bdb){if(!_0x249eeb)continue;_0x249eeb['setPartyRequirement'](_0x54a279);}}),ImageManager['lockPartyMemberIcon']=VisuMZ['PartySystem'][_0xc96ba8(0x334)][_0xc96ba8(0x202)][_0xc96ba8(0x244)],ImageManager[_0xc96ba8(0x315)]=VisuMZ[_0xc96ba8(0x3b7)]['Settings'][_0xc96ba8(0x202)][_0xc96ba8(0x23b)],TextManager[_0xc96ba8(0x38d)]=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)]['Vocab']['ActiveParty'],TextManager[_0xc96ba8(0x1e3)]=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)]['Vocab']['ReserveParty'],TextManager['statusParty']=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x363)],TextManager[_0xc96ba8(0x206)]=VisuMZ['PartySystem'][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x2c6)],TextManager['removePartyMember']=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)]['Vocab']['Remove'],TextManager[_0xc96ba8(0x396)]=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x237)],TextManager[_0xc96ba8(0x2d3)]=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x37d)],TextManager[_0xc96ba8(0x2ff)]=VisuMZ['PartySystem'][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x3c8)],TextManager['assistSwapInPartyMember']=VisuMZ[_0xc96ba8(0x3b7)]['Settings'][_0xc96ba8(0x3ce)]['AssistSwapIn'],TextManager[_0xc96ba8(0x2e4)]=VisuMZ['PartySystem'][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x311)],ColorManager[_0xc96ba8(0x24f)]=function(_0x305a58){const _0x2f6f1b=_0xc96ba8;return _0x305a58=String(_0x305a58),_0x305a58[_0x2f6f1b(0x300)](/#(.*)/i)?_0x2f6f1b(0x3b5)['format'](String(RegExp['$1'])):this[_0x2f6f1b(0x212)](Number(_0x305a58));},SceneManager[_0xc96ba8(0x27a)]=function(){return this['_scene']&&this['_scene']['constructor']===Scene_Party;},SceneManager[_0xc96ba8(0x3ab)]=function(){const _0x983db5=_0xc96ba8;return this[_0x983db5(0x29d)]&&this['_scene'][_0x983db5(0x2c4)]===Scene_Map;},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x238)]=BattleManager[_0xc96ba8(0x3a0)],BattleManager[_0xc96ba8(0x3a0)]=function(_0x26fcb5,_0x1e64aa,_0x470db0){const _0x2238e5=_0xc96ba8;VisuMZ[_0x2238e5(0x3b7)]['BattleManager_setup'][_0x2238e5(0x1fe)](this,_0x26fcb5,_0x1e64aa,_0x470db0),$gameParty['clearPartyBattleCommandCooldown']();},VisuMZ['PartySystem'][_0xc96ba8(0x2db)]=Game_Battler['prototype'][_0xc96ba8(0x39a)],Game_Battler['prototype'][_0xc96ba8(0x39a)]=function(_0x56b556){const _0x13e0bd=_0xc96ba8;VisuMZ[_0x13e0bd(0x3b7)][_0x13e0bd(0x2db)]['call'](this,_0x56b556);if(this[_0x13e0bd(0x2a5)]())this['clearPartySwitchCommandCooldown']();},VisuMZ[_0xc96ba8(0x3b7)]['Game_Battler_regenerateAll']=Game_Battler['prototype'][_0xc96ba8(0x246)],Game_Battler[_0xc96ba8(0x2e0)][_0xc96ba8(0x246)]=function(){const _0x4cb5ef=_0xc96ba8;VisuMZ[_0x4cb5ef(0x3b7)][_0x4cb5ef(0x3a2)][_0x4cb5ef(0x1fe)](this);if(this[_0x4cb5ef(0x2a5)]())this[_0x4cb5ef(0x36c)]();},VisuMZ['PartySystem'][_0xc96ba8(0x25d)]=Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x3a0)],Game_Actor[_0xc96ba8(0x2e0)]['setup']=function(_0x1e6cf4){const _0x5cf36a=_0xc96ba8;VisuMZ[_0x5cf36a(0x3b7)]['Game_Actor_setup'][_0x5cf36a(0x1fe)](this,_0x1e6cf4),this['initPartySystem'](),this['clearPartySwitchCommandCooldown']();},Game_Actor[_0xc96ba8(0x2e0)]['initPartySystem']=function(){const _0x356d9e=_0xc96ba8;this[_0x356d9e(0x3c9)]=![],this[_0x356d9e(0x36a)]=![];},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x213)]=function(){const _0x271b51=_0xc96ba8;if(this[_0x271b51(0x3c9)]===undefined)this[_0x271b51(0x1eb)]();return!this[_0x271b51(0x3c9)];},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x28f)]=function(_0x1dec98){const _0x581532=_0xc96ba8;if(this[_0x581532(0x3c9)]===undefined)this[_0x581532(0x1eb)]();this[_0x581532(0x3c9)]=_0x1dec98;},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x210)]=function(){const _0xc4f552=_0xc96ba8;if(this[_0xc4f552(0x36a)]===undefined)this[_0xc4f552(0x1eb)]();return this[_0xc4f552(0x36a)];},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x30a)]=function(_0x2f3616){const _0x5bd256=_0xc96ba8;if(this[_0x5bd256(0x36a)]===undefined)this[_0x5bd256(0x1eb)]();this[_0x5bd256(0x36a)]=_0x2f3616;},Game_Actor['prototype'][_0xc96ba8(0x321)]=function(){const _0x162e6a=_0xc96ba8;this[_0x162e6a(0x386)]=0x0;},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x34a)]=function(){const _0x133cc2=_0xc96ba8;if(this[_0x133cc2(0x386)]===undefined)this[_0x133cc2(0x321)]();if(!this[_0x133cc2(0x213)]())return![];if(this['isRequiredInParty']())return![];return this[_0x133cc2(0x386)]<=0x0;},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x20e)]=function(){const _0x274b30=_0xc96ba8;if(this[_0x274b30(0x386)]===undefined)this[_0x274b30(0x321)]();return this[_0x274b30(0x386)];},Game_Actor[_0xc96ba8(0x2e0)]['setBattlePartySwitchCooldown']=function(_0x540c0d){const _0x45577b=_0xc96ba8;if(this[_0x45577b(0x386)]===undefined)this[_0x45577b(0x321)]();this[_0x45577b(0x386)]=_0x540c0d||0x0;},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x2ef)]=function(){const _0x30d61b=_0xc96ba8;if(this[_0x30d61b(0x386)]===undefined)this[_0x30d61b(0x321)]();const _0x12dc1e=VisuMZ['PartySystem'][_0x30d61b(0x334)][_0x30d61b(0x202)][_0x30d61b(0x2f3)];this[_0x30d61b(0x1f7)](_0x12dc1e);},Game_Actor['prototype']['updateBattlePartySwitchCooldown']=function(){const _0x4afaa0=_0xc96ba8;if(this[_0x4afaa0(0x386)]===undefined)this['clearPartySwitchCommandCooldown']();this[_0x4afaa0(0x386)]--;},Game_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x394)]=function(_0x4a6b79){const _0x4e991b=_0xc96ba8;Imported[_0x4e991b(0x26c)]&&BattleManager[_0x4e991b(0x1e5)]()&&BattleManager[_0x4e991b(0x2f7)]();Imported[_0x4e991b(0x35f)]&&BattleManager[_0x4e991b(0x26f)]()&&(BattleManager['updateTurnOrderSTB'](),BattleManager['_subject']=this,BattleManager[_0x4e991b(0x1e7)]=this);if(Imported['VisuMZ_2_BattleSystemBTB']&&BattleManager['isBTB']()){BattleManager['_subject']=undefined,BattleManager[_0x4e991b(0x1e7)]=this;const _0x3b7358=BattleManager[_0x4e991b(0x273)]['indexOf'](_0x4a6b79);BattleManager['_actionBattlers'][_0x3b7358]=this,BattleManager[_0x4e991b(0x217)]();}Imported[_0x4e991b(0x388)]&&BattleManager['isFTB']()&&(BattleManager[_0x4e991b(0x1ff)]=this,BattleManager['_currentActor']=this);},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x1f2)]=Game_Unit[_0xc96ba8(0x2e0)][_0xc96ba8(0x227)],Game_Unit[_0xc96ba8(0x2e0)][_0xc96ba8(0x227)]=function(){const _0x41e3e9=_0xc96ba8;if(SceneManager[_0x41e3e9(0x27a)]())return![];return VisuMZ['PartySystem'][_0x41e3e9(0x1f2)]['call'](this);},Game_Party[_0xc96ba8(0x3cd)]=VisuMZ[_0xc96ba8(0x3b7)]['Settings'][_0xc96ba8(0x202)][_0xc96ba8(0x2ba)],VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x281)]=Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x25e)],Game_Party[_0xc96ba8(0x2e0)]['initialize']=function(){const _0x50f40b=_0xc96ba8;VisuMZ[_0x50f40b(0x3b7)][_0x50f40b(0x281)][_0x50f40b(0x1fe)](this),this[_0x50f40b(0x279)](),this[_0x50f40b(0x2b6)](),this['initBattleMembers']();},Game_Party[_0xc96ba8(0x2e0)]['clearPartyBattleCommandCooldown']=function(){const _0x260adb=_0xc96ba8;this[_0x260adb(0x397)]=0x0;},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x34a)]=function(){const _0x3353f3=_0xc96ba8;if(this[_0x3353f3(0x397)]===undefined)this['clearPartyBattleCommandCooldown']();return this[_0x3353f3(0x397)]<=0x0;},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x20e)]=function(){const _0x11b936=_0xc96ba8;if(this[_0x11b936(0x397)]===undefined)this[_0x11b936(0x279)]();return this[_0x11b936(0x397)];},Game_Party['prototype'][_0xc96ba8(0x1f7)]=function(_0x546783){const _0x3f4938=_0xc96ba8;if(this[_0x3f4938(0x397)]===undefined)this[_0x3f4938(0x279)]();this[_0x3f4938(0x397)]=_0x546783;},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2ef)]=function(){const _0x46c0ea=_0xc96ba8;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x46c0ea(0x279)]();this[_0x46c0ea(0x397)]=VisuMZ['PartySystem']['Settings']['General']['PartyCmdCooldown']||0x0;},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x36c)]=function(){const _0x48e317=_0xc96ba8;if(this['_partySystemBattleCommandCooldown']===undefined)this[_0x48e317(0x279)]();this[_0x48e317(0x397)]--;},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2b6)]=function(){const _0xcd2a23=_0xc96ba8;this[_0xcd2a23(0x2a1)]=0x0;},Game_Party['prototype']['changeMaxBattleMembers']=function(_0x152a66){const _0x460fd4=_0xc96ba8;this[_0x460fd4(0x2a1)]=_0x152a66,this[_0x460fd4(0x239)](!![]),$gamePlayer&&$gamePlayer[_0x460fd4(0x3ad)]()&&$gamePlayer[_0x460fd4(0x3ad)]()[_0x460fd4(0x3a5)]();},Game_Followers['prototype'][_0xc96ba8(0x3a5)]=function(){const _0x431a04=_0xc96ba8;if(!SceneManager[_0x431a04(0x3ab)]())return;this['setup']();const _0x8799a7=$gameMap['mapId'](),_0x414d49=$gamePlayer['x'],_0x4b9116=$gamePlayer['y'],_0x1f9bf3=$gamePlayer[_0x431a04(0x259)]();$gameTemp[_0x431a04(0x2d0)]=!![],$gamePlayer[_0x431a04(0x253)](_0x8799a7,_0x414d49,_0x4b9116,_0x1f9bf3,0x0),setTimeout(this['clearBypassAutoSave'][_0x431a04(0x235)](this),0x7d0);},Game_Followers[_0xc96ba8(0x2e0)]['clearBypassAutoSave']=function(){$gameTemp['_bypassAutoSavePartySystem']=![];},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x2dc)]=Scene_Base[_0xc96ba8(0x2e0)][_0xc96ba8(0x24b)],Scene_Base[_0xc96ba8(0x2e0)][_0xc96ba8(0x24b)]=function(){const _0x4d40af=_0xc96ba8;if($gameTemp[_0x4d40af(0x2d0)])return![];return VisuMZ['PartySystem'][_0x4d40af(0x2dc)][_0x4d40af(0x1fe)](this);},Game_Party[_0xc96ba8(0x2e0)]['maxBattleMembers']=function(){const _0x31dd81=_0xc96ba8;if(this['_battleMaxSize']===undefined)this[_0x31dd81(0x239)]();return this[_0x31dd81(0x2a1)]||Game_Party[_0x31dd81(0x3cd)];},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x23c)]=function(){const _0x1c0494=_0xc96ba8;if(this[_0x1c0494(0x2a1)]===undefined)this[_0x1c0494(0x239)]();if(!this['_battleMembers'])this[_0x1c0494(0x239)]();while(this[_0x1c0494(0x2b7)][_0x1c0494(0x271)]<this[_0x1c0494(0x2a1)]){this[_0x1c0494(0x2b7)][_0x1c0494(0x234)](0x0);}},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x239)]=function(_0x377bda){const _0x1b9346=_0xc96ba8;!_0x377bda&&(this[_0x1b9346(0x2a1)]=Game_Party['defaultMaxBattleMembers']);this[_0x1b9346(0x2b7)]=this[_0x1b9346(0x306)]['slice'](0x0,this[_0x1b9346(0x2a1)]);while(this[_0x1b9346(0x2b7)][_0x1b9346(0x271)]<this[_0x1b9346(0x2a1)]){this[_0x1b9346(0x2b7)]['push'](0x0);}if($gamePlayer)$gamePlayer[_0x1b9346(0x31a)]();},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x1f3)]=function(){const _0x3a62ae=_0xc96ba8;return this[_0x3a62ae(0x309)]()['filter'](_0x93efd4=>!!_0x93efd4);},Game_Party['prototype'][_0xc96ba8(0x309)]=function(){const _0x546d48=_0xc96ba8;this['checkInitBattleMembers']();const _0x28a115=this[_0x546d48(0x2b7)]['map'](_0x3429d7=>$gameActors[_0x546d48(0x208)](_0x3429d7));return SceneManager[_0x546d48(0x27a)]()?_0x28a115:_0x28a115[_0x546d48(0x31b)](_0x437689=>_0x437689&&_0x437689[_0x546d48(0x23d)]());},Game_Party[_0xc96ba8(0x2e0)]['reserveMembers']=function(){const _0x384cb8=_0xc96ba8,_0x55adb8=this[_0x384cb8(0x1f3)]();return this['allMembers']()[_0x384cb8(0x31b)](_0x1f1254=>!_0x55adb8[_0x384cb8(0x252)](_0x1f1254));},VisuMZ[_0xc96ba8(0x3b7)]['Game_Party_setupStartingMembers']=Game_Party[_0xc96ba8(0x2e0)]['setupStartingMembers'],Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c5)]=function(){const _0x5e83aa=_0xc96ba8;VisuMZ[_0x5e83aa(0x3b7)][_0x5e83aa(0x23a)][_0x5e83aa(0x1fe)](this),this[_0x5e83aa(0x239)]();},VisuMZ[_0xc96ba8(0x3b7)]['Game_Party_setupBattleTest']=Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x27f)],Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x27f)]=function(){const _0x73af0=_0xc96ba8;VisuMZ[_0x73af0(0x3b7)][_0x73af0(0x24d)]['call'](this),this['addNonBattleTestMembers']();},Game_Party['prototype'][_0xc96ba8(0x338)]=function(){const _0x6c5624=_0xc96ba8;this['_battleMaxSize']=Game_Party[_0x6c5624(0x3cd)],this[_0x6c5624(0x2b7)]=[],this[_0x6c5624(0x306)]=[];for(const _0x4eed67 of $dataSystem[_0x6c5624(0x323)]){const _0x32af46=$gameActors[_0x6c5624(0x208)](_0x4eed67[_0x6c5624(0x21e)]);if(!_0x32af46)continue;_0x32af46['changeLevel'](_0x4eed67[_0x6c5624(0x269)],![]),_0x32af46[_0x6c5624(0x220)](_0x4eed67[_0x6c5624(0x27c)]),_0x32af46[_0x6c5624(0x360)](),this[_0x6c5624(0x2b7)][_0x6c5624(0x234)](_0x4eed67[_0x6c5624(0x21e)]),this[_0x6c5624(0x306)][_0x6c5624(0x234)](_0x4eed67[_0x6c5624(0x21e)]);}while(this[_0x6c5624(0x2b7)][_0x6c5624(0x271)]<this[_0x6c5624(0x2a1)]){this[_0x6c5624(0x2b7)][_0x6c5624(0x234)](0x0);}while(this[_0x6c5624(0x2b7)][_0x6c5624(0x271)]>this[_0x6c5624(0x2cd)]()){this[_0x6c5624(0x2b7)][_0x6c5624(0x2cc)]();}if($gamePlayer)$gamePlayer[_0x6c5624(0x31a)]();},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x376)]=function(){const _0x38a3dd=_0xc96ba8,_0x3297ce=this[_0x38a3dd(0x1f3)]();for(let _0x3f95a6=0x1;_0x3f95a6<$dataActors['length'];_0x3f95a6++){const _0x4692c5=$gameActors[_0x38a3dd(0x208)](_0x3f95a6);if(!_0x4692c5)continue;if(_0x4692c5[_0x38a3dd(0x31d)]()['length']<=0x0)continue;if(_0x4692c5['name']()[_0x38a3dd(0x300)](/-----/i))continue;if(_0x3297ce['includes'](_0x4692c5))continue;this[_0x38a3dd(0x306)][_0x38a3dd(0x234)](_0x4692c5['actorId']());}},VisuMZ['PartySystem'][_0xc96ba8(0x3aa)]=Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x1ee)],Game_Party[_0xc96ba8(0x2e0)]['addActor']=function(_0x4f0e8f){const _0x465864=_0xc96ba8;VisuMZ[_0x465864(0x3b7)]['Game_Party_addActor'][_0x465864(0x1fe)](this,_0x4f0e8f),this[_0x465864(0x1f4)](_0x4f0e8f);},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x1f4)]=function(_0x354597){const _0x31377a=_0xc96ba8;this[_0x31377a(0x23c)]();if(this[_0x31377a(0x2b7)][_0x31377a(0x252)](_0x354597))return;if(!this[_0x31377a(0x306)][_0x31377a(0x252)](_0x354597))return;if(!this[_0x31377a(0x2b7)][_0x31377a(0x252)](0x0))return;const _0x3f0cbc=$gameActors[_0x31377a(0x208)](_0x354597);if(!_0x3f0cbc)return;const _0x4219f3=this[_0x31377a(0x2b7)][_0x31377a(0x370)](0x0);if(_0x4219f3<0x0)return;this[_0x31377a(0x2b7)][_0x4219f3]=_0x354597,_0x3f0cbc[_0x31377a(0x2e9)](),this[_0x31377a(0x3c5)]();},Game_Party['prototype'][_0xc96ba8(0x25b)]=function(_0x9faa60,_0x44c03a){const _0x28001c=_0xc96ba8;this[_0x28001c(0x23c)]();if(this[_0x28001c(0x2b7)][_0x28001c(0x252)](_0x9faa60))return;if(!this[_0x28001c(0x2b7)][_0x28001c(0x252)](0x0))return;const _0xc1dd80=$gameActors['actor'](_0x9faa60);if(!_0xc1dd80)return;this['_battleMembers'][_0x44c03a]=_0x9faa60,_0xc1dd80[_0x28001c(0x2e9)](),this[_0x28001c(0x3c5)]();},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x36f)]=Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x34b)],Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x34b)]=function(_0x2cd7f6){const _0x516d24=_0xc96ba8;this[_0x516d24(0x3cb)](_0x2cd7f6),VisuMZ[_0x516d24(0x3b7)][_0x516d24(0x36f)]['call'](this,_0x2cd7f6);},Game_Party['prototype'][_0xc96ba8(0x3cb)]=function(_0x49fb44){const _0x1bdce9=_0xc96ba8;this[_0x1bdce9(0x23c)]();if(!this[_0x1bdce9(0x2b7)]['includes'](_0x49fb44))return;if(_0x49fb44<=0x0)return;const _0x4e3cb5=this['_battleMembers'][_0x1bdce9(0x370)](_0x49fb44);this['_battleMembers'][_0x4e3cb5]=0x0,this[_0x1bdce9(0x306)][_0x1bdce9(0x2ca)](_0x49fb44),this['_actors'][_0x1bdce9(0x234)](_0x49fb44),this['partyChangeRefresh']();},Game_Party[_0xc96ba8(0x2e0)]['partyChangeRefresh']=function(){const _0x55da71=_0xc96ba8;this['rearrangePartyActors'](),$gamePlayer[_0x55da71(0x31a)](),$gameMap['requestRefresh']();},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x35c)]=function(){const _0x3cd05b=_0xc96ba8;this['checkInitBattleMembers']();const _0x17643d=this['battleMembers']()[_0x3cd05b(0x2b8)](this[_0x3cd05b(0x276)]());this[_0x3cd05b(0x306)]=_0x17643d[_0x3cd05b(0x38c)](_0x3c8530=>_0x3c8530?_0x3c8530[_0x3cd05b(0x21e)]():0x0)[_0x3cd05b(0x2ca)](0x0);},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2f0)]=function(){const _0x3980d5=_0xc96ba8;this['_actors'][_0x3980d5(0x34e)]((_0x193f96,_0xc999dd)=>_0x193f96-_0xc999dd),this[_0x3980d5(0x35c)](),this[_0x3980d5(0x3c5)]();},Game_Party[_0xc96ba8(0x2e0)]['anyRequiredPartyMembersInReserve']=function(){const _0x574576=_0xc96ba8;for(const _0x3796c8 of this[_0x574576(0x276)]()){if(!_0x3796c8)continue;if(_0x3796c8[_0x574576(0x210)]())return!![];}return![];},VisuMZ['PartySystem'][_0xc96ba8(0x1ef)]=Game_Party['prototype'][_0xc96ba8(0x318)],Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x318)]=function(_0x29034c,_0x35a171){const _0x563854=_0xc96ba8;VisuMZ[_0x563854(0x3b7)][_0x563854(0x1ef)][_0x563854(0x1fe)](this,_0x29034c,_0x35a171),this[_0x563854(0x322)](_0x29034c,_0x35a171);},Game_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x322)]=function(_0x5461e7,_0xa0afb8){const _0x50623e=_0xc96ba8;this[_0x50623e(0x2b7)]=[];for(let _0x27d033=0x0;_0x27d033<this['_actors'][_0x50623e(0x271)];_0x27d033++){if(this[_0x50623e(0x2b7)]['length']>=this[_0x50623e(0x2cd)]())break;this[_0x50623e(0x2b7)][_0x27d033]=this[_0x50623e(0x306)][_0x27d033];}$gamePlayer[_0x50623e(0x31a)]();},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x2d5)]=Game_Troop[_0xc96ba8(0x2e0)][_0xc96ba8(0x266)],Game_Troop['prototype'][_0xc96ba8(0x266)]=function(){const _0x47a5db=_0xc96ba8;VisuMZ[_0x47a5db(0x3b7)][_0x47a5db(0x2d5)]['call'](this),$gameParty['updateBattlePartySwitchCooldown']();},Scene_Menu[_0xc96ba8(0x2e0)][_0xc96ba8(0x3a4)]=function(){SceneManager['push'](Scene_Party);};function Scene_Party(){const _0x42d67a=_0xc96ba8;this[_0x42d67a(0x25e)](...arguments);}Scene_Party['prototype']=Object[_0xc96ba8(0x353)](Scene_MenuBase[_0xc96ba8(0x2e0)]),Scene_Party['prototype'][_0xc96ba8(0x2c4)]=Scene_Party,Scene_Party['prototype'][_0xc96ba8(0x25e)]=function(){const _0x3543d7=_0xc96ba8;this[_0x3543d7(0x2c1)](),Scene_MenuBase[_0x3543d7(0x2e0)][_0x3543d7(0x25e)]['call'](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x32b)]=function(){const _0x55c2e3=_0xc96ba8;if(ConfigManager[_0x55c2e3(0x224)]&&ConfigManager['uiInputPosition']!==undefined)return ConfigManager[_0x55c2e3(0x2d8)];else return ConfigManager[_0x55c2e3(0x224)]===![]?![]:Scene_MenuBase['prototype'][_0x55c2e3(0x32b)][_0x55c2e3(0x1fe)](this);},Scene_Party['prototype'][_0xc96ba8(0x2ae)]=function(){return 0x0;},Scene_Party[_0xc96ba8(0x2e0)]['needsPageButtons']=function(){return!![];},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x34f)]=function(){const _0x5abf9d=_0xc96ba8;Scene_MenuBase[_0x5abf9d(0x2e0)][_0x5abf9d(0x34f)][_0x5abf9d(0x1fe)](this),this[_0x5abf9d(0x20d)][_0x5abf9d(0x2f9)]=undefined,this[_0x5abf9d(0x305)][_0x5abf9d(0x2f9)]=undefined;},Scene_Party['prototype'][_0xc96ba8(0x2c1)]=function(){const _0x1c0162=_0xc96ba8;for(const _0x252d04 of $gameParty[_0x1c0162(0x1e6)]()){ImageManager[_0x1c0162(0x380)](_0x252d04[_0x1c0162(0x37a)]()),ImageManager['loadCharacter'](_0x252d04[_0x1c0162(0x22e)]()),ImageManager[_0x1c0162(0x2b1)](_0x252d04[_0x1c0162(0x2ec)]());}},Scene_Party[_0xc96ba8(0x2e0)]['create']=function(){const _0x5b0b4f=_0xc96ba8;Scene_MenuBase[_0x5b0b4f(0x2e0)][_0x5b0b4f(0x353)][_0x5b0b4f(0x1fe)](this),this[_0x5b0b4f(0x359)](),this[_0x5b0b4f(0x2e6)](),this['createReservePartyLabel'](),this[_0x5b0b4f(0x274)](),this[_0x5b0b4f(0x22d)](),this[_0x5b0b4f(0x254)]();},Scene_Party['prototype'][_0xc96ba8(0x359)]=function(){const _0x31668=_0xc96ba8,_0x1da23b=this[_0x31668(0x317)]();this[_0x31668(0x298)]=new Window_PartyLabel(_0x1da23b,TextManager[_0x31668(0x38d)]),this[_0x31668(0x298)][_0x31668(0x320)](VisuMZ[_0x31668(0x3b7)][_0x31668(0x334)][_0x31668(0x34c)]['ActivePartyLabelBgType']),this['addWindow'](this[_0x31668(0x298)]);},Scene_Party['prototype'][_0xc96ba8(0x317)]=function(){const _0x30bc74=_0xc96ba8;return VisuMZ[_0x30bc74(0x3b7)][_0x30bc74(0x334)][_0x30bc74(0x34c)][_0x30bc74(0x2fb)][_0x30bc74(0x1fe)](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2e6)]=function(){const _0x3f7457=_0xc96ba8,_0x2aeea3=this[_0x3f7457(0x395)]();this[_0x3f7457(0x3c1)]=new Window_PartyActive(_0x2aeea3),this[_0x3f7457(0x3c1)]['setBackgroundType'](VisuMZ[_0x3f7457(0x3b7)][_0x3f7457(0x334)][_0x3f7457(0x34c)][_0x3f7457(0x2cb)]),this[_0x3f7457(0x3c1)][_0x3f7457(0x268)]('ok',this[_0x3f7457(0x200)][_0x3f7457(0x235)](this)),this[_0x3f7457(0x3c1)][_0x3f7457(0x268)]('cancel',this[_0x3f7457(0x303)]['bind'](this)),this[_0x3f7457(0x2de)](this['_activePartyWindow']);},Scene_Party['prototype'][_0xc96ba8(0x395)]=function(){const _0xbb3f6f=_0xc96ba8;return VisuMZ[_0xbb3f6f(0x3b7)][_0xbb3f6f(0x334)][_0xbb3f6f(0x34c)][_0xbb3f6f(0x389)][_0xbb3f6f(0x1fe)](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x200)]=function(){const _0x19e74f=_0xc96ba8;this[_0x19e74f(0x24e)][_0x19e74f(0x39c)](),this[_0x19e74f(0x24e)]['reselect']();},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x1f1)]=function(){const _0x24e9ef=_0xc96ba8,_0x3505ca=this[_0x24e9ef(0x2bf)]();this[_0x24e9ef(0x372)]=new Window_PartyLabel(_0x3505ca,TextManager[_0x24e9ef(0x1e3)]),this[_0x24e9ef(0x372)][_0x24e9ef(0x320)](VisuMZ[_0x24e9ef(0x3b7)]['Settings'][_0x24e9ef(0x34c)][_0x24e9ef(0x2e1)]),this[_0x24e9ef(0x2de)](this[_0x24e9ef(0x372)]);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2bf)]=function(){const _0x2471c2=_0xc96ba8;return VisuMZ[_0x2471c2(0x3b7)][_0x2471c2(0x334)][_0x2471c2(0x34c)]['ReservePartyLabelRect']['call'](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x274)]=function(){const _0x505876=_0xc96ba8,_0xb2b9f=this[_0x505876(0x399)]();this['_reservePartyWindow']=new Window_PartyReserve(_0xb2b9f),this[_0x505876(0x24e)][_0x505876(0x320)](VisuMZ[_0x505876(0x3b7)][_0x505876(0x334)]['Window'][_0x505876(0x3be)]),this[_0x505876(0x24e)]['setHandler']('ok',this['onReserveOk']['bind'](this)),this[_0x505876(0x24e)][_0x505876(0x268)](_0x505876(0x242),this[_0x505876(0x1ed)][_0x505876(0x235)](this)),this[_0x505876(0x2de)](this['_reservePartyWindow']);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x399)]=function(){const _0x53fc8f=_0xc96ba8;return VisuMZ[_0x53fc8f(0x3b7)][_0x53fc8f(0x334)][_0x53fc8f(0x34c)][_0x53fc8f(0x222)][_0x53fc8f(0x1fe)](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x36e)]=function(){const _0x1022c9=_0xc96ba8,_0x2b0211=this[_0x1022c9(0x24e)][_0x1022c9(0x33a)](),_0x5817ca=this[_0x1022c9(0x3c1)][_0x1022c9(0x216)]();if(_0x2b0211<0x0){if(_0x5817ca)$gameParty[_0x1022c9(0x3cb)](_0x5817ca[_0x1022c9(0x21e)]());}else{const _0x4e68f1=this['_reservePartyWindow'][_0x1022c9(0x216)]()['actorId'](),_0x447c68=this['_activePartyWindow'][_0x1022c9(0x3b8)]();if(_0x5817ca)$gameParty['removeActorFromBattleMembers'](_0x5817ca[_0x1022c9(0x21e)]());$gameParty[_0x1022c9(0x25b)](_0x4e68f1,_0x447c68);}this['refreshAllWindows'](),this[_0x1022c9(0x1ed)]();},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2ad)]=function(){const _0x199e7b=_0xc96ba8;this['_activePartyWindow'][_0x199e7b(0x31a)](),this[_0x199e7b(0x24e)][_0x199e7b(0x31a)]();},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x1ed)]=function(){const _0x28bef3=_0xc96ba8;this[_0x28bef3(0x24e)][_0x28bef3(0x326)](),this[_0x28bef3(0x24e)][_0x28bef3(0x2eb)](),this[_0x28bef3(0x3c1)][_0x28bef3(0x39c)]();},Scene_Party[_0xc96ba8(0x2e0)]['createStatusLabel']=function(){const _0x150216=_0xc96ba8,_0x1176a3=this[_0x150216(0x3bc)]();this[_0x150216(0x290)]=new Window_PartyLabel(_0x1176a3,TextManager[_0x150216(0x2c8)]),this['_statusPartyLabel']['setBackgroundType'](VisuMZ[_0x150216(0x3b7)][_0x150216(0x334)][_0x150216(0x34c)][_0x150216(0x382)]),this['addWindow'](this['_statusPartyLabel']);},Scene_Party['prototype'][_0xc96ba8(0x3bc)]=function(){const _0x40baaa=_0xc96ba8;return VisuMZ[_0x40baaa(0x3b7)]['Settings'][_0x40baaa(0x34c)][_0x40baaa(0x26a)][_0x40baaa(0x1fe)](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x254)]=function(){const _0x5905cb=_0xc96ba8,_0x190c18=this[_0x5905cb(0x229)]();this['_statusPartyWindow']=new Window_PartyStatus(_0x190c18),this[_0x5905cb(0x3ba)][_0x5905cb(0x320)](VisuMZ[_0x5905cb(0x3b7)][_0x5905cb(0x334)][_0x5905cb(0x34c)][_0x5905cb(0x33d)]),this[_0x5905cb(0x2de)](this[_0x5905cb(0x3ba)]),this['_reservePartyWindow'][_0x5905cb(0x2f8)](this[_0x5905cb(0x3ba)]),this[_0x5905cb(0x3c1)][_0x5905cb(0x2f8)](this[_0x5905cb(0x3ba)]);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x229)]=function(){const _0xbd2ea7=_0xc96ba8;return VisuMZ[_0xbd2ea7(0x3b7)]['Settings'][_0xbd2ea7(0x34c)]['StatusWindowRect'][_0xbd2ea7(0x1fe)](this);},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x383)]=function(){const _0x49b1e3=_0xc96ba8;return TextManager[_0x49b1e3(0x301)]('shift');},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x393)]=function(){return TextManager['assistSwapPositions'];},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x211)]=function(){const _0x42d7ae=_0xc96ba8,_0x17253c=this[_0x42d7ae(0x3c1)],_0x538e9f=this['_reservePartyWindow'];if(_0x17253c&&_0x17253c[_0x42d7ae(0x2ee)]&&_0x17253c[_0x42d7ae(0x216)]()&&_0x17253c['isShiftRemoveShortcutEnabled']())return TextManager['assistRemovePartyMember'];else return _0x538e9f&&_0x538e9f[_0x42d7ae(0x2ee)]&&$gameParty[_0x42d7ae(0x276)]()['length']>0x0?TextManager[_0x42d7ae(0x2ff)]:'';},Scene_Party['prototype'][_0xc96ba8(0x245)]=function(){const _0x9607ac=_0xc96ba8;if(this['_activePartyWindow']&&this[_0x9607ac(0x3c1)]['active'])return TextManager[_0x9607ac(0x2e4)];else return this[_0x9607ac(0x24e)]&&this['_reservePartyWindow']['active']?TextManager[_0x9607ac(0x275)]:Scene_MenuBase[_0x9607ac(0x2e0)][_0x9607ac(0x245)][_0x9607ac(0x1fe)](this);},Scene_Party['prototype'][_0xc96ba8(0x1f9)]=function(){const _0x37d0a7=_0xc96ba8;Scene_MenuBase[_0x37d0a7(0x2e0)][_0x37d0a7(0x1f9)][_0x37d0a7(0x1fe)](this),this[_0x37d0a7(0x352)](this['getBackgroundOpacity']()),this[_0x37d0a7(0x2d7)]();},Scene_Party[_0xc96ba8(0x2e0)][_0xc96ba8(0x2f2)]=function(){const _0x49bff6=_0xc96ba8;return VisuMZ[_0x49bff6(0x3b7)][_0x49bff6(0x334)][_0x49bff6(0x375)]['SnapshotOpacity'];},Scene_Party['prototype'][_0xc96ba8(0x2d7)]=function(){const _0x595ede=_0xc96ba8,_0x35d776={'BgFilename1':VisuMZ[_0x595ede(0x3b7)][_0x595ede(0x334)][_0x595ede(0x375)][_0x595ede(0x337)],'BgFilename2':VisuMZ['PartySystem'][_0x595ede(0x334)][_0x595ede(0x375)][_0x595ede(0x1e4)]};_0x35d776&&(_0x35d776[_0x595ede(0x337)]!==''||_0x35d776[_0x595ede(0x1e4)]!=='')&&(this[_0x595ede(0x343)]=new Sprite(ImageManager['loadTitle1'](_0x35d776[_0x595ede(0x337)])),this[_0x595ede(0x27e)]=new Sprite(ImageManager['loadTitle2'](_0x35d776[_0x595ede(0x1e4)])),this[_0x595ede(0x36b)](this[_0x595ede(0x343)]),this[_0x595ede(0x36b)](this[_0x595ede(0x27e)]),this[_0x595ede(0x343)][_0x595ede(0x3b2)][_0x595ede(0x299)](this[_0x595ede(0x241)][_0x595ede(0x235)](this,this[_0x595ede(0x343)])),this[_0x595ede(0x27e)][_0x595ede(0x3b2)][_0x595ede(0x299)](this['adjustSprite'][_0x595ede(0x235)](this,this[_0x595ede(0x27e)])));},Scene_Party['prototype'][_0xc96ba8(0x241)]=function(_0x4f2c6f){const _0x5a750b=_0xc96ba8;this['scaleSprite'](_0x4f2c6f),this[_0x5a750b(0x2d9)](_0x4f2c6f);},Scene_Party['prototype']['terminate']=function(){const _0x507ca0=_0xc96ba8;Scene_MenuBase[_0x507ca0(0x2e0)][_0x507ca0(0x2fe)]['call'](this),$gameParty['partyChangeRefresh']();},Window_StatusBase[_0xc96ba8(0x2e0)][_0xc96ba8(0x33b)]=function(_0x1540dc,_0x3989dc,_0x12df60,_0x3bc1b5){const _0x374ca4=_0xc96ba8;if(!_0x1540dc)return;_0x3bc1b5?this[_0x374ca4(0x2a8)](_0x1540dc,_0x3989dc,_0x12df60):this['drawActorPartyIconsHorz'](_0x1540dc,_0x3989dc,_0x12df60);},Window_StatusBase[_0xc96ba8(0x2e0)][_0xc96ba8(0x2fd)]=function(_0x57286e,_0x5a59bc,_0x4f505a){const _0x5e716a=_0xc96ba8;_0x4f505a+=Math['round']((this[_0x5e716a(0x203)]()-ImageManager[_0x5e716a(0x339)])/0x2),!_0x57286e[_0x5e716a(0x213)]()&&(this['drawIcon'](ImageManager[_0x5e716a(0x2ed)],_0x5a59bc,_0x4f505a),_0x5a59bc+=ImageManager[_0x5e716a(0x25f)]+0x4),_0x57286e[_0x5e716a(0x210)]()&&(this[_0x5e716a(0x3c0)](ImageManager['requiredPartyMemberIcon'],_0x5a59bc,_0x4f505a),_0x5a59bc+=ImageManager[_0x5e716a(0x25f)]+0x4);},Window_StatusBase[_0xc96ba8(0x2e0)][_0xc96ba8(0x2a8)]=function(_0x57b2db,_0x477374,_0x55b7d4){const _0x4c7fee=_0xc96ba8;let _0x3063bc=0x0;if(!_0x57b2db['isFormationChangeOk']())_0x3063bc+=0x1;if(_0x57b2db[_0x4c7fee(0x210)]())_0x3063bc+=0x1;if(_0x3063bc<=0x1)return this[_0x4c7fee(0x2fd)](_0x57b2db,_0x477374,_0x55b7d4);_0x55b7d4+=Math[_0x4c7fee(0x327)]((this[_0x4c7fee(0x203)]()-ImageManager[_0x4c7fee(0x339)])/0x2),_0x55b7d4-=Math[_0x4c7fee(0x327)](this['lineHeight']()/0x2),this['drawIcon'](ImageManager[_0x4c7fee(0x2ed)],_0x477374,_0x55b7d4),_0x55b7d4+=this[_0x4c7fee(0x203)](),this[_0x4c7fee(0x3c0)](ImageManager[_0x4c7fee(0x315)],_0x477374,_0x55b7d4);};function Window_PartyLabel(){const _0x4377df=_0xc96ba8;this[_0x4377df(0x25e)](...arguments);}Window_PartyLabel['prototype']=Object['create'](Window_Base['prototype']),Window_PartyLabel[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c4)]=Window_PartyLabel,Window_PartyLabel[_0xc96ba8(0x2e0)][_0xc96ba8(0x25e)]=function(_0x249d54,_0x3cf325){const _0x3bc1ec=_0xc96ba8;Window_Base[_0x3bc1ec(0x2e0)][_0x3bc1ec(0x25e)][_0x3bc1ec(0x1fe)](this,_0x249d54),this['setText'](_0x3cf325);},Window_PartyLabel[_0xc96ba8(0x2e0)][_0xc96ba8(0x366)]=function(){const _0x3eb429=_0xc96ba8;this[_0x3eb429(0x347)]=0x0;},Window_PartyLabel[_0xc96ba8(0x2e0)]['setText']=function(_0x49030a){const _0x36d6ca=_0xc96ba8;this[_0x36d6ca(0x2c2)][_0x36d6ca(0x35e)](),this[_0x36d6ca(0x1f6)](_0x49030a,0x0,0x0,this[_0x36d6ca(0x2a2)],_0x36d6ca(0x280));};function Window_PartyActive(){const _0x65941b=_0xc96ba8;this[_0x65941b(0x25e)](...arguments);}Window_PartyActive['prototype']=Object[_0xc96ba8(0x353)](Window_StatusBase['prototype']),Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c4)]=Window_PartyActive,Window_PartyActive['_actorGraphic']=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x34c)][_0xc96ba8(0x33e)],Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x25e)]=function(_0x3c8738){const _0x3284bc=_0xc96ba8;Window_StatusBase['prototype'][_0x3284bc(0x25e)][_0x3284bc(0x1fe)](this,_0x3c8738),this[_0x3284bc(0x31a)](),this['activate'](),this['smoothSelect'](0x0);},Window_PartyActive['prototype']['addRemoveCommand']=function(){const _0x2553d7=_0xc96ba8;return VisuMZ[_0x2553d7(0x3b7)][_0x2553d7(0x334)][_0x2553d7(0x202)][_0x2553d7(0x2bd)];},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x24c)]=function(){return $gameParty['maxBattleMembers']();},Window_PartyActive[_0xc96ba8(0x2e0)]['maxCols']=function(){const _0x14e21b=_0xc96ba8;return $gameParty[_0x14e21b(0x2cd)]();},Window_PartyActive[_0xc96ba8(0x2e0)]['itemHeight']=function(){const _0x4d7b56=_0xc96ba8;return this[_0x4d7b56(0x207)];},Window_PartyActive[_0xc96ba8(0x2e0)]['actor']=function(_0x556ff4){const _0x4b40b4=_0xc96ba8;return $gameParty[_0x4b40b4(0x309)]()[_0x556ff4];},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x216)]=function(){const _0x42bc5e=_0xc96ba8;return this[_0x42bc5e(0x208)](this[_0x42bc5e(0x3b8)]());},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x264)]=function(){const _0x15ef95=_0xc96ba8,_0x19cd0e=this[_0x15ef95(0x208)](this[_0x15ef95(0x3b8)]());return _0x19cd0e?_0x19cd0e[_0x15ef95(0x213)]():!![];},Window_PartyActive[_0xc96ba8(0x2e0)]['isCancelEnabled']=function(){const _0x235842=_0xc96ba8;if($gameParty['members']()[_0x235842(0x271)]<=0x0)return!![];if($gameParty[_0x235842(0x2c3)]())return![];return $gameParty[_0x235842(0x1f3)]()[_0x235842(0x271)]>0x0;},Window_PartyActive[_0xc96ba8(0x2e0)]['processCursorMove']=function(){const _0x5c742d=_0xc96ba8;Window_StatusBase[_0x5c742d(0x2e0)][_0x5c742d(0x308)][_0x5c742d(0x1fe)](this),this[_0x5c742d(0x2f4)]();},Window_PartyActive[_0xc96ba8(0x2e0)]['cursorDown']=function(_0x4fb979){const _0x254df5=_0xc96ba8;this[_0x254df5(0x3a6)]()&&this['processOk']();},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x2e5)]=function(){const _0x1e4ee3=_0xc96ba8,_0x349f9b=this[_0x1e4ee3(0x3b8)](),_0x3ed879=_0x349f9b+0x1>=this['maxItems']()?0x0:_0x349f9b+0x1;this['quickSwap'](_0x349f9b,_0x3ed879);},Window_PartyActive['prototype'][_0xc96ba8(0x336)]=function(){const _0x3a70ed=_0xc96ba8,_0x37c98c=this[_0x3a70ed(0x3b8)](),_0x537238=_0x37c98c-0x1<0x0?this['maxItems']()-0x1:_0x37c98c-0x1;this[_0x3a70ed(0x1fa)](_0x37c98c,_0x537238);},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x1fa)]=function(_0xb98dd,_0x33de65){const _0x341347=_0xc96ba8,_0x582764=this['actor'](_0xb98dd),_0x10c43f=this[_0x341347(0x208)](_0x33de65);if(_0x582764&&!_0x582764[_0x341347(0x213)]())return;if(_0x10c43f&&!_0x10c43f[_0x341347(0x213)]())return;const _0x3845ba=$gameParty[_0x341347(0x2b7)];_0x3845ba[_0xb98dd]=_0x10c43f?_0x10c43f[_0x341347(0x21e)]():0x0,_0x3845ba[_0x33de65]=_0x582764?_0x582764[_0x341347(0x21e)]():0x0,this['refresh'](),this[_0x341347(0x3c6)](),this[_0x341347(0x385)](_0x33de65);},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x2f4)]=function(){const _0x2cd8b5=_0xc96ba8;if(!this[_0x2cd8b5(0x295)]())return;if(Input[_0x2cd8b5(0x287)]('shift')){const _0x2606e1=this[_0x2cd8b5(0x216)]();this[_0x2cd8b5(0x28c)]();}},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x28c)]=function(){const _0x59f5ee=_0xc96ba8;SoundManager[_0x59f5ee(0x37f)]();const _0x16f961=this['currentActor']();$gameParty[_0x59f5ee(0x3cb)](_0x16f961[_0x59f5ee(0x21e)]()),this[_0x59f5ee(0x2c9)](),SceneManager[_0x59f5ee(0x29d)]['refreshAllWindows']();},Window_PartyActive['prototype'][_0xc96ba8(0x295)]=function(){const _0x16a97d=_0xc96ba8;if(!this[_0x16a97d(0x3ae)]())return![];const _0x197bcb=this[_0x16a97d(0x216)]();return this['active']&&_0x197bcb&&_0x197bcb['isFormationChangeOk']();},Window_PartyActive['prototype'][_0xc96ba8(0x262)]=function(_0x293945){const _0x27473c=_0xc96ba8,_0x4d7ce7=this['actor'](_0x293945);if(!_0x4d7ce7)return this[_0x27473c(0x258)](_0x293945);this['resetFontSettings']();const _0x58fd07=this[_0x27473c(0x228)](_0x293945);this[_0x27473c(0x2b5)](_0x293945);const _0x3df50a=_0x58fd07['y']+_0x58fd07['height']-this[_0x27473c(0x203)]();this['drawDarkRect'](_0x58fd07['x'],_0x3df50a,_0x58fd07[_0x27473c(0x373)],0x2),this[_0x27473c(0x33b)](_0x4d7ce7,_0x58fd07['x']+0x2,_0x58fd07['y']),this[_0x27473c(0x20a)](_0x4d7ce7,_0x58fd07['x'],_0x3df50a,_0x58fd07['width']);},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x258)]=function(_0x1b44b1){const _0x1acb31=_0xc96ba8;this[_0x1acb31(0x28e)]();const _0x597df5=this['itemRect'](_0x1b44b1);this['drawItemDarkRect'](_0x597df5['x'],_0x597df5['y'],_0x597df5[_0x1acb31(0x373)],_0x597df5['height']);const _0x208791=_0x597df5['y']+Math['round']((_0x597df5[_0x1acb31(0x2ab)]-this[_0x1acb31(0x203)]())/0x2);this[_0x1acb31(0x391)](ColorManager[_0x1acb31(0x223)]()),this[_0x1acb31(0x1f6)](TextManager['emptyPartyMember'],_0x597df5['x'],_0x208791,_0x597df5[_0x1acb31(0x373)],_0x1acb31(0x280));},Window_PartyActive[_0xc96ba8(0x2e0)]['drawItemDarkRect']=function(_0x548543,_0x228ad7,_0x16b5dc,_0x268c9c,_0x1bf35f){const _0x309687=_0xc96ba8;_0x1bf35f=Math[_0x309687(0x2ac)](_0x1bf35f||0x1,0x1);while(_0x1bf35f--){_0x268c9c=_0x268c9c||this['lineHeight'](),this[_0x309687(0x2c2)]['paintOpacity']=0xa0;const _0x248ec3=ColorManager[_0x309687(0x329)]();this[_0x309687(0x2c2)][_0x309687(0x26d)](_0x548543+0x1,_0x228ad7+0x1,_0x16b5dc-0x2,_0x268c9c-0x2,_0x248ec3),this['contents'][_0x309687(0x369)]=0xff;}},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x2b5)]=function(_0x22f91f){const _0x536544=_0xc96ba8;switch(Window_PartyActive[_0x536544(0x31f)][_0x536544(0x362)]()[_0x536544(0x3bb)]()){case'face':this[_0x536544(0x2e8)](_0x22f91f);break;case _0x536544(0x358):this[_0x536544(0x3af)](_0x22f91f);break;case _0x536544(0x342):Imported[_0x536544(0x215)]&&this[_0x536544(0x3a3)](_0x22f91f);break;};},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x2e8)]=function(_0x56dd5f){const _0x10c2d5=_0xc96ba8,_0x590661=this[_0x10c2d5(0x208)](_0x56dd5f),_0x363266=this['itemRect'](_0x56dd5f),_0x53bde6=Math[_0x10c2d5(0x22f)](ImageManager[_0x10c2d5(0x285)],_0x363266[_0x10c2d5(0x373)]-0x2),_0x579056=_0x363266[_0x10c2d5(0x2ab)]-0x2;this[_0x10c2d5(0x378)](_0x590661['isFormationChangeOk']());const _0x10ae84=Math['round'](_0x363266['x']+(_0x363266[_0x10c2d5(0x373)]-_0x53bde6)/0x2);this[_0x10c2d5(0x31c)](_0x590661,_0x10ae84,_0x363266['y']+0x1,_0x53bde6,_0x579056),this[_0x10c2d5(0x378)](!![]);},Window_PartyActive[_0xc96ba8(0x2e0)]['drawItemImageSprite']=function(_0x2ae3bb){const _0x3530aa=_0xc96ba8,_0x13c68a=this['actor'](_0x2ae3bb),_0x31e42a=this['itemRect'](_0x2ae3bb),_0xa09a68=VisuMZ[_0x3530aa(0x3b7)][_0x3530aa(0x334)]['Window'],_0x283ca4=_0x31e42a['x']+Math['round'](_0x31e42a['width']/0x2)+_0xa09a68[_0x3530aa(0x1fb)],_0x45ef23=_0x31e42a['y']+_0x31e42a[_0x3530aa(0x2ab)]-this[_0x3530aa(0x203)]()-_0xa09a68[_0x3530aa(0x29a)];this[_0x3530aa(0x209)](_0x13c68a,_0x283ca4,_0x45ef23);},Window_PartyActive['prototype'][_0xc96ba8(0x3a3)]=function(_0x38981f){const _0x58d120=_0xc96ba8,_0x16d00f=this['actor'](_0x38981f),_0x448257=_0x16d00f['battlerName'](),_0x397b83=this[_0x58d120(0x228)](_0x38981f),_0x1291e8=VisuMZ['PartySystem'][_0x58d120(0x334)][_0x58d120(0x34c)],_0x8e5276=_0x397b83['x']+Math[_0x58d120(0x327)](_0x397b83[_0x58d120(0x373)]/0x2)+_0x1291e8['ActiveBattlerOffsetX'],_0x5eee0f=_0x397b83['y']+_0x397b83[_0x58d120(0x2ab)]-this[_0x58d120(0x203)]()-_0x1291e8[_0x58d120(0x24a)];this[_0x58d120(0x3c7)](_0x448257,_0x8e5276,_0x5eee0f);},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x3cf)]=function(_0x3b4bff,_0x58b2e4,_0x141f59,_0x2c29fb){const _0x2b83a7=_0xc96ba8,_0x1ce0a1=ColorManager[_0x2b83a7(0x1ec)](),_0x1b2d92=ColorManager[_0x2b83a7(0x324)](),_0x38ea16=_0x141f59/0x2,_0x355786=this['lineHeight']();while(_0x2c29fb--){this[_0x2b83a7(0x2c2)][_0x2b83a7(0x247)](_0x3b4bff,_0x58b2e4,_0x38ea16,_0x355786,_0x1b2d92,_0x1ce0a1),this[_0x2b83a7(0x2c2)][_0x2b83a7(0x247)](_0x3b4bff+_0x38ea16,_0x58b2e4,_0x38ea16,_0x355786,_0x1ce0a1,_0x1b2d92);}},Window_PartyActive['prototype'][_0xc96ba8(0x20a)]=function(_0x3eb80b,_0x26799b,_0xed062c,_0x381648){const _0x2b0868=_0xc96ba8;_0x381648=_0x381648||0xa8,this[_0x2b0868(0x391)](ColorManager[_0x2b0868(0x32f)](_0x3eb80b)),this['drawText'](_0x3eb80b[_0x2b0868(0x31d)](),_0x26799b,_0xed062c,_0x381648,'center');},Window_PartyActive[_0xc96ba8(0x2e0)][_0xc96ba8(0x2f8)]=function(_0x4d636e){const _0x52a7f4=_0xc96ba8;this[_0x52a7f4(0x219)]=_0x4d636e,this['callUpdateHelp']();},Window_PartyActive['prototype'][_0xc96ba8(0x2c9)]=function(){const _0x171dbb=_0xc96ba8;if(this[_0x171dbb(0x219)])this[_0x171dbb(0x219)][_0x171dbb(0x257)](this[_0x171dbb(0x208)](this['index']()));};function Window_PartyReserve(){const _0x2b0478=_0xc96ba8;this[_0x2b0478(0x25e)](...arguments);}Window_PartyReserve[_0xc96ba8(0x2e0)]=Object[_0xc96ba8(0x353)](Window_StatusBase[_0xc96ba8(0x2e0)]),Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c4)]=Window_PartyReserve,Window_PartyReserve['_actorGraphic']=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)]['Window'][_0xc96ba8(0x38b)],Window_PartyReserve[_0xc96ba8(0x286)]=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x34c)][_0xc96ba8(0x231)],Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x25e)]=function(_0x2e0d58){const _0x373014=_0xc96ba8;Window_StatusBase['prototype'][_0x373014(0x25e)][_0x373014(0x1fe)](this,_0x2e0d58),this['_lastIndex']=0x0,this[_0x373014(0x31a)]();},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x37b)]=function(){const _0x13fd1c=_0xc96ba8;return VisuMZ[_0x13fd1c(0x3b7)][_0x13fd1c(0x334)][_0x13fd1c(0x34c)][_0x13fd1c(0x2d6)]||0x1;},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x20b)]=function(){const _0x5935e0=_0xc96ba8;return this[_0x5935e0(0x203)]()*Window_PartyReserve['_rowThickness']+0x6;},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x3ae)]=function(){const _0x1c6811=_0xc96ba8;return VisuMZ[_0x1c6811(0x3b7)][_0x1c6811(0x334)][_0x1c6811(0x202)][_0x1c6811(0x2bd)];},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x24c)]=function(){const _0x50829d=_0xc96ba8;let _0xc5665d=$gameParty[_0x50829d(0x276)]()[_0x50829d(0x271)];if(this['addRemoveCommand']())_0xc5665d++;return _0xc5665d;},Window_PartyReserve['prototype']['actor']=function(_0x3a38ab){return $gameParty['reserveMembers']()[_0x3a38ab];},Window_PartyReserve['prototype'][_0xc96ba8(0x216)]=function(){const _0x610998=_0xc96ba8;return this[_0x610998(0x208)](this[_0x610998(0x3b8)]());},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x22b)]=function(){const _0x1be50a=_0xc96ba8;SoundManager[_0x1be50a(0x37f)]();},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x264)]=function(){const _0x17d9d4=_0xc96ba8,_0x2d1dd7=this['actor'](this[_0x17d9d4(0x3b8)]());return _0x2d1dd7?_0x2d1dd7['isFormationChangeOk']():!![];},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x308)]=function(){const _0x340952=_0xc96ba8;Window_StatusBase['prototype'][_0x340952(0x308)][_0x340952(0x1fe)](this),this['checkShiftSortShortcut']();},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x364)]=function(_0x120c09){const _0x337bc5=_0xc96ba8;this[_0x337bc5(0x3b8)]()<=0x0?this[_0x337bc5(0x384)]():Window_StatusBase[_0x337bc5(0x2e0)]['cursorUp'][_0x337bc5(0x1fe)](this,_0x120c09);},Window_PartyReserve[_0xc96ba8(0x2e0)]['cursorPagedown']=function(){const _0x3d0dea=_0xc96ba8,_0x145640=this[_0x3d0dea(0x3b8)](),_0x4f4a90=_0x145640+0x1>=this['maxItems']()-0x1?0x0:_0x145640+0x1;this[_0x3d0dea(0x1fa)](_0x145640,_0x4f4a90);},Window_PartyReserve[_0xc96ba8(0x2e0)]['cursorPageup']=function(){const _0x43f5cf=_0xc96ba8,_0x566567=this[_0x43f5cf(0x3b8)](),_0x428a09=_0x566567-0x1<0x0?this['maxItems']()-0x2:_0x566567-0x1;this[_0x43f5cf(0x1fa)](_0x566567,_0x428a09);},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x1fa)]=function(_0x83bad7,_0x42adb9){const _0x5cb1a2=_0xc96ba8,_0x49c755=this[_0x5cb1a2(0x208)](_0x83bad7),_0x383122=this[_0x5cb1a2(0x208)](_0x42adb9);if(!_0x49c755?.['isFormationChangeOk']()||!_0x383122?.['isFormationChangeOk']())return;else{if(!_0x49c755||!_0x383122)return;}const _0x4f510d=$gameParty['_actors'],_0x5c98c7=_0x4f510d[_0x5cb1a2(0x370)](_0x49c755['actorId']()),_0x5dc9d6=_0x4f510d[_0x5cb1a2(0x370)](_0x383122[_0x5cb1a2(0x21e)]());_0x4f510d[_0x5c98c7]=_0x383122?_0x383122['actorId']():0x0,_0x4f510d[_0x5dc9d6]=_0x49c755?_0x49c755[_0x5cb1a2(0x21e)]():0x0,this[_0x5cb1a2(0x31a)](),this[_0x5cb1a2(0x3c6)](),this[_0x5cb1a2(0x385)](_0x42adb9);},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x282)]=function(){const _0x58b857=_0xc96ba8;if(!this['isShiftShortcutEnabled']())return;Input[_0x58b857(0x287)](_0x58b857(0x35d))&&this['processShiftSortShortcut']();},Window_PartyReserve['prototype'][_0xc96ba8(0x310)]=function(){const _0x197039=_0xc96ba8;SoundManager[_0x197039(0x37f)](),$gameParty[_0x197039(0x2f0)](),this[_0x197039(0x385)](0x0),SceneManager[_0x197039(0x29d)][_0x197039(0x2ad)]();},Window_PartyReserve['prototype'][_0xc96ba8(0x2ea)]=function(){return this['active'];},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x33a)]=function(){const _0x2671c9=_0xc96ba8,_0x4b7f7b=this[_0x2671c9(0x216)]();return _0x4b7f7b?_0x4b7f7b[_0x2671c9(0x3b8)]():-0x1;},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x304)]=function(_0x3e4c84){const _0x3b2ba3=_0xc96ba8;Window_StatusBase[_0x3b2ba3(0x2e0)]['select'][_0x3b2ba3(0x1fe)](this,_0x3e4c84);if(_0x3e4c84>=0x0)this[_0x3b2ba3(0x332)]=_0x3e4c84;},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x356)]=function(){const _0x3da00c=_0xc96ba8;this[_0x3da00c(0x332)]=Math[_0x3da00c(0x22f)](this[_0x3da00c(0x332)],this[_0x3da00c(0x24c)]()-0x1),this['smoothSelect'](this[_0x3da00c(0x332)]),this[_0x3da00c(0x313)](!![]),this[_0x3da00c(0x3b1)]=!![];},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x262)]=function(_0x105501){const _0x3062b7=_0xc96ba8,_0x2c34c2=this['actor'](_0x105501);if(!_0x2c34c2)return this[_0x3062b7(0x272)](_0x105501);const _0x569d1e=this[_0x3062b7(0x1f8)](_0x105501);this['drawItemImage'](_0x105501);const _0x317aec=0xa8,_0x40d1da=Window_PartyReserve['_rowThickness']===0x1,_0x3ce6aa=ImageManager[_0x3062b7(0x25f)]*(_0x40d1da?0x2:0x1),_0x1ed423=this[_0x3062b7(0x204)]()+this[_0x3062b7(0x2a4)](),_0x172a8c=_0x569d1e[_0x3062b7(0x373)]-_0x317aec,_0xc0f2e2=_0x569d1e['x']+_0x3ce6aa+Math[_0x3062b7(0x22f)](_0x1ed423,_0x172a8c),_0x28d2a0=_0x40d1da?![]:!![];this[_0x3062b7(0x378)](_0x2c34c2[_0x3062b7(0x213)]()),this['drawActorPartyIcons'](_0x2c34c2,_0x569d1e['x'],_0x569d1e['y'],_0x28d2a0),this['drawActorName'](_0x2c34c2,_0xc0f2e2,_0x569d1e['y'],_0x317aec),this['changePaintOpacity'](!![]);},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x204)]=function(){const _0x33ab2c=_0xc96ba8,_0x1512e5=VisuMZ['PartySystem'][_0x33ab2c(0x334)]['Window'];switch(Window_PartyReserve['_actorGraphic'][_0x33ab2c(0x362)]()['trim']()){case _0x33ab2c(0x292):return ImageManager[_0x33ab2c(0x285)];case _0x33ab2c(0x358):return _0x1512e5[_0x33ab2c(0x3b6)]*0x2;case _0x33ab2c(0x342):return _0x1512e5[_0x33ab2c(0x39d)]*0x2;};},Window_PartyReserve[_0xc96ba8(0x2e0)]['drawRemoveCommand']=function(_0x21a8fc){const _0x43d714=_0xc96ba8,_0x3c2c93=this[_0x43d714(0x1f8)](_0x21a8fc);this[_0x43d714(0x378)](!![]);const _0x547492=TextManager[_0x43d714(0x2b4)];this[_0x43d714(0x1f6)](_0x547492,_0x3c2c93['x'],_0x3c2c93['y'],_0x3c2c93[_0x43d714(0x373)],'center');},Window_PartyReserve['prototype']['drawItemImage']=function(_0x5c09d3){const _0x2bac02=_0xc96ba8;switch(Window_PartyReserve[_0x2bac02(0x31f)]['toLowerCase']()['trim']()){case _0x2bac02(0x292):this[_0x2bac02(0x2e8)](_0x5c09d3);break;case'sprite':this['drawItemImageSprite'](_0x5c09d3);break;case _0x2bac02(0x342):Imported['VisuMZ_1_MainMenuCore']&&this[_0x2bac02(0x3a3)](_0x5c09d3);break;};},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x2e8)]=function(_0x3e7b12){const _0x1a1325=_0xc96ba8,_0x4f6c0a=this['actor'](_0x3e7b12),_0x100306=this['itemRect'](_0x3e7b12),_0x3c89a9=Window_PartyReserve[_0x1a1325(0x286)]===0x1;_0x100306['x']+=ImageManager[_0x1a1325(0x25f)]*(_0x3c89a9?0x2:0x1);const _0xfd6e70=ImageManager[_0x1a1325(0x285)],_0x4d5bae=_0x100306[_0x1a1325(0x2ab)]-0x2;this[_0x1a1325(0x378)](_0x4f6c0a[_0x1a1325(0x213)]()),this[_0x1a1325(0x31c)](_0x4f6c0a,_0x100306['x']+0x1,_0x100306['y']+0x1,_0xfd6e70,_0x4d5bae),this[_0x1a1325(0x378)](!![]);},Window_PartyReserve[_0xc96ba8(0x2e0)]['drawItemImageSprite']=function(_0x192493){const _0x3347f5=_0xc96ba8,_0x35b4e3=this['actor'](_0x192493),_0x3dd2e7=this[_0x3347f5(0x228)](_0x192493),_0x4b312e=Window_PartyReserve[_0x3347f5(0x286)]===0x1;_0x3dd2e7['x']+=ImageManager[_0x3347f5(0x25f)]*(_0x4b312e?0x2:0x1);const _0x2cd893=VisuMZ[_0x3347f5(0x3b7)][_0x3347f5(0x334)]['Window'],_0x4ca152=_0x3dd2e7['x']+_0x2cd893[_0x3347f5(0x3b6)]+this[_0x3347f5(0x2a4)](),_0x55a952=_0x3dd2e7['y']+_0x3dd2e7[_0x3347f5(0x2ab)]-_0x2cd893[_0x3347f5(0x349)];this[_0x3347f5(0x209)](_0x35b4e3,_0x4ca152,_0x55a952);},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x3a3)]=function(_0x114cd8){const _0x4da717=_0xc96ba8,_0x47c03f=this['actor'](_0x114cd8),_0x3c6218=_0x47c03f[_0x4da717(0x2ec)](),_0x277ba3=this[_0x4da717(0x228)](_0x114cd8),_0x4f6298=Window_PartyReserve[_0x4da717(0x286)]===0x1;_0x277ba3['x']+=ImageManager[_0x4da717(0x25f)]*(_0x4f6298?0x2:0x1);const _0x3bfce8=VisuMZ['PartySystem'][_0x4da717(0x334)][_0x4da717(0x34c)],_0x318ae2=_0x277ba3['x']+_0x3bfce8[_0x4da717(0x39d)]+this[_0x4da717(0x2a4)](),_0x51069c=_0x277ba3['y']+_0x277ba3[_0x4da717(0x2ab)]-_0x3bfce8[_0x4da717(0x2fa)];this['drawSvActor'](_0x3c6218,_0x318ae2,_0x51069c);},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x2f8)]=function(_0x398a05){const _0x2029ae=_0xc96ba8;this[_0x2029ae(0x219)]=_0x398a05,this[_0x2029ae(0x2c9)]();},Window_PartyReserve[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c9)]=function(){const _0x5c3b7f=_0xc96ba8;this['_statusWindow']&&this['_statusWindow'][_0x5c3b7f(0x257)](this[_0x5c3b7f(0x208)](this[_0x5c3b7f(0x3b8)]()));};function Window_PartyStatus(){const _0x5f200e=_0xc96ba8;this[_0x5f200e(0x25e)](...arguments);}Window_PartyStatus['prototype']=Object[_0xc96ba8(0x353)](Window_StatusBase['prototype']),Window_PartyStatus[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c4)]=Window_PartyStatus,Window_PartyStatus['prototype']['initialize']=function(_0x614eec){const _0x34085c=_0xc96ba8;this[_0x34085c(0x345)]=null,Window_StatusBase[_0x34085c(0x2e0)][_0x34085c(0x25e)]['call'](this,_0x614eec);},Window_PartyStatus['prototype'][_0xc96ba8(0x344)]=function(_0x34f2cc,_0x1f2b55,_0x57d5d7,_0xbe3131,_0x35f6c1){const _0x470264=_0xc96ba8;if(VisuMZ[_0x470264(0x3b7)]['Settings'][_0x470264(0x202)]['DrawBackRect']===![])return;_0x35f6c1=Math['max'](_0x35f6c1||0x1,0x1);while(_0x35f6c1--){_0xbe3131=_0xbe3131||this['lineHeight'](),this['contents'][_0x470264(0x369)]=0xa0;const _0x3e888e=ColorManager['getPartySystemBackColor']();this[_0x470264(0x2c2)]['fillRect'](_0x34f2cc+0x1,_0x1f2b55+0x1,_0x57d5d7-0x2,_0xbe3131-0x2,_0x3e888e),this[_0x470264(0x2c2)][_0x470264(0x369)]=0xff;}},ColorManager[_0xc96ba8(0x2bb)]=function(){const _0x1b3254=_0xc96ba8,_0x43b37b=VisuMZ['PartySystem']['Settings'][_0x1b3254(0x202)];let _0x866a13=_0x43b37b[_0x1b3254(0x333)]!==undefined?_0x43b37b[_0x1b3254(0x333)]:0x13;return ColorManager['getColor'](_0x866a13);},Window_PartyStatus[_0xc96ba8(0x2e0)][_0xc96ba8(0x257)]=function(_0x2eb8ef){const _0x238705=_0xc96ba8;if(this[_0x238705(0x345)]===_0x2eb8ef)return;this[_0x238705(0x345)]=_0x2eb8ef;if(_0x2eb8ef){const _0xd9b404=ImageManager[_0x238705(0x380)](_0x2eb8ef['faceName']());_0xd9b404[_0x238705(0x299)](this[_0x238705(0x31a)][_0x238705(0x235)](this));}else this[_0x238705(0x31a)]();},Window_PartyStatus[_0xc96ba8(0x2e0)][_0xc96ba8(0x31a)]=function(){const _0x414fe9=_0xc96ba8;Window_StatusBase[_0x414fe9(0x2e0)][_0x414fe9(0x31a)][_0x414fe9(0x1fe)](this),this[_0x414fe9(0x2c2)][_0x414fe9(0x35e)](),this['resetFontSettings'](),VisuMZ[_0x414fe9(0x3b7)][_0x414fe9(0x334)][_0x414fe9(0x34c)][_0x414fe9(0x22a)]['call'](this);},Window_PartyStatus['prototype'][_0xc96ba8(0x1e9)]=function(){const _0x1e47dd=_0xc96ba8;if(!this[_0x1e47dd(0x345)]){this[_0x1e47dd(0x344)](0x0,0x0,this[_0x1e47dd(0x2a2)],this['innerHeight']);const _0x4dfc38=Math[_0x1e47dd(0x327)]((this['innerHeight']-this['lineHeight']())/0x2);this[_0x1e47dd(0x391)](ColorManager['systemColor']()),this[_0x1e47dd(0x1f6)](TextManager[_0x1e47dd(0x206)],0x0,_0x4dfc38,this[_0x1e47dd(0x2a2)],'center');return;}this['drawActorFace'](this[_0x1e47dd(0x345)],0x1,0x0,ImageManager[_0x1e47dd(0x285)],ImageManager[_0x1e47dd(0x205)]),this[_0x1e47dd(0x26e)](this['_actor'],ImageManager[_0x1e47dd(0x285)]+0x24,0x0);const _0x105b81=this['lineHeight'](),_0xb66688=this[_0x1e47dd(0x2f6)](),_0x2515ca=Math['round'](this[_0x1e47dd(0x2a2)]/0x2),_0x16ec72=Math[_0x1e47dd(0x1f0)](_0xb66688[_0x1e47dd(0x271)]/0x2)*_0x105b81,_0x2b07e4=0x0;let _0x171a35=0x0,_0x17a1ff=ImageManager['faceHeight']+_0x105b81/0x2;for(const _0x2d2340 of _0xb66688){this[_0x1e47dd(0x344)](_0x171a35,_0x17a1ff,_0x2515ca,_0x105b81),this[_0x1e47dd(0x33c)](_0x2d2340,_0x171a35,_0x17a1ff,_0x2515ca),this['drawParamValue'](_0x2d2340,_0x171a35,_0x17a1ff,_0x2515ca),_0x171a35===_0x2b07e4?_0x171a35+=_0x2515ca:(_0x171a35=_0x2b07e4,_0x17a1ff+=_0x105b81);}},Window_PartyStatus[_0xc96ba8(0x2e0)]['actorParams']=function(){const _0x1e622f=_0xc96ba8;return Imported[_0x1e622f(0x319)]?VisuMZ[_0x1e622f(0x1fd)][_0x1e622f(0x334)][_0x1e622f(0x32c)][_0x1e622f(0x236)]:[0x2,0x3,0x4,0x5,0x6,0x7];},Window_PartyStatus[_0xc96ba8(0x2e0)][_0xc96ba8(0x33c)]=function(_0x71a03a,_0x59eb46,_0xe0864f,_0x507ab9){const _0x9d853=_0xc96ba8,_0x5d9c1c=this[_0x9d853(0x2a4)]();_0x507ab9-=_0x5d9c1c*0x2;if(Imported['VisuMZ_0_CoreEngine'])this['drawParamText'](_0x59eb46+_0x5d9c1c,_0xe0864f,_0x507ab9,_0x71a03a,![]);else{const _0x713816=TextManager[_0x9d853(0x2d2)](_0x71a03a);this[_0x9d853(0x391)](ColorManager[_0x9d853(0x223)]()),this['drawText'](_0x713816,_0x59eb46+_0x5d9c1c,_0xe0864f,_0x507ab9);}},Window_PartyStatus[_0xc96ba8(0x2e0)]['drawParamValue']=function(_0x556393,_0x3ec480,_0x3f3a4b,_0x5bcd35){const _0x53e9da=_0xc96ba8;this['resetFontSettings']();const _0x51b0c6=this[_0x53e9da(0x2a4)](),_0x380afb=this[_0x53e9da(0x33f)](_0x556393);this[_0x53e9da(0x1f6)](_0x380afb,_0x3ec480+_0x51b0c6,_0x3f3a4b,_0x5bcd35-_0x51b0c6*0x2,'right');},Window_PartyStatus[_0xc96ba8(0x2e0)][_0xc96ba8(0x33f)]=function(_0x26471a){const _0x4c01f1=_0xc96ba8,_0x4577c0=this['_actor'];return Imported[_0x4c01f1(0x319)]?_0x4577c0[_0x4c01f1(0x230)](_0x26471a,!![]):_0x4577c0[_0x4c01f1(0x2d2)](_0x26471a);};function Window_PartyBattleSwitch(){const _0x59209e=_0xc96ba8;this[_0x59209e(0x25e)](...arguments);}Window_PartyBattleSwitch[_0xc96ba8(0x2e0)]=Object[_0xc96ba8(0x353)](Window_StatusBase[_0xc96ba8(0x2e0)]),Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x2c4)]=Window_PartyBattleSwitch,Window_PartyBattleSwitch[_0xc96ba8(0x2e0)]['initialize']=function(_0x3d52ae){const _0x1992c2=_0xc96ba8;Window_StatusBase[_0x1992c2(0x2e0)][_0x1992c2(0x25e)][_0x1992c2(0x1fe)](this,_0x3d52ae),this[_0x1992c2(0x320)](VisuMZ[_0x1992c2(0x3b7)]['Settings']['Window'][_0x1992c2(0x2f1)]),this[_0x1992c2(0x2e7)]=0x0;},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x2e3)]=function(){const _0x21321e=_0xc96ba8;for(const _0x1f6e48 of $gameParty[_0x21321e(0x214)]()){ImageManager[_0x21321e(0x380)](_0x1f6e48[_0x21321e(0x37a)]());}},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x37b)]=function(){return 0x1;},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x208)]=function(_0x1eea0a){return $gameParty['reserveMembers']()[_0x1eea0a];},Window_PartyBattleSwitch['prototype']['currentActor']=function(){const _0x55a65b=_0xc96ba8;return this[_0x55a65b(0x208)](this[_0x55a65b(0x3b8)]());},Window_PartyBattleSwitch['prototype']['itemHeight']=function(){const _0x607743=_0xc96ba8;return this[_0x607743(0x203)]()*0x2+0x8;},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)]['maxItems']=function(){const _0x180f6f=_0xc96ba8;return $gameParty[_0x180f6f(0x276)]()[_0x180f6f(0x271)];},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x39c)]=function(){const _0x86ae7a=_0xc96ba8;Window_StatusBase[_0x86ae7a(0x2e0)][_0x86ae7a(0x39c)][_0x86ae7a(0x1fe)](this),this[_0x86ae7a(0x330)](),this[_0x86ae7a(0x31a)](),this[_0x86ae7a(0x385)](0x0);},Window_PartyBattleSwitch['prototype'][_0xc96ba8(0x326)]=function(){const _0x214931=_0xc96ba8;Window_StatusBase[_0x214931(0x2e0)][_0x214931(0x326)][_0x214931(0x1fe)](this),this['close']();},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x264)]=function(){const _0xbd2f87=_0xc96ba8;return this[_0xbd2f87(0x2ce)](this['currentActor']());},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x2ce)]=function(_0x41c748){const _0x283fbc=_0xc96ba8;if(!_0x41c748)return![];return _0x41c748[_0x283fbc(0x213)]()&&_0x41c748[_0x283fbc(0x3c2)]();},Window_PartyBattleSwitch['prototype']['drawItem']=function(_0x40983d){const _0x51043a=_0xc96ba8,_0x1ec45d=this[_0x51043a(0x208)](_0x40983d);if(!_0x1ec45d)return;const _0x5a2a74=ImageManager[_0x51043a(0x380)](_0x1ec45d[_0x51043a(0x37a)]());_0x5a2a74[_0x51043a(0x299)](this['processDrawItem'][_0x51043a(0x235)](this,_0x40983d));},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x3d1)]=function(_0x1e3a38){const _0x2250c6=_0xc96ba8;this[_0x2250c6(0x2b5)](_0x1e3a38),this[_0x2250c6(0x249)](_0x1e3a38);},Window_PartyBattleSwitch['prototype'][_0xc96ba8(0x2b5)]=function(_0x548ce2){const _0x2a8de8=_0xc96ba8,_0xc019e9=this[_0x2a8de8(0x208)](_0x548ce2),_0x2efaf0=this['itemRect'](_0x548ce2);this[_0x2a8de8(0x378)](this[_0x2a8de8(0x2ce)](_0xc019e9)),this[_0x2a8de8(0x31c)](_0xc019e9,_0x2efaf0['x']+0x1,_0x2efaf0['y']+0x1,ImageManager[_0x2a8de8(0x285)],_0x2efaf0[_0x2a8de8(0x2ab)]-0x2),this['changePaintOpacity'](!![]);},Window_PartyBattleSwitch[_0xc96ba8(0x2e0)][_0xc96ba8(0x249)]=function(_0x3f1d72){const _0x1b09d3=_0xc96ba8,_0xb95081=this[_0x1b09d3(0x208)](_0x3f1d72),_0x418832=this['itemRectWithPadding'](_0x3f1d72),_0x5af005=_0x418832['x']+ImageManager[_0x1b09d3(0x285)]+0x24,_0x53b18c=_0x5af005+0xb4;this['changePaintOpacity'](this[_0x1b09d3(0x2ce)](_0xb95081)),this[_0x1b09d3(0x20a)](_0xb95081,_0x5af005,_0x418832['y']),this[_0x1b09d3(0x21f)](_0xb95081,_0x5af005,_0x418832['y']+this[_0x1b09d3(0x203)]()),this[_0x1b09d3(0x3bf)](_0xb95081,_0x53b18c,_0x418832['y']),this['changePaintOpacity'](!![]);};Imported[_0xc96ba8(0x368)]&&(ImageManager[_0xc96ba8(0x3a9)]=0x4b,TextManager[_0xc96ba8(0x2a3)]=VisuMZ[_0xc96ba8(0x3b7)]['Settings'][_0xc96ba8(0x3ce)]['BattlePartyCmd'],TextManager[_0xc96ba8(0x314)]=VisuMZ[_0xc96ba8(0x3b7)]['Settings'][_0xc96ba8(0x3ce)]['BattleHelpFormation'],TextManager[_0xc96ba8(0x2dd)]=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x341)],TextManager['battlePartySwitchCmdHelp']=VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x3ce)][_0xc96ba8(0x3c3)],TextManager[_0xc96ba8(0x348)]=VisuMZ[_0xc96ba8(0x3b7)]['Settings'][_0xc96ba8(0x3ce)][_0xc96ba8(0x340)],VisuMZ[_0xc96ba8(0x3b7)]['SceneManager_isPreviousSceneBattleTransitionable']=SceneManager[_0xc96ba8(0x2c0)],SceneManager['isPreviousSceneBattleTransitionable']=function(){const _0x19d9ea=_0xc96ba8;if(SceneManager[_0x19d9ea(0x307)](Scene_Party))return!![];return VisuMZ['PartySystem'][_0x19d9ea(0x37e)][_0x19d9ea(0x1fe)](this);},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x39b)]=SceneManager['isNextSceneBattleTransitionable'],SceneManager[_0xc96ba8(0x2d1)]=function(){const _0x12c291=_0xc96ba8;if(SceneManager[_0x12c291(0x3a1)](Scene_Party))return!![];return VisuMZ[_0x12c291(0x3b7)][_0x12c291(0x39b)][_0x12c291(0x1fe)](this);},SceneManager['isSceneMap']=function(){const _0x37ee75=_0xc96ba8;return this[_0x37ee75(0x29d)]&&this['_scene'][_0x37ee75(0x2c4)]===Scene_Map;},VisuMZ['PartySystem']['Scene_Battle_createAllWindows']=Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x1e8)],Scene_Battle['prototype'][_0xc96ba8(0x1e8)]=function(){const _0x552faa=_0xc96ba8;VisuMZ[_0x552faa(0x3b7)][_0x552faa(0x2d4)][_0x552faa(0x1fe)](this),this[_0x552faa(0x302)](),this['postPartySwitchMenuTpb'](),this[_0x552faa(0x3b0)]();},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x302)]=function(){const _0x5b63f6=_0xc96ba8,_0x404256=this['partySwitchWindowRect']();this[_0x5b63f6(0x221)]=new Window_PartyBattleSwitch(_0x404256),this['addWindow'](this[_0x5b63f6(0x221)]),this[_0x5b63f6(0x221)][_0x5b63f6(0x268)]('ok',this[_0x5b63f6(0x284)][_0x5b63f6(0x235)](this)),this[_0x5b63f6(0x221)][_0x5b63f6(0x268)]('cancel',this[_0x5b63f6(0x387)]['bind'](this));},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x2a7)]=function(){const _0x1fa77a=_0xc96ba8,_0xc32ab=this[_0x1fa77a(0x350)]();return _0xc32ab==='border'?this[_0x1fa77a(0x2af)]():this['partySwitchWindowRectStandard']();},Scene_Battle['prototype'][_0xc96ba8(0x346)]=function(){const _0x2ff7f3=_0xc96ba8;return VisuMZ[_0x2ff7f3(0x3b7)][_0x2ff7f3(0x334)][_0x2ff7f3(0x34c)][_0x2ff7f3(0x30b)][_0x2ff7f3(0x1fe)](this);},Scene_Battle[_0xc96ba8(0x2e0)]['partySwitchWindowRectBorder']=function(){const _0x32a4d9=_0xc96ba8,_0x44e6de=this[_0x32a4d9(0x28a)](),_0x18e7b5=$gameSystem[_0x32a4d9(0x390)]()*0x2;return _0x44e6de['width']=0x204+_0x18e7b5,_0x44e6de;},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x3a7)]=Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x26b)],Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x26b)]=function(){const _0x2547dd=_0xc96ba8;if(this[_0x2547dd(0x221)]&&this[_0x2547dd(0x221)][_0x2547dd(0x2ee)])return!![];if(this[_0x2547dd(0x23f)])return!![];if(this['_callPartyMemberSwitch'])return!![];if(this[_0x2547dd(0x22c)])return!![];return VisuMZ[_0x2547dd(0x3b7)]['Scene_Battle_isAnyInputWindowActive']['call'](this);},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x270)]=Scene_Battle['prototype'][_0xc96ba8(0x1ea)],Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x1ea)]=function(){const _0x4a9ec4=_0xc96ba8;VisuMZ[_0x4a9ec4(0x3b7)]['Scene_Battle_createPartyCommandWindowBattleCore'][_0x4a9ec4(0x1fe)](this),this[_0x4a9ec4(0x288)]['setHandler']('formation',this[_0x4a9ec4(0x3a4)]['bind'](this));},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x3a4)]=function(){const _0xc71b3d=_0xc96ba8;this[_0xc71b3d(0x379)]()?(this['_callSceneParty']=!![],this['_logWindow']['addText'](TextManager['ActiveTpbFormationMessage']['format'](TextManager['formation']))):this[_0xc71b3d(0x354)]();},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x379)]=function(){const _0x1b6197=_0xc96ba8;return BattleManager[_0x1b6197(0x29f)]();},Scene_Battle['prototype'][_0xc96ba8(0x354)]=function(){const _0x17bc85=_0xc96ba8;this[_0x17bc85(0x22c)]=![],this[_0x17bc85(0x2f5)][_0x17bc85(0x2df)](),this[_0x17bc85(0x251)][_0x17bc85(0x2a0)]=![],SceneManager[_0x17bc85(0x25c)](),SceneManager[_0x17bc85(0x234)](Scene_Party),$gameParty[_0x17bc85(0x2ef)](),BattleManager['isTpb']()&&(BattleManager[_0x17bc85(0x351)]=BattleManager['actor']());},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x39e)]=Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x2fc)],Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x2fc)]=function(){const _0x118fbc=_0xc96ba8;VisuMZ['PartySystem'][_0x118fbc(0x39e)][_0x118fbc(0x1fe)](this),this[_0x118fbc(0x22c)]&&!BattleManager[_0x118fbc(0x1ff)]&&this[_0x118fbc(0x354)](),this[_0x118fbc(0x226)]&&!BattleManager[_0x118fbc(0x1ff)]&&this[_0x118fbc(0x355)]();},VisuMZ['PartySystem'][_0xc96ba8(0x38f)]=Scene_Battle['prototype'][_0xc96ba8(0x30c)],Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x30c)]=function(){const _0x2c26f1=_0xc96ba8;if(BattleManager[_0x2c26f1(0x29f)]()){if(this[_0x2c26f1(0x221)]&&this[_0x2c26f1(0x221)][_0x2c26f1(0x2ee)])return![];}return VisuMZ[_0x2c26f1(0x3b7)][_0x2c26f1(0x38f)][_0x2c26f1(0x1fe)](this);},VisuMZ[_0xc96ba8(0x3b7)]['Scene_Battle_createActorCommandWindow']=Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x2a9)],Scene_Battle[_0xc96ba8(0x2e0)]['createActorCommandWindow']=function(){const _0x5cb530=_0xc96ba8;VisuMZ[_0x5cb530(0x3b7)][_0x5cb530(0x392)][_0x5cb530(0x1fe)](this),this[_0x5cb530(0x32d)][_0x5cb530(0x268)](_0x5cb530(0x218),this[_0x5cb530(0x32e)][_0x5cb530(0x235)](this));},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x32e)]=function(){const _0x36ad92=_0xc96ba8;this[_0x36ad92(0x379)]()?(this[_0x36ad92(0x226)]=!![],this[_0x36ad92(0x2b0)][_0x36ad92(0x3bd)](TextManager[_0x36ad92(0x348)][_0x36ad92(0x20f)](TextManager[_0x36ad92(0x218)]))):this[_0x36ad92(0x355)]();},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x355)]=function(){const _0x844ab7=_0xc96ba8;this[_0x844ab7(0x226)]=![],this[_0x844ab7(0x2b0)][_0x844ab7(0x35e)](),BattleManager[_0x844ab7(0x208)]()&&this[_0x844ab7(0x221)][_0x844ab7(0x39c)]();},Scene_Battle['prototype'][_0xc96ba8(0x284)]=function(){const _0x51d501=_0xc96ba8,_0x31a498=this[_0x51d501(0x221)][_0x51d501(0x216)]();_0x31a498?this[_0x51d501(0x374)](_0x31a498):(this['_partyMemberSwitchWindow'][_0x51d501(0x326)](),this['_actorCommandWindow'][_0x51d501(0x39c)]());},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x374)]=function(_0x447c95){const _0x53d4bd=_0xc96ba8,_0x590492=BattleManager[_0x53d4bd(0x208)](),_0x5efa58=_0x590492[_0x53d4bd(0x294)]();this[_0x53d4bd(0x221)][_0x53d4bd(0x326)](),this[_0x53d4bd(0x3b4)]()&&_0x5efa58?(this['_partySystemSwitchOut']=!![],_0x5efa58[_0x53d4bd(0x250)](_0x447c95)):this['processPartySwitchMember'](_0x447c95);},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x3b4)]=function(){const _0x2938ab=_0xc96ba8;return VisuMZ[_0x2938ab(0x3b7)][_0x2938ab(0x334)][_0x2938ab(0x202)][_0x2938ab(0x367)];},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x21b)]=function(_0x201f45){const _0x4d25c0=_0xc96ba8;this['_partySystemSwitchOut']=![];const _0x17ca4d=BattleManager[_0x4d25c0(0x208)](),_0x5db4fb=_0x17ca4d['battler']();$gameParty[_0x4d25c0(0x2b7)][_0x17ca4d['index']()]=_0x201f45[_0x4d25c0(0x21e)](),$gameParty['partyChangeRefresh']();if(this[_0x4d25c0(0x1f5)]())_0x201f45['_tpbChargeTime']=_0x17ca4d['_tpbChargeTime'],_0x201f45[_0x4d25c0(0x3d0)]=_0x4d25c0(0x371);else BattleManager[_0x4d25c0(0x377)]()&&_0x201f45[_0x4d25c0(0x201)]();BattleManager[_0x4d25c0(0x1e7)]=_0x201f45,_0x201f45[_0x4d25c0(0x2ef)](),_0x201f45[_0x4d25c0(0x2e9)](),_0x201f45['onBattlePartySwitch'](_0x17ca4d),_0x5db4fb&&_0x5db4fb[_0x4d25c0(0x3ca)](_0x201f45),this['_statusWindow']['switchStateIconActor'](_0x17ca4d,_0x201f45),this[_0x4d25c0(0x219)][_0x4d25c0(0x31a)](),this['_actorCommandWindow'][_0x4d25c0(0x3a0)](_0x201f45),this['_actorCommandWindow'][_0x4d25c0(0x385)](0x0),this[_0x4d25c0(0x32d)][_0x4d25c0(0x39c)](),this[_0x4d25c0(0x32d)]['_debug']=!![];},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x1f5)]=function(){const _0xb12f06=_0xc96ba8;if(!BattleManager[_0xb12f06(0x377)]())return![];const _0x113c04=VisuMZ[_0xb12f06(0x3b7)][_0xb12f06(0x334)]['General'];return _0x113c04[_0xb12f06(0x240)]===undefined&&(_0x113c04[_0xb12f06(0x240)]=!![]),_0x113c04[_0xb12f06(0x240)];},Window_StatusBase[_0xc96ba8(0x2e0)]['switchStateIconActor']=function(_0x3c1a34,_0x2e2d5d){const _0x1e1e97=_0xc96ba8,_0x151825=_0x1e1e97(0x2c7)[_0x1e1e97(0x20f)](_0x3c1a34[_0x1e1e97(0x21e)]()),_0x3a5901=this[_0x1e1e97(0x398)](_0x151825,Sprite_StateIcon);_0x3a5901['setup'](_0x2e2d5d);},Scene_Battle[_0xc96ba8(0x2e0)][_0xc96ba8(0x387)]=function(){const _0x522780=_0xc96ba8;this[_0x522780(0x221)][_0x522780(0x326)](),this['_actorCommandWindow'][_0x522780(0x39c)](),this[_0x522780(0x32d)][_0x522780(0x31a)]();},Scene_Battle['prototype'][_0xc96ba8(0x25a)]=function(){const _0x41c6f0=_0xc96ba8;if(!BattleManager['isTpb']())return;if(!SceneManager[_0x41c6f0(0x307)](Scene_Party))return;this[_0x41c6f0(0x288)][_0x41c6f0(0x326)](),this[_0x41c6f0(0x288)]['close'](),this['_actorCommandWindow'][_0x41c6f0(0x326)](),this[_0x41c6f0(0x32d)][_0x41c6f0(0x3c4)](),BattleManager[_0x41c6f0(0x1e7)]=null,BattleManager[_0x41c6f0(0x3ac)]=![];},Scene_Battle['prototype']['postPartySwitchMenuTurnBased']=function(){const _0x57660e=_0xc96ba8;if(BattleManager['isTpb']())return;if(!SceneManager[_0x57660e(0x307)](Scene_Party))return;Imported[_0x57660e(0x20c)]&&BattleManager['isBTB']()&&BattleManager[_0x57660e(0x3a8)](),Imported[_0x57660e(0x388)]&&BattleManager['isFTB']()&&(BattleManager[_0x57660e(0x1e7)]=$gameParty[_0x57660e(0x1f3)]()[0x0],BattleManager['_subject']=BattleManager[_0x57660e(0x208)](),BattleManager[_0x57660e(0x3ac)]=!![],this[_0x57660e(0x32d)][_0x57660e(0x3a0)](BattleManager[_0x57660e(0x208)]()),this['_statusWindow'][_0x57660e(0x316)](BattleManager[_0x57660e(0x208)]()));},Sprite_Actor[_0xc96ba8(0x255)]=0xc,Sprite_Actor['prototype'][_0xc96ba8(0x250)]=function(_0x8fbcb9){const _0x56ca81=_0xc96ba8;this[_0x56ca81(0x361)]=_0x8fbcb9;const _0xcc6c87=Sprite_Actor['_partySwitchDuration'];this[_0x56ca81(0x21c)](0x12c,0x0,_0xcc6c87),this['startOpacity'](0x0,_0xcc6c87),this[_0x56ca81(0x255)]=_0xcc6c87;},Sprite_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x1fc)]=function(_0x207670){const _0x303556=_0xc96ba8;if(SceneManager[_0x303556(0x3d2)]()){SceneManager[_0x303556(0x29d)][_0x303556(0x21b)](_0x207670);const _0x3e9437=Sprite_Actor[_0x303556(0x255)];this[_0x303556(0x2cf)](),this['startOpacity'](0xff,_0x3e9437);}this[_0x303556(0x361)]=null;},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x260)]=Sprite_Actor['prototype'][_0xc96ba8(0x2df)],Sprite_Actor[_0xc96ba8(0x2e0)]['update']=function(){const _0x377506=_0xc96ba8;VisuMZ[_0x377506(0x3b7)][_0x377506(0x260)][_0x377506(0x1fe)](this);if(this[_0x377506(0x255)])this[_0x377506(0x30f)]();},Sprite_Actor[_0xc96ba8(0x2e0)][_0xc96ba8(0x30f)]=function(){const _0x3514d8=_0xc96ba8;this[_0x3514d8(0x255)]=this[_0x3514d8(0x255)]||0x0,this[_0x3514d8(0x255)]--,this['_partySwitchDuration']<=0x0&&this[_0x3514d8(0x1fc)](this[_0x3514d8(0x361)]);},Window_PartyCommand[_0xc96ba8(0x2e0)]['addCustomCommands']=function(){const _0xdc9728=_0xc96ba8;this[_0xdc9728(0x29e)]();},Window_PartyCommand[_0xc96ba8(0x2e0)][_0xc96ba8(0x29e)]=function(){const _0x41153d=_0xc96ba8;if(!this['isFormationCommandAdded']())return;if(this['hasBattleSystemIncompatibilities']()){$gameTemp[_0x41153d(0x2be)]()&&!BattleManager[_0x41153d(0x36d)]&&(console['log']('WARNING:\x20Party\x20Change\x20command\x20is\x20unavailable\x20for\x20Window_PartyCommand\x20for\x20this\x20Battle\x20System'),BattleManager[_0x41153d(0x36d)]=!![]);return;}const _0x3ba0c3=this[_0x41153d(0x31e)](),_0xb3ba16=ImageManager[_0x41153d(0x3a9)],_0x9bf1ef=_0x3ba0c3===_0x41153d(0x2b9)?TextManager[_0x41153d(0x2a3)]:_0x41153d(0x243)['format'](_0xb3ba16,TextManager[_0x41153d(0x2a3)]),_0x440ae1=this[_0x41153d(0x297)]();this['addCommand'](_0x9bf1ef,'formation',_0x440ae1);},Window_PartyCommand[_0xc96ba8(0x2e0)]['isFormationCommandAdded']=function(){const _0x46fc8c=_0xc96ba8;return VisuMZ[_0x46fc8c(0x3b7)][_0x46fc8c(0x334)][_0x46fc8c(0x202)][_0x46fc8c(0x39f)];},Window_PartyCommand[_0xc96ba8(0x2e0)][_0xc96ba8(0x232)]=function(){const _0x1ee45e=_0xc96ba8;if(Imported[_0x1ee45e(0x35f)]&&BattleManager[_0x1ee45e(0x26f)]())return!![];return![];},Window_PartyCommand[_0xc96ba8(0x2e0)]['isFormationCommandEnabled']=function(){const _0x2aed0c=_0xc96ba8;if($gameParty[_0x2aed0c(0x214)]()[_0x2aed0c(0x271)]<=0x1)return![];if(!$gameParty[_0x2aed0c(0x34a)]())return![];return $gameSystem[_0x2aed0c(0x38e)]();},VisuMZ[_0xc96ba8(0x3b7)][_0xc96ba8(0x334)][_0xc96ba8(0x331)]=Window_PartyCommand[_0xc96ba8(0x2e0)][_0xc96ba8(0x283)],Window_PartyCommand[_0xc96ba8(0x2e0)][_0xc96ba8(0x283)]=function(){const _0x2b63e0=_0xc96ba8,_0x49e2d3=this[_0x2b63e0(0x267)]();switch(_0x49e2d3){case _0x2b63e0(0x218):this[_0x2b63e0(0x325)][_0x2b63e0(0x28b)](TextManager['battlePartyChangeCmdHelp']);break;default:VisuMZ['PartySystem'][_0x2b63e0(0x334)][_0x2b63e0(0x331)][_0x2b63e0(0x1fe)](this);break;}},Window_ActorCommand['prototype'][_0xc96ba8(0x312)]=function(){const _0x19da79=_0xc96ba8;if(!this[_0x19da79(0x256)]())return;const _0x137606=this[_0x19da79(0x31e)](),_0x404929=ImageManager[_0x19da79(0x3a9)],_0x3e04ff=_0x137606===_0x19da79(0x2b9)?TextManager[_0x19da79(0x2dd)]:_0x19da79(0x243)[_0x19da79(0x20f)](_0x404929,TextManager['battlePartyChangeCmd']),_0x83501a=this['isPartyCommandEnabled']();this['addCommand'](_0x3e04ff,_0x19da79(0x218),_0x83501a);},Window_ActorCommand[_0xc96ba8(0x2e0)][_0xc96ba8(0x256)]=function(){const _0x38ea23=_0xc96ba8;if(!this[_0x38ea23(0x345)])return![];return VisuMZ[_0x38ea23(0x3b7)][_0x38ea23(0x334)][_0x38ea23(0x202)]['ActorCmdWinAddParty'];},Window_ActorCommand[_0xc96ba8(0x2e0)]['isPartyCommandEnabled']=function(){const _0x4694c7=_0xc96ba8;if($gameParty[_0x4694c7(0x214)]()['length']<=0x1)return![];if(!this['_actor'])return![];if(!this[_0x4694c7(0x345)][_0x4694c7(0x34a)]())return![];return this[_0x4694c7(0x345)][_0x4694c7(0x213)]();},VisuMZ['PartySystem']['Settings'][_0xc96ba8(0x3cc)]=Window_ActorCommand['prototype'][_0xc96ba8(0x283)],Window_ActorCommand[_0xc96ba8(0x2e0)]['updateHelp']=function(){const _0x52835a=_0xc96ba8,_0x413c1b=this[_0x52835a(0x267)]();switch(_0x413c1b){case _0x52835a(0x218):this[_0x52835a(0x325)][_0x52835a(0x28b)](TextManager['battlePartySwitchCmdHelp']);break;default:VisuMZ[_0x52835a(0x3b7)]['Settings'][_0x52835a(0x3cc)][_0x52835a(0x1fe)](this);break;}});;